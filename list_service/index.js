import { createRequire } from "module";
const require = createRequire(import.meta.url);

import dotenv from "dotenv";
import amqp from "amqplib";
dotenv.config();

import mongoose from "mongoose";
mongoose
  .connect(process.env.MONGO_ATLAS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo... :)"))
  .catch((err) => console.log(err));

import List from "./db_schemas/List.js";
import User from "./db_schemas/User.js";
let channel = null;
let connection = null;
let q = null;
const QUEUE = "shopping";

let connect = async () => {
  try {
    connection = await amqp.connect(process.env.RABBIT_LOCAL_CON_STR);
    channel = await connection.createChannel();
    q = await channel.assertQueue(QUEUE);
    console.log("[V] Connected to queue.");
  } catch (error) {
    console.error(error);
    console.log("[X] Connection to queue failed.");
  }
};

connect().then(async () =>
  channel.consume(QUEUE, async (data) => {
    //TODO: add try/catch to every query
    //TODO: make a function for each case?
    let msg = JSON.parse(data.content);
    let id = data.properties.correlationId;
    let answer = null;
    console.log(`received message ${data.content} with id ${id}`);
    let l_id = null;
    let usr_id = null;
    let l_name = null;
    let l_description = null;
    let check = null;
    switch (msg.type) {
      case "lists_get":
        answer = await User.find(
          mongoose.Types.ObjectId(msg.content.usr_id)
        ).populate({ path: "user_lists._id" });
        msg.type = "lists_get_done";
        msg.content = answer[0].user_lists;
        break;

      case "lists_post":
        let new_list = new List({
          list_name: msg.content.list_name,
          list_description: msg.content.list_description,
          list_participants: [
            {
              _id: mongoose.Types.ObjectId(msg.content.usr_id),
              owner: true,
            },
          ],
        });
        await new_list.save();
        let id = new_list._id;
        await User.updateOne(
          { _id: msg.content.usr_id },
          { $push: { user_lists: { _id: id, owner: true } } }
        );
        msg.type = "lists_posts_done";
        msg.content = new_list;
        break;

      case "lists_put":
        l_id = msg.content.list_id;
        l_name = msg.content.list_name;
        l_description = msg.content.list_description;
        check = await List.findOne({ _id: mongoose.Types.ObjectId(l_id) });
        // TODO: try catch, checks
        check.list_name = l_name;
        check.list_description = l_description;
        await check.save();
        console.log(check);
        msg.content = {
          status: "ok",
          list: check,
        };
        msg.type = "lists_put_done";
        break;

      case "lists_invite":
        usr_id = msg.content.usr_id;
        l_id = msg.content.list_id;
        check = await User.findOne({
          _id: mongoose.Types.ObjectId(usr_id),
          "user_lists._id": mongoose.Types.ObjectId(l_id),
        });
        if (check == null) {
          await User.updateOne(
            { _id: mongoose.Types.ObjectId(usr_id) },
            { $push: { user_lists: { _id: _id, owner: false } } }
          );
          await List.updateOne(
            { _id: l_id },
            { $push: { list_participants: { _id: usr_id, owner: false } } }
          );
          msg.content = {
            status: "ok",
          };
        } else {
          msg.content = {
            status: "already_in",
          };
        }
        msg.type = "lists_invite_done";
        break;
    }
    console.log(
      `Processed message ${JSON.stringify(
        msg.content
      )} with id ${id}, the answer is ${msg}`
    );
    channel.sendToQueue(
      data.properties.replyTo,
      Buffer.from(JSON.stringify(msg)),
      { correlationId: id }
    );
    channel.ack(data);
  })
);

process.on("beforeExit", () => {
  console.log("[X] Stopping the controller");
  connection.close();
  console.log("[x] RabbitMq connection closed");
  mongoose.connection.close(() => console.log("[x] Mongo connection closed"));
});

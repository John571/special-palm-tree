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
    let msg = JSON.parse(data.content);
    let id = data.properties.correlationId;
    let answer = null;
    console.log(`received message ${msg.content} with id ${id}`);
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
        new_list;
        await new_list.save();
        let id = new_list._id;
        await User.updateOne(
          { _id: msg.content.usr_id },
          { $push: { user_lists: { _id: id, owner: true } } }
        );
        msg.type = "lists_posts_done";
        msg.content = new_list;
        break;

      case "lists_invite":
        let usr_id = msg.content.usr_id;
        let list_id = msg.content.list_id;
        let check = await User.findOne({
          _id: mongoose.Types.ObjectId(usr_id),
          "user_lists._id": mongoose.Types.ObjectId(list_id),
        });
        if (check == null) {
          await User.updateOne(
            { _id: mongoose.Types.ObjectId(usr_id) },
            { $push: { user_lists: { _id: list_id, owner: false } } }
          );
          await List.updateOne(
            { _id: list_id },
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

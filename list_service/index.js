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
      case "lists_request":
        answer = await List.find({
          owner_id: msg.usr_id,
        });
        break;
    }
    msg.type = "lists_request_done";
    msg.content = answer;
    console.log(
      `Processed message ${msg.content} with id ${id}, the answer is ${answer}`
    );
    channel.sendToQueue(
      data.properties.replyTo,
      Buffer.from(JSON.stringify(answer)),
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

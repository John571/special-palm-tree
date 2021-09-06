import dotenv from "dotenv";
import amqp from "amqplib";

dotenv.config();
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

connect().then(() =>
  channel.consume(QUEUE, (data) => {
    let msg = JSON.parse(data.content);
    let id = data.properties.correlationId;
    console.log(`received message ${msg.content} with id ${id}`);
    msg.type = "job_done";
    console.log(`Processed message ${msg.content} with id ${id}`);
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
});

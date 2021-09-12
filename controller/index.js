import dotenv from "dotenv";
import amqp from "amqplib";
import express from "express";
import crypto from "crypto";

dotenv.config();
let channel = null;
let connection = null;
let q = null;
const QUEUE = "shopping";

let connect = async () => {
  try {
    connection = await amqp.connect(process.env.RABBIT_LOCAL_CON_STR);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE);
    console.log("[V] Connected to queue.");
  } catch (error) {
    console.error(error);
    console.log("[X] Connection to queue failed.");
  }
};

await connect();
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Hello from shopingApp Controller"));

app.get("/lists", async (req, res) => {
  q = await channel.assertQueue("", { exclusive: true });
  let msg = {
    content: req.body.msg,
    type: "lists_request",
  };
  let id = crypto.randomBytes(4).toString("hex");
  console.log(
    `controller - sending msg ${msg} of type ${msg.type} with id ${id}, waiting for processing...`
  );

  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)), {
    correlationId: id,
    replyTo: q.queue,
  });

  channel.consume(q.queue, (data) => {
    if (data && data.properties.correlationId == id) {
      let ms = JSON.parse(data.content);
      let idd = data.properties.correlationId;
      console.log(
        `controller received answer ${ms} of type ${ms.type} with id ${idd}`
      );
      channel.ack(data);
      channel.deleteQueue(q.queue);
      res.json(ms);
    }
  });
});

app.listen(4000, () =>
  console.log("[*]Shopping Controller is listening on port 4000")
);

process.on("beforeExit", () => {
  console.log("[X] Stopping the controller");
  connection.close();
});

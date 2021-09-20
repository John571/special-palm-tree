import dotenv from "dotenv";
import amqp from "amqplib";
import express from "express";
import q_send_rcv from "./handlers/q_send_rcv.js";

dotenv.config();
let q = null;
let channel = null;
let connection = null;
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

app.get("/lists", (req, res) => {
  q_send_rcv(channel, QUEUE, req.body.usr_id, "lists_get", res);
});

app.post("/lists", (req, res) => {
  q_send_rcv(channel, QUEUE, req.body, "lists_post", res);
});

app.listen(4000, () =>
  console.log("[*]Shopping Controller is listening on port 4000")
);

process.on("beforeExit", () => {
  console.log("[X] Stopping the controller");
  connection.close();
});

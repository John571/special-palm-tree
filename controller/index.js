import dotenv from "dotenv";
import amqp from "amqplib";
import express from "express";
import q_send_rcv from "./handlers/q_send_rcv.js";
import cors from "cors";
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
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello from shopingApp Controller"));

app.post("/lists", (req, res) => {
  // GET lists of a user by id
  q_send_rcv(channel, QUEUE, req.body, "lists_get", res);
});

app.post("/lists", (req, res) => {
  // Create a new list
  q_send_rcv(channel, QUEUE, req.body, "lists_post", res);
});

app.put("/lists", (req, res) => {
  // EDIT lists
  q_send_rcv(channel, QUEUE, req.body, "lists_put", res);
});

app.delete("/lists", (req, res) => {
  // DELETE lists
  q_send_rcv(channel, QUEUE, req.body, "lists_delete", res);
});

app.post("/lists_invite", (req, res) => {
  // invite other users to lists
  q_send_rcv(channel, QUEUE, req.body, "lists_invite", res);
});

app.post("/lists_items", (req, res) => {
  // Add item to lists
  q_send_rcv(channel, QUEUE, req.body, "items_add", res);
});

app.put("/lists_items", (req, res) => {
  // Update item in list
  q_send_rcv(channel, QUEUE, req.body, "items_update", res);
});

app.delete("/lists_items", (req, res) => {
  q_send_rcv(channel, QUEUE, req.body, "items_delete", res);
});

app.listen(4000, () =>
  console.log("[*]Shopping Controller is listening on port 4000")
);

process.on("beforeExit", () => {
  console.log("[X] Stopping the controller");
  connection.close();
});

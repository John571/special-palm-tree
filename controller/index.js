import { createRequire } from "module";
const require = createRequire(import.meta.url);
import dotenv from "dotenv";
import amqp from "amqplib";
import express from "express";
import q_send_rcv from "./handlers/q_send_rcv.js";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import User from "./db_schemas/User.js";
import verifyToken from "./middleware/auth.js";
const { Server } = require("socket.io");
dotenv.config();
let q = null;
let channel = null;
let connection = null;
const QUEUE = "shopping";

mongoose
  .connect(process.env.MONGO_ATLAS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo... :)"))
  .catch((err) => console.log(err));

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
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello from shopingApp Controller"));

app.post("/register", async (req, res) => {
  try {
    const { email, password, user_name, user_country, user_city, user_bio } =
      req.body;
    if (
      !(email && user_name && password && user_country && user_city && user_bio)
    )
      res.status(400).send("Please input all fields");
    const oldUser = await User.findOne({ email });
    if (oldUser)
      return res.status(409).send("User already exist. Please Login");

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      _id: mongoose.Types.ObjectId(),
      email,
      password: encryptedPassword,
      user_name,
      user_country,
      user_city,
      user_bio,
    });

    const token = jsonwebtoken.sign(
      { user_id: user._id, user_name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) res.status(400).send("All input is required");

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jsonwebtoken.sign(
        { user_id: user._id, user_name: user.user_name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2h" }
      );
      user.token = token;
      return res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.post("/lists_get", verifyToken, (req, res) => {
  // GET lists of a user by id
  q_send_rcv(channel, QUEUE, req.body, "lists_get", res);
});

app.post("/lists_info", (req, res) => {
  // GET list info
  q_send_rcv(channel, QUEUE, req.body, "lists_info", res);
});

app.post("/lists", verifyToken, (req, res) => {
  // Create a new list
  q_send_rcv(channel, QUEUE, req.body, "lists_post", res);
});

app.put("/lists", (req, res) => {
  // EDIT lists
  q_send_rcv(channel, QUEUE, req.body, "lists_put", res);
});

app.delete("/lists", verifyToken, (req, res) => {
  // DELETE lists
  q_send_rcv(channel, QUEUE, req.body, "lists_delete", res);
});

app.post("/lists_invite", verifyToken, (req, res) => {
  // invite other users to lists
  q_send_rcv(channel, QUEUE, req.body, "lists_invite", res, io);
});

app.post("/users_search", verifyToken, (req, res) => {
  // get all available users
  q_send_rcv(channel, QUEUE, req.body, "users_search", res);
});

app.post("/lists_items", (req, res) => {
  // Add item to lists
  q_send_rcv(channel, QUEUE, req.body, "items_add", res, io);
});

app.post("/lists_items_search", (req, res) => {
  // Search Available Items
  q_send_rcv(channel, QUEUE, req.body, "items_search", res);
});

app.post("/lists_items_get", (req, res) => {
  // Get list of items in list
  q_send_rcv(channel, QUEUE, req.body, "items_get", res);
});

app.put("/lists_items", (req, res) => {
  // Update item in list
  q_send_rcv(channel, QUEUE, req.body, "items_update", res, io);
});

app.delete("/lists_items", (req, res) => {
  // Delete item in list
  q_send_rcv(channel, QUEUE, req.body, "items_delete", res, io);
});

server.listen(4000, () =>
  console.log("[*]Shopping Controller is listening on port 4000")
);

process.on("beforeExit", () => {
  console.log("[X] Stopping the controller");
  connection.close();
});

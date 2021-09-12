import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Schema, model } = require("mongoose");

const ListSchema = Schema({
  _id: Schema.Types.ObjectId,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  list_name: { type: String, required: true },
  list_description: { type: String, default: "Another Shopping List" },
  date_created: { type: Date, default: Date.now },
});

export default model("List", ListSchema);

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Schema, model } = require("mongoose");

const ListSchema = Schema({
  list_name: { type: String, required: true },
  list_description: { type: String, default: "Another Shopping List" },
  date_created: { type: Date, default: Date.now },
  list_items: [{ type: String }],
  list_participants: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User" },
      owner: { type: Schema.Types.Boolean },
    },
  ],
});

export default model("List", ListSchema);

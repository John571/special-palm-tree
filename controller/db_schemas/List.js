import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Schema, model } = require("mongoose");

const ListSchema = Schema({
  list_name: { type: String, required: true },
  list_description: { type: String, default: "Another Shopping List" },
  date_created: { type: Date, default: Date.now },
  list_items: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Item" },
      added_by: { type: Schema.Types.ObjectId, ref: "User" },
      amount: { type: Schema.Types.Number, default: 1 },
      completed: { type: Schema.Types.Boolean, default: false },
      usr_img: {
        _id: { type: Schema.Types.ObjectId, default: Schema.Types.ObjectId() },
        url: { type: Schema.Types.String, default: null },
      },
    },
  ],
  list_participants: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "User" },
      owner: { type: Schema.Types.Boolean },
    },
  ],
});

export default model("List", ListSchema);

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Schema, model } = require("mongoose");

const ItemSchema = Schema({
  _id: { type: Schema.Types.ObjectId },
  item_name: { type: String, required: true },
  item_description: { type: String, default: "Another Item" },
  item_quantity: { type: String },
  item_brand: { type: String },
  item_country: { type: String },
  item_picture: {
    type: Schema.Types.String,
    default:
      "https://cdn4.iconfinder.com/data/icons/consumer-behaviour-3/64/consumerism-consumption-customer-shopping-buying-512.png",
  },
});

export default model("Item", ItemSchema);

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  user_name: { type: String, required: true },
  user_lists: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "List" },
      owner: { type: Schema.Types.Boolean },
    },
  ],
  user_bio: { type: String, default: "Let's go shopping" },
  user_country: { type: String },
  user_city: { type: String },
});

export default model("User", UserSchema);

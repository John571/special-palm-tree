const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  _id: Schema.Types.ObjectId,
  user_name: { type: String, required: true },
  user_bio: { type: String, default: "Let's go shopping" },
  user_country: { type: String },
  user_city: { type: String },
});

module.exports = model("User", UserSchema);

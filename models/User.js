// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  phone: String,
  address: String,
  order: {type: Schema.Types.ObjectId, ref:"Order"},
  history: Array,
  admin: Boolean

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
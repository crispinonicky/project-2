const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  name: String,
  occupation: String,
  catchphrase: String,
});


const Order = mongoose.model("Order", orderSchema);


module.exports = Order;
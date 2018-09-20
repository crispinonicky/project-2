const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  customer: {type: Schema.Types.ObjectId, ref:"User"},
  list: [{type: Schema.Types.ObjectId, ref:"Item"}]
});


const Order = mongoose.model("Order", orderSchema);


module.exports = Order;
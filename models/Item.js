const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  imgPath: String,
  description: String,
  // ingredients: String,
  // imgName: String,
  price: Number,
  comments: Array
});


const Item = mongoose.model("Item", itemSchema);


module.exports = Item;
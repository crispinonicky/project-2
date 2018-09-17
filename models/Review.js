const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  commenter: String,
  title: String,
  review: String,
  rating: Number
  // imgPath: 
});


const Review = mongoose.model("Review", reviewSchema);


module.exports = Review;
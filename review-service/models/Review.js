const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  user_id: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);

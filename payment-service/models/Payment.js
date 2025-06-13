const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  purpose: { type: String, required: true },
  payment_method: { type: String, required: true },
  paid_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);

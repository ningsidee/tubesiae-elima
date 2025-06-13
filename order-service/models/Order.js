const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  requester_id: { type: String, required: true },
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  department: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "delivered", "rejected"],
    default: "pending",
  },
  requested_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

orderSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/payment_service"
);

app.use("/api/payments", paymentRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "Payment Service", status: "OK", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});

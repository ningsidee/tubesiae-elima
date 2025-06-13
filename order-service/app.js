const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/order_service"
);

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "Order Service", status: "OK", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/product_service"
);

app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "Product Service", status: "OK", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});

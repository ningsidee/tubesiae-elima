const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/review_service"
);

app.use("/api/reviews", reviewRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "Review Service", status: "OK", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Review Service running on port ${PORT}`);
});

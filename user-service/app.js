const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/user_service"
);

app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "User Service", status: "OK", port: PORT });
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});

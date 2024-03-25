require("dotenv").config();

const express = require("express");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 5000;

connectDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/", require("./routes/productRoutes"));
app.use("/", require("./routes/userRoutes"));
app.use(cookieParser());

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

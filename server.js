const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = 5000;

connectDB();

app.use(express.json());
app.use("/", require("./routes/productRoutes"));
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

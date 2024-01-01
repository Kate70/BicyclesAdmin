const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bicycleRouter = require("./routes/bicycleRouter");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/api", bicycleRouter);
const databaseURL = process.env.DATABASE;

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

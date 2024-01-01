const mongoose = require("mongoose");

const bicycleSchema = new mongoose.Schema({
  ID: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  type: {
    type: String,
    required: true,
    minlength: 5,
  },
  color: {
    type: String,
    required: true,
    minlength: 5,
  },
  wheelSize: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  status: {
    type: String,
    default: "available",
  },
});

const Bicycle = mongoose.model("Bicycle", bicycleSchema);

module.exports = Bicycle;

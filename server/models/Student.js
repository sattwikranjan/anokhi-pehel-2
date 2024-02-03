const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

module.exports = mongoose.model("student", StudentSchema);

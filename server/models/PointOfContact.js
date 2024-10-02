const mongoose = require("mongoose");

const { Schema } = mongoose;

const POCSchema = new Schema({
  nameOfPoc: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
  school: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("POC", POCSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClassDescriptionSchema = new Schema({
  classId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  subject: {
    type: String,
    required: true,
  },
  mentorId: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("classtopic", ClassDescriptionSchema);

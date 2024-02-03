const mongoose = require("mongoose");

const { Schema } = mongoose;

const TestSchema = new Schema({
  classId: {
    type: String,
    required: true,
  },
  mentorId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  score: [
    {
      studentId: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("test", TestSchema);

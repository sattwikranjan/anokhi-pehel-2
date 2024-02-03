const mongoose = require("mongoose");

const { Schema } = mongoose;

const LineScheduleSchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  schedule: [
    {
      day: {
        type: String,
        required: true,
      },
      pickup: {
        type: String,
        required: true,
      },
      drop: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("lineschedule", LineScheduleSchema);

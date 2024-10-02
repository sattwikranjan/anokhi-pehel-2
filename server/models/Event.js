const mongoose = require("mongoose");

const { Schema } = mongoose;

const EventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDepartment: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  coordinator: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  regNumber: {
    type: String,
    required: true,
  },
  festName: {
    type: String,
    required: true,
  },
  firstPlace:{
    type: String,
    required: false,
  },
  secondPlace:{
    type: String,
    required: false,
  },
  thirdPlace:{
    type: String,
    required: false,
  },
  forthPlace:{
    type: String,
    required: false,
  },
  
});

module.exports = mongoose.model("Event", EventSchema);

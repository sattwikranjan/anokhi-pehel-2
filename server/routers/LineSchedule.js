const express = require("express");
const Schedule = require("../models/ClassSchedule");
const LineSchedule = require("../models/LineSchedule");
const User = require("../models/User");
const router = express.Router();
const cors = require("cors");

router.post("/addLineSchedule", async (req, res) => {
  try {
    const lineScheduleData = req.body;

    // Check if a schedule with the same location exists
    const existingSchedule = await LineSchedule.findOne({
      location: lineScheduleData.location,
    });

    if (existingSchedule) {
      return res
        .status(400)
        .json({ error: "Schedule for this location already exists" });
    }

    const newLineSchedule = new LineSchedule(lineScheduleData);
    await newLineSchedule.save();
    res.status(200).json("Schedule Added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getLineSchedule", async (req, res) => {
  try {
    const lineScheduleData = await LineSchedule.find(); // Fetch all schedule documents
    res.status(200).json(lineScheduleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getClassScheduleByMentorId", async (req, res) => {
  try {
    const mentorId = req.query.mentorId;
    const classSchedule = await Schedule.find(
      { "schedule.mentor": mentorId },
      {
        className: 1,
        "schedule.day": 1,
        "schedule.mentor": 1,
        "schedule.subject": 1,
        _id: 0,
      }
    );

    if (classSchedule && classSchedule.length > 0) {
      res.json(classSchedule);
    } else {
      console.log("Data not found");
      res.json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getLineScheduleByMentorId", async (req, res) => {
  try {
    const mentorId = req.query.mentorId;
    const lineSchedule = await LineSchedule.find(
      { "schedule.pickup": mentorId },
      {
        location: 1,
        "schedule.pickup": 1,
        "schedule.day": 1,

        _id: 0,
      }
    );

    if (lineSchedule && lineSchedule.length > 0) {
      res.json(lineSchedule);
    } else {
      console.log("Data not found");
      res.json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getLineSchedule1ByMentorId", async (req, res) => {
  try {
    const mentorId = req.query.mentorId;

    const lineSchedule = await LineSchedule.find(
      { "schedule.drop": mentorId },
      {
        location: 1,
        "schedule.drop": 1,
        "schedule.day": 1,

        _id: 0,
      }
    );

    if (lineSchedule && lineSchedule.length > 0) {
      res.json(lineSchedule);
    } else {
      console.log("Data not found");
      res.json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

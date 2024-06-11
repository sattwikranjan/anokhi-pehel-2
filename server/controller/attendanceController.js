const moment = require("moment");
const Attendance = require("../models/Attendance");

// Get monthly attendance for any class for a particular month
const monthlyAttendance = async (req, res) => {
  // Extracting classId and month from the request query
  const { classId, month } = req.query;

  try {
    // Calculating the start and end dates of the month
    const startOfMonth = moment(month, "YYYY-MM").startOf("month").toDate();
    const endOfMonth = moment(month, "YYYY-MM").endOf("month").toDate();

    // Querying the database to find attendance data for the specified class and month
    const attendanceData = await Attendance.find({
      classId,
      date: { $gte: startOfMonth, $lte: endOfMonth }, // Filtering by date range
    });

    // Sending the attendance data as JSON response
    res.status(200).json({ students: attendanceData });
  } catch (error) {
    // Handling any errors that occur during the process
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { monthlyAttendance };

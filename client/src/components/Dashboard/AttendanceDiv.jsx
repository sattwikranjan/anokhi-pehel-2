import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Service/helper";
const AttendanceBoxes = ({ classId }) => {
  const [status, setStatus] = useState("True");
  const [status1, setStatus1] = useState("True");
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const fetchAttendance = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/attendance?classId=${classId}`
      );
      // Assuming the API returns an array of attendance data
      setTotal(response.data.totalStudents);
      setPresent(response.data.totalPresentStudents);
      const percentagePresent = ((present / total) * 100).toFixed(2);

      setPercentage(percentagePresent);
    } catch (error) {
      setStatus("False");
      //   console.error("Error fetching attendance:", error);
    }
  };

  // fetch the topic covered today in that class
  const [topicCovered, setTopicCovered] = useState("NA");
  const fetchTopicCovered = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/topicCovered?classId=${classId}`
      );
      setTopicCovered(response.data.topicsCovered[0].topic);
      console.log(topicCovered);
    } catch (error) {
      setStatus1("False");
      //   console.error("Error fetching attendance:", error);
    }
  };

  // Fetch attendance data on component mount or when classId changes
  useEffect(() => {
    if (classId) {
      fetchAttendance();
      fetchTopicCovered();
    }
  }, [classId]);

  // Calculate total students and total present students

  return (
    <div className="lg:w-1/4 md:w-1/2 w-full p-4">
      {status === "True" ? (
        <div className="border rounded-lg h-36 p-4 bg-slate-700 text-white font-medium flex flex-col justify-center items-center">
          <p>Class {classId}</p>
          <p>Total Students: {total}</p>
          <p>Total Present Students: {present}</p>
          <p>Topic Covered: {topicCovered}</p>
        </div>
      ) : (
        <div className="border rounded-lg h-36 p-4 bg-red-900 text-white font-bold flex flex-col justify-center items-center">
          <p>Class {classId}</p>
          <p>Attendance not taken</p>
        </div>
      )}
      {/* {status1 === "True" ? (
        <div className="border rounded-lg h-36 p-4 bg-slate-700 text-white font-medium flex flex-col justify-center items-center">
          <p>Topic Covered: {topicCovered}</p>
        </div>
      ) : (
        <div className="border rounded-lg h-36 p-4 bg-red-900 text-white font-bold flex flex-col justify-center items-center">
          <p>Today's topic not updated</p>
        </div>
      )} */}
    </div>
  );
};

export default AttendanceBoxes;

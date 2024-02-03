import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Service/helper";
const AttendanceBoxes = ({ classId }) => {
  const [status, setStatus] = useState("True");
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [percentage, setPercentage] = useState(0);
  // Function to fetch today's attendance based on class ID
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

  // Fetch attendance data on component mount or when classId changes
  useEffect(() => {
    if (classId) {
      fetchAttendance();
    }
  }, [classId]);

  // Calculate total students and total present students

  return (
    <div className="lg:w-1/4 md:w-1/2 w-full p-4">
      {status === "True" ? (
        <div className="border h-36 p-4 bg-blue-900 text-white font-medium flex flex-col justify-center items-center">
          <p>Class {classId}</p>
          <p>Total Students: {total}</p>
          <p>Total Present Students: {present}</p>
          {/* <p> {percentage}%</p> */}
        </div>
      ) : (
        <div className="border h-36 p-4 bg-red-800 text-white font-bold flex flex-col justify-center items-center">
          <p>Class {classId}</p>
          <p>Attendance not taken</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceBoxes;

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { classes, subjects } from "../../constants/Dashboard";
import { BASE_URL } from "../../../src/Service/helper";
import { useSelector } from "react-redux";

const Attendance = () => {
  // ...

  const [month, setMonth] = useState("");
  const [monthlyAttendance, setMonthlyAttendance] = useState([]);

  // ...

  const fetchAttendanceData = async (selectedClass, selectedMonth) => {
    try {
      const response = await axios.get(`${BASE_URL}/totalAttendance1`, {
        params: {
          classId: credentials.class,
          month: selectedMonth,
        },
      });

      // Assuming response contains data for the entire month for each student
      if (response.status === 200 && response.data.length > 0) {
        setMonthlyAttendance(response.data); // Set monthly attendance data in state
        setStatus("True");
      } else {
        setStatus("False");
        console.error("No attendance data or invalid response");
      }
    } catch (error) {
      setStatus("False");
      console.error("Error fetching attendance data:", error);
    }
  };

  // ... (rest of the code remains the same)

  const getAttendanceForStudent = (studentId) => {
    const studentAttendance = monthlyAttendance.find(
      (attendance) => attendance.studentId === studentId
    );
    return studentAttendance ? studentAttendance.attendance : [];
  };
  const daysInMonth = (year, month) => {
    // month is 0-based, so we need to subtract 1 from the selected month
    return new Date(year, month, 0).getDate();
  };
  // Dynamically generate the attendance table
  const renderAttendanceTable = () => {
    const totalDays = daysInMonth(selectedYear, selectedMonth + 1);
    const attendanceTable = students.map((student) => {
      const studentAttendance = getAttendanceForStudent(student._id);
      const attendanceCells = [];
      for (let i = 1; i <= daysInMonth; i++) {
        const attendanceForDay = studentAttendance.find(
          (attendance) => attendance.date === i
        );
        const status = attendanceForDay ? attendanceForDay.status : "";
        attendanceCells.push(
          <td key={`${student._id}-${i}`} className="py-2 px-4">
            {status === "A" ? "Absent" : status === "P" ? "Present" : ""}
          </td>
        );
      }
      return (
        <tr key={student._id} className="text-center">
          <td className="py-2 px-4">{student.name}</td>
          {attendanceCells}
        </tr>
      );
    });
    return attendanceTable;
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-8">
            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                View Attendance
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                  <div className="mt-2">
                    <input
                      type="date"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="date"
                      value={credentials.date}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Class
                  </label>
                  <div className="mt-2">
                    <select
                      name="class"
                      id="class"
                      value={credentials.class}
                      onChange={onChange}
                      placeholder="Class"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a class</option>
                      {classes.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {status === "True" && (
            <div className="overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">
                Attendance for Class {credentials.class} in {months[month]}
              </h2>
              <table className="min-w-full bg-gray-100">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-3 px-4">Student Name</th>
                    {/* Dynamically generate headers for days in the month */}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => (
                        <th key={`day-${day}`} className="py-3 px-4">
                          {day}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>{renderAttendanceTable()}</tbody>
              </table>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;

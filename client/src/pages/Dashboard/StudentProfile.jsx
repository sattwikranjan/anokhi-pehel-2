import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../src/Service/helper";

const Student = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get("student._id");
  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (studentId) {
      axios
        .get(`${BASE_URL}/getstudentByUserId?studentid=${studentId}`)
        .then((res) => {
          setStudent(res.data);
        })
        .catch((err) => {
          console.error("Error fetching student: ", err);
        });

      axios
        .get(`${BASE_URL}/getMarksByUserId?studentid=${studentId}`)
        .then((res1) => {
          setMarks(res1.data);
        })
        .catch((err) => {
          console.error("Error fetching marks: ", err);
        });
    }
  }, [studentId]);

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold">Student Profile</h2>
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-screen-lg">
            {student ? (
              <div className="flex flex-col md:flex-row md:space-x-8 justify-center items-center">
                <div className="flex-shrink-0">
                  <img
                    src={`http://localhost:8080/images/${student.photo}`}
                    className="mentor-photo h-40 w-40 rounded-full"
                    alt="Student"
                  />
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-bold">{student.name}</h3>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    <span className="text-blue-600">{student.location}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Mode:</span>{" "}
                    <span className="text-blue-600">{student.mode}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <span className="text-blue-600">{student.phone}</span>
                  </p>
                  <p>
                    <span className="font-semibold">School:</span>{" "}
                    <span className="text-blue-600">{student.school}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Class:</span>{" "}
                    <span className="text-blue-600">{student.className}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    <span className="text-blue-600">{student.address}</span>
                  </p>
                </div>
              </div>
            ) : (
              <p>No student data available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="m-2 md:m-0 mt-0 p-2 md:p-7 bg-white rounded-3xl">
        <div className="class-schedule-container mt-8">
          <h2 className="schedule-title text-xl font-bold text-center mb-4">
            Marks Record
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-500">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Marks %</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {marks && marks.length > 0 ? (
                    marks.map((mark, index) => {
                      const studentMarks = mark.score.find(
                        (score) => score.studentId === studentId
                      );

                      if (studentMarks) {
                        const date = new Date(mark.date).toLocaleDateString();

                        return (
                          <tr key={index}>
                            <td className="border px-4 py-2">{date}</td>
                            <td className="border px-4 py-2">{mark.subject}</td>
                            <td className="border px-4 py-2">
                              {studentMarks.score}
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="border px-4 py-2">
                        No Marks Record found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Student;

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "jspdf-autotable";
import { BASE_URL } from "../../../src/Service/helper";
import { useNavigate, Link } from "react-router-dom";
const ViewTestScore = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const testId = searchParams.get("testId");
  const [testDetails, setTestDetails] = useState({});
  const [mentorName, setMentorName] = useState("");
  const [studentScores, setStudentScores] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/testsScore?testId=${testId}`
        );
        setTestDetails(response.data);

        const mentorId = response.data.mentorId;
        const mentorResponse = await axios.get(
          `${BASE_URL}/getMentorByUserId?mentorId=${mentorId}`
        );
        const mentorDetails = mentorResponse.data;
        setMentorName(mentorDetails.name);

        if (Array.isArray(response.data.score)) {
          const uniqueStudentIds = new Set();
          response.data.score.forEach((entry) => {
            uniqueStudentIds.add(entry.studentId);
          });

          setStudentIds(uniqueStudentIds); // Set student IDs
          fetchStudentNames(uniqueStudentIds);
        } else {
          console.error("Response data is not an array");
        }
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };

    fetchTestData();
  }, [testId, testDetails]);

  const fetchStudentNames = (studentIds) => {
    const studentIdArray = [...studentIds];

    axios
      .post(`${BASE_URL}/getStudentByUserId`, {
        studentIds: studentIdArray,
      })
      .then((response) => {
        const scores = response.data.map((student) => {
          return {
            name: student.name,
            id: student._id,
            score: testDetails.score.find(
              (entry) => entry.studentId === student._id
            ).score,
          };
        });
        setStudentScores(scores);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the formatting as needed
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-0 mt-0 p-2 md:p-7 bg-white rounded-3xl">
        <h2 className="text-center text-xl font-bold tracking-tight text-slate-900">
          Score Card
        </h2>
        <div className="container mt-5">
          <div className="flex flex-col space-y-0 mb-3 md:flex-row md:space-x-3 md:space-y-0">
            <div className="flex-1 flex flex-col">
              <p colSpan="6" className="text-lg font-bold mb-2">
                Mentor Name: {mentorName}
              </p>
            </div>
            <div className="flex-1 flex flex-col">
              <p colSpan="6" className="text-lg font-bold mb-2">
                Subject: {testDetails.subject}
              </p>
            </div>

            <div className="flex-1 flex flex-col">
              <p colSpan="5" className="text-lg font-bold mb-2">
                Test Date: {formatDate(testDetails.date)}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-500">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Score</th>

                  <th className="px-4 py-2">Profile</th>
                </tr>
              </thead>
              <tbody className=" text-center bg-gray-800 text-white min-w-full divide-y divide-gray-200 border border-gray-300">
                {studentScores.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 dark:text-black-200">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 dark:text-black-200">
                      {student.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 dark:text-black-200">
                      <Link
                        // to={`/studentProfile?student._id=${studentIds[index]}`}

                        to={`/studentProfile?student._id=${student.id}`}
                      >
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-normal hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTestScore;

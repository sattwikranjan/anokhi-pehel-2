import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { classes, subjects } from "../../constants/Dashboard";
import { BASE_URL } from "../../../src/Service/helper";
import { useSelector } from "react-redux";

const FindTopic = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    classId: "",
    subject: "",
  });
  const [topics, setTopics] = useState([]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (name === "classId") {
      fetchTopicCovered(value, credentials.subject);
    }
  };

  const fetchTopicCovered = async (classId, subject) => {
    try {
      const response = await axios.get(`${BASE_URL}/topics`, {
        params: {
          classId,
          subject,
        },
      });
      console.log(response.data);
      const { topics: receivedTopics } = response.data;

      if (Array.isArray(receivedTopics)) {
        setTopics(receivedTopics);
        const topicsWithMentorNames = await Promise.all(
          receivedTopics.map(async (topic) => {
            try {
              const mentorResponse = await axios.get(
                `${BASE_URL}/getMentorByUserId?mentorId=${topic.mentorId}`
              );
              const mentorName = mentorResponse.data.name; // Assuming 'name' is the field containing the mentor's name

              return {
                ...topic,
                mentorName: mentorName || "Unknown",
              };
            } catch (error) {
              console.error("Error fetching mentor:", error);
              return {
                ...topic,
                mentorName: "Unknown",
              };
            }
          })
        );

        setTopics(topicsWithMentorNames);
      } else {
        setTopics([]);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
      setTopics([]); // Reset topics on error
    }
  };
  return (
    <DashboardLayout>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form encType="multipart/form-data">
          <div className="space-y-8">
            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                All Topic Covered
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Subject
                  </label>
                  <div className="mt-2">
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="subject"
                      placeholder="Subject"
                      value={credentials.subject}
                      onChange={onChange}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.subject}
                        </option>
                      ))}
                    </select>
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
                      name="classId"
                      id="classId"
                      value={credentials.classId}
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
            <div>
              <h3 className="font-bold text-gray-900 mt-6">
                Topics Covered in Class {credentials.classId} -{" "}
                {credentials.subject}
              </h3>
              <ul className="mt-4">
                {topics.map((topic) => (
                  <li
                    key={topic._id}
                    className="bg-white shadow-md rounded-lg p-4 mb-4"
                  >
                    {/* Display the details of each topic */}
                    <table className="min-w-full border border-gray-300">
                      <thead>
                        <tr className="bg-gray-800 text-white">
                          <th className="py-2 px-4">S.No</th>
                          <th className="py-2 px-4">Date</th>
                          <th className="py-2 px-4">Topic</th>
                          <th className="py-2 px-4">Mentor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topics.map((topic, index) => (
                          <tr
                            key={topic._id}
                            className={
                              index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }
                          >
                            <td className="py-2 px-4">{index + 1}</td>
                            <td className="py-2 px-4">
                              {new Date(topic.date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4">{topic.topic}</td>
                            <td className="py-2 px-4">{topic.mentorName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default FindTopic;

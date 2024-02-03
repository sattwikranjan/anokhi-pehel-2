import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { classes, subjects } from "../../constants/Dashboard";
import { BASE_URL } from "../../../src/Service/helper";

const AddStudent = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    selectedClass: "",
    subject: "",
  });

  const [testDetails, setTestDetails] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === "selectedClass" && value && credentials.subject) {
      fetchTestDetails(credentials.subject, value);
    }

    if (name === "subject" && value && credentials.class) {
      fetchTestDetails(value, credentials.class);
    }
  };

  const fetchTestDetails = (subject, selectedClass) => {
    axios
      .get(
        `${BASE_URL}/tests?subject=${subject}&selectedClass=${selectedClass}`
      )
      .then((response) => {
        setTestDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching test details:", error);
      });
  };

  const viewScores = (testId, mentorId) => {
    console.log(testId);
    navigate(`/Scores?testId=${testId}`);
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form encType="multipart/form-data">
          <div className="space-y-8">
            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                View Performance
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
                      name="selectedClass"
                      id="selectedClass"
                      value={credentials.selectedClass}
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
        </form>
        {testDetails && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Test Details</h3>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-x border-t">
                <tr>
                  <th className="border-gray-300 p-2">Serial No.</th>
                  <th className="border-gray-300 p-2">Date</th>
                  <th className="border-gray-300 p-2">More Details</th>
                </tr>
              </thead>
              <tbody>
                {testDetails.map((test, index) => (
                  <tr key={test._id}>
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(test.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => viewScores(test._id)}
                      >
                        View Scores
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AddStudent;

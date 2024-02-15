// EditStudentPage.js
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../src/Service/helper";
function EditStudentPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get("student._id");
  const [student, setStudent] = useState({ name: "" });
  //   console.log(studentId);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getstudentByUserId?studentid=${studentId}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to update student data
      const response = await axios.put(`/students/${studentId}`, student);
      console.log("Student updated successfully:", response.data);
      // Redirect to student details page or show a success message
    } catch (error) {
      console.error("Error updating student:", error);
      // Show an error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  return (
    <DashboardLayout>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </DashboardLayout>
  );
}

export default EditStudentPage;

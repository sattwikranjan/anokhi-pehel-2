// EditStudentPage.js

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditStudentPage() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/students/${studentId}`);
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
    <div>
      <h2>Edit Student</h2>
      {student && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditStudentPage;

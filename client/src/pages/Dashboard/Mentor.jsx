import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Header from "../../components/Dashboard/Header";
import Button from "../../components/Dashboard/Button";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../components/Dashboard/Loader.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BASE_URL } from "../../Service/helper";
import { useSelector } from "react-redux";
const Mentor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const currentColor = "#03C9D7";
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const onClick = () => {
    navigate("/AddMentors7282vdsghbhdghd");
  };
  const [users, setMentors] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterRegnumber, setFilterRegnumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/mentorList`);
        setMentors(response.data);
        // console.log(users);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const userName = user.name ? user.name.toLowerCase() : "";
    const userRegnumber = user.regnumber ? user.regnumber.toLowerCase() : "";

    return (
      userName.includes(filterName.toLowerCase()) &&
      userRegnumber.includes(filterRegnumber.toLowerCase())
    );
  });
  const handleDownloadTable = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add the table to the PDF document
    doc.autoTable({
      head: [["Name", "Regnumber", "Phone", "Email"]],
      body: filteredUsers.map((user) => [
        user.name,
        user.regnumber,
        user.phone,
        user.email,
      ]),
    });
    doc.save("mentors_table.pdf");
  };

  return (
    <DashboardLayout>
      {isLoading && <Loader />}
      <div className="m-2 md:m-5 mt-12 p-2 md:p-0 bg-white rounded-3xl flex flex-row justify-between items-center">
        <Header category="Academics" title="Mentors" />
        <div>
          {user?.role === "Admin" && (
            <Button
              color="white"
              bgColor={currentColor}
              text="Add Mentor"
              borderRadius="8px"
              width="5px"
              height="10px"
              custumFunc={onClick}
            />
          )}
        </div>
      </div>

      <div className="m-2 md:m-0 mt-0 p-2 md:p-7 bg-white rounded-3xl">
        <h2 className="text-center text-xl font-bold tracking-tight text-slate-900">
          Mentors List
        </h2>
        <div className="container mt-5">
          <div className="flex flex-col space-y-0 mb-3 md:flex-row md:space-x-3 md:space-y-0">
            <div className="flex-1 flex flex-col">
              <label className="text-lg text-gray-400">Filter by Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search Mentor by Name"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-lg text-gray-400">
                Filter by Regnumber:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Registration Number"
                value={filterRegnumber}
                onChange={(e) => setFilterRegnumber(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-500">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Reg Number</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Profile</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredUsers
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((user) => (
                    <tr key={user._id}>
                      <td className="border px-4 py-2">{user.name}</td>
                      <td className="border px-4 py-2">{user.regnumber}</td>
                      <td className="border px-4 py-2">{user.phone}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">
                        <Link to={`/mentorProfile?mentor._id=${user._id}`}>
                          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-normal hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Profile
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleDownloadTable}
          >
            Download Table as PDF
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mentor;

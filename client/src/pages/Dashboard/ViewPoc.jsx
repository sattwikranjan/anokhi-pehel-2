import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Dashboard/Header";
import { BASE_URL } from "../../../src/Service/helper";
import { useSelector } from "react-redux";


  
const ViewPocList = () => {
  const [pocList, setPocList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPocData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pocList`);
        setPocList(response.data);
      } catch (error) {
        console.error("Error fetching POC details:", error);
      }
    };

    fetchPocData();
  }, []);

  // Function to handle the search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter POC list based on search term
  const filteredPocList = pocList.filter((poc) => {
    return (
      poc.nameOfPoc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      poc.school.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to delete a POC
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/pocList/${id}`);
      // Update local state to remove deleted POC
      setPocList(pocList.filter((poc) => poc._id !== id));
    } catch (error) {
      console.error("Error deleting POC:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-5 mt-12 p-2 md:p-0 bg-white rounded-3xl flex flex-row justify-between items-center">
        <Header category="Antyodaya2k24" title="Point of Contact of Schools" />
      </div>
      <div className="m-2 md:m-0 mt-0 p-2 md:p-7 bg-white rounded-3xl">
        <h2 className="text-center text-xl font-bold tracking-tight text-slate-900">
          POC List
        </h2>
        {/* Search Input */}
        <div className="mb-4 flex justify-center lg:justify-start">
          <input
            type="text"
            placeholder="Search by Name or School"
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-300 rounded-md p-2"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-900">
          <thead className="text-xs text-gray-900 uppercase bg-gray-50 border-x border-t">
            <tr>
              <th className="border px-4 py-2">Name of POC</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">School</th>
              {user?.isAdmin === true && (
              <th className="border px-4 py-2">Actions</th> 
            )}
            </tr>
          </thead>
          <tbody>
            {filteredPocList.map((poc) => (
              <tr key={poc._id}>
                <td className="border px-4 py-2">{poc.nameOfPoc}</td>
                <td className="border px-4 py-2">{poc.contact}</td>
                <td className="border px-4 py-2">{poc.school}</td>
                <td className="border px-4 py-2">
                {user?.isAdmin === true && ( // Conditionally render delete button
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(poc._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ViewPocList;

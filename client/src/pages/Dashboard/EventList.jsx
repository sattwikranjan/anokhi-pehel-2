import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { BASE_URL } from "../../../src/Service/helper";
import Header from "../../components/Dashboard/Header";
import Button from "../../components/Dashboard/Button";
import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]); // State for filtered events
  const [searchEventName, setSearchEventName] = useState(""); // Event name filter state
  const [searchCoordinator, setSearchCoordinator] = useState(""); // Coordinator name filter state

  let navigate = useNavigate();
  const currentColor = "#03C9D7";
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getEvents`);
        setEvents(response.data); // assuming response.data is an array of events
        setFilteredEvents(response.data); // Initialize filtered events
      } catch (error) {
        setError("Failed to fetch events.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter the events based on event name and coordinator name
  useEffect(() => {
    const filtered = events.filter((event) =>
      event.eventName.toLowerCase().includes(searchEventName.toLowerCase()) &&
      event.coordinator.toLowerCase().includes(searchCoordinator.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchEventName, searchCoordinator, events]);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const onClick = () => {
    navigate("/addEvent");
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-5 mt-12 p-2 md:p-0 bg-white rounded-3xl flex flex-row justify-between items-center">
        <Header category="Antyodaya2k24" title="Events" />
        <div>
          {user?.isAdmin === true && (
            <Button
              color="white"
              bgColor={currentColor}
              text="Add Event"
              borderRadius="8px"
              width="5px"
              height="10px"
              custumFunc={onClick}
            />
          )}
        </div>
      </div>
      <div className="m-2 md:m-0 mt-0 p-2 md:p-7 bg-white rounded-3xl">
      <h2 className="text-center text-xl font-bold tracking-tight text-slate-900 mb-10">
        Event List
      </h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex flex-col md:flex-row justify-center items-center">
  <input
    type="text"
    placeholder="Search by Event Name"
    className="border border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 md:mr-2"
    value={searchEventName}
    onChange={(e) => setSearchEventName(e.target.value)}
  />
  <input
    type="text"
    placeholder="Search by Coordinator Name"
    className="border border-gray-300 rounded-md px-4 py-2"
    value={searchCoordinator}
    onChange={(e) => setSearchCoordinator(e.target.value)}
  />
</div>


<div className="overflow-x-auto">
<table className="w-full text-sm text-left text-gray-500 ">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 border-x border-t">
            <tr>
              <th className="px-6 py-4 font-bold">Event Name</th>
              <th className="px-6 py-4 font-bold">Location</th>
              <th className="px-6 py-4 font-bold">Start Time</th>
              <th className="px-6 py-4 font-bold">End Time</th>
              <th className="px-6 py-4 font-bold">Coordinator</th>
              <th className="px-6 py-4 font-bold">Phone</th>
              <th className="px-6 py-4 font-bold">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <tr key={index} className="border-b transition hover:bg-gray-50">
                  <td className="border px-6 py-4">{event.eventName}</td>
                  <td className="border px-6 py-4">{event.location}</td>
                  <td className="border px-6 py-4">{event.startTime}</td>
                  <td className="border px-6 py-4">{event.endTime}</td>
                  <td className="border px-6 py-4">{event.coordinator}</td>
                  <td className="border px-6 py-4">{event.phone}</td>
                  <td className="border px-4 py-2">
                  <Link to={`/eventManagement?event._id=${event._id}&regNumber=${event.regNumber}`}>
  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-normal hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
    Details
  </button>
</Link>

                      </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default EventPage;

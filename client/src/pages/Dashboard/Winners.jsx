import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Header from "../../components/Dashboard/Header";
import { BASE_URL } from "../../../src/Service/helper";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getEventsWithWinners`);
        
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch events.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DashboardLayout>
  <Header category="Antyodaya2k24" title="Event Winners" />
  <div className="m-2 p-2 bg-white rounded-3xl">
    <h2 className="text-center text-xl font-bold mb-10">Event Winners</h2>
    <div className="overflow-x-auto">
      <table className="w-full min-w-max text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-x border-t">
          <tr>
            <th className="px-6 py-4 font-bold whitespace-nowrap">S.No</th>
            <th className="px-6 py-4 font-bold whitespace-nowrap">Event Name</th>
            <th className="px-6 py-4 font-bold whitespace-nowrap">Event Group</th>
            <th className="px-6 py-4 font-bold whitespace-nowrap">Hindi 6 to 8</th>
            <th className="px-6 py-4 font-bold whitespace-nowrap">Hindi 9 to 12</th>
            <th className="px-6 py-4 font-bold whitespace-nowrap">English 6 to 8</th>
            <th className="px-6 py-4 font-bold whitespace-nowrap">English 9 to 12</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event, index) => (
              <tr key={index} className="border-b transition hover:bg-gray-50">
                <td className="border px-6 py-4">{index + 1}</td>
                <td className="border px-6 py-4">{event.eventName}</td>
                <td className="border px-6 py-4">{event.eventGroup}</td>
                <td className="border px-6 py-4">
                  1st: {event.h6to8firstPlace || "N/A"} <br />
                  2nd: {event.h6to8secondPlace || "N/A"} <br />
                  3rd: {event.h6to8thirdPlace || "N/A"} <br />
                  4th: {event.h6to8fourthPlace || "N/A"}
                </td>
                <td className="border px-6 py-4">
                  1st: {event.h9to12firstPlace || "N/A"} <br />
                  2nd: {event.h9to12secondPlace || "N/A"} <br />
                  3rd: {event.h9to12thirdPlace || "N/A"} <br />
                  4th: {event.h9to12fourthPlace || "N/A"}
                </td>
                <td className="border px-6 py-4">
                  1st: {event.e6to8firstPlace || "N/A"} <br />
                  2nd: {event.e6to8secondPlace || "N/A"} <br />
                  3rd: {event.e6to8thirdPlace || "N/A"} <br />
                  4th: {event.e6to8fourthPlace || "N/A"}
                </td>
                <td className="border px-6 py-4">
                  1st: {event.e9to12firstPlace || "N/A"} <br />
                  2nd: {event.e9to12secondPlace || "N/A"} <br />
                  3rd: {event.e9to12thirdPlace || "N/A"} <br />
                  4th: {event.e9to12fourthPlace || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
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

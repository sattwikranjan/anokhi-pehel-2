import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../../components/Dashboard/Button";
import { BASE_URL } from "../../../src/Service/helper";

const Student = () => {
  const location = useLocation();
  const currentColor = "#15803d";
  const currentColor1 = "#dc2626";

  let navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { user } = useSelector((state) => state.user);
  const eventId = searchParams.get("event._id");
  const regNumberCoordinator = searchParams.get("regNumber");
  const [event, setEvent] = useState(null);

  const onClick = async () => {
    try {
      if (eventId) {
        await navigate(`/editEvent?eventId=${eventId}`);
      } else {
        console.log("Event is not available");
      }
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  const onClick1 = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${BASE_URL}/deleteEvent?eventId=${eventId}`);
        if (response.status === 200) {
          window.alert("Event deleted successfully");
        } else {
          window.alert("Failed to delete event");
        }
      } catch (error) {
        window.alert("Error deleting event: " + error.message);
      }
    } else {
      window.alert("Event deletion canceled");
    }
  };

  useEffect(() => {
    if (eventId) {
      axios
        .get(`${BASE_URL}/getEventByEventId?eventId=${eventId}`)
        .then((res) => {
          setEvent(res.data);
        })
        .catch((err) => {
          console.error("Error fetching event: ", err);
        });
    }
  }, [eventId]);

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold mb-4">Event Details</h2>
        <div className="mentor-profile bg-gray-100 p-4 rounded-lg flex flex-col gap-4">
          {event ? (
            <div className="event-card flex flex-col items-start p-4 border-b border-gray-300 mb-4">
              {/* Left section: General event details */}
              <div className="event-details w-full">
              <h3 className="text-2xl font-bold mb-2 text-center">Details of Event </h3>
              <p><span className="font-semibold">Event Name:</span>{event.eventName}</p>
                <p><span className="font-semibold">Location:</span> {event.location}</p>
                <p><span className="font-semibold">Start Time:</span> {event.startTime}</p>
                <p><span className="font-semibold">End Time:</span> {event.endTime}</p>
                <h4 className="text-xl font-semibold mb-2 mt-4">Details of Event Coordinator</h4>
<p><span className="font-semibold">Coordinator:</span> {event.coordinator}</p>
<p><span className="font-semibold">Phone:</span> <span className="text-blue-600">{event.phone}</span></p>
<p><span className="font-semibold">Registration Number of Coordinator:</span> {event.regNumber}</p>

              </div>

              {/* Buttons for Edit and Delete Event */}
              <div className="buttons w-full flex flex-col items-center mt-4">
                <div className="justify-center mb-2">
                  {(user?.isAdmin === true || user.regnumber === regNumberCoordinator) && (
                    <Button
                      color="white"
                      bgColor={currentColor}
                      text="Edit Event"
                      borderRadius="8px"
                      width="full"
                      height="10px"
                      custumFunc={onClick}
                    />
                  )}
                </div>

                <div className="justify-center">
                  {user?.isAdmin === true && (
                    <Button
                      color="white"
                      bgColor={currentColor1}
                      text="Delete Event"
                      borderRadius="8px"
                      width="full"
                      height="10px"
                      custumFunc={onClick1}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>No Event data available.</p>
          )}

   {/* Winner Details Section */}
<div className="winner-details w-full p-4 bg-gray-100 rounded-lg shadow-md mt-4">
  <h4 className="text-xl font-semibold mb-4 text-center">List of Winners </h4>

  {/* Hindi 6 to 8 Winners */}
  {event?.h6to8firstPlace && (
    <div className="winner-category mb-8">
      <h5 className="text-lg font-semibold mb-2 text-center">Sub-category: Hindi 6 to 8</h5>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 text-center">Position</th>
            <th className="border border-gray-400 px-4 py-2 text-center">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2 text-center">1st Place</td>
            <td className="border border-gray-400 px-4 py-2 text-center">{event.h6to8firstPlace}</td>
          </tr>
          {event.h6to8secondPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">2nd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.h6to8secondPlace}</td>
            </tr>
          )}
          {event.h6to8thirdPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">3rd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.h6to8thirdPlace}</td>
            </tr>
          )}
          {event.h6to8fourthPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">4th Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.h6to8fourthPlace}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}

  {/* Hindi 9 to 12 Winners */}
  {event?.h9to12firstPlace && (
    <div className="winner-category mb-8">
      <h5 className="text-lg font-semibold mb-2 text-center">Sub-category: Hindi 9 to 12</h5>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 text-center">Position</th>
            <th className="border border-gray-400 px-4 py-2 text-center">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2 text-center">1st Place</td>
            <td className="border border-gray-400 px-4 py-2 text-center">{event.h9to12firstPlace}</td>
          </tr>
          {event.h9to12secondPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">2nd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.h9to12secondPlace}</td>
            </tr>
          )}
          {event.h9to12thirdPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">3rd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.h9to12thirdPlace}</td>
            </tr>
          )}
          {event.h9to12fourthPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">4th Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.h9to12fourthPlace}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}

  {/* English 6 to 8 Winners */}
  {event?.e6to8firstPlace && (
    <div className="winner-category mb-8">
      <h5 className="text-lg font-semibold mb-2 text-center">Sub-category: English 6 to 8</h5>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 text-center">Position</th>
            <th className="border border-gray-400 px-4 py-2 text-center">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2 text-center">1st Place</td>
            <td className="border border-gray-400 px-4 py-2 text-center">{event.e6to8firstPlace}</td>
          </tr>
          {event.e6to8secondPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">2nd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.e6to8secondPlace}</td>
            </tr>
          )}
          {event.e6to8thirdPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">3rd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.e6to8thirdPlace}</td>
            </tr>
          )}
          {event.e6to8fourthPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">4th Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.e6to8fourthPlace}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}

  {/* English 9 to 12 Winners */}
  {event?.e9to12firstPlace && (
    <div className="winner-category mb-8">
      <h5 className="text-lg font-semibold mb-2 text-center">Sub-category: English 9 to 12</h5>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 text-center">Position</th>
            <th className="border border-gray-400 px-4 py-2 text-center">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 px-4 py-2 text-center">1st Place</td>
            <td className="border border-gray-400 px-4 py-2 text-center">{event.e9to12firstPlace}</td>
          </tr>
          {event.e9to12secondPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">2nd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.e9to12secondPlace}</td>
            </tr>
          )}
          {event.e9to12thirdPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">3rd Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.e9to12thirdPlace}</td>
            </tr>
          )}
          {event.e9to12fourthPlace && (
            <tr>
              <td className="border border-gray-400 px-4 py-2 text-center">4th Place</td>
              <td className="border border-gray-400 px-4 py-2 text-center">{event.e9to12fourthPlace}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}
</div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Student;

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
                <h3 className="text-2xl font-bold mb-2">{event.eventName}</h3>
                <p><span className="font-semibold">Department:</span> {event.eventDepartment}</p>
                <p><span className="font-semibold">Location:</span> {event.location}</p>
                <p><span className="font-semibold">Start Time:</span> {event.startTime}</p>
                <p><span className="font-semibold">End Time:</span> {event.endTime}</p>
                <p><span className="font-semibold">Coordinator:</span> {event.coordinator}</p>
                <p><span className="font-semibold">Phone:</span> <span className="text-blue-600">{event.phone}</span></p>
                <p><span className="font-semibold">Registration Number:</span> {event.regNumber}</p>
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
            <h4 className="text-xl font-semibold mb-2">Winners</h4>

            {/* Hindi 6 to 8 Winners */}
            {event?.h6to8firstPlace && (
              <div className="winner-category mb-4">
                <h5 className="text-lg font-semibold">Hindi 6 to 8</h5>
                <p><span className="font-semibold">1st Place:</span> {event.h6to8firstPlace}</p>
                {event.h6to8secondPlace && <p><span className="font-semibold">2nd Place:</span> {event.h6to8secondPlace}</p>}
                {event.h6to8thirdPlace && <p><span className="font-semibold">3rd Place:</span> {event.h6to8thirdPlace}</p>}
                {event.h6to8fourthPlace && <p><span className="font-semibold">4th Place:</span> {event.h6to8fourthPlace}</p>}
              </div>
            )}

            {/* Hindi 9 to 12 Winners */}
            {event?.h9to12firstPlace && (
              <div className="winner-category mb-4">
                <h5 className="text-lg font-semibold">Hindi 9 to 12</h5>
                <p><span className="font-semibold">1st Place:</span> {event.h9to12firstPlace}</p>
                {event.h9to12secondPlace && <p><span className="font-semibold">2nd Place:</span> {event.h9to12secondPlace}</p>}
                {event.h9to12thirdPlace && <p><span className="font-semibold">3rd Place:</span> {event.h9to12thirdPlace}</p>}
                {event.h9to12fourthPlace && <p><span className="font-semibold">4th Place:</span> {event.h9to12fourthPlace}</p>}
              </div>
            )}

            {/* English 6 to 8 Winners */}
            {event?.e6to8firstPlace && (
              <div className="winner-category mb-4">
                <h5 className="text-lg font-semibold">English 6 to 8</h5>
                <p><span className="font-semibold">1st Place:</span> {event.e6to8firstPlace}</p>
                {event.e6to8secondPlace && <p><span className="font-semibold">2nd Place:</span> {event.e6to8secondPlace}</p>}
                {event.e6to8thirdPlace && <p><span className="font-semibold">3rd Place:</span> {event.e6to8thirdPlace}</p>}
                {event.e6to8fourthPlace && <p><span className="font-semibold">4th Place:</span> {event.e6to8fourthPlace}</p>}
              </div>
            )}

            {/* English 9 to 12 Winners */}
            {event?.e9to12firstPlace && (
              <div className="winner-category mb-4">
                <h5 className="text-lg font-semibold">English 9 to 12</h5>
                <p><span className="font-semibold">1st Place:</span> {event.e9to12firstPlace}</p>
                {event.e9to12secondPlace && <p><span className="font-semibold">2nd Place:</span> {event.e9to12secondPlace}</p>}
                {event.e9to12thirdPlace && <p><span className="font-semibold">3rd Place:</span> {event.e9to12thirdPlace}</p>}
                {event.e9to12fourthPlace && <p><span className="font-semibold">4th Place:</span> {event.e9to12fourthPlace}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Student;

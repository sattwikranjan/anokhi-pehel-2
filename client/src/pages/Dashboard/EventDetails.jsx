import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../../components/Dashboard/Button";
import { BASE_URL, SERVER_URL } from "../../../src/Service/helper";

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
        // Pass userId as a parameter to the navigate function
        await navigate(`/editEvent?eventId=${eventId}`);
      } else {
        console.log("Event is not available");
      }
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };
  const onClick1 = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteEvent/${eventId}`);
      if (response.status === 200) {
        // User deleted successfully
        console.log("Event deleted successfully");
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
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
          console.error("Error fetching student: ", err);
        });
    }
  }, [eventId]);

  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold">Event Details</h2>

        <div className="mentor-profile bg-gray-100 p-4 rounded-lg flex flex-col lg:flex-row gap-4">
          {event ? (
            <div className="event-card flex items-start p-4 border-b border-gray-300">
            <div className="event-card flex items-start justify-between p-4 border-b border-gray-300">
  {/* Left section: General event details */}
  <div className="event-details w-2/3">
    <h3 className="text-2xl font-bold">{event.eventName}</h3>
    <p><span className="font-semibold">Department:</span> {event.eventDepartment}</p>
    <p><span className="font-semibold">Location:</span> {event.location}</p>
    <p><span className="font-semibold">Start Time:</span> {event.startTime}</p>
    <p><span className="font-semibold">End Time:</span> {event.endTime}</p>
    <p><span className="font-semibold">Coordinator:</span> {event.coordinator}</p>
    <p><span className="font-semibold">Phone:</span> <span className="text-blue-600">{event.phone}</span></p>
    <p><span className="font-semibold">Registration Number:</span> {event.regNumber}</p>

  
  </div>

  {/* Right section: Winner details */}
  <div className="winner-details w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
    <h4 className="text-xl font-semibold mb-2">Winners</h4>
    
      <p><span className="font-semibold">1st Place:</span> {event.firstPlace}</p>
   

      <p><span className="font-semibold">2nd Place:</span> {event.secondPlace}</p>
    
   
      <p><span className="font-semibold">3rd Place:</span> {event.thirdPlace}</p>
   
   
      <p><span className="font-semibold">4th Place:</span> {event.fourtPlace}</p>
    
  </div>
</div>

          </div>
          
          ) : (
            <p>No Event data available.</p>
          )}

<div className=" justify-center items-center">
            {(user?.isAdmin === true || user.regnumber === regNumberCoordinator) && (
              <Button
                color="white"
                bgColor={currentColor}
                text="Edit Event"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={onClick}
              />
            )}
          </div>
          <div className=" justify-center items-center">
            {user?.isAdmin === true && (
              <Button
                color="white"
                bgColor={currentColor1}
                text="Delete Event"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={onClick1}
              />
            )}
          </div>
          
        </div>
        
      </div>
    </DashboardLayout>
  );
};

export default Student;

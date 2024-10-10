import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { times, event } from "../../constants/Dashboard";
import { BASE_URL } from "../../../src/Service/helper";

const EditEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { user } = useSelector((state) => state.user);
  const eventId = searchParams.get("eventId"); // Adjust the query parameter key if needed

  const [credentials, setCredentials] = useState({
    eventName: "",
    // eventDepartment: "",
    eventGroup:"",
    location: "",
    startTime: "",
    endTime: "",
    coordinator: "",
    phone: "",
    regNumber: "",
    festName: "Antyodaya",
    firstPlace: "",
    secondPlace: "",
    thirdPlace: "",
    fourthPlace: "",
    eventId: eventId,
  });

  // Fetch event data using eventId when component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getEventByEventId?eventId=${eventId}`
        );
        const eventData = response.data;
        console.log(response.data);
        setCredentials({
          eventName: eventData.eventName,
          eventGroup: eventData.eventGroup,
          location: eventData.location,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          coordinator: eventData.coordinator,
          phone: eventData.phone,
          regNumber: eventData.regNumber,
          festName: eventData.festName,
          firstPlace: eventData.firstPlace,
          secondPlace: eventData.secondPlace,
          thirdPlace: eventData.thirdPlace,
          fourthPlace: eventData.fourthPlace,
          eventId: eventData._id,
        });
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Could not fetch event details. Please try again later.");
      }
    };

    if (eventId) fetchEventData();
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/editEvent`, credentials)
      .then((response) => {
        if (response.status === 201) {
          alert("Event updated successfully");
          navigate("/Antyodaya-Dashboard");
        }
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        alert("Failed to update event. Please try again.");
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-8">
            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                Edit Event
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Group of Event
                  </label>
                  <div className="mt-2">
                    <select
                      name="eventGroup"
                      id="eventGroup"
                      value={credentials.eventGroup}
                      onChange={onChange}
                    //   placeholder="Event Group"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Event Group</option>
                        <option value="Group1">Group1</option>
                        <option value="Group2">Group2</option>
                        <option value="Group3">Group3</option>
                        <option value="Group4">Group4</option>
                        <option value="Group5">Group5</option>
                    
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="eventName"
                      placeholder="Event Name"
                      value={credentials.eventName}
                      onChange={onChange}
                    />
                  </div>
                </div>

                

                <div className="sm:col-span-2">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location of Event
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="location"
                      placeholder="Location of Event"
                      value={credentials.location}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event Start Time
                  </label>
                  <div className="mt-2">
                    <select
                      name="startTime"
                      id="startTime"
                      value={credentials.startTime}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Event Start Time</option>
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event End Time
                  </label>
                  <div className="mt-2">
                    <select
                      name="endTime"
                      id="endTime"
                      value={credentials.endTime}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Event End Time</option>
                      {times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Coordinator of Event
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="coordinator"
                      placeholder="Coordinator of Event"
                      value={credentials.coordinator}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contact of Coordinator
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="phone"
                      placeholder="phone"
                      value={credentials.phone}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="topic"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Coordinator's Registration Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="regNumber"
                      placeholder="Registration Number"
                      value={credentials.regNumber}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
  <h3 className="text-lg font-semibold leading-6 text-gray-900">
    Winners
  </h3>
  <p className="mt-2 text-sm text-gray-600">
    Add all the details like - Name, School, Class of the student
  </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="firstPlace"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Place
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="firstPlace"
                      placeholder="First Place"
                      value={credentials.firstPlace}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="secondPlace"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Second Place
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="secondPlace"
                      placeholder="Second Place"
                      value={credentials.secondPlace}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="thirdPlace"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Third Place
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="thirdPlace"
                      placeholder="Third Place"
                      value={credentials.thirdPlace}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="fourthPlace"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Fourth Place
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      name="fourthPlace"
                      placeholder="Fourth Place"
                      value={credentials.fourthPlace}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditEvent;

import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { classes, locations, modes } from "../../constants/Dashboard";
import { BASE_URL } from "../../../src/Service/helper";
import "react-datepicker/dist/react-datepicker.css";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const AddAntyodayaParticipant = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    name: "",
    class: "",
    phone: "",
    school: "",
    aadhar: "",
    address: "",
    photo: "",
    poc: "",
    events: [],
  });
  const [pocList, setPocList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // Fetch POC and Event data on component mount
    const fetchPocAndEventData = async () => {
      //   dispatch(showLoading());
      try {
        // const response = await axios.get(`${BASE_URL}/getEvents`);
        const pocResponse = await axios.get(`${BASE_URL}/pocList`);
        const eventResponse = await axios.get(`${BASE_URL}/getEvents`);
        // console.log(eventResponse);
        setPocList(pocResponse.data);
        setEventList(eventResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(hideLoading());
      }
    };

    fetchPocAndEventData();
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("class", credentials.class);
    formData.append("phone", credentials.phone);
    formData.append("school", credentials.school);
    formData.append("aadhar", credentials.aadhar);
    formData.append("address", credentials.address);
    formData.append("photo", credentials.photo);
    formData.append("poc", credentials.poc);
    formData.append("events", credentials.events.join(","));

    axios
      .post(`${BASE_URL}/addParticipants`, formData)
      .then((res) => {
        if (res.data === "Participant Added") {
          alert("Participant submitted successfully!");
          setCredentials({
            name: "",
            class: "",
            phone: "",
            school: "",
            aadhar: "",
            address: "",
            photo: "",
            poc: "",
            events: [],
          });
        } else if (
          res.data === "Participant with this Aadhar number already exists"
        ) {
          alert("Participant with this Aadhar number already exists");
        } else {
          alert("Participant Not Added!");
        }
      })
      .catch((err) => {
        alert("ALL INPUT IS NOT FILLED");
        console.error("error", err);
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onPhotoChange = (e) => {
    setCredentials({ ...credentials, photo: e.target.files[0] });
  };

  const handleEventChange = (event) => {
    const value = event.target.value;
    setCredentials((prev) => {
      const events = [...prev.events];
      if (events.includes(value)) {
        // Remove event if already selected
        return { ...prev, events: events.filter((e) => e !== value) };
      } else if (events.length < 3) {
        // Add event if not selected and under limit
        return { ...prev, events: [...events, value] };
      }
      return prev; // Do not update if limit exceeded
    });
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-8">
            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                Add Participants Details
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={credentials.name}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Class
                  </label>
                  <div className="mt-2">
                    <select
                      name="class"
                      id="class"
                      value={credentials.class}
                      onChange={onChange}
                      placeholder="Class"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a class</option>
                      {classes.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="school"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    School
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="school"
                      id="school"
                      value={credentials.school}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={credentials.phone}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="aadhar"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Aadhar Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="aadhar"
                      name="aadhar"
                      type="aadhar"
                      value={credentials.aadhar}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Complete Address
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="address"
                      name="address"
                      value={credentials.address}
                      onChange={onChange}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Mention all possible details.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept=".png, .jpg, .jpeg,capture=camera"
                    // Specify 'camera' to use the device's camera
                    onChange={onPhotoChange}
                  />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="poc"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Point of Contact
                  </label>
                  <select
                    name="poc"
                    id="poc"
                    value={credentials.poc}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Select POC</option>
                    {pocList
                      .sort((a, b) => a.nameOfPoc.localeCompare(b.nameOfPoc)) // Sort alphabetically by nameOfPoc
                      .map((poc) => (
                        <option key={poc._id} value={poc._id}>
                          {poc.nameOfPoc} - {poc.school}
                        </option>
                      ))}
                  </select>
                </div>




                <div className="sm:col-span-4">
  <label
    htmlFor="events"
    className="block text-sm font-medium leading-6 text-gray-900"
  >
    
  
                      Select up to 3 events, but only one event per group.
                    
  </label>

  <div className="mt-2 flex flex-col gap-2">
    {Object.entries(
      eventList.reduce((acc, event) => {
        // Group events by eventGroup
        if (!acc[event.eventGroup]) {
          acc[event.eventGroup] = [];
        }
        acc[event.eventGroup].push(event);
        return acc;
      }, {})
    ).map(([group, events]) => (
      <div key={group} className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Event-{group}</h3>
        <div className="flex flex-col gap-2 mt-2">
          {events.sort((a, b) => a.eventName.localeCompare(b.eventName)).map((event) => {
            const isEventInSameGroup = credentials.events.some(
              (selectedEventId) => {
                const selectedEvent = eventList.find(
                  (e) => e._id === selectedEventId
                );
                return selectedEvent && selectedEvent.eventGroup === event.eventGroup;
              }
            );

            return (
              <div key={event._id} className="flex items-center">
                <input
                  type="checkbox"
                  value={event._id}
                  onChange={handleEventChange}
                  checked={credentials.events.includes(event._id)}
                  className="mr-2"
                  disabled={
                    (credentials.events.length >= 3 &&
                      !credentials.events.includes(event._id)) ||
                    isEventInSameGroup // Disable if an event from the same group is already selected
                  }
                />
                <label className="text-sm text-gray-900">{event.eventName}</label>
              </div>
            );
          })}
        </div>
      </div>
    ))}
    <p className="text-sm text-gray-600">Select up to 3 events, but only one event per group.</p>
  </div>
</div>





                {/* Existing fields continue here... */}
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

export default AddAntyodayaParticipant;

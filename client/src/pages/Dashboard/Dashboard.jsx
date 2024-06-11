import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import Button from "../../components/Dashboard/Button";
import { BASE_URL } from "../../../src/Service/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AttendanceDiv from "../../components/Dashboard/AttendanceDiv";
import Attendance from "../../components/Dashboard/Attendance";
const Dashboard = () => {
  const currentColor = "#03C9D7";
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [mentor, setMentor] = useState(null);
  const takeAttendance = () => {
    navigate("/takeAttendance");
  };
  const totalAttendance = () => {
    navigate("/totalAttendance");
  };
  const addTopic = () => {
    navigate("/addTopic");
  };
  const findTopic = () => {
    navigate("/findTopic");
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {user ? (
          <p className="font-bold"> Welcome Back! {user.name}</p>
        ) : (
          <p>No mentor data available.</p>
        )}
      </div>

      <div className="columns-3xs ...  flex flex-col sm:flex-row gap-16 p-10 ">
        <div className="flex-1 sm:w-1/2 lg:w-1/4 bg-blue-200 rounded-lg p-4 mt-4 sm:mt-0">
          <div className="flex justify-center">
            <div className="rounded-lg p-4">
              <Button
                color="white"
                bgColor={currentColor}
                text="Take Attendance"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={takeAttendance}
              />
            </div>
            <div className="rounded-lg p-4">
              <Button
                color="white"
                bgColor={currentColor}
                text=" Check Attendance"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={totalAttendance}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 sm:w-1/2 lg:w-1/4 bg-blue-200 rounded-lg p-4 mt-4 sm:mt-0">
          <div className="flex justify-center">
            <div className="rounded-lg p-4">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add  Today's Topic"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={addTopic}
              />
            </div>
            <div className="rounded-lg p-4">
              <Button
                color="white"
                bgColor={currentColor}
                text="View Topic Covered"
                borderRadius="8px"
                width="5px"
                height="10px"
                custumFunc={findTopic}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <Attendance />
        <AttendanceDiv classId="Nursery" />
        <AttendanceDiv classId="1" />
        <AttendanceDiv classId="2" />
        <AttendanceDiv classId="3" />
        <AttendanceDiv classId="4" />
        <AttendanceDiv classId="5" />
        <AttendanceDiv classId="Navodaya" />
        <AttendanceDiv classId="6" />
        <AttendanceDiv classId="7" />
        <AttendanceDiv classId="8" />
        <AttendanceDiv classId="9" />
        <AttendanceDiv classId="10" />
        <AttendanceDiv classId="11" />
        <AttendanceDiv classId="12" />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

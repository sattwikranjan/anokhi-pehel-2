import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { classes, subjects } from "../../constants/Dashboard";
import { BASE_URL } from "../../../src/Service/helper";

const Notice = () => {
 

  return (
    <DashboardLayout>
      <h1>Notice</h1>
    </DashboardLayout>
  );
};

export default Notice;

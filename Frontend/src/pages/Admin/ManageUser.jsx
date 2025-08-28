import React, { memo, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import toast from "react-hot-toast";
import UserCard from "../../components/Cards/UserCard.jsx";

const ManageUser = memo(() => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllusers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL);
      setAllUsers(response.data);
      console.log(response.data);

    } catch (error) {}
  };

  useEffect(() => {
    getAllusers();
  }, []);

  const downloadUserReport = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.REPORTS.GET_USER_REPORT,
        {
          responseType: "blob",
        }
      );
      // Handle the response for downloading the user report
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user_report.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading user report:", error);
      toast.error("Failed to download user report. Please try again.");
    }
  };

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="p-6  relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
          <button
            className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => downloadUserReport()}
          >
            Download User Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {allUsers.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
});


export default ManageUser;

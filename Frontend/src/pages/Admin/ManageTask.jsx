import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import { API_PATHS } from "../../utils/apiPath.js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import TaskCard from "../../components/layouts/TaskCard.jsx";
import TaskStatusTabs from "../../components/TaskStatusTabs.jsx";
import { LuPanelTopDashed } from "react-icons/lu";
import toast from "react-hot-toast";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      const statusSummary = response.data?.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary?.all || 0 },
        { label: "Pending", count: statusSummary?.pending || 0 },
        { label: "In Progress", count: statusSummary?.inProgress || 0 },
        { label: "Completed", count: statusSummary?.completed || 0 },
      ];
      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };

  const downloadTask = async (taskId) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.REPORTS.GET_TASK_REPORT,
        {
          responseType: "blob", // Important
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "task_report.xlsx"); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading task:", error);
      toast.error("Failed to download task report. Please try again.");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu={"Manage Tasks"}>
      {/* ✅ Main Card Container like CreateTask */}
      <div className="bg-white p-6 rounded-md shadow-md relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold mb-4">Manage Tasks</h2>
          <button
            className="rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 cursor-pointer"
            onClick={() => downloadTask()}
          >
            Download Task Report
          </button>
        </div>

        {/* ✅ Status Tabs */}
        <TaskStatusTabs
          tabs={tabs}
          activeTab={filterStatus}
          setActiveTab={setFilterStatus}
        />

        {/* ✅ Task List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
          {allTasks.length > 0 ? (
            allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((u) => u.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist}
                onClick={() => handleClick(item)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm mt-4">No tasks found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;

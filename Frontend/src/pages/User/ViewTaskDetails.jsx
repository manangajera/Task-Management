import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { GoArrowUpRight } from "react-icons/go";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "InProgress":
      case "In Progress":
        return "bg-cyan-100 text-cyan-700";
      case "Completed":
        return "bg-lime-100 text-lime-700";
      default:
        return "bg-purple-100 text-purple-700";
    }
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      setTask(response.data.task);
      console.log("Task details fetched successfully", response.data.task);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
  };

  // ✅ handle todo check/uncheck
  const updateTodoChecklist = async (index) => {
    if (!task) return;

    const updatedTodos = [...task.todoChecklist];
    console.log("Updated Todos:", updatedTodos);

    if (updatedTodos && updatedTodos[index]) {
      updatedTodos[index].completed = !updatedTodos[index].completed;
    }

    try {
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id),
        {
          todoChecklist: updatedTodos, // ✅ FIXED key name
        }
      );
      if (response.status === 200) {
        setTask(response.data?.task || task);
      } else {
        updatedTodos[index].completed = !updatedTodos[index].completed;
      }
    } catch (error) {
      console.error("Error updating todo checklist:", error);
    }
  };

  useEffect(() => {
    getTaskDetailsById();
  }, [id]);

  if (!task) {
    return (
      <DashboardLayout activeMenu="My task">
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  const formatLink = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <DashboardLayout activeMenu="My task">
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* Title + Status */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600">{task.description}</p>
        </div>

        {/* Priority / Due Date / Assigned To */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-gray-500 text-sm font-medium">Priority</h4>
            <p className="font-semibold">{task.priority}</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-sm font-medium">Due Date</h4>
            <p className="font-semibold">
              {new Date(task.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <h4 className="text-gray-500 text-sm font-medium">Assigned To</h4>
            <div className="flex -space-x-2">
              {task.assignedTo.map((user) => (
                <img
                  key={user._id}
                  src={user.profileImage}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Todo Checklist */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Todo Checklist</h3>
          <ul className="space-y-3">
            {task.todoChecklist.map((todo, index) => (
              <li key={todo._id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodoChecklist(index)}
                  className="h-4 w-4 accent-indigo-600 cursor-pointer"
                />
                <span
                  className={`text-gray-700 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Attachments */}
        {task.attachments?.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Attachments</h3>
            <div className="space-y-2">
              {task.attachments.map((link, index) => (
                <a
                  key={index}
                  href={formatLink(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-md cursor-pointer"
                >
                  <span className="font-medium text-blue-500 hover:underline">
                    {String(index + 1).padStart(2, "0")} {link}
                  </span>
                  <GoArrowUpRight className="text-gray-500" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

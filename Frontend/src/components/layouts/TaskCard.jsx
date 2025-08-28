import React from "react";
import { HiPaperClip } from "react-icons/hi2";
import moment from "moment";

const statusColors = {
  Pending: "bg-purple-100 text-purple-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Completed: "bg-green-100 text-green-600",
};

const priorityColors = {
  Low: "bg-green-100 text-green-600",
  Medium: "bg-yellow-100 text-yellow-600",
  High: "bg-red-100 text-red-600",
};

const TaskCard = ({
  title,
  description,
  priority,
  status,
  createdAt,
  dueDate,
  completedTodoCount,
  todoChecklist,
  assignedTo,
  attachmentCount,
  onClick,
}) => {
  const totalTodos = todoChecklist?.length || 0;
  const progressPercent =
    totalTodos > 0 ? Math.round((completedTodoCount / totalTodos) * 100) : 0;

  return (
    <div
      onClick={onClick}
      className="p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
    >
      {/* Top tags */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {status && (
          <span
            className={`px-2 py-1 text-xs rounded-md font-medium ${
              statusColors[status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </span>
        )}
        {priority && (
          <span
            className={`px-2 py-1 text-xs rounded-md font-medium ${
              priorityColors[priority] || "bg-gray-100 text-gray-600"
            }`}
          >
            {priority} Priority
          </span>
        )}
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

      {/* Progress */}
      <div className="mt-4">
        <p className="text-sm font-medium">
          Task Done: {completedTodoCount}/{todoChecklist?.length || 0}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
          <div
            className="bg-blue-500 h-2"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <div>
          <p>Start</p>
          <p className="font-medium">{moment(createdAt).format("Do MMM")}</p>
        </div>
        <div>
          <p>Due</p>
          <p className="font-medium">{moment(dueDate).format("Do MMM")}</p>
        </div>
      </div>

      {/* Assigned users & Attachments */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex -space-x-2">
          {assignedTo?.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="user"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
        </div>

        {attachmentCount > 0 && (
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm">
            <HiPaperClip size={14} />
            <span>{attachmentCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

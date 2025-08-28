import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { PRIORITY_DATA } from "../../utils/data.js";
import toast from "react-hot-toast";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import SelectUsers from "../../components/Inputs/SelectUsers.jsx";
import TodoListInput from "../../components/Inputs/TodoListInput.jsx";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput.jsx";
import Modal from "../../components/Modal.jsx";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      // if backend wraps in { task: {...} }
      const task = response.data.task || response.data;

      setTaskData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Low",
        dueDate: task.dueDate
          ? moment(task.dueDate).format("YYYY-MM-DD")
          : null,
        assignedTo: task.assignedTo?.map((user) => user._id) || [], // FIXED
        todoChecklist: task.todoChecklist?.map((item) => item.text) || [],
        attachments: task.attachments || [],
      });
    } catch (err) {
      toast.error("Failed to fetch task details.");
      console.error("Error fetching task details:", err);
    }
  };

  // ⬇️ Run only when taskId exists
  useEffect(() => {
    if (taskId) {
      getTaskDetailsById();
    }
    return () => {};
  }, [taskId]);

  const createTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });
      clearData();
      toast.success("Task created successfully.");
    } catch (error) {
      toast.error("Failed to create task.");
      console.error("Error creating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const updateTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist;
        const matchedTask = prevTodoChecklist?.find(
          (task) => task.text === item
        );
        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: todolist,
        }
      );
      clearData();
      toast.success("Task updated successfully.");
      navigate("/admin/task");
    } catch (error) {
      toast.error("Failed to update task.");
      console.error("Error updating task:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskData.title) {
      setError("Title is required.");
      return;
    }
    if (!taskData.description) {
      setError("Description is required.");
      return;
    }
    if (taskData.assignedTo.length === 0) {
      setError("At least one user must be assigned.");
      return;
    }
    if (!taskData.priority) {
      setError("Priority is required.");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }
    if (taskData.todoChecklist.length === 0) {
      setError("At least one todo item is required.");
      return;
    }

    setError(null);
    // Proceed with form submission or API call
    if (taskId) {
      updateTask();
    } else {
      createTask();
    }
  };
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      clearData();
      navigate("/admin/task");
      toast.success("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    } finally {
      setOpenDeleteAlert(false);
    }
  };
  // const getTaskDetailsById = () => {};

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="bg-white p-6 rounded-md shadow-md relative">
        <h2 className="text-2xl font-semibold mb-4">
          {taskId ? "Update Task" : "Create Task"}
        </h2>
        {taskId && (
          <button
            className="text-red-500 hover:text-red-700 right-10 absolute top-7"
            onClick={() => setOpenDeleteAlert(true)}
          >
            <LuTrash2 className="inline-block mr-1" />
            Delete
          </button>
        )}

        <div className="">
          <label className="">Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            onChange={(e) => handleValueChange("title", e.target.value)}
            value={taskData.title}
            className="border border-gray-300 p-2 rounded-md w-full mb-4"
          />

          <label className="">Description</label>
          <input
            type="text"
            placeholder="Enter task description"
            onChange={(e) => handleValueChange("description", e.target.value)}
            value={taskData.description}
            className="form-input"
          />
        </div>

        <div className="grid grid-cols-12 gap-4 mt-2">
          <div className="col-span-6 md:col-span-4">
            <label className="font-medium text-sm">Priority</label>
            <select
              value={taskData.priority}
              onChange={(e) => handleValueChange("priority", e.target.value)}
              className="form-input"
            >
              {PRIORITY_DATA.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-6 md:col-span-4">
            <label className="text-xs font-medium text-slate-600">
              Due Date
            </label>
            <input
              type="date"
              className="form-input"
              value={taskData.dueDate || ""}
              onChange={({ target }) =>
                handleValueChange("dueDate", target.value)
              }
            />
          </div>

          <div className="col-span-6 md:col-span-4">
            <label className="text-xs font-medium text-slate-600">
              Assign To
            </label>
            <SelectUsers
              selectedUsers={taskData.assignedTo}
              setSelectedUsers={(value) => {
                handleValueChange("assignedTo", value);
              }}
            />
          </div>
        </div>
        <TodoListInput
          todoList={taskData?.todoChecklist}
          setTodoList={(value) => handleValueChange("todoChecklist", value)}
        />

        <AddAttachmentsInput
          attachments={taskData?.attachments}
          setAttachments={(value) => handleValueChange("attachments", value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : taskId ? "Update Task" : "Create Task"}
          </button>
        </div>
        {openDeleteAlert && (
          <Modal
            isOpen={openDeleteAlert}
            onClose={() => setOpenDeleteAlert(false)}
            title="Delete Task"
          >
            <p>Are you sure you want to delete this task?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;

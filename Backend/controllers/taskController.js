import Task from "../models/Task.model.js";

// Get dashboard data
export const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const overDueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    const Taskstatus = ["Pending", "InProgress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = Taskstatus.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks;

    // ensure all level includes
    const taskPriorities = ["Low", "Medium", "High"];
    const taskPrioritiesRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskPriorityDistribution = taskPriorities.reduce((acc, priority) => {
      const formattedKey = priority.replace(/\s+/g, "");
      acc[formattedKey] =
        taskPrioritiesRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});
    taskPriorityDistribution["All"] = totalTasks;

    const recentTask = await Task.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overDueTasks,
      },
      charts: {
        taskDistributionRaw,
        taskPriorityDistribution,
      },
      recentTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user dashboard data
export const getUserDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user is set by authentication middleware
    const totalTasks = await Task.countDocuments({ assignedTo: userId });
    const pendingTasks = await Task.countDocuments({
      status: "Pending",
      assignedTo: userId,
    });
    const completedTasks = await Task.countDocuments({
      status: "Completed",
      assignedTo: userId,
    });
    const overDueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
      assignedTo: userId,
    });

    const Taskstatus = ["Pending", "InProgress", "Completed"];
    const taskDistributionRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskDistribution = Taskstatus.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistribution["All"] = totalTasks;

    // ensure all level includes
    const taskPriorities = ["Low", "Medium", "High"];
    const taskPrioritiesRaw = await Task.aggregate([
      { $match: { assignedTo: userId } },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const taskPriorityDistribution = taskPriorities.reduce((acc, priority) => {
      const formattedKey = priority.replace(/\s+/g, "");
      acc[formattedKey] =
        taskPrioritiesRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});
    taskPriorityDistribution["All"] = totalTasks;

    const recentTask = await Task.find({ assignedTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overDueTasks,
      },
      charts: {
        taskDistributionRaw,
        taskPriorityDistribution,
      },
      recentTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email  profileImage"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImage"
      );
    }

    // Calculate completed todo count for each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;
        return {
          ...task._doc,
          completedTodoCount: completedCount,
        };
      })
    );

    // status summary count
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "InProgress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        all: allTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
        completed: completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImage"
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res.status(400).json({ message: "AssignedTo must be an array" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id, // Assuming req.user is set by authentication middleware
      attachments,
      todoChecklist,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.attachments = attachments || task.attachments;
    task.todoChecklist = todoChecklist || task.todoChecklist;
    if (req.body.assignedTo) {
      if (!Array.isArray(assignedTo)) {
        return res.status(400).json({ message: "AssignedTo must be an array" });
      }
      task.assignedTo = assignedTo;
    }

    await task.save();
    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssigned = task.assignedTo.some(
      (id) => id.toString() === req.user._id.toString()
    );
    // alternative of above
    // const isAssigned = task.assignedTo.includes(req.user._id.toString());

    if (!isAssigned && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }
    task.status = req.body.status || task.status;

    if (req.body.status === "Completed") {
      task.todoChecklist.forEach((item) => {
        item.completed = true; // Mark all checklist items as completed
      });
      task.progress = 100;
    }

    await task.save();
    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update task checklist
export const updateTaskChecklist = async (req, res) => {
  try {
    const { todoChecklist } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!task.assignedTo.includes(req.user._id) || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }

    task.todoChecklist = todoChecklist;

    // auto-update progress based on the todoCheck list
    const completedCount = todoChecklist.filter(
      (item) => item.completed
    ).length;
    const totalCount = task.todoChecklist.length;
    task.progress =
      totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // auto marked if all items are if completed
    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "InProgress";
    } else {
      task.status = "Pending";
    }

    await task.save();
    const updatedTask = await Task.findById(req.params.id);
    res.status(200).json({
      message: "Task checklist updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

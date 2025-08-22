import User from "../models/User.model.js";
import Task from "../models/Task.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");
    console.log(users);
    const userWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTasksCount = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasksCount = await Task.countDocuments({
          assignedTo: user._id,
          status: "InProgress",
        });
        const completedTasksCount = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc,
          pending: pendingTasksCount,
          inProgress: inProgressTasksCount,
          completed: completedTasksCount,
        };
      })
    );
    res.status(200).json(userWithTaskCount);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

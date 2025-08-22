import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, adminInviteToken } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    let role = "member";
    if (adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
      role = "admin";
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file ? req.file.path : null; // ✅ get from multer

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
    });

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      profileImage: newUser.profileImage,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

import fs from "fs";
import path from "path";

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password, removeImage } = req.body;

    if (req.file && !req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Please upload a valid image file" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      user.password = await bcrypt.hash(password, 10); // remove if using pre-save hook
    }

    // If user wants to remove profile image
    if (removeImage === "true" || removeImage === true) {
      if (user.profileImage && user.profileImage.includes("/uploads/")) {
        const oldImagePath = path.join(
          process.cwd(),
          user.profileImage.replace(`${req.protocol}://${req.get("host")}/`, "")
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      user.profileImage = null;
    }

    // If user uploaded a new image
    if (req.file) {
      // Delete old image if exists
      if (user.profileImage && user.profileImage.includes("/uploads/")) {
        const oldImagePath = path.join(
          process.cwd(),
          user.profileImage.replace(`${req.protocol}://${req.get("host")}/`, "")
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      user.profileImage = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

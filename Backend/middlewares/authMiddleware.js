import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token yya" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

// middlware for admin only access
const adminOnly = (req, res, next) => {
 if(req.user && req.user.role === "admin"){
    next()
 }else{
    res.status(401).json({ message: "Access Denied, Admin only"});
 }
};


export {protect,adminOnly};
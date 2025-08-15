import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: null },
  role: { type: String, enum: ["admin", "member"], default: "member" },
});


const User = mongoose.model("User",userSchema)
export default User;
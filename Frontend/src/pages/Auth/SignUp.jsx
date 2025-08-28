import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/input";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { userContext } from "../../context/userContext";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("adminInviteToken", adminInviteToken);

      if (profileImage) {
        formData.append("image", profileImage); // must match multer field name
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("accessToken", token);
        updateUser(response.data);
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full md:w-[100%]">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Create an Account
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex justify-center">
            <ProfilePhotoSelector
              image={profileImage}
              setImage={setProfileImage}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap:2 lg:gap-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="jhone doe"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <Input
              type="email"
              label="Email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Min 8 characters"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Input
              type="text"
              label="Admin Invite Token"
              placeholder="Admin Invite Token"
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                        py-2.5 rounded-lg shadow-sm transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center mb-5  md:mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

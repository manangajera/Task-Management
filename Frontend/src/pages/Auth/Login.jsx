import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { userContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(userContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError(null);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("accessToken", token);
        updateUser(response.data);
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
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
      <div className="w-full md:w-[90%] mt-20 md:mt-25">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h3>
        <p className="text-slate-600 text-sm mb-6">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />
          <Input
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                       py-2.5 rounded-lg shadow-sm transition duration-200"
          >
            Login
          </button>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;

import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/input";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    // form logic
  };

  return (
    <AuthLayout>
      <div className="w-full md:w-[80%]">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Create an Account</h3>
        <p className="text-slate-600 text-sm mb-6">Join us today by entering your details below.</p>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="flex justify-center">
            <ProfilePhotoSelector image={profileImage} setImage={setProfileImage} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

        <p className="mt-4 text-sm text-center">
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

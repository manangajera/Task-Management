import React from "react";
import Auth from "../../assets/Auth_Image/Auth.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Left side (form area) */}
      <div className="flex flex-col w-full md:w-[60vw] px-6 md:px-20 py-8">
        {/* Fixed heading (doesn't scroll) */}
        <h2 className="text-2xl font-bold mb-6">Task Management</h2>

        {/* Scrollable form */}
        <div className="flex-1  pr-2">{children}</div>
      </div>

      {/* Right side (illustration stays fixed) */}
      <div
        className="hidden md:flex w-[40vw] h-screen items-center justify-center 
        bg-[url('/Auth_back.png')] bg-cover bg-no-repeat bg-center"
      >
        <img src={Auth} alt="Auth" className="m-10 md:h-180" />
      </div>
    </div>
  );
};

export default AuthLayout;

import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ type, placeholder, value, onChange, label }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="">
      {label && <label className="block mb-2 text-slate-800">{label}</label>}
      <div className="input-box">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none "
      />
      {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="color-primary cursor-pointer"
                onClick={() => togglePasswordVisibility()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="color-primary cursor-pointer"
                onClick={() => togglePasswordVisibility()}
              />
            )}
          </>
        )
      }
      </div>
    </div>
  );
};

export default Input;

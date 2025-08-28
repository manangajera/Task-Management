import React from "react";
import { useContext, useState, useEffect, createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("accessToken", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <userContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

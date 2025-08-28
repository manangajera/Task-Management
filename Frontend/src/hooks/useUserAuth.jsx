import {  useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) return;
    if (!user) {
      clearUser();
      navigate("/login");
    }
  }, [user, loading, clearUser, navigate]);
};

export default useUserAuth;

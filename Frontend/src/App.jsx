import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import SingnUp from "./pages/Auth/SignUp.jsx";

import PrivetRoute from "./routes/PrivateRoute.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import ManageTask from "./pages/Admin/ManageTask.jsx";
import CreateTask from "./pages/Admin/CreateTask.jsx";
import ManageUser from "./pages/Admin/ManageUser.jsx";

import UserDashboard from "./pages/User/UserDashboard.jsx";
import MyTask from "./pages/User/MyTask.jsx";
import ViewTaskDetails from "./pages/User/ViewTaskDetails.jsx";

import UserProvider, { userContext } from "./context/userContext.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingnUp />} />

          {/* Admin Routes */}
          <Route element={<PrivetRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/task" element={<ManageTask />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUser />} />
          </Route>

          {/*User Routes */}
          <Route element={<PrivetRoute allowedRoles={["member"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/task" element={<MyTask />} />
            <Route
              path="/user/task-details/:id"
              element={<ViewTaskDetails />}
            />
          </Route>

          <Route path="/" element={<Root />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "custom-toast",
          style: {
            backgroundColor: "#333",
            color: "#fff",
          },
          fontSize: "13px",
        }}
      />
    </UserProvider>
  );
};

export default App;

export const Root = () => {
  const { user, loading } = useContext(userContext);

  if (loading) return <Outlet />;
  if (!user) return <Navigate to="/login" />;
  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};

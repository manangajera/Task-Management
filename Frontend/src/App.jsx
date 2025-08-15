import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import SingnUp from "./pages/Auth/SignUp.jsx"; 

import PrivetRoute from "./routes/PrivateRoute.jsx"
import Dashboard from "./pages/Admin/Dashboard.jsx";
import ManageTask from "./pages/Admin/ManageTask.jsx";
import CreateTask from "./pages/Admin/CreateTask.jsx";
import ManageUser from "./pages/Admin/ManageUser.jsx";

import UserDashboard from "./pages/User/UserDashboard.jsx";
import MyTask from "./pages/User/MyTask.jsx";
import ViewTaskDetails from "./pages/User/ViewTaskDetails.jsx"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingnUp />} />

          {/* Admin Routes */}
          <Route element={<PrivetRoute allowedRoles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/task" element={<ManageTask />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUser />} />
          </Route>

          {/*User Routes */}
          <Route element={<PrivetRoute allowedRoles={["User"]} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/task" element={<MyTask />} />
            <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />

          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

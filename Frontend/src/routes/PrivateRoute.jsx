import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { userContext } from '../context/userContext';

const PrivateRoute = ({allowedRoles}) => {
  const { user, loading } = useContext(userContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default PrivateRoute

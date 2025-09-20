import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("role");

  // Check if user has token + correct role
  if (!token || role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/Context";

const ProjectAdmin = () => {
  const { user } = useAuth();

  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProjectAdmin;

import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireSeller({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "seller") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
  const auth = sessionStorage.getItem("token");
  console.log("auth", auth);

  if (!auth) {
    return <Navigate to="/" />;
  } else {
    return <Outlet></Outlet>;
  }
};

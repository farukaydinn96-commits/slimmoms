import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({
  children,
  restricted = false,
  redirectTo = "/diary",
}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const shouldRedirect = isLoggedIn && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicRoute;

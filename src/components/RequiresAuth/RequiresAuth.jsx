import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";

export const RequiresAuth = () => {
  const {
    userData: { token },
  } = useAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
};

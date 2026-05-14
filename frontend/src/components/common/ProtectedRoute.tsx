import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export const ProtectedRoute = () => {
  const { userToken } = useContext(AuthContext);

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { userToken } = useContext(AuthContext);

  if (userToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

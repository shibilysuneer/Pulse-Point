import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("hospitalToken");

  if (!token) {
    return <Navigate to="/hospital/signin" replace />;
  }

  return children;
};

export default PrivateRoute;

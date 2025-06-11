import { Navigate, Outlet } from "react-router-dom";

const ProtectedAuthRoute = () => {
  const token = localStorage.getItem("hospitalToken");

if (token) {
    return <Navigate to="/hospital/home" replace />;
  }
  return <Outlet />;
};

export default ProtectedAuthRoute;

import { Navigate, Outlet } from "react-router-dom";

const ProtectedAuthRoute = () => {
  const token = localStorage.getItem("hospital_token");

if (token) {
    return <Navigate to="/hospital/home" replace />;
  }
  return <Outlet />;
};

export default ProtectedAuthRoute;

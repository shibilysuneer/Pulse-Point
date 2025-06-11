import { Navigate, Outlet } from "react-router-dom";

const ProtectedAuthRoute = () => {
  const token = localStorage.getItem("adminToken");

  return token ? <Navigate to="/admin/home" replace /> : <Outlet />;
};

export default ProtectedAuthRoute;

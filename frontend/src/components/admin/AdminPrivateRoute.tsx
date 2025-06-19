
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const token = localStorage.getItem("admin_token"); 

  return token ? <Outlet /> : <Navigate to="/admin/signin" replace />;
};

export default AdminPrivateRoute;

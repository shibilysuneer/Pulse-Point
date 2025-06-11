// import type { JSX } from "react";
// import { Navigate } from "react-router-dom";

// interface Props {
//   children: JSX.Element;
// }

// const AdminPrivateRoute = ({ children }: Props) => {
//   const token = localStorage.getItem("adminToken"); // Adjust key if needed

//   return token ? children : <Navigate to="/admin/signin" replace />;
// };

// export default AdminPrivateRoute;
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const token = localStorage.getItem("adminToken"); // Use your actual token key

  return token ? <Outlet /> : <Navigate to="/admin/signin" replace />;
};

export default AdminPrivateRoute;

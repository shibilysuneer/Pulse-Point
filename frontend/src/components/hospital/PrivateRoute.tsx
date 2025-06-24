// import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";



const PrivateRoute = () => {
  const token = localStorage.getItem("hospital_token");

  if (!token) {
    return <Navigate to="/hospital/signin" replace />;
  }

  return <Outlet/>;
};

export default PrivateRoute;

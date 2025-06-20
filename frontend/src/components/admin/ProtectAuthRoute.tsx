import { Navigate, Outlet } from "react-router-dom";
import type { ProtectedRouteProps } from "../../types/commonTypes";

export const ProtectedRoute  = ({allowedRoles}:ProtectedRouteProps) => {

  const token = localStorage.getItem("admin_token");
  const storedRole =localStorage.getItem("admin_role")
  console.log({token, storedRole})

  const isLoggedIn = !!token;
    const role =  storedRole;

     if (!isLoggedIn) {
       return <Navigate to="/admin/signin" replace />
     }
       if (allowedRoles && !allowedRoles.includes(role || "")) {
        return <Navigate to="/admin/unauthorized" replace />;
       }
      return <Outlet />;
  // return token ? <Navigate to="/admin/home" replace /> : <Outlet />;
};
export const ProtectedAuthRoute = () =>{
const token = localStorage.getItem("admin_token");
 const isLoggedIn = !!token;
  return isLoggedIn ? <Navigate to="/admin/home" replace /> : <Outlet />;
}


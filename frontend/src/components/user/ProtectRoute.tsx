import { Navigate, Outlet } from 'react-router-dom';
import type { ProtectedRouteProps } from '../../types/commonTypes';

export const UserProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem('user_token');
  const role = localStorage.getItem('user_role');

  if (!token || token === 'undefined') {
    return <Navigate to="/user/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || '')) {
    return <Navigate to="/user/unauthorized" replace />;
  }

  return <Outlet />;
};

import { Routes, Route } from 'react-router-dom';
// import UserUnauthorized from '../pages/user/UserUnauthorized';
import UserSignin from '../pages/userPages/UserSignin';
import UserSignup from '../pages/userPages/UserSignup';
import { UserProtectedRoute } from '../components/user/ProtectRoute';
import UserLayout from '../components/user/UserLayout';
import UserHome from '../pages/userPages/UserHome';
import ForgotUserPassword from '../pages/userPages/ForgotPassword';

function UserRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<UserSignin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/forgot" element={<ForgotUserPassword/>} />
      {/* <Route path="/unauthorized" element={<UserUnauthorized />} /> */}

      {/* Protected Routes */}
      <Route element={<UserProtectedRoute allowedRoles={['user']} />}>
       <Route element={<UserLayout/>}>
        <Route path="/home" element={<UserHome />} />
        {/* Add more protected user pages here */}
        </Route>
      </Route>
    </Routes>
  );
}

export default UserRoutes;

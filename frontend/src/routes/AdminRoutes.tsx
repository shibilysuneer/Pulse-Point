import { Route,Routes } from "react-router-dom";
import Signin from "../pages/adminPages/Signin"
import AdminHome from "../pages/adminPages/AdminHome";
import AdminPrivateRoute from "../components/admin/AdminPrivateRoute";
import ProtectedAuthRoute from "../components/admin/ProtectAuthRoute";
import ForgotPassword from "../pages/adminPages/ForgotPassword";
import Unauthorized from "../pages/adminPages/Unauthorized";

const AdminRoutes =() => {
    return (
        <Routes>
            <Route element={<ProtectedAuthRoute />}>
           <Route path="/signin" element={<Signin/>}/> 
           <Route path="/forgot" element={<ForgotPassword/>}/>
        </Route>
           {/* <Route path="/home" element={<AdminHome/>}/> 
           //   */}
          <Route element={<AdminPrivateRoute />}>
        <Route path="/home" element={<AdminHome />} />
      </Route>

        <Route path="/unauthorized" element={<Unauthorized/>}/> 

        </Routes>
    )
}
export default AdminRoutes;
import { Route,Routes } from "react-router-dom";
import Signin from "../pages/adminPages/Signin"
import AdminHome from "../pages/adminPages/AdminHome";
import AdminHospital from "../pages/adminPages/Hospitals";

// import AdminPrivateRoute from "../components/admin/AdminPrivateRoute";
import {ProtectedAuthRoute,ProtectedRoute} from "../components/admin/ProtectAuthRoute";
import ForgotPassword from "../pages/adminPages/ForgotPassword";
import Unauthorized from "../pages/adminPages/Unauthorized";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDonor from "../pages/adminPages/AdminDonors";
import AdDonorDetails from "../pages/adminPages/AdminDonorDetails";
import HospitalRequesters from "../pages/adminPages/HospitalRequesters";
import HospitalDetails from "../pages/adminPages/HospitalReqDetails";

const AdminRoutes =() => {
    return (
        <Routes>
            <Route element={<ProtectedAuthRoute />}>
           <Route path="/signin" element={<Signin/>}/> 
           <Route path="/forgot" element={<ForgotPassword/>}/>
        </Route>
         
       <Route element={<ProtectedRoute allowedRoles={["admin"]}  />}>
         <Route element={<AdminLayout/>}>
           <Route path="/dashboard" element={<AdminHome />} />
           <Route path="/hospitals" element={<AdminHospital />} />
            <Route path="/hospitals-req" element={<HospitalRequesters />} />
            <Route path="/hospitals/:id" element={<HospitalDetails />} />
           <Route path="/donors" element={<AdminDonor />} />
           <Route path="/donors/:id" element={<AdDonorDetails />} />

         </Route>
      </Route>

        <Route path="/unauthorized" element={<Unauthorized/>}/> 

        </Routes>
    )
}
export default AdminRoutes;
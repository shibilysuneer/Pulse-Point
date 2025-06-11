// import React from 'react'
import { Route,Routes } from "react-router-dom";
import HospitalSignin from '../pages/hospitalPages/HospitalSignin'
import HospitalSignup from '../pages/hospitalPages/HospitalSignup'
import HospitalHome from "../pages/hospitalPages/HospitalHome";
import ForgotPassword from "../pages/hospitalPages/ForgotPassword";
import VerifyOtp from "../pages/hospitalPages/VerifyOtp";
import ResetPassword from "../pages/hospitalPages/ResetPassword";
import ProtectedAuthRoute from "../components/hospital/ProtectedAuthRoute";
import PrivateRoute from "../components/hospital/PrivateRoute";

const HospitalRoutes = () => {
  return (
   <Routes>
    
     <Route element={<ProtectedAuthRoute />}>
    <Route path="/signin" element={<HospitalSignin/>}/>
    <Route path="/signup" element={<HospitalSignup/>}/>
    
     <Route path="/forgotPassword" element={<ForgotPassword />}/>
     <Route path="/verify-otp" element={<VerifyOtp />}/>
     <Route path="/reset-password" element={<ResetPassword />}/>
</Route>
   
      <Route element={<PrivateRoute/>}>
    <Route path="/home" element={<HospitalHome />} />
  </Route>
   </Routes>
  )
}

export default HospitalRoutes;

// import React from 'react'
import { Route,Routes } from "react-router-dom";
import HospitalSignin from '../pages/hospitalPages/HospitalSignin'
import HospitalSignup from '../pages/hospitalPages/HospitalSignup'
import HospitalHome from "../pages/hospitalPages/HospitalHome";

const HospitalRoutes = () => {
  return (
   <Routes>
    <Route path="/signin" element={<HospitalSignin/>}/>
    <Route path="/signup" element={<HospitalSignup/>}/>
    <Route path="/home" element={<HospitalHome />}/>

   </Routes>
  )
}

export default HospitalRoutes;

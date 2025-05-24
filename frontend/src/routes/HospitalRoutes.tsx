// import React from 'react'
import { Route,Routes } from "react-router-dom";
import HospitalSignin from '../pages/hospitalPages/HospitalSignin'
import HospitalSignup from '../pages/hospitalPages/HospitalSignup'

const HospitalRoutes = () => {
  return (
   <Routes>
    <Route path="/signin" element={<HospitalSignin/>}/>
    <Route path="/signup" element={<HospitalSignup/>}/>

   </Routes>
  )
}

export default HospitalRoutes;

import { Route,Routes } from "react-router-dom";
import Signin from "../pages/adminPages/Signin"
import Signup from "../pages/adminPages/Signup";

const AdminRoutes =() => {
    return (
        <Routes>
           <Route path="/signin" element={<Signin/>}/> 
           <Route path="/signup" element={<Signup/>}/> 
        </Routes>
    )
}
export default AdminRoutes;
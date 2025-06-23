
// import React from 'react';
import { Link, useNavigate} from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logoutAdmin } from "../../redux/slices/admin/adminSlice";

function Header() {
const navigate = useNavigate()  
const dispatch = useAppDispatch()
 const handleSignOut = async () => {
  
    // await dispatch(logoutAdmin())
    // navigate('/admin/signin')
      const resultAction = await dispatch(logoutAdmin());
  if (logoutAdmin.fulfilled.match(resultAction)) {
    navigate("/admin/signin");
  } else {
    console.error("Logout failed");
  }
  };
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-red-600 font-bold text-lg">🩸 PULSE POINT</div>
     <nav className="flex space-x-12 text-gray-500 font-medium font-mono uppercase tracking-wide">
  <Link to="/admin/dashboard">DASHBOARD</Link>
  <Link to="/admin/donors">DONORS</Link>
  <Link to="/admin/hospitals">HOSPITALS</Link>
  <Link to="/admin/campaign">CAMPAIGN</Link>
  <Link to="/admin/subscription">SUBSCRIPTION</Link>
</nav>
<button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full ml-4"
      >
        Sign Out
      </button>
      
    </header>
  );
}

export default Header;


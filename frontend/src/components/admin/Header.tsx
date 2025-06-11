
// import React from 'react';
import { Link, useNavigate} from "react-router-dom";

function Header() {
const navigate = useNavigate()  
 const handleSignOut = () => {
    const confirmed = window.confirm("Do you really want to log out?");
    if (confirmed) {
      localStorage.removeItem("adminToken"); // Adjust the key if needed
      navigate("/admin/signin");
    }
  };
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-red-600 font-bold text-lg">🩸 PULSE POINT</div>
     <nav className="flex space-x-12 text-gray-500 font-medium font-mono uppercase tracking-wide">
  <Link to="/admin/home">HOME</Link>
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


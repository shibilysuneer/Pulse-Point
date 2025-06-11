import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
     const handleLogout = () =>{
        localStorage.removeItem("hospitalToken"); // remove token
    navigate("/hospital/signin");
     }
  return (
     <nav className="bg-white text-black p-4 flex justify-between items-center">
      <div className="text-xl font-bold"> 🩸 PULSE POINT</div>
      <div className="space-x-4">
        <Link to="/hospital/home">Home</Link>
        <Link to="/hospital/dashboard">Dashboard</Link>
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar

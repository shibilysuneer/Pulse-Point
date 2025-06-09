import { Link } from "react-router-dom";

const Navbar = () => {
  return (
     <nav className="bg-white-700 text-black p-4 flex justify-between items-center">
      <div className="text-xl font-bold"> 🩸 PULSE POINT</div>
      <div className="space-x-4">
        <Link to="/hospital/home">Home</Link>
        <Link to="/hospital/dashboard">Dashboard</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  )
}

export default Navbar



import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { hospitalLogout } from "../../redux/slices/hospital/hospitalSlice";

function HospitalHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    const resultAction = await dispatch(hospitalLogout());
    console.log("Logout Result:", resultAction);
    if (hospitalLogout.fulfilled.match(resultAction)) {
        console.log("navigating to signin");
      navigate("/hospital/signin");
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-red-600 font-bold text-lg">🏥 PULSE POINT HOSPITAL</div>

      <nav className="flex space-x-10 text-gray-600 font-medium font-mono uppercase tracking-wide">
        <Link to="/hospital/home">HOME</Link>
        <Link to="/hospital/requests">REQUESTERS</Link>
        <Link to="/hospital/need-blood">NEED BLOOD</Link>
        <Link to="/hospital/notification">NOTIFICATION</Link>
        <Link to="/hospital/donor">DONOR</Link>
        <Link to="/hospital/subscription">SUBSCRIPTION</Link>
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

export default HospitalHeader;

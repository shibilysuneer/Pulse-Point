
import { Link, useNavigate} from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { userLogout } from "../../redux/slices/user/userSlice";

function Header() {
const navigate = useNavigate()  
const dispatch = useAppDispatch()
 const handleSignOut = async () => {
  
      const resultAction = await dispatch(userLogout());
  if (userLogout.fulfilled.match(resultAction)) {
    navigate("/user/signin");
  } else {
    console.error("Logout failed");
  }
  };
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-red-600 font-bold text-lg">🩸 PULSE POINT</div>
     <nav className="flex space-x-12 text-gray-500 font-medium font-mono uppercase tracking-wide">
  <Link to="/user/home">HOME</Link>
  <Link to="/user/donor">DONATE</Link>
  {/* <Link to="/user/requests">REQUESTS</Link> */}
  <Link to="/user/notification">NOTIFICATION</Link>
  <Link to="/user/contact">CONTACT</Link>
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


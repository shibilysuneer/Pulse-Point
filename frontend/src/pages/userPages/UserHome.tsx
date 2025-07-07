import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../redux/store";

const UserHome = () => {
  const { request } = useSelector((state: RootState) => state.donor);

  const canShowDonateButton = !request ||request.status=="rejected"
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <div className="bg-white bg-opacity-80 p-10 rounded-2xl shadow-lg text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">
          Welcome to Pulse Point
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          Be a hero. Donate blood. Save lives. Join our community of life-savers and make a difference today.
        </p>
         <blockquote className="italic text-gray-600 mb-6">
          "A single pint can save three lives, a single gesture can create a million smiles."
        </blockquote>
        {canShowDonateButton &&( 
         <Link
          to="/user/donor"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition duration-200"
        >
          Donate Now
        </Link>
        )}
        <div className="p-3">
        <span className="text-red-600 font-medium">Thank you for being a part of our mission 🩸</span>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

import { Link } from "react-router-dom";

const UserHome = () => {
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
         <Link
          to="/user/donate"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition duration-200"
        >
          Donate Now
        </Link>
        <span className="text-red-600 font-medium">Thank you for being a part of our mission 🩸</span>
      </div>
    </div>
  );
};

export default UserHome;

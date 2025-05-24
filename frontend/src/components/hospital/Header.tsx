
// import React from 'react';
import { Link,useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-red-600 font-bold text-lg">🩸 PULSE POINT</div>
      <nav className="flex space-x-12 text-gray-500 font-medium font-mono uppercase tracking-wide">
        <a href="#">HOME</a>
        <a href="#">DONORS</a>
        <a href="#">HOSPITALS</a>
        <a href="#">CAMPAIGN</a>
        <a href="#">SUBSCRIPTION</a>

      </nav>
       {/* <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">Sign Up</button> */}

       {currentPath === '/hospital/signin' ? (
        <Link
          to="/hospital/signup"
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full"
        >
          Sign Up
        </Link>
      ) : currentPath === '/hospital/signup' ? (
        <Link
          to="/hospital/signin"
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full"
        >
          Sign In
        </Link>
      ) : null}
    </header>
  );
}

export default Header;


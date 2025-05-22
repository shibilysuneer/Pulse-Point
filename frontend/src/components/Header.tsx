// import React from 'react'

function Header() {
  return (
    
    <header className="flex justify-between items-center px-8 py-6 shadow-md bg-white bg-opacity-90">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-red-600 text-xl font-bold">🩸 PULSE POINT</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-6 font-medium text-gray-700">
        <a href="#" className="hover:text-red-600">Home</a>
        <a href="#" className="hover:text-red-600"> Blood Request</a>
        <a href="#" className="hover:text-red-600">Donor</a>
        <a href="#" className="hover:text-red-600">Notification</a>
      </nav>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        <button className="text-gray-700 hover:text-red-600">Log in</button>
        {/* <Button className="bg-red-600 hover:bg-red-700 text-white px-4">Sign Up</Button> */}
      </div>
    </header>
  )
}

export default Header

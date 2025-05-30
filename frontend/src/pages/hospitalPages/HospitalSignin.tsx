// import React from 'react'
import loginBg from '../../assets/bloodpulse.jpg'; 

const HospitalSignin = () => {
  return (
 <div
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex justify-center items-center flex-grow pt-16">
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Login</h2>
          <input
            type="email"
            placeholder="email"
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          <input
            type="password"
            placeholder="password"
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          <div className="flex justify-between text-sm mb-4 text-gray-600">
            <a href="#">Forgot your Password?</a>
            <a href="/hospital/signup">Create an Account</a>
          </div>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full">Login</button>
        </div>
      </div>
    </div>
  )
}

export default HospitalSignin

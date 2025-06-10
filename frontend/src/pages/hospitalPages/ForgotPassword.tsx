import React, { useState } from 'react'
import { toast } from 'react-toastify';
import bg from '../../assets/bloodpulse.jpg'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { sendOtp } from '../../redux/slices/hospital/hospitalSlice';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
     const [email, setEmail] =useState('');
     const dispatch = useDispatch<AppDispatch>()
     const navigate = useNavigate()
     const {loading,error} = useSelector((state:RootState)=>state.hospital)

    const handleSubmit= async (e: React.FormEvent)=>{
         e.preventDefault();
         try {
            const result = await dispatch(sendOtp(email)).unwrap();
            console.log("Result:=", result);
      toast.success(result.message || 'OTP sent to your email');
       navigate("/hospital/verify-otp", { state: { email } });

         } catch (err:any) { 
      toast.error(err || 'Failed to send OTP');         }
    }
  return (
     <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bg})`}}>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-6 text-red-600">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded "disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  )
}

export default ForgotPassword;

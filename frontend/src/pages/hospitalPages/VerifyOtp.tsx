import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import type { AppDispatch } from '../../redux/store'
import { resendOtp, verifyOtp } from '../../redux/slices/hospital/hospitalSlice'
import { toast } from 'react-toastify'

const VerifyOtp = () => {
    const location =useLocation()
     const navigate = useNavigate()
     const dispatch = useDispatch<AppDispatch>()
     const email = location.state?.email

      const [otp, setOtp] = useState("")
      const [seconds, setSeconds] = useState(60);
      const [canResend, setCanResend] = useState(false);

      useEffect(() => {
    let timer: NodeJS.Timeout;

    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setCanResend(true); // Enable resend button
    }

    return () => clearTimeout(timer);
  }, [seconds]);

       const handleVerify = async (e: React.FormEvent)=>{
        e.preventDefault();
        try {
            await dispatch(verifyOtp({ email,otp })).unwrap();
      toast.success("OTP verified successfully");
      navigate("/hospital/reset-password", { state: { email,otp } });
      console.log("EMAIL:", email);
      console.log("OTP:", otp); 
        } catch (err:any) {
           toast.error(err || "OTP verification failed"); 
        }
       }

        const handleResend = async () => {
    try {
      await dispatch(resendOtp(email)).unwrap();
      toast.success("OTP resent successfully");
       setSeconds(60); 
      setCanResend(false);
    } catch (err: any) {
      toast.error(err || "Failed to resend OTP");
    }
  };
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleVerify} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <p className="text-sm text-gray-600 mb-4">OTP sent to: <b>{email}</b></p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-red-500 text-white w-full py-2 rounded mb-2">
          Verify
        </button>
        <button type="button" onClick={handleResend} disabled={!canResend} className={`text-sm ${
            canResend ? 'text-blue-600 underline' : 'text-gray-400 cursor-not-allowed'
          }`}>
          {canResend ? 'Resend OTP' : `Resend in ${seconds}s`}
        </button>
      </form>
    </div>
  )
}

export default VerifyOtp

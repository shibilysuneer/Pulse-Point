import { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  sendAdminOTP,
  verifyAdminOTP,
  resetAdminPassword,
  resendAdminOTP
} from '../../redux/slices/admin/adminSlice';
import bg from '../../assets/bloodpulse.jpg'
import { validatePassword } from "../../utils/passwordValidator";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: any) => state.admin);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (step === 2 && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(countdown);
  }, [timer, step]);

  const handleSendOtp = () => {
    if (!email.trim()) return setError("Email is required");

    setError("");
    dispatch(sendAdminOTP(email)).then((res: any) => {
      if (res.payload?.message) {
        toast.success("OTP sent!");
        setStep(2);
        setTimer(30);
        setCanResend(false);
      } else {
        setError(res.payload || "Failed to send OTP");
      }
    });
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) return setError("OTP is required");

    setError("");
    dispatch(verifyAdminOTP({ email, otp })).then((res: any) => {
      if (res.error) {
        setError(res.payload || "Invalid OTP");
      } else {
        toast.success("OTP verified!");
        setStep(3);
      }
    });
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      return setError("Both fields are required");
    }
    const validationError = validatePassword(newPassword);
    if (validationError) return setError(validationError);
    if (newPassword !== confirmPassword) return setError("Passwords do not match");

    setError("");
    dispatch(resetAdminPassword({ email, password: newPassword })).then((res: any) => {
      if (res.payload?.message) {
        toast.success("Password reset!");
        setStep(4);
        setTimeout(() => navigate("/super-admin"), 3000);
      } else {
        setError(res.payload || "Failed to reset password");
      }
    });
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    dispatch(resendAdminOTP(email)).then((res: any) => {
      if (res.payload?.message) {
        toast.success("OTP resent!");
        setOtp("");
        setTimer(30);
        setCanResend(false);
      } else {
        setError(res.payload || "Failed to resend OTP");
      }
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-6 text-red-600">Forgot Password</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 w-full mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              onClick={handleSendOtp}
              className="bg-red-500 text-white w-full p-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="border p-2 w-full mb-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-red-500 text-white w-full p-2 mb-2 rounded"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={handleResendOtp}
              className={`w-full text-white p-2 rounded ${canResend ? "bg-blue-600" : "bg-gray-400"}`}
              disabled={!canResend}
            >
              {canResend ? "Resend OTP" : `Resend OTP (${timer}s)`}
            </button>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="border p-2 w-full pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="border p-2 w-full pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-2"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {/* {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />} */}
              </button>
            </div>
            <button
              onClick={handleResetPassword}
              className="bg-red-500 text-white w-full p-2 rounded"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Step 4: Success Message */}
        {step === 4 && (
          <p className="text-green-500 font-medium">Password reset successfully!</p>
        )}

        {/* Back to Login */}
        <div className="mt-4">
          <button
            onClick={() => navigate("/admin/login")}
            className="text-sm text-red-600 underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

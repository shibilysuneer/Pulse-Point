import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

const HospitalHome = () => {
  const navigate = useNavigate()
  const hospitalData  = useSelector((state: RootState) => state.hospital.hospital?.hospital);

console.log("Full hospital slice in Redux:", hospitalData);

const handleRegisterClick = () => {
  const registerState = {
    name: hospitalData?.name,
    email: hospitalData?.email,
    registrationNumber: hospitalData?.registrationNumber,
    phone: hospitalData?.phone,
  };

  console.log("Navigating with state:", registerState);

  navigate('/hospital/register', { state: registerState });
};
  return (
     <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-white bg-opacity-70 p-10 rounded shadow-lg text-center">
            <h1 className="text-3xl font-bold text-red-700">Welcome to Pulse Point</h1>
            <p className="mt-4 text-lg text-gray-700">
              You are logged in as an hospital.
            </p>
  <div className="mt-6 space-y-3 text-gray-800">
          <p>🏥 <span className="font-medium">Manage Blood Requests:</span> Approve or reject donor requests based on availability and urgency.</p>
          <p>📊 <span className="font-medium">Track Donor Activity:</span> View and monitor donor history and blood stock updates.</p>
         
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Need help? Visit the support section or contact the system admin.
        </p>   
        {hospitalData?.status==="unregistered" && (
          <button
          onClick={handleRegisterClick}
          className="mt-6 px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
        >
          Register
        </button> 
         )}  
         {hospitalData?.status ==="pending" &&(
           <p className="mt-6 text-xl text-yellow-500 font-medium">
            Your verification is pending approval.
          </p>
         )}
            </div>
        </div>
  )
}

export default HospitalHome


const HospitalHome = () => {
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
        </p>          </div>
        </div>
  )
}

export default HospitalHome

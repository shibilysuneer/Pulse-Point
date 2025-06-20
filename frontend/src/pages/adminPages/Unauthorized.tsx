import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {

    const navigate= useNavigate()

    const handleGoBack =()=>{
        navigate("/admin/login")
    }
  return (
     <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center bg-white p-8 rounded shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        
         <button
          onClick={handleGoBack}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

export default Unauthorized;

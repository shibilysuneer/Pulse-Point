import Navbar from "../../components/hospital/Navbar"
import bg from '../../assets/bloodpulse.jpg'
const HospitalHome = () => {
  return (
    <div
         className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}>
      <Navbar/>
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="bg-white bg-opacity-70 p-10 rounded shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-700">Welcome Admin</h1>
          <p className="mt-4 text-lg text-gray-700">
            You are logged in as an <strong>Administrator</strong>.
          </p>
          <span className="text-red-700">Manage Hospitals 🏥 and Users 👤</span>
        </div>
      </div>
    </div>
  )
}

export default HospitalHome

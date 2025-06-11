// import React from 'react'
// import bg from '../../assets/bloodpulse.jpg'
import AdminLayout from '../../components/admin/AdminLayout'

const AdminHome = () => {
  return (
    // <div
    //       className="h-screen bg-cover bg-center"
    //   style={{ backgroundImage: `url(${bg})` }}>
        <AdminLayout >
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-white bg-opacity-70 p-10 rounded shadow-lg text-center">
            <h1 className="text-3xl font-bold text-red-700">Welcome to Pulse Point</h1>
            <p className="mt-4 text-lg text-gray-700">
              You are logged in as an admin.
            </p>
            <span className="text-red-700">Manage Hospitals 🏥 and Users 👤</span>
          </div>
        </div>
       </AdminLayout>
    //   </div>
  )
}

export default AdminHome

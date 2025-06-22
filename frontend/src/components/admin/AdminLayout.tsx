// import React from 'react'

import Header from '../admin/Header'
import Footer from '../admin/Footer'
import bg from '../../assets/bloodpulse.jpg'
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {

  return (
     <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 bg-opacity-80">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 min-h-[calc(100vh-8rem)]">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AdminLayout;

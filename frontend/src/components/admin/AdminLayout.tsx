// import React from 'react'

import Header from '../admin/Header'
import Footer from '../admin/Footer'
import bg from '../../assets/bloodpulse.jpg'

const AdminLayout = ({children}:{children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
   
   <Header/>
   <main className="min-h-screen">{children}</main>
   <Footer/>
  </div>
  )
}

export default AdminLayout;

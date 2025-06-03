// import React from 'react'

import Header from '../admin/Header'
import Footer from '../admin/Footer'

const AdminLayout = ({children}:{children: React.ReactNode }) => {
  return (
   <>
   <Header/>
   <main className="min-h-screen">{children}</main>
   <Footer/>
   </>
  )
}

export default AdminLayout;

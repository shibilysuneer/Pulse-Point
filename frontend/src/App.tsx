import { BrowserRouter ,Route,Routes} from "react-router-dom"
// import Header from "./components/admin/Header"
// import Footer from "./components/admin/Footer"
// import AdminLayout from "./components/admin/AdminLayout"
import AdminRoutes from "./routes/AdminRoutes"
import HospitalRoutes from './routes/HospitalRoutes'
import { ToastContainer } from "react-toastify"


const App = () => {
  return(
   
   <BrowserRouter>
  {/* <Header/> */}
   <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
  <Routes>
    <Route path='/admin/*' element={<AdminRoutes/>} />
    <Route path='/hospital/*' element={<HospitalRoutes/>}/>
  </Routes>
  {/* <Footer/> */}
  </BrowserRouter>
 
  )
}

export default App

import { BrowserRouter ,Route,Routes} from "react-router-dom"
import AdminRoutes from "./routes/AdminRoutes"
import HospitalRoutes from './routes/HospitalRoutes'
import { ToastContainer } from "react-toastify"
import UserRoutes from "./routes/UserRoutes"


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
    <Route path='/user/*' element={<UserRoutes/>}/>

  </Routes>
  {/* <Footer/> */}
  </BrowserRouter>
 
  )
}

export default App

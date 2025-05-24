import { BrowserRouter ,Route,Routes} from "react-router-dom"
import Header from "./components/admin/Header"
import Footer from "./components/admin/Footer"
import AdminRoutes from "./routes/AdminRoutes"
import HospitalRoutes from "./routes/hospitalRoutes"


const App = () => {
  return(
   
   <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/admin/*' element={<AdminRoutes/>} />
    <Route path='/hospital/*' element={<HospitalRoutes/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
 
  )
}

export default App

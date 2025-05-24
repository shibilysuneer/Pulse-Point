import { BrowserRouter ,Route,Routes} from "react-router-dom"
import Signin from "./pages/adminPages/Signin"
import Signup from "./pages/adminPages/Signup"
import Header from "./components/admin/Header"
import Footer from "./components/admin/Footer"


const App = () => {
  return(
   
   <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='admin/signin' element={<Signin/>} />
    <Route path='admin/signup' element={<Signup/>} />
   
  </Routes>
  <Footer/>
  </BrowserRouter>
 
  )
}

export default App

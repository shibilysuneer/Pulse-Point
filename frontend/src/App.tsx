import { BrowserRouter ,Route,Routes} from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Header from "./components/Header"


const App = () => {
  return(
   
   <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/sign-in' element={<Signin/>} />
    <Route path='/sign-up' element={<Signup/>} />
   
  </Routes>
  <h2 className="text-blue-500">bjkhjkhl</h2>
  </BrowserRouter>
 
  )
}

export default App

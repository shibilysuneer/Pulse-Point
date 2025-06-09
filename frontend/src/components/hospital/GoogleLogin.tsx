import { useNavigate } from 'react-router-dom'
import google from '../../assets/google.png'
import { useAppDispatch } from '../../redux/hooks'
import { toast } from 'react-toastify'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import { hospitalGoogleLogin } from '../../redux/slices/hospital/hospitalSlice'

const GoogleLogin = () => { 
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleGoogle = async() =>{
    try {
      
      const result = await signInWithPopup(auth,googleProvider)
      const user = result.user;

      const email = user.email;
    const googleId = user.uid; 

     if (!email) {
        console.error("Google login failed: Email is missing.");
        toast.error("Login failed. Please try again.");
        return;
      }   
      // const name = user.displayName || ''; 
       const res = await dispatch(hospitalGoogleLogin({ email, googleId  })).unwrap();
       console.log("Hospital info:", res.hospital);
       
    toast.success("Google login successful");
    navigate("/hospital/home");
    } catch (error:any) {
      console.log('could not login with google');
       console.error("Google login error:", error);
    toast.error("Google login failed");
    }
  }
  return (
   <div className='flex border mt-4 p-2 cursor-pointer'>
        <img src={google} className='w-6 h-6' />
        <button type='button' 
        onClick={handleGoogle} 
        className='font-semibold ml-12 text-black'>
          Continue with Google
          </button>
    </div>
  )
}

export default GoogleLogin;

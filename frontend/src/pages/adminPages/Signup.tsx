
import { Link, useNavigate } from 'react-router-dom';
import loginBg from '../../assets/bloodpulse.jpg'; 
import {useState, type ChangeEvent, type FormEvent } from 'react';
import type { AppDispatch} from '../../redux/store';
import { adminSignup } from '../../redux/slices/admin/adminSlice';
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'


// const {error,loading}= useSelector
function Signup() {

   const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()


  const handleChange=(e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }
   const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Signup data submitted:", formData);
    const result=await dispatch(adminSignup(formData)).unwrap();
    console.log('result',result)
     toast.success("Signup successful! Redirecting to login...");
      navigate('/admin/signin');
    } catch (err:any) {
      setError("Signup failed. Try again.");
       toast.error("Signup failed. Please try again.");
    }
  };
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex justify-center items-center flex-grow pt-16">
        {/* <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md"> */}
       <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Sign Up</h2>
          
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <input
            type="text"
            placeholder="Username" id='username' onChange={handleChange}
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          
          <input
            type="email"
            placeholder="Email" id='email' onChange={handleChange}
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password" id='password' onChange={handleChange}
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          
          <div className="flex justify-between text-sm mb-4 text-gray-600">
            {/* <a href="/admin/signin">Already have an account?Sign in</a> */}
             <Link to="/admin/signin" >
              Already have an account? Sign in
             </Link>
          </div>
          
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full">
            Sign Up
          </button>
        {/* </div> */}
         </form>
      </div>
    </div>
  );
}

export default Signup;

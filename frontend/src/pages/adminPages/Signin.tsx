
import { useState, type ChangeEvent, type FormEvent } from 'react';
import loginBg from '../../assets/bloodpulse.jpg'; 
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  })
   const [error, setError] = useState<string>("");
  const navigate =useNavigate();
  
   
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
      try {
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } 
    }

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex justify-center items-center flex-grow pt-16">
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Login</h2>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
         <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
         
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          <div className="flex justify-between text-sm mb-4 text-gray-600">
            <a href="#">Forgot your Password?</a>
            {/* <a href="/admin/signup">Create an Account</a> */}
            <Link to='/admin/signup'className='text-black-600 '>
            Create an account
            </Link>
          </div>
          <button  type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full">Login</button>
        {/* </div> */}
         </form>
      </div>
    </div>
  );
}

export default Signin;



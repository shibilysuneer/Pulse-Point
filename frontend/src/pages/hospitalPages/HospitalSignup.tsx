// import React from 'react'
import { useState, type ChangeEvent, type FormEvent } from 'react';
import loginBg from '../../assets/bloodpulse.jpg'; 
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { hospitalSignup } from '../../redux/slices/hospital/hospitalSlice';

const HospitalSignup = () => {
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
   const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
   const { loading } = useSelector((state: RootState) => state.hospital);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const result = await dispatch(hospitalSignup(formData)).unwrap();
      localStorage.setItem('hospitalToken', result.token);
      toast.success('Signup successful');
      navigate('/hospital/home');
    } catch (error:any) {
       setError('Signup failed. Please try again.');
    }

   }
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex justify-center items-center flex-grow pt-16">
        {/* <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md"> */}
         <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Hospital Sign Up</h2>
                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <input
            type="text"
            placeholder="Hospital Name"
             name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          
          <input
            type="email"
            placeholder="Email"
             name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />
          
          <div className="flex justify-between text-sm mb-4 text-gray-600">
            {/* <a href="/hospital/signin">Already have an account?Sign in</a> */}
             <Link to="/hospital/signin" className="text-black-600">
              Already have an account?
            </Link>
          </div>
          
          <button type="submit"
            disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full">
           {loading ? 'Signing up...' : 'Signup'}
          </button>
        {/* </div> */}
        </form>
      </div>
    </div>
  )
}

export default HospitalSignup

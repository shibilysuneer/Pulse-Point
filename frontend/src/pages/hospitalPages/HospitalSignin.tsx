// // import React from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import loginBg from '../../assets/bloodpulse.jpg'; 
// import { useState, type ChangeEvent, type FormEvent } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../../redux/store';
// import { toast } from 'react-toastify';
// import GoogleLogin from '../../components/hospital/GoogleLogin';
// import { hospitalLogin } from '../../redux/slices/hospital/hospitalSlice';

// const HospitalSignin = () => {
//    const [formData, setFormData] = useState({
//       email: "",
//     password: "",
//    })
//    const [error, setError] =useState<string>("");
//    const dispatch = useDispatch<AppDispatch>()
//    const navigate = useNavigate()
//    const {loading} = useSelector((state:RootState)=>state.hospital)

   
//    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     try {
//        await dispatch(hospitalLogin(formData)).unwrap();
//       // localStorage.setItem("hospitalToken", result.token);
//       toast.success("Login successful");
//        navigate("/hospital/home");
//     } catch (error: any) {
//       // setError("Invalid email or password");
//        setError(error);
//     toast.error(error);
      
//     }
//    }
//   return (
//  <div
//       className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
//       style={{ backgroundImage: `url(${loginBg})` }}
//     >
//       <div className="flex justify-center items-center flex-grow pt-16">
//         {/* <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md"> */}.
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md"
//         >
//           <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Hospital Login</h2>
//                     {error && <p className="text-red-600 text-center mb-4">{error}</p>}

//           <input
//             type="email"
//              name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="email"
//             className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
//           />
//           <input
//             type="password"
//              name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="password"
//             className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
//           />
//           <div className="flex justify-between text-sm mb-4 text-gray-600">
//             <a href="/hospital/forgotPassword" className='hover:underline'>Forgot your Password?</a>
//              <Link to='/hospital/signup'className='text-black-600 '>
//             Create an account
//             </Link>
//           </div>
//           <button  type="submit"
//             disabled={loading} className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full">
//               {loading ? "Logging in..." : "Login"}
//               </button>
//               <GoogleLogin/>
//               </form>
//         {/* </div> */}
//       </div>
//     </div>
//   )
// }

// export default HospitalSignin

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginBg from '../../assets/bloodpulse.jpg';
import { hospitalLogin } from '../../redux/slices/hospital/hospitalSlice';
import GoogleLogin from '../../components/hospital/GoogleLogin';
import { signinSchema } from '../../validations/signinValidation';
import type { AppDispatch, RootState } from '../../redux/store';

const HospitalSignin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.hospital);

  const initialValues = { email: '', password: '' };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      await dispatch(hospitalLogin(values)).unwrap();
      toast.success('Login successful');
      navigate('/hospital/home');
    } catch (err: any) {
      // const message = err?.response?.data?.message || err?.message || 'Login failed';
        const message = typeof err === 'string' ? err : (err?.message || 'Login failed');
      toast.error(message);
      // setFormError(message);

    }
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex justify-center items-center flex-grow pt-16">
        <Formik
          initialValues={initialValues}
          validationSchema={signinSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
              <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
                Hospital Login
              </h2>

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 mb-2 rounded-full border focus:outline-none"
              />
              <ErrorMessage name="email" component="div" className="text-red-600 text-sm mb-2" />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 mb-2 rounded-full border focus:outline-none"
              />
              <ErrorMessage name="password" component="div" className="text-red-600 text-sm mb-4" />

              <div className="flex justify-between text-sm mb-4 text-gray-600">
                <a href="/hospital/forgotPassword" className="hover:underline">
                  Forgot your Password?
                </a>
                <Link to="/hospital/signup" className="text-black-600">
                  Create an account
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full"
              >
                {loading || isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <GoogleLogin />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HospitalSignin;


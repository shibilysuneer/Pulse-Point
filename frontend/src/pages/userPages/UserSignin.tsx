// import { useState, type ChangeEvent, type FormEvent } from 'react';
// import loginBg from '../../assets/bloodpulse.jpg';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useNavigate, Link } from 'react-router-dom';
// import { userLogin } from '../../redux/slices/user/userSlice';
// import type { AppDispatch, RootState } from '../../redux/store';

// function UserSignin() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState<string>('');
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { loading } = useSelector((state: RootState) => state.user);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.email || !formData.password) {
//       setError('All fields are required');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError('Invalid email format');
//       return;
//     }

//     try {
//       const result = await dispatch(userLogin(formData)).unwrap();
//       console.log('Login result:', result);
//       toast.success('Login successful');
//       navigate('/user/home');
//     } catch (err: any) {
//       console.error('Login error:', err);
//       setError(err || 'Login failed');
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
//       style={{ backgroundImage: `url(${loginBg})` }}
//     >
//       <div className="flex justify-center items-center flex-grow pt-16">
//         <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
//           <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Login</h2>
//           {error && <p className="text-red-600 text-center mb-4">{error}</p>}

//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
//           />

//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
//           />

//           <div className="flex justify-between text-sm mb-4 text-gray-600">
//             <Link to="/user/forgot" className="hover:underline text-black-600">
//               Forgot your Password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>

//           <div className="text-sm text-center mt-4 text-gray-700">
//             Don’t have an account?{' '}
//             <Link to="/user/signup" className="text-red-600 font-medium hover:underline">
//               Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UserSignin;


import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginBg from '../../assets/bloodpulse.jpg';
import { userLogin } from '../../redux/slices/user/userSlice';
import { signinSchema } from '../../validations/signinValidation';
import type { AppDispatch, RootState } from '../../redux/store';
import { useState } from 'react';

function UserSignin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const { loading } = useSelector((state: RootState) => state.user);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setFormError(null)
    try {
      await dispatch(userLogin(values)).unwrap();
      toast.success('Login successful');
      navigate('/user/home');
    } catch (err: any) {
      // const message =// err?.response?.data?.message || err?.message || 'Login failed';
        const message = typeof err === 'string' ? err : (err?.message || 'Login failed');
        toast.error(message);
        setFormError(message);
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
                Login
              </h2>

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 mb-2 rounded-full border focus:outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm mb-2 text-center"
              />

              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 mb-2 rounded-full border focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm mb-4 text-center"
              />

              <div className="flex justify-between text-sm mb-4 text-gray-600">
                <Link to="/user/forgot" className="hover:underline text-black-600">
                  Forgot your Password?
                </Link>
              </div>
              
{formError && (
  <div className="text-red-600 text-sm mb-4 text-center">{formError}</div>
)}
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full"
              >
                {loading || isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-sm text-center mt-4 text-gray-700">
                Don’t have an account?{' '}
                <Link
                  to="/user/signup"
                  className="text-red-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserSignin;

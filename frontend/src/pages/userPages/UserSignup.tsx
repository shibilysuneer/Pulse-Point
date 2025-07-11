import { useState, type ChangeEvent, type FormEvent } from 'react';
import loginBg from '../../assets/bloodpulse.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { userSignup } from '../../redux/slices/user/userSlice';
import type { AppDispatch, RootState } from '../../redux/store';

function UserSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const { username, email, password } = formData;

    if (!username || !email || !password ) {
      setError('All fields are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await dispatch(userSignup(formData)).unwrap();
      console.log('Signup result:', result);
      toast.success('Signup successful');
      navigate('/user/home');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err || 'Signup failed');
    }
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="flex justify-center items-center flex-grow pt-16">
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Signup</h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 mb-4 rounded-full border focus:outline-none"
          />


          <div className="flex justify-between text-sm mb-4 text-gray-600">
            <Link to="/user/signin" className="hover:underline text-black-600">
              Already have an account? Login
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full"
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSignup;

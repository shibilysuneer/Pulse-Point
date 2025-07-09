import axios from 'axios'
import { HttpStatus } from '../utils/httpStatus';

const UserAPI = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL, 
   headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

//  Add this interceptor to automatically attach token to every request
UserAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//reponse
UserAPI.interceptors.response.use(
  (response) => response,
  (error) => {
     const originalRequestUrl = error.config?.url || '';
         console.log('❗ Axios interceptor caught error for:', originalRequestUrl);
    if (error.response?.status === HttpStatus.UNAUTHORIZED && //401
       !originalRequestUrl.includes('/login'))
       { 
      localStorage.removeItem('user_token');
     
      window.location.href = '/user/signin'; 
    }
    return Promise.reject(error);
  }
);

export default UserAPI;
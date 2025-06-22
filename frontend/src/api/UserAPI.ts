import axios from 'axios'

const UserAPI = axios.create({
  baseURL: import.meta.env.VITE_USER_API_URL, 
   headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default UserAPI;
import axios from 'axios'

const HospitalAPI = axios.create({
  baseURL: import.meta.env.VITE_HOSPITAL_API_URL, 
  withCredentials: true, 
});

export default HospitalAPI;
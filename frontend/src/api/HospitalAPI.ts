import axios from 'axios'

const HospitalAPI = axios.create({
  baseURL: "/api/hospital", // Adjust to your backend route
  withCredentials: true, // If you're using cookies for auth
});

export default HospitalAPI;
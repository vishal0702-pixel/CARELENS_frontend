import axios from "axios";

const axiosclient = axios.create({
  baseURL: 'https://carelens-backend.vercel.app',
  withCredentials:true,
  headers: {'content-type': 'application/json'}
});

export default axiosclient ;
import axios from 'axios';
import { API_URL } from "../config.js";
const API = axios.create({
  baseURL: 'https://artraker.onrender.com', 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

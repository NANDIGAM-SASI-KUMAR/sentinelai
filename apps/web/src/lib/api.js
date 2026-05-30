import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export const api = axios.create({ baseURL: API + '/api' });
api.interceptors.request.use(c => {
  const t = localStorage.getItem('token');
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});
export const API_URL = API;

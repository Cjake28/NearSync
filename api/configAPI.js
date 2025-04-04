import axios from 'axios';
import { getAuthTokens } from './storage';

const api = axios.create({
  baseURL: 'https://your-api.com/api', // change to your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Automatically attach access token
api.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

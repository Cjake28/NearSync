import { create } from 'zustand';
import { storeAuthData, getAuthData, clearAuthData } from '../storage/authStorage.js';
import axios from 'axios'; // or wherever your axios instance is

const URL = 'http://192.168.100.134:8989'

const useAuthStore = create((set) => ({
  accessToken: null,
  mqttEmail: null,
  mqttPass: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  email_verification: null,
  isverifying: false,
  
  signup: async(FirstName, email, password) => {
    set({ isLoading: true, error: null });

    try{
      console.log('res')
      const res = await axios.post(`http://192.168.100.134:8989/api/auth/signup`, { FirstName, email, password });
      console.log(res)
      set({
        isLoading: false,
        email_verification: email,
        isverifying: true
      });

    }catch(error){
      set({
        error: err?.response?.data?.message || 'Sign in failed',
        isLoading: false,
      });
    }
  },

  verify: async(code) => {
    set({ isLoading: true, error: null });

    try{
        const { email_verification } = useAuthStore.getState();
        const res = await axios.post(`${URL}/api/auth/verify`, { email: email_verification, code });
        
        const { accessToken, refreshToken, mqttEmail, mqttPass, user } = res.data;

        // Store persistently
        storeAuthData({ accessToken, refreshToken, mqttEmail, mqttPass, user });
  
        // Set in Zustand
        set({
          accessToken,
          refreshToken,
          mqttEmail,
          mqttPass,
          user,
          isAuthenticated: true,
          isLoading: false,
          email_verification: null,
          isverifying: false
        });
  
      }catch(error){
        set({
          error: err?.response?.data?.message || 'Sign in failed',
          isLoading: false,
        });
      }
  },

  // ✅ Login function
  signin: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(`${URL}/auth/login`, { email, password });

      const { accessToken, refreshToken, mqttEmail, mqttPass, user } = res.data;

      // Store persistently
      storeAuthData({ accessToken, refreshToken, mqttEmail, mqttPass, user });

      // Set in Zustand
      set({
        accessToken,
        refreshToken,
        mqttEmail,
        mqttPass,
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err?.response?.data?.message || 'Login failed',
        isLoading: false,
      });
    }
  },

  // ✅ Restore session (on app start)
  restoreSession: () => {
    const { accessToken, refreshToken, mqttEmail, mqttPass, user } = getAuthData();

    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
        mqttEmail,
        mqttPass,
        user,
        isAuthenticated: true,
      });
    }
  },

  // ✅ Logout
  logout: () => {
    clearAuthData();

    set({
      accessToken: null,
      refreshToken: null,
      mqttEmail: null,
      mqttPass: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },
}));

export default useAuthStore;

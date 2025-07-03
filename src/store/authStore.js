import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      initAuth: () => {
        const token = localStorage.getItem('token');
        if (token) {
          set({ token, isAuthenticated: true });
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      },

login: async (credentials) => {
  set({ isLoading: true, error: null });

  try {
    const response = await api.post('/login', credentials);

    if (!response.data?.token) {
      throw new Error('No token in response');
    }

    const { token, user } = response.data;

    if (typeof token !== 'string' || token.split('.').length !== 3) {
      throw new Error('Invalid token format');
    }

    // Store token and set auth header
    localStorage.setItem('auth_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Update state
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });

    return { success: true, user };
  } catch (error) {
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    
    set({ 
      isLoading: false, 
      error: errorMessage 
    });
    
    return { success: false, error: errorMessage };
  }
},


verifyAuth: () => {
  const state = get();
  const storedToken = localStorage.getItem('auth_token');
  
  console.log("Auth verification:", {
    storeToken: state.token,
    storedToken,
    headers: api.defaults.headers.common['Authorization'],
    user: state.user
  });

  return !!storedToken && storedToken === state.token;
},


      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/register', userData);
          const { token, user } = response.data;
          
          localStorage.setItem('token', token);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Registration failed';
          set({ isLoading: false, error: message });
          return { success: false, error: message };
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          error: null 
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
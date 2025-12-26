import axios from 'axios';

// Base URL for your backend API
// In development, Vite proxy will handle /api requests
// In production, set VITE_API_BASE_URL environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // สำคัญสำหรับ session/cookies
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (data: { email: string; password: string; [key: string]: any }) =>
    api.post('/auth/registerLocal', data),
  
  verifyEmail: (token: string) =>
    api.post('/auth/verifyEmail', { token }),
  
  resendVerification: (email: string) =>
    api.post('/auth/resendVerification', { email }),
  
  loginWithGoogle: (data: any) =>
    api.post('/auth/loginWithGoogle', data),
  
  registerWithGoogle: (data: any) =>
    api.post('/auth/registerWithGoogle', data),
};

// Customer API calls
export const customerAPI = {
  create: (data: any) =>
    api.post('/customer/createCustomer', data),
  
  getById: (id: string) =>
    api.get(`/customer/getCustomer/${id}`),
  
  update: (id: string, data: any) =>
    api.put(`/customer/updateCustomer/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/customer/deleteCustomer/${id}`),
  
  softDelete: (id: string) =>
    api.put(`/customer/softDeleteCustomer/${id}`),
  
  restore: (id: string) =>
    api.put(`/customer/restoreCustomer/${id}`),
};

// Employee API calls
export const employeeAPI = {
  create: (data: any) =>
    api.post('/employee/createEmployee', data),
  
  getAll: () =>
    api.get('/employee/getEmployee'),
  
  getById: (id: string) =>
    api.get(`/employee/getEmployee/${id}`),
  
  update: (id: string, data: any) =>
    api.put(`/employee/updateEmployee/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/employee/deleteEmployee/${id}`),
  
  softDelete: (id: string) =>
    api.put(`/employee/softDeleteEmployee/${id}`),
  
  restore: (id: string) =>
    api.put(`/employee/restoreEmployee/${id}`),
};

// Email API calls
export const emailAPI = {
  send: (data: { name: string; nameCustomer: string; email: string; message: string }) =>
    api.post('/email/sendEmail', data),
};

export default api;


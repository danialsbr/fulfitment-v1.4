import axios from 'axios';
import type { ApiResponse } from './types';

export const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data as ApiResponse,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    throw new Error(message);
  }
);
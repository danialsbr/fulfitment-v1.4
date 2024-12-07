import axios from 'axios';
import { Order } from '../components/fulfillment/types';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fulfillmentApi = {
  // Get all orders
  getOrders: async () => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  // Get order details
  getOrderDetails: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Scan order
  scanOrder: async (orderId: string, sku: string) => {
    const response = await api.post('/scan', { orderId, sku });
    return response.data;
  },

  // Upload file
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update transfer
  updateTransfer: async (orderId: string, transferType: string) => {
    const response = await api.put(`/orders/${orderId}/transfer`, { transferType });
    return response.data;
  },

  // Reset system
  resetSystem: async () => {
    const response = await api.post('/reset');
    return response.data;
  },

  // Get product image URL
  getProductImageUrl: async (sku: string) => {
    try {
      const response = await api.get(`/product/${sku}/image`);
      return response.data.imageUrl;
    } catch {
      return 'https://via.placeholder.com/100';
    }
  }
};
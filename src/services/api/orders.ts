import { api } from './config';
import type { ApiResponse, Order } from './types';

export const ordersApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Record<string, Order>>>('/orders');
    return Object.entries(response.data).map(([id, order]) => ({
      id,
      ...order,
    }));
  },

  getById: async (orderId: string) => {
    const response = await api.get<ApiResponse<Order>>(`/orders/${orderId}`);
    return response.data;
  },

  updateStatus: async (orderId: string, status: string) => {
    const response = await api.put<ApiResponse>(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};
import { api } from './config';
import type { ApiResponse } from './types';

export const transferApi = {
  update: async (orderId: string, transferType: string) => {
    const response = await api.put<ApiResponse>(`/orders/${orderId}/transfer`, { transferType });
    return response.data;
  },

  getStatus: async (orderId: string) => {
    const response = await api.get<ApiResponse>(`/orders/${orderId}/transfer`);
    return response.data;
  }
};
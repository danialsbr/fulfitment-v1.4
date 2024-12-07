import { api } from './config';
import type { ApiResponse } from './types';

export interface Log {
  id: string;
  timestamp: string;
  message: string;
  status: 'success' | 'error' | 'pending';
  details?: string;
}

export const logsApi = {
  getAll: async () => {
    const response = await api.get<ApiResponse<Log[]>>('/logs');
    return response.data;
  },
};
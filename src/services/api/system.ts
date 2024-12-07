import { api } from './config';
import type { ApiResponse, SystemStatus } from './types';

export const systemApi = {
  checkStatus: async () => {
    try {
      const response = await api.get<ApiResponse<SystemStatus>>('/system/status');
      return response.data;
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'System check failed',
        success: false,
      };
    }
  },

  ping: async () => {
    const start = Date.now();
    await api.get('/ping');
    return Date.now() - start;
  },
};
import { api } from './config';

export const productsApi = {
  getImageUrl: async (sku: string) => {
    try {
      const response = await api.get(`/product/${sku}/image`);
      return response.data.imageUrl;
    } catch {
      return 'https://via.placeholder.com/100';
    }
  }
};
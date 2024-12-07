export interface Order {
  id: string;
  sku: string;
  title: string;
  color: string;
  quantity: number;
  scanned: number;
  status: string;
  scanTimestamp?: string;
  price: string;
}

export type OrderStatus = 'Fulfilled' | 'Pending' | 'Error';
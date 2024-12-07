import { ordersApi } from './orders';
import { uploadApi } from './upload';
import { systemApi } from './system';
import { transferApi } from './transfer';
import { logsApi } from './logs';

export const fulfillmentApi = {
  orders: ordersApi,
  upload: uploadApi,
  system: systemApi,
  transfer: transferApi,
  logs: logsApi,
};

export type { ApiResponse, Order, SystemStatus, Log } from './types';
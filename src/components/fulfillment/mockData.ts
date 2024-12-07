import { Order } from './types';

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    sku: "PRD-123",
    title: "پیراهن آستین بلند مردانه",
    color: "آبی",
    quantity: 2,
    scanned: 1,
    status: "Pending",
    price: "1,200,000",
    scanTimestamp: "1402/12/25 14:30"
  },
  {
    id: "ORD-002",
    sku: "PRD-124",
    title: "شلوار جین مردانه",
    color: "مشکی",
    quantity: 1,
    scanned: 1,
    status: "Fulfilled",
    price: "980,000",
    scanTimestamp: "1402/12/25 15:45"
  },
  {
    id: "ORD-003",
    sku: "PRD-125",
    title: "تی‌شرت یقه گرد",
    color: "سفید",
    quantity: 3,
    scanned: 0,
    status: "Error",
    price: "450,000",
    scanTimestamp: null
  }
];
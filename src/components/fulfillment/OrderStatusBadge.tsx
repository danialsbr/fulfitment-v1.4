import React from 'react';
import { Package, Truck, AlertCircle } from 'lucide-react';
import { OrderStatus } from './types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusConfig = {
    Fulfilled: {
      icon: Truck,
      className: 'bg-green-100 text-green-700',
    },
    Pending: {
      icon: Package,
      className: 'bg-yellow-100 text-yellow-700',
    },
    Error: {
      icon: AlertCircle,
      className: 'bg-red-100 text-red-700',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.className}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}
import React from 'react';
import { Package, ArrowLeft } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface OrderDetailsProps {
  orderId: string;
  orderDetails: any;
  onBack: () => void;
}

export function OrderDetails({ orderId, orderDetails, onBack }: OrderDetailsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-semibold">جزئیات سفارش {orderId}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <div>استان: {orderDetails.State}</div>
            <div>شهر: {orderDetails.City}</div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            سفارش جدید
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Object.entries(orderDetails.SKUs).map(([sku, details]: [string, any]) => (
            <ProductCard key={sku} sku={sku} details={details} />
          ))}
        </div>

        {orderDetails.Payment && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">
              مبلغ کل پرداختی: {orderDetails.Payment} تومان
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
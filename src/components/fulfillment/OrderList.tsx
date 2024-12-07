import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns-jalali';
import { Package } from 'lucide-react';
import { Order } from '../../types';
import { OrderStatusBadge } from './OrderStatusBadge';
import { fulfillmentApi } from '../../services/api';
import { useTranslation } from '../../hooks/useTranslation';

export function OrderList() {
  const t = useTranslation();
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fulfillmentApi.orders.getAll(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        خطا در دریافت اطلاعات. لطفا صفحه را مجددا بارگذاری کنید.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-semibold">لیست سفارشات</h2>
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(), 'yyyy/MM/dd')}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" dir="rtl">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">ردیف</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">سریال</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">کد محصول</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">شرح محصول</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">رنگ</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">تعداد درخواستی</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">تعداد اسکن شده</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">تاریخ و ساعت اسکن</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">وضعیت</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">مبلغ پرداختی</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">تصویر</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders?.map((order: Order, index: number) => (
              <tr key={`${order.id}-${order.sku}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{index + 1}</td>
                <td className="px-6 py-4 text-sm">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.sku}</td>
                <td className="px-6 py-4 text-sm">{order.title}</td>
                <td className="px-6 py-4 text-sm">{order.color}</td>
                <td className="px-6 py-4 text-sm">{order.quantity}</td>
                <td className="px-6 py-4 text-sm">{order.scanned}</td>
                <td className="px-6 py-4 text-sm">{order.scanTimestamp || '—'}</td>
                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-sm">{order.price}</td>
                <td className="px-6 py-4">
                  <a 
                    href={`https://www.mezonroban.com/product/${order.sku}/`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-12 h-12 rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
                  >
                    <img
                      src={`https://www.mezonroban.com/product/${order.sku}/image`}
                      alt={order.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/100';
                      }}
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Package } from 'lucide-react';

export function FulfillmentLayout() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <Package className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-semibold">سیستم تکمیل سفارشات</h1>
        </div>
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
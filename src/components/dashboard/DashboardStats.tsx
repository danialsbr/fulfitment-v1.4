import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Package, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { StatsCard } from './StatsCard';
import { RecentActivity } from './RecentActivity';
import { SystemStatus } from './SystemStatus';
import { fulfillmentApi } from '../../services/api';

export function DashboardStats() {
  const t = useTranslation();
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fulfillmentApi.orders.getAll(),
  });

  // Calculate statistics
  const stats = {
    total: orders?.length || 0,
    fulfilled: orders?.filter(order => order.status === 'Fulfilled').length || 0,
    pending: orders?.filter(order => order.status === 'Pending').length || 0,
    error: orders?.filter(order => order.status === 'Error').length || 0,
  };

  const fulfillmentRate = stats.total > 0 
    ? Math.round((stats.fulfilled / stats.total) * 100) 
    : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t.dashboard.totalOrders}
          value={stats.total}
          icon={<Package className="h-6 w-6 text-blue-500" />}
        />
        <StatsCard
          title={t.dashboard.fulfilled}
          value={stats.fulfilled}
          icon={<CheckCircle className="h-6 w-6 text-green-500" />}
          trend={{ value: fulfillmentRate, isPositive: true }}
        />
        <StatsCard
          title={t.dashboard.pending}
          value={stats.pending}
          icon={<Truck className="h-6 w-6 text-yellow-500" />}
        />
        <StatsCard
          title={t.dashboard.errors}
          value={stats.error}
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <SystemStatus />
        
        {/* Recent Activity Log */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Fulfillment Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">{t.dashboard.fulfillmentProgress}</h2>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {t.dashboard.progress}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {fulfillmentRate}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${fulfillmentRate}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
            />
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">{t.dashboard.orderStatus}</h3>
          <div className="space-y-2">
            {[
              { label: t.dashboard.fulfilled, value: stats.fulfilled, color: 'bg-green-500' },
              { label: t.dashboard.pending, value: stats.pending, color: 'bg-yellow-500' },
              { label: t.dashboard.errors, value: stats.error, color: 'bg-red-500' },
            ].map((status) => (
              <div key={status.label} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${status.color} mr-2`} />
                <span className="text-sm text-gray-600 flex-1">{status.label}</span>
                <span className="text-sm font-medium">{status.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
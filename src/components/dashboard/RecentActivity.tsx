import React from 'react';
import { Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'New order received',
    description: 'Order #12345 from John Doe',
    time: '5 minutes ago',
  },
  {
    id: 2,
    title: 'Inventory updated',
    description: 'Stock levels adjusted for 15 items',
    time: '2 hours ago',
  },
  {
    id: 3,
    title: 'Payment received',
    description: '$1,234.56 received for Order #12344',
    time: '4 hours ago',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Clock className="text-gray-400" size={20} />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-l-2 border-blue-500 pl-4">
            <h3 className="font-medium">{activity.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            <span className="text-xs text-gray-400 mt-1 block">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
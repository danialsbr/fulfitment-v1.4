import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export function Header() {
  const t = useTranslation();

  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder={t.common.search}
              className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-right">
              <div className="font-medium">{t.user.profile}</div>
              <div className="text-gray-500">{t.user.role}</div>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
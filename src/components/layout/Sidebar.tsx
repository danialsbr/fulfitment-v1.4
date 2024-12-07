import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings,
  LogOut,
  Truck,
  ScanLine,
  Upload,
  List,
  Download,
  RotateCcw
} from 'lucide-react';
import { NavLink } from './NavLink';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../contexts/AuthContext';

export function Sidebar() {
  const t = useTranslation();
  const { logout } = useAuth();

  return (
    <aside className="bg-gray-900 text-white w-72 min-h-screen p-4 fixed right-0 rtl">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Package className="h-8 w-8 text-blue-400" />
        <span className="text-xl font-bold">{t.fulfillment.title}</span>
      </div>
      
      <nav className="space-y-6">
        <div>
          <NavLink to="/" icon={<LayoutDashboard size={20} />}>
            {t.common.dashboard}
          </NavLink>
        </div>

        <div>
          <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t.fulfillment.title}
          </div>
          <div className="space-y-1">
            <NavLink to="/fulfillment" icon={<Upload size={20} />}>
              {t.fulfillment.uploadFile}
            </NavLink>
            <NavLink to="/fulfillment/orders" icon={<List size={20} />}>
              {t.fulfillment.viewOrders}
            </NavLink>
            <NavLink to="/fulfillment/scan" icon={<ScanLine size={20} />}>
              {t.fulfillment.scanOrders}
            </NavLink>
            <NavLink to="/fulfillment/transfer" icon={<Truck size={20} />}>
              {t.fulfillment.transfer}
            </NavLink>
          </div>
        </div>

        <div>
          <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t.common.reports}
          </div>
          <div className="space-y-1">
            <NavLink to="/fulfillment/logs" icon={<FileText size={20} />}>
              {t.fulfillment.viewLogs}
            </NavLink>
            <NavLink to="/fulfillment/download" icon={<Download size={20} />}>
              {t.fulfillment.downloadUpdated}
            </NavLink>
          </div>
        </div>

        <div>
          <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {t.common.settings}
          </div>
          <div className="space-y-1">
            <NavLink to="/settings" icon={<Settings size={20} />}>
              {t.common.settings}
            </NavLink>
            <NavLink to="/fulfillment/reset" icon={<RotateCcw size={20} />}>
              {t.fulfillment.reset}
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-gray-400 hover:text-white w-full px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>{t.common.logout}</span>
        </button>
      </div>
    </aside>
  );
}
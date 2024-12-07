import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface NavLinkProps {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
}

export function NavLink({ to, children, icon }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to}
      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      {icon}
      <span className="flex-1">{children}</span>
      <ChevronLeft size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
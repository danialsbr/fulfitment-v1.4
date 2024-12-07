import React, { useRef, useEffect } from 'react';
import { ScanLine } from 'lucide-react';

interface ScannerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  label: string;
  icon?: React.ReactNode;
  loading?: boolean;
  autoFocus?: boolean;
}

export function ScannerInput({
  value,
  onChange,
  onSubmit,
  label,
  icon = <ScanLine className="h-5 w-5 text-gray-400" />,
  loading,
  autoFocus
}: ScannerInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="scanner-input" className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            id="scanner-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="rtl"
            disabled={loading}
          />
          <div className="absolute left-3 top-2.5">
            {icon}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !value}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? 'در حال پردازش...' : 'ثبت'}
      </button>
    </form>
  );
}
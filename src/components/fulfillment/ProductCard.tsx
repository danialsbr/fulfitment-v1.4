import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  sku: string;
  details: {
    Title: string;
    Color: string;
    Quantity: number;
    Scanned: number;
    Price: string;
    Status?: string;
    ScanTimestamp?: string;
    ImageUrl?: string;
  };
}

export function ProductCard({ sku, details }: ProductCardProps) {
  const isComplete = details.Scanned >= details.Quantity;
  const imageUrl = details.ImageUrl || `https://www.setmen.com/product/${sku}/`;

  return (
    <div className={`p-4 rounded-lg border ${
      isComplete ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={details.Title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/100';
            }}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium">{sku}</span>
            <span className="text-xs text-gray-500">{details.Color}</span>
          </div>
          
          <p className="text-sm mb-2 line-clamp-2">{details.Title}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isComplete ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <span className="text-sm">
                اسکن شده: {details.Scanned} از {details.Quantity}
              </span>
            </div>
            <span className="text-sm text-gray-500">{details.Price} تومان</span>
          </div>

          {details.ScanTimestamp && (
            <div className="mt-2 text-xs text-gray-500">
              آخرین اسکن: {details.ScanTimestamp}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { ScanLine, CheckCircle, XCircle } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fulfillmentApi } from '../../services/api';
import { ScannerInput } from './ScannerInput';
import { OrderDetails } from './OrderDetails';

export function OrderScanner() {
  const [orderId, setOrderId] = useState('');
  const [sku, setSku] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: orderDetails, isLoading: orderLoading } = useQuery({
    queryKey: ['order', currentOrderId],
    queryFn: () => currentOrderId ? fulfillmentApi.orders.getById(currentOrderId) : null,
    enabled: !!currentOrderId,
  });

  const scanMutation = useMutation({
    mutationFn: ({ orderId, sku }: { orderId: string; sku: string }) => {
      return fulfillmentApi.orders.scan(orderId, sku);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', currentOrderId] });
      setSku('');
    },
  });

  const handleOrderSubmit = () => {
    if (orderId) {
      setCurrentOrderId(orderId);
      setSku('');
    }
  };

  const handleSkuSubmit = () => {
    if (currentOrderId && sku) {
      scanMutation.mutate({ orderId: currentOrderId, sku });
    }
  };

  const handleBack = () => {
    setCurrentOrderId(null);
    setOrderId('');
    setSku('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!currentOrderId ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <ScannerInput
            value={orderId}
            onChange={setOrderId}
            onSubmit={handleOrderSubmit}
            label="شماره سفارش"
            autoFocus
          />
        </div>
      ) : (
        <>
          {orderLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : orderDetails ? (
            <>
              <OrderDetails
                orderId={currentOrderId}
                orderDetails={orderDetails}
                onBack={handleBack}
              />

              <div className="bg-white rounded-xl shadow-sm p-6">
                <ScannerInput
                  value={sku}
                  onChange={setSku}
                  onSubmit={handleSkuSubmit}
                  label="کد محصول"
                  loading={scanMutation.isPending}
                  autoFocus
                />

                {scanMutation.isSuccess && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>اسکن با موفقیت ثبت شد</span>
                  </div>
                )}

                {scanMutation.isError && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    <span>خطا در ثبت اسکن</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
              سفارش مورد نظر یافت نشد
            </div>
          )}
        </>
      )}
    </div>
  );
}
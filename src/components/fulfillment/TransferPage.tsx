import React, { useState } from 'react';
import { Truck, Package, CheckCircle, ScanLine } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fulfillmentApi } from '../../services/api';
import { ScannerInput } from './ScannerInput';
import { useTranslation } from '../../hooks/useTranslation';

const transferOptions = [
  { id: 'پست', label: 'پست', icon: Truck },
  { id: 'اسنپ باکس', label: 'اسنپ باکس', icon: Package },
  { id: 'ماهکس', label: 'ماهکس', icon: Truck },
];

export function TransferPage() {
  const [orderId, setOrderId] = useState('');
  const [selectedTransfer, setSelectedTransfer] = useState('');
  const queryClient = useQueryClient();
  const t = useTranslation();

  const { data: orderDetails, isLoading: orderLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => orderId ? fulfillmentApi.orders.getById(orderId) : null,
    enabled: !!orderId,
  });

  const transferMutation = useMutation({
    mutationFn: ({ orderId, transferType }: { orderId: string; transferType: string }) =>
      fulfillmentApi.transfer.update(orderId, transferType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setOrderId('');
      setSelectedTransfer('');
    },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-semibold">{t.fulfillment.transfer}</h2>
        </div>

        {/* Transfer Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.fulfillment.transferTypes.title}
          </label>
          <div className="grid grid-cols-3 gap-4">
            {transferOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedTransfer(option.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                    selectedTransfer === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <Icon className="h-6 w-6 text-blue-500" />
                  <span className="text-sm">{option.label}</span>
                  {selectedTransfer === option.id && (
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scanner Input */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <ScannerInput
            value={orderId}
            onChange={setOrderId}
            onSubmit={() => {}}
            label={t.fulfillment.scanOrderId}
            icon={<ScanLine className="h-5 w-5 text-gray-400" />}
            autoFocus
          />
        </div>

        {/* Order Details */}
        {orderLoading ? (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : orderDetails ? (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900">{t.fulfillment.orderDetails}</h3>
            <div className="mt-2 text-sm text-blue-800">
              <p>{t.fulfillment.orderId}: {orderDetails.id}</p>
              <p>{t.fulfillment.status}: {orderDetails.status}</p>
            </div>
          </div>
        ) : orderId ? (
          <div className="mt-4 bg-red-50 p-4 rounded-lg text-red-800">
            {t.fulfillment.orderNotFound}
          </div>
        ) : null}

        {/* Submit Button */}
        {orderDetails?.status === 'Fulfilled' && selectedTransfer && (
          <button
            onClick={() => transferMutation.mutate({ orderId, transferType: selectedTransfer })}
            disabled={transferMutation.isPending}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {transferMutation.isPending ? t.common.processing : t.fulfillment.submitTransfer}
          </button>
        )}

        {transferMutation.isSuccess && (
          <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="h-5 w-5" />
            <span>{t.fulfillment.transferSuccess}</span>
          </div>
        )}
      </div>
    </div>
  );
}
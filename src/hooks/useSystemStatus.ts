import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { systemApi } from '../services/api/system';

export function useSystemStatus() {
  const [latency, setLatency] = useState<number>(0);

  const { data: status, isError } = useQuery({
    queryKey: ['system-status'],
    queryFn: systemApi.checkStatus,
    refetchInterval: 30000, // Check every 30 seconds
  });

  useEffect(() => {
    const checkLatency = async () => {
      const start = Date.now();
      try {
        await systemApi.ping();
        const end = Date.now();
        setLatency(end - start);
      } catch (error) {
        setLatency(0);
      }
    };

    const interval = setInterval(checkLatency, 10000); // Check latency every 10 seconds
    checkLatency(); // Initial check

    return () => clearInterval(interval);
  }, []);

  return {
    isConnected: !isError && status?.status === 'operational',
    latency,
    status,
  };
}
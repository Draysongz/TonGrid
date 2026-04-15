import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5, // 5 seconds
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchInterval: false, // We'll set per-query
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

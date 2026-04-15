import { useEffect } from 'react';

/**
 * Generic hook for polling data at regular intervals
 * Automatically handles cleanup and prevents memory leaks
 * 
 * @param callback - Function to call on each interval
 * @param interval - Milliseconds between calls (default 30000ms = 30s)
 * @param enabled - Whether polling is active (default true)
 */
export function useAutoRefresh(
  callback: () => void | Promise<void>,
  interval: number = 30000,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    // Call immediately on mount
    callback();

    // Then set up interval
    const timer = setInterval(() => {
      callback();
    }, interval);

    // Cleanup on unmount or when disabled
    return () => clearInterval(timer);
  }, [callback, interval, enabled]);
}

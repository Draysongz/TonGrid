import { useEffect, useState } from 'react';
import { Address } from '@ton/core';

/**
 * Extract referral address from URL parameters
 * Supports: ?ref=EQxxx or /ref/EQxxx format
 */
export function useReferralLink(): string | null {
  const [referralAddress, setReferralAddress] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Check query parameters: ?ref=EQxxx
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get('ref');
      
      if (refParam) {
        // Validate it's a valid TON address
        try {
          const addr = Address.parse(refParam);
          setReferralAddress(addr.toString());
          return;
        } catch {
          console.warn('Invalid referral address in URL:', refParam);
        }
      }

      // Check path: /ref/EQxxx
      const pathMatch = window.location.pathname.match(/\/ref\/([a-zA-Z0-9_-]+)/);
      if (pathMatch && pathMatch[1]) {
        try {
          const addr = Address.parse(pathMatch[1]);
          setReferralAddress(addr.toString());
          return;
        } catch {
          console.warn('Invalid referral address in path:', pathMatch[1]);
        }
      }
    } catch (error) {
      console.error('Error parsing referral link:', error);
    }
  }, []);

  return referralAddress;
}

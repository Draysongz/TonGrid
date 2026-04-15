import { useState } from 'react';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { getConfig, parseReferrer } from '@/lib/contract.config';
import { TonGridMain } from '@/contract/MainContract';
import { Address, toNano } from '@ton/core';
import { type OpenedContract } from '@ton/core';

export interface RegisterResult {
  success: boolean;
  error?: string;
}

export function useRegister() {
  const { sender, connected } = useTonConnect();
  const client = useTonClient();
  const [isLoading, setIsLoading] = useState(false);

  // referrerParam: address string from URL, or null if no referral link
  // Falls back to owner on-chain if referrer is invalid or unregistered
  const register = async (referrerParam: string | null): Promise<RegisterResult> => {
    if (!connected) {
      return { success: false, error: 'Wallet not connected' };
    }

    setIsLoading(true);

    try {
      const config  = getConfig();
      const contract = TonGridMain.fromAddress(config.mainAddress);
      const mainContract= client.open(contract) as OpenedContract<TonGridMain>;

      // Parse referrer — fall back to owner if missing or invalid
      let referrer: Address;
      const parsed = parseReferrer(referrerParam);
      if (parsed) {
        referrer = parsed;
      } else {
        // No valid referrer param — pass owner address
        // Contract will also fallback to owner if this address isn't registered
        referrer = await mainContract.getGetOwner();
      }

      // 2 TON registration fee + 0.2 TON gas buffer
      const value = toNano('2') + toNano('0.2');

      await mainContract?.send(
        sender,
        { value },
        { $$type: 'Register' as const, referrer }
      );

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
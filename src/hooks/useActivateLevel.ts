import { useState } from 'react';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { getConfig, LEVEL_COSTS } from '@/lib/contract.config';
import { TonGridMain } from '@/contract/MainContract';
import { toNano, type OpenedContract } from '@ton/core';

export interface ActivateLevelResult {
  success: boolean;
  error?: string;
}

export function useActivateLevel() {
  const { sender, connected } = useTonConnect();
  const client = useTonClient();
  const [isLoading, setIsLoading] = useState(false);

  const activateLevel = async (level: number): Promise<ActivateLevelResult> => {
    if (!connected) {
      return { success: false, error: 'Wallet not connected' };
    }

    if (level < 2 || level > 15) {
      return { success: false, error: 'Invalid level (must be 2-15)' };
    }

    setIsLoading(true);

    try {
      const config = getConfig();
      const contract = TonGridMain.fromAddress(config.mainAddress);
      const mainContract = client.open(contract) as OpenedContract<TonGridMain>;

      const costStr = LEVEL_COSTS[level];
      if (costStr === undefined) {
        return { success: false, error: `No cost defined for level ${level}` };
      }

      // Both matrices activated simultaneously — cost * 2 + 0.2 TON gas buffer
      const value = toNano(costStr) * 2n + toNano('0.2');

      await mainContract?.send(
        sender,
        { value },
        { $$type: 'ActivateLevel' as const, level: BigInt(level) }
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

  return { activateLevel, isLoading };
}
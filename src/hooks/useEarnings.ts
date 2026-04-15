import { useEffect, useState } from 'react';
import { useTonConnect } from './useTonConnect';
import { useContractEvents } from './useContractEvents';
import { usePoolData } from './usePoolData';

export interface EarningsState {
  totalEarned: number; // in TON
  x3Earnings: number;
  x6Earnings: number;
  poolShare: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: EarningsState = {
  totalEarned: 0,
  x3Earnings: 0,
  x6Earnings: 0,
  poolShare: 0,
  isLoading: false,
  error: null,
};

/**
 * Hook to track user earnings from different sources
 * Calculates X3/X6 from contract events and pool share from pool contract
 */
export function useEarnings() {
  const { connected } = useTonConnect();
  const { myRewards, isLoading: eventsLoading, error: eventsError } = useContractEvents();
  const { totalClaimed, userShareTon, isLoading: poolLoading, error: poolError } = usePoolData();
  const [state, setState] = useState<EarningsState>(initialState);

  useEffect(() => {
    if (!connected || !myRewards) {
      setState(initialState);
      return;
    }

    // Calculate earnings from reward events
    let x3Total = 0;
    let x6Total = 0;

    for (const reward of myRewards) {
      if (reward.matrix === 1) {
        x3Total += reward.amount;
      } else if (reward.matrix === 2) {
        x6Total += reward.amount;
      }
    }

    const totalEarned = x3Total + x6Total + totalClaimed;

    setState({
      totalEarned,
      x3Earnings: x3Total,
      x6Earnings: x6Total,
      poolShare: userShareTon,
      isLoading: eventsLoading || poolLoading,
      error: eventsError || poolError || null,
    });
  }, [connected, myRewards, eventsLoading, eventsError, totalClaimed, userShareTon, poolLoading, poolError]);

  return state;
}

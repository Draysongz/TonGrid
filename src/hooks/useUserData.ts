import { useQuery } from '@tanstack/react-query';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { getConfig } from '@/lib/contract.config';
import { TonGridMain } from '@/contract/MainContract';
import { Address } from '@ton/core';
import { useAsyncInitialize } from './useAsyncInitialize';
import { type OpenedContract } from '@ton/core';

export interface UserDataState {
  referrer: string | null;
  registeredTime: number;
  directRefs: number;
  rank: number;
  x3ActiveLevels: number; // raw bitmask
  x6ActiveLevels: number; // raw bitmask
  score: number;
  isRegistered: boolean;
  address: string | null
}

const initialState: UserDataState = {
  referrer: null,
  registeredTime: 0,
  directRefs: 0,
  rank: 0,
  x3ActiveLevels: 0,
  x6ActiveLevels: 0,
  score: 0,
  isRegistered: false,
  address: null
};

export function useUserData() {
  const { connected, userAddress } = useTonConnect();
  const client = useTonClient();
  const config = getConfig();

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = TonGridMain.fromAddress(config.mainAddress);
    return client.open(contract) as OpenedContract<TonGridMain>;
  }, [client]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['userData', userAddress],
    queryFn: async () => {
      if (!connected || !userAddress) {
        return initialState;
      }

      try {
        const addr = Address.parse(userAddress);
        const isRegistered = await mainContract?.getIsRegistered(addr);

        if (!isRegistered) {
          return { ...initialState, isRegistered: false };
        }

        const userData = await mainContract?.getGetUser(addr);

        if (!userData) {
          return { ...initialState, isRegistered: true };
        }

        return {
          referrer: userData.referrer?.toString() ?? null,
          registeredTime: Number(userData.regTime),
          directRefs: Number(userData.directRefs),
          rank: Number(userData.rank),
          x3ActiveLevels: Number(userData.x3ActiveLevels),
          x6ActiveLevels: Number(userData.x6ActiveLevels),
          score: Number(userData.score),
          isRegistered: true,
          address: addr
        };
      } catch (error) {
        console.error('useUserData error:', error);
        throw error;
      }
    },
    enabled: connected && !!userAddress && !!mainContract,
    refetchInterval: 30_000, // 30 seconds
    staleTime: 15_000, // Consider fresh for 15 seconds
  });

  return {
    ...initialState,
    ...data,
    isLoading, // Only true on initial load, not during background refetch
    error: error instanceof Error ? error.message : null,
  } as UserDataState & { isLoading: boolean; error: string | null };
}
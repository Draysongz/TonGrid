import { useQuery } from '@tanstack/react-query';
import { useTonConnect } from './useTonConnect';
import { useTonClient } from './useTonClient';
import { getConfig } from '@/lib/contract.config';
import { TonGridMain } from '@/contract/MainContract';
import { Address } from '@ton/core';
import { type OpenedContract } from '@ton/core';

// X3: 3 slots total. slots = 0 | 1 | 2 filled. 3rd triggers cycle and resets.
export interface X3LevelState {
  slots: number;   // 0–2 currently filled
  cycles: number;
}

// X6: 6 slots total. Row 1 = 2 slots (pay upline). Row 2 = 4 slots (pay user).
// Each field resets to 0 on full cycle. Never exceeds 2 / 4 respectively.
export interface X6LevelState {
  row1: number;    // 0–2 currently filled (pays upline/sponsor)
  row2: number;    // 0–4 currently filled (pays user directly)
  cycles: number;
}

export interface MatrixState {
  x3: Record<number, X3LevelState>;
  x6: Record<number, X6LevelState>;
}

const initialState: MatrixState = {
  x3: {},
  x6: {},
};

const EMPTY_X3: X3LevelState = { slots: 0, cycles: 0 };
const EMPTY_X6: X6LevelState = { row1: 0, row2: 0, cycles: 0 };

export function useMatrixState() {
  const { connected, userAddress } = useTonConnect();
  const client = useTonClient();
  const config = getConfig();

  const { data, isLoading, error} = useQuery({
    queryKey: ['matrixState', userAddress],
    queryFn: async () => {
      if (!connected || !userAddress || !client) {
        return initialState;
      }

      try {
        const addr = Address.parse(userAddress);
        const contract = TonGridMain.fromAddress(config.mainAddress);
        const mainContract = client.open(contract) as OpenedContract<TonGridMain>;

        const x3: Record<number, X3LevelState> = {};
        const x6: Record<number, X6LevelState> = {};

        for (let level = 1; level <= 15; level++) {
          try {
            const x3Raw = await mainContract?.getGetX3State(addr, BigInt(level));
            x3[level] = x3Raw
              ? { slots: Number(x3Raw.slots), cycles: Number(x3Raw.cycles) }
              : EMPTY_X3;
          } catch {
            x3[level] = EMPTY_X3;
          }

          try {
            const x6Raw = await mainContract?.getGetX6State(addr, BigInt(level));
            x6[level] = x6Raw
              ? {
                  row1: Number(x6Raw.row1),
                  row2: Number(x6Raw.row2),
                  cycles: Number(x6Raw.cycles),
                }
              : EMPTY_X6;
          } catch {
            x6[level] = EMPTY_X6;
          }
        }

        return { x3, x6 };
      } catch (error) {
        console.error('useMatrixState error:', error);
        throw error;
      }
    },
    enabled: connected && !!userAddress && !!client,
    refetchInterval: 15_000, // 15 seconds
    staleTime: 10_000, // Consider fresh for 10 seconds
  });

  return {
    ...initialState,
    ...data,
    isLoading, // Only true on initial load, not during background refetch
    error: error instanceof Error ? error.message : null,
  } as MatrixState & { isLoading: boolean; error: string | null };
}
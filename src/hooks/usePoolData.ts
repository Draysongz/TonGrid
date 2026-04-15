import { useQuery } from '@tanstack/react-query';
import { Address, type OpenedContract, fromNano } from "@ton/core";
import { TonGridPool } from "@/contract/PoolContract";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { getConfig, formatCountdown } from "@/lib/contract.config";

export interface PoolDataState {
  poolBalance: number;
  totalScore: number;
  userScore: number;
  userShareTon: number;
  userSharePercent: number;
  totalClaimed: number;
  timeUntilClaim: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  canClaim: boolean;
}

const initialState: PoolDataState = {
  poolBalance: 0,
  totalScore: 0,
  userScore: 0,
  userShareTon: 0,
  userSharePercent: 0,
  totalClaimed: 0,
  timeUntilClaim: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  canClaim: false,
};

export function usePoolData() {
  const { userAddress, connected } = useTonConnect();
  const client = useTonClient();
  const config = getConfig();

  const poolContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = TonGridPool.fromAddress(config.poolAddress);
    return client.open(contract) as OpenedContract<TonGridPool>;
  }, [client]);

  const { data, isLoading, error} = useQuery({
    queryKey: ['poolData', userAddress],
    queryFn: async () => {
      if (!connected || !userAddress || !poolContract) {
        return initialState;
      }

      try {
        const addr = Address.parse(userAddress);

        const [
          poolBalance,
          totalScore,
          userShare,
          userSharePercent,
          userPoolData,
          timeUntilClaim,
        ] = await Promise.all([
          poolContract?.getGetPoolBalance(),
          poolContract?.getGetTotalScore(),
          poolContract?.getGetUserShare(addr),
          poolContract?.getGetUserSharePercent(addr),
          poolContract?.getGetUserPoolData(addr),
          poolContract?.getGetTimeUntilClaim(addr),
        ]);

        const secondsLeft = Number(timeUntilClaim);

        return {
          poolBalance: Number(fromNano(poolBalance!!)),
          totalScore: Number(totalScore),
          userScore: userPoolData ? Number(userPoolData.score) : 0,
          userShareTon: Number(fromNano(userShare!!)),
          userSharePercent: Number(userSharePercent) / 100,
          totalClaimed: userPoolData ? Number(fromNano(userPoolData.totalClaimed)) : 0,
          timeUntilClaim: formatCountdown(secondsLeft),
          canClaim: secondsLeft === 0,
        };
      } catch (error) {
        console.error('usePoolData error:', error);
        throw error;
      }
    },
    enabled: connected && !!userAddress && !!poolContract,
    refetchInterval: 30_000, // 30 seconds
    staleTime: 15_000, // Consider fresh for 15 seconds
  });

  return {
    ...initialState,
    ...data,
    isLoading, // Only true on initial load, not during background refetch
    error: error instanceof Error ? error.message : null,
  } as PoolDataState & { isLoading: boolean; error: string | null };
}
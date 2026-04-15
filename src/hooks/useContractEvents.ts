import { useQuery } from '@tanstack/react-query';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { getConfig } from '@/lib/contract.config';
import { Address, Cell, Slice } from '@ton/core';

// ─── Event Types ─────────────────────────────────────────────────────────────

export interface EvtRegistered {
  type: 'registered';
  user: string;
  referrer: string;
  time: number;
  txHash: string;
  lt: string;
}

export interface EvtLevelActivated {
  type: 'level_activated';
  user: string;
  level: number;
  txHash: string;
  lt: string;
}

export interface EvtRewardPaid {
  type: 'reward_paid';
  to: string;
  amount: number;       // in TON
  level: number;
  matrix: 1 | 2;        // 1 = X3, 2 = X6
  txHash: string;
  lt: string;
}

export interface EvtCycle {
  type: 'cycle';
  user: string;
  matrix: 1 | 2;
  level: number;
  cycles: number;
  txHash: string;
  lt: string;
}

export interface EvtRankUp {
  type: 'rank_up';
  user: string;
  newRank: number;
  txHash: string;
  lt: string;
}

export type ContractEvent =
  | EvtRegistered
  | EvtLevelActivated
  | EvtRewardPaid
  | EvtCycle
  | EvtRankUp;

// ─── Referral Summary ────────────────────────────────────────────────────────

export interface ReferralInfo {
  address: string;
  registeredAt: number;
  totalPaid: number;
  payouts: {
    amount: number;
    level: number;
    matrix: 1 | 2;
    txHash: string;
  }[];
}

// ─── Op codes ────────────────────────────────────────────────────────────────

const OP_REGISTERED      = 0x30;
const OP_LEVEL_ACTIVATED = 0x31;
const OP_REWARD_PAID     = 0x32;
const OP_CYCLE           = 0x33;
const OP_RANK_UP         = 0x34;

// ─── Parser ──────────────────────────────────────────────────────────────────

function parseEvent(body: Cell, txHash: string, lt: string): ContractEvent | null {
  try {
    const slice: Slice = body.beginParse();
    const op = slice.loadUint(32);

    switch (op) {
      case OP_REGISTERED: {
        const user     = slice.loadAddress().toString();
        const referrer = slice.loadAddress().toString();
        const time     = Number(slice.loadUintBig(64));
        return { type: 'registered', user, referrer, time, txHash, lt };
      }
      case OP_LEVEL_ACTIVATED: {
        const user  = slice.loadAddress().toString();
        const level = slice.loadUint(8);
        return { type: 'level_activated', user, level, txHash, lt };
      }
      case OP_REWARD_PAID: {
        const to     = slice.loadAddress().toString();
        const amount = Number(slice.loadCoins()) / 1e9;
        const level  = slice.loadUint(8);
        const matrix = slice.loadUint(8) as 1 | 2;
        return { type: 'reward_paid', to, amount, level, matrix, txHash, lt };
      }
      case OP_CYCLE: {
        const user   = slice.loadAddress().toString();
        const matrix = slice.loadUint(8) as 1 | 2;
        const level  = slice.loadUint(8);
        const cycles = slice.loadUint(32);
        return { type: 'cycle', user, matrix, level, cycles, txHash, lt };
      }
      case OP_RANK_UP: {
        const user    = slice.loadAddress().toString();
        const newRank = slice.loadUint(8);
        return { type: 'rank_up', user, newRank, txHash, lt };
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
}

// ─── Hook State ──────────────────────────────────────────────────────────────

export interface ContractEventsState {
  events: ContractEvent[];
  referrals: ReferralInfo[];
  myRewards: EvtRewardPaid[];
}

const INITIAL_STATE: ContractEventsState = {
  events: [],
  referrals: [],
  myRewards: [],
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useContractEvents() {
  const { connected, userAddress } = useTonConnect();
  const client = useTonClient();
  const config = getConfig();

  const { data, isLoading, error } = useQuery({
    queryKey: ['contractEvents', userAddress],
    queryFn: async (): Promise<ContractEventsState> => {
      if (!connected || !userAddress || !client) {
        return INITIAL_STATE;
      }

      try {
        const contractAddr = config.mainAddress;

        // ── TonClient4: get last block then account info ───────────────────────
        const lastBlock   = await client.getLastBlock();
        const accountInfo = await client.getAccountLite(
          lastBlock.last.seqno,
          contractAddr
        );

        const lastLt   = accountInfo.account.last?.lt;
        const lastHash = accountInfo.account.last?.hash;

        if (!lastLt || !lastHash) {
          return INITIAL_STATE;
        }

        // ── TonClient4: getAccountTransactions(address, lt, hash, count) ──────
        const result = await client.getAccountTransactions(
          contractAddr,
          BigInt(lastLt),
          Buffer.from(lastHash, 'base64'),
        );

        const allEvents: ContractEvent[] = [];

        for (const { tx } of result) {
          try {
            const txHash = tx.hash().toString('hex');
            const lt     = tx.lt.toString();

            // Events from emit() come as external-out messages
            for (const msg of tx.outMessages.values()) {
              if (msg.info.type !== 'external-out') continue;
              if (!msg.body) continue;

              const event = parseEvent(msg.body, txHash, lt);
              if (event) allEvents.push(event);
            }
          } catch {
            // skip malformed tx
          }
        }

        // Sort newest first
        allEvents.sort((a, b) => Number(b.lt) - Number(a.lt));

        // Normalize userAddress for comparison
        const myAddr = Address.parse(userAddress).toString();

        // ── Filter events to be user-specific ────────────────────────────────
        const userEvents: ContractEvent[] = allEvents.filter(evt => {
          switch (evt.type) {
            case 'registered':
              return evt.user === myAddr;
            case 'level_activated':
              return evt.user === myAddr;
            case 'reward_paid':
              return evt.to === myAddr;
            case 'cycle':
              return evt.user === myAddr;
            case 'rank_up':
              return evt.user === myAddr;
            default:
              return false;
          }
        });

        // ── Build referral map: registrations where I am the referrer ─────────
        const referralMap = new Map<string, ReferralInfo>();

        // Look for events where current user is the referrer
        for (const evt of allEvents) {
          if (evt.type === 'registered' && evt.referrer === myAddr) {
            if (!referralMap.has(evt.user)) {
              referralMap.set(evt.user, {
                address: evt.user,
                registeredAt: evt.time,
                totalPaid: 0,
                payouts: [],
              });
            }
          }
        }

        // ── Add payout info for each referral ────────────────────────────────
        for (const evt of allEvents) {
          if (evt.type === 'reward_paid' && referralMap.has(evt.to)) {
            const ref = referralMap.get(evt.to)!;
            ref.totalPaid += evt.amount;
            ref.payouts.push({
              amount: evt.amount,
              level: evt.level,
              matrix: evt.matrix,
              txHash: evt.txHash,
            });
          }
        }

        // ── Collect all rewards paid TO me ────────────────────────────────────
        const myRewards: EvtRewardPaid[] = allEvents.filter(
          (e): e is EvtRewardPaid => e.type === 'reward_paid' && e.to === myAddr
        );

        return {
          events: userEvents,
          referrals: Array.from(referralMap.values()),
          myRewards,
        };
      } catch (error) {
        console.error('useContractEvents error:', error);
        throw error;
      }
    },
    enabled: connected && !!userAddress && !!client,
    refetchInterval: 20_000, // 20 seconds
    staleTime: 10_000, // Consider fresh for 10 seconds
  });

  return {
    ...INITIAL_STATE,
    ...data,
    isLoading, // Only true on initial load, not during background refetch
    error: error instanceof Error ? error.message : null,
  } as ContractEventsState & { isLoading: boolean; error: string | null };
}
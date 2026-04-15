import { Address } from '@ton/core';

// ═══════════════════════════════════════════════════════════════
//  TONGRID — Contract Config
//
//  Single source of truth for contract addresses.
//  Import this anywhere in the frontend that needs to
//  open a contract or send a transaction.
//
//  Usage:
//    import { getConfig } from '@/config/contracts';
//    const { mainAddress, poolAddress } = getConfig();
// ═══════════════════════════════════════════════════════════════

export type Network = 'testnet' | 'mainnet';

export interface ContractConfig {
    network:     Network;
    mainAddress: Address;
    poolAddress: Address;
    rpcEndpoint: string;
    explorerUrl: (address: string) => string;
}

// ── Raw addresses from env ───────────────────────────────────────

const ADDRESSES = {
    testnet: {
        main: import.meta.env.VITE_PUBLIC_MAIN_CONTRACT_TESTNET ?? '',
        pool: import.meta.env.VITE_PUBLIC_POOL_CONTRACT_TESTNET ?? '',
    },
    mainnet: {
        main: import.meta.env.VITE_PUBLIC_MAIN_CONTRACT_MAINNET ?? '',
        pool: import.meta.env.VITE_PUBLIC_POOL_CONTRACT_MAINNET ?? '',
    },
} as const;

const RPC = {
    testnet: import.meta.env.VITE_PUBLIC_TONCENTER_TESTNET ?? 'https://testnet.toncenter.com/api/v2',
    mainnet: import.meta.env.VITE_PUBLIC_TONCENTER_MAINNET ?? 'https://toncenter.com/api/v2',
} as const;

// ── Config getter ────────────────────────────────────────────────

export function getConfig(): ContractConfig {
    const network = (import.meta.env.VITE_PUBLIC_NETWORK ?? 'testnet') as Network;

    const rawMain = ADDRESSES[network].main;
    const rawPool = ADDRESSES[network].pool;

    if (!rawMain || !rawPool) {
        throw new Error(
            `Missing contract addresses for ${network}. ` +
            `Set VITE_PUBLIC_MAIN_CONTRACT_${network.toUpperCase()} and ` +
            `VITE_PUBLIC_POOL_CONTRACT_${network.toUpperCase()} in your .env file.`
        );
    }

    return {
        network,
        mainAddress: Address.parse(rawMain),
        poolAddress: Address.parse(rawPool),
        rpcEndpoint: RPC[network],
        explorerUrl: (address: string) =>
            network === 'mainnet'
                ? `https://tonviewer.com/${address}`
                : `https://testnet.tonviewer.com/${address}`,
    };
}

// ── Convenience helpers ──────────────────────────────────────────

// Shorten a TON address for display: EQAb...XyZ1
export function shortAddress(address: string | Address, chars = 4): string {
    const str = typeof address === 'string' ? address : address.toString();
    if (str.length <= chars * 2 + 3) return str;
    return `${str.slice(0, chars + 2)}...${str.slice(-chars)}`;
}

// Build a referral link for a wallet address
export function referralLink(address: string | Address): string {
    const appUrl = import.meta.env.VITE_PUBLIC_APP_URL ?? 'https://tongrid.space';
    const str    = typeof address === 'string' ? address : address.toString();
    return `${appUrl}/ref/${str}`;
}

// Parse referrer address from URL param safely
// Returns null if invalid or missing
export function parseReferrer(param: string | null | undefined): Address | null {
    if (!param) return null;
    try {
        return Address.parse(param);
    } catch {
        return null;
    }
}

// Human-readable rank name from rank number
export function rankName(rank: number | bigint): string {
    const names = ['Starter', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
    return names[Number(rank)] ?? 'Unknown';
}

// Rank color class (map to your Tailwind or CSS classes)
export function rankColor(rank: number | bigint): string {
    const colors = [
        'rank-starter',   // gray
        'rank-bronze',    // orange
        'rank-silver',    // teal
        'rank-gold',      // yellow
        'rank-platinum',  // blue
        'rank-diamond',   // purple
    ];
    return colors[Number(rank)] ?? 'rank-starter';
}

// Pool multiplier per rank
export function rankMultiplier(rank: number | bigint): string {
    const multipliers = ['1x', '1.5x', '2x', '3x', '5x', '10x'];
    return multipliers[Number(rank)] ?? '1x';
}

// Leadership bonus % per rank
export function rankBonus(rank: number | bigint): string {
    const bonuses = ['0%', '+5%', '+7%', '+10%', '+12%', '+15%'];
    return bonuses[Number(rank)] ?? '0%';
}

// Format TON amount from nanoTON bigint to human string
// e.g. 1500000000n -> "1.5 TON"
export function formatTon(nanoTon: bigint, decimals = 2): string {
    const ton = Number(nanoTon) / 1_000_000_000;
    return `${ton.toFixed(decimals)} TON`;
}

// Format countdown from seconds remaining
// e.g. 90061 -> { days: 1, hours: 1, minutes: 1, seconds: 1 }
export function formatCountdown(seconds: number | bigint): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} {
    let s = Number(seconds);
    const days    = Math.floor(s / 86400); s -= days * 86400;
    const hours   = Math.floor(s / 3600);  s -= hours * 3600;
    const minutes = Math.floor(s / 60);    s -= minutes * 60;
    return { days, hours, minutes, seconds: s };
}

// Level costs in TON (matches MainContract.tact levelCost())
export const LEVEL_COSTS: Record<number, string> = {
    1:  '0',
    2:  '1',
    3:  '2',
    4:  '4',
    5:  '8',
    6:  '16',
    7:  '32',
    8:  '64',
    9:  '128',
    10: '256',
    11: '512',
    12: '1024',
    13: '2048',
    14: '4096',
    15: '8192',
};

// Total TON needed to activate a level in both matrices
export function activationCost(level: number): bigint {
    const cost = BigInt(LEVEL_COSTS[level] ?? '0') * 2n;
    return cost * 1_000_000_000n; // nanoTON
}

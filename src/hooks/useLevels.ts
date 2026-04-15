import { useMemo } from 'react';
import { useUserData } from './useUserData';
import { LEVEL_COSTS, activationCost } from '@/lib/contract.config';

export interface LevelData {
  level: number;
  cost: number;           // in TON (display)
  costInNanoTon: bigint;  // full activation cost (both matrices)
  isX3Active: boolean;
  isX6Active: boolean;
  isActive: boolean;      // true if both are active
  isNext: boolean;        // true if this is the next level to unlock
}

export interface LevelsState {
  levels: LevelData[];
  maxActiveLevel: number;
  nextLevelToUnlock: number | null;
  isLoading: boolean;
  error: string | null;
}

// Decode a bitmask into a boolean for a given level (1-indexed)
function isLevelActiveInMask(mask: number, level: number): boolean {
  return ((mask >> (level - 1)) & 1) === 1;
}

export function useLevels(): LevelsState {
  const { x3ActiveLevels, x6ActiveLevels, isLoading, error } = useUserData();

  const levels = useMemo<LevelData[]>(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const level    = i + 1;
      const isX3Active = isLevelActiveInMask(x3ActiveLevels, level);
      const isX6Active = isLevelActiveInMask(x6ActiveLevels, level);
      const isActive   = isX3Active && isX6Active;
      const costStr    = LEVEL_COSTS[level] ?? '0';

      return {
        level,
        cost:          Number(costStr),
        costInNanoTon: activationCost(level),
        isX3Active,
        isX6Active,
        isActive,
        isNext: false, // filled below
      };
    });
  }, [x3ActiveLevels, x6ActiveLevels]);

  const maxActiveLevel = useMemo(
    () => levels.reduce((max, l) => (l.isActive ? l.level : max), 0),
    [levels]
  );

  const nextLevelToUnlock = maxActiveLevel < 15 ? maxActiveLevel + 1 : null;

  // Tag the next level to unlock
  const levelsWithNext = useMemo(
    () => levels.map(l => ({ ...l, isNext: l.level === nextLevelToUnlock })),
    [levels, nextLevelToUnlock]
  );

  return {
    levels: levelsWithNext,
    maxActiveLevel,
    nextLevelToUnlock,
    isLoading,
    error,
  };
}
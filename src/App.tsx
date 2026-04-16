import { useState, useEffect } from 'react';
import './App.css';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import X3Matrix from './components/X3Matrix';
import X6Matrix from './components/X6Matrix';
import LevelProgression from './components/LevelProgression';
import RankSystem from './components/RankSystem';
import GlobalPool from './components/GlobalPool';
import RecentActivity from './components/RecentActivity';
import ReferralSection from './components/ReferralSection';

import { useUserData } from './hooks/useUserData';
import { useMatrixState } from './hooks/useMatrixState';
import { useLevels } from './hooks/useLevels';
import { usePoolData } from './hooks/usePoolData';
import { useEarnings } from './hooks/useEarnings';
import { useTonConnect } from './hooks/useTonConnect';
import { useActivateLevel } from './hooks/useActivateLevel';
import { useRegister } from './hooks/useRegister';
import { useContractEvents } from './hooks/useContractEvents';
import { useReferralLink } from './hooks/useReferralLink';
import { rankName } from './lib/contract.config';

const EMPTY_X3 = { slots: 0, cycles: 0 };
const EMPTY_X6 = { row1: 0, row2: 0, cycles: 0 };

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [referrerInput, setReferrerInput] = useState('');
  const { connected } = useTonConnect();
  const referralLink = useReferralLink();

  // Auto-populate referrer from URL when component mounts
  useEffect(() => {
    if (referralLink && !referrerInput) {
      setReferrerInput(referralLink);
    }
  }, [referralLink]);

  // Fetch all contract data
  const userData      = useUserData();
  const matrixState   = useMatrixState();
  const levelsData    = useLevels();
  const poolData      = usePoolData();
  const earningsData  = useEarnings();
  const contractEvents = useContractEvents();

  // Hooks for transactions
  const { activateLevel } = useActivateLevel();
  const { register, isLoading: isRegistering } = useRegister();

  // ─── Helpers: find level with most activity (most filled slots) ────────────────────────
  const getHighestActiveX3Level = (): number => {
    let maxLevel = levelsData.maxActiveLevel || 1;
    let maxSlots = 0;
    
    for (let level = 1; level <= (levelsData.maxActiveLevel || 15); level++) {
      const s = matrixState.x3[level];
      if (s && s.slots > maxSlots) {
        maxSlots = s.slots;
        maxLevel = level;
      }
    }
    return maxLevel;
  };

  const getHighestActiveX6Level = (): number => {
    let maxLevel = levelsData.maxActiveLevel || 1;
    let maxSlots = 0;
    
    for (let level = 1; level <= (levelsData.maxActiveLevel || 15); level++) {
      const s = matrixState.x6[level];
      const totalSlots = (s?.row1 || 0) + (s?.row2 || 0);
      if (totalSlots > maxSlots) {
        maxSlots = totalSlots;
        maxLevel = level;
      }
    }
    return maxLevel;
  };
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── Build recent activity from contract events ───────────────────────────────
  const recentActivity = contractEvents.events.slice(0, 20).map((evt, idx) => {
    switch (evt.type) {
      case 'registered':
        return {
          id: idx.toString(),
          type: 'register' as const,
          description: `Registered`,
          amount: 0,
          timestamp: new Date(evt.time * 1000).toLocaleString(),
          txHash: evt.txHash,
        };
      case 'reward_paid':
        return {
          id: idx.toString(),
          type: (evt.matrix === 1 ? 'x3_fill' : 'x6_fill') as 'x3_fill' | 'x6_fill',
          description: `${evt.matrix === 1 ? 'X3' : 'X6'} reward paid — Level ${evt.level}`,
          amount: evt.amount,
          timestamp: '',
          txHash: evt.txHash,
        };
      case 'cycle':
        return {
          id: idx.toString(),
          type: 'cycle' as const,
          description: `${evt.matrix === 1 ? 'X3' : 'X6'} cycle #${evt.cycles} at Level ${evt.level}`,
          amount: 0,
          timestamp: '',
          txHash: evt.txHash,
        };
      case 'level_activated':
        return {
          id: idx.toString(),
          type: 'upgrade' as const,
          description: `Level ${evt.level} activated`,
          amount: 0,
          timestamp: '',
          txHash: evt.txHash,
        };
      case 'rank_up':
        return {
          id: idx.toString(),
          type: 'upgrade' as const,
          description: `Rank upgraded to ${evt.newRank}`,
          amount: 0,
          timestamp: '',
          txHash: evt.txHash,
        };
    }
  });

  // ─── Total rewards from events ────────────────────────────────────────────────
  const totalRewardsFromEvents = contractEvents.myRewards.reduce(
    (sum, r) => sum + r.amount, 0
  );
  // ─────────────────────────────────────────────────────────────────────────────

  if (!connected) {
    return (
      <div className="min-h-screen bg-tongrid-black flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-tongrid-white mb-4">TonGrid</h1>
            <p className="text-tongrid-gray mb-6">Please connect your wallet to continue</p>
            <p className="text-tongrid-gray/60 text-sm">Use the connect button in the header above</p>
          </div>
        </div>
      </div>
    );
  }

  // Show registration modal if user is not registered
  if (!userData.isRegistered && userData.isLoading === false) {
    return (
      <div className="min-h-screen bg-tongrid-black flex">
        <div className="hidden md:block">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <main className="flex-1 md:ml-52 flex flex-col">
          <div className="relative z-40">
            <Header />
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="glass-card p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-tongrid-white mb-2">Welcome to TonGrid!</h2>
              <p className="text-tongrid-gray mb-6">Register to start earning from your network</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-tongrid-gray mb-2">
                    Referrer Address (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Leave blank or paste referrer address"
                    value={referrerInput}
                    onChange={(e) => setReferrerInput(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-tongrid-white placeholder-tongrid-gray/40 focus:outline-none focus:border-tongrid-cyan"
                  />
                  <p className="text-xs text-tongrid-gray/60 mt-1">
                    Leave empty to register without a referrer.
                  </p>
                </div>
                <button
                  onClick={async () => {
                    const result = await register(referrerInput || null);
                    if (result.success) {
                      alert('Registration sent! Check your wallet for confirmation.');
                      setReferrerInput('');
                    } else {
                      alert(`Registration failed: ${result.error}`);
                    }
                  }}
                  disabled={isRegistering}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-tongrid-cyan to-tongrid-blue text-tongrid-black font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {isRegistering ? 'Registering...' : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Loading guard — wait for both matrix and levels before rendering
  if (matrixState.isLoading || levelsData.isLoading) {
    return (
      <div className="min-h-screen bg-tongrid-black flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-tongrid-gray text-lg animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ─── Resolve active matrix levels ────────────────────────────────────────────
  const activeX3Level = getHighestActiveX3Level();
  const activeX6Level = getHighestActiveX6Level();

  const maxLevelX3State = matrixState.x3[activeX3Level] ?? EMPTY_X3;
  const maxLevelX6State = matrixState.x6[activeX6Level] ?? EMPTY_X6;

  const x3SlotsFilled = maxLevelX3State.slots;
  const x6Row1Filled  = maxLevelX6State.row1;
  const x6Row2Filled  = maxLevelX6State.row2;
  // ─────────────────────────────────────────────────────────────────────────────

  // Build stats
  const stats = {
    totalEarned:    earningsData.totalEarned,
    x3Earnings:     earningsData.x3Earnings,
    x6Earnings:     earningsData.x6Earnings,
    poolShare:      earningsData.poolShare,
    x3FillRate:     x3SlotsFilled,
    x6FillRate:     x6Row1Filled + x6Row2Filled,
    rankMultiplier: levelsData.maxActiveLevel,
  };

  // Build all X3 and X6 matrix displays for active levels
  const allX3Matrices = Array.from({ length: levelsData.maxActiveLevel || 1 })
    .map((_, levelIndex) => {
      const level = levelIndex + 1;
      const levelState = matrixState.x3[level] ?? EMPTY_X3;
      return {
        level,
        slots: Array.from({ length: 3 }).map((_, i) => ({
          address: '',
          amount: 0,
          filled: i < levelState.slots,
        })),
        nextCycleTo: '',
      };
    });

  const allX6Matrices = Array.from({ length: levelsData.maxActiveLevel || 1 })
    .map((_, levelIndex) => {
      const level = levelIndex + 1;
      const levelState = matrixState.x6[level] ?? EMPTY_X6;
      return {
        level,
        row1: Array.from({ length: 2 }).map((_, i) => ({
          address: '',
          amount: 0,
          filled: i < levelState.row1,
        })),
        row2: Array.from({ length: 4 }).map((_, i) => ({
          address: '',
          amount: 0,
          filled: i < levelState.row2,
        })),
      };
    });
   


  return (
    <div className="min-h-screen bg-tongrid-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-52">
        <Header />

        <div className="p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6">

          {/* Stats Row */}
          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* X3 Matrices Grid - All Levels */}
          <div>
            <h2 className="text-xl font-bold text-tongrid-white mb-4">X3 Matrices (All Levels)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-x-auto">
              {allX3Matrices.map((matrix) => (
                <X3Matrix
                  key={`x3-${matrix.level}`}
                  level={matrix.level}
                  slots={matrix.slots}
                  nextCycleTo={matrix.nextCycleTo}
                  userAddress={userData.referrer || ''}
                />
              ))}
            </div>
          </div>

          {/* X6 Matrices Grid - All Levels */}
          <div>
            <h2 className="text-xl font-bold text-tongrid-white mb-4">X6 Matrices (All Levels)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 overflow-x-auto">
              {allX6Matrices.map((matrix) => (
                <X6Matrix
                  key={`x6-${matrix.level}`}
                  level={matrix.level}
                  row1={matrix.row1}
                  row2={matrix.row2}
                  userAddress={userData.referrer || ''}
                />
              ))}
            </div>
          </div>

          {/* Level Progression */}
          <LevelProgression
            levels={levelsData.levels.map(l => ({
              level:  l.level,
              cost:   l.cost,
              active: l.isActive,
              maxed:  false,
            }))}
            currentLevel={levelsData.maxActiveLevel}
            onUpgrade={async (level) => {
              const result = await activateLevel(level);
              if (result.success) {
                alert(`Level ${level} activation sent! Check your wallet for confirmation.`);
              } else {
                alert(`Failed to activate level: ${result.error}`);
              }
            }}
          />

          {/* Rank & Pool Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <RankSystem
              currentRank={rankName(userData.rank)}
              directRefs={userData.directRefs}
              currentLevel={levelsData.maxActiveLevel}
            />
            <GlobalPool
              poolData={{
                poolBalance:      poolData.poolBalance,
                totalScore:       poolData.totalScore,
                userScore:        poolData.userScore,
                userShareTon:     poolData.userShareTon,
                userSharePercent: poolData.userSharePercent,
                totalClaimed:     poolData.totalClaimed,
                timeUntilClaim:   poolData.timeUntilClaim,
                canClaim:         poolData.canClaim,
              }}
              rankMultiplier={levelsData.maxActiveLevel}
            />
          </div>

          {/* Activity & Referral Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <RecentActivity
              activities={
                recentActivity.length > 0
                  ? recentActivity
                  : []
              }
            />
            <ReferralSection
              referralData={{
                link:         `https://ton-grid.vercel.app/ref/${userData.address || ''}`,
                directCount:  userData.directRefs,
                totalCount:   userData.directRefs,
                // Pass enriched referral list from events
                referrals:    contractEvents.referrals,
                totalEarned:  totalRewardsFromEvents,
              }}
            />
          </div>

        </div>

        {/* Footer */}
        <footer className="p-4 sm:p-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-tongrid-white text-sm md:text-base">
                Ton<span className="text-tongrid-cyan">Grid</span>
              </span>
              <span className="text-tongrid-gray text-xs md:text-sm">• TON Matrix Protocol</span>
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
              <a href="#" className="text-tongrid-gray hover:text-tongrid-cyan transition-colors">Docs</a>
              <a href="#" className="text-tongrid-gray hover:text-tongrid-cyan transition-colors">Contract</a>
              <a href="#" className="text-tongrid-gray hover:text-tongrid-cyan transition-colors">Support</a>
            </div>
            <p className="text-tongrid-gray/60 text-xs md:text-sm font-mono">
              © 2025 TonGrid
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

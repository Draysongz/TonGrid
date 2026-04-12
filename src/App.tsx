import { useState } from 'react';
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

// Mock data - in real app this would come from smart contract
const mockData = {
  user: {
    address: 'UQDMx1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7',
    balance: 45.67,
    connected: true,
  },
  stats: {
    totalEarned: 127.5,
    x3Earnings: 54.0,
    x6Earnings: 48.6,
    poolShare: 24.9,
    x3FillRate: 2,
    x6FillRate: 4,
    rankMultiplier: 2,
  },
  x3Matrix: {
    level: 3,
    slots: [
      { address: 'UQAB...7F2', amount: 0.9, filled: true },
      { address: 'UQPL...9C3', amount: 0.9, filled: true },
      { address: '', amount: 0, filled: false },
    ],
    nextCycleTo: 'UQXZ...5D1',
  },
  x6Matrix: {
    level: 3,
    row1: [
      { address: 'UQRT...2B8', amount: 0.9, filled: true },
      { address: 'UQJK...0E4', amount: 0.9, filled: true },
      { address: '', amount: 0, filled: false },
    ],
    row2: [
      { address: 'UQMN...3F5', amount: 0.9, filled: true },
      { address: 'UQOP...6G7', amount: 0.9, filled: true },
      { address: '', amount: 0, filled: false },
      { address: '', amount: 0, filled: false },
    ],
  },
  currentLevel: 3,
  rank: 'Silver' as const,
  directRefs: 8,
  poolData: {
    totalPool: 156789,
    yourShare: 24.92,
    yourScore: 1250,
    totalParticipants: 45678,
    nextDistribution: '2d 14h 32m',
    weeklyGrowth: 12.5,
  },
  activities: [
    { id: '1', type: 'x3_fill' as const, description: 'X3 Slot 2 filled by UQPL...9C3', amount: 0.9, timestamp: '2 min ago', txHash: 'abc123' },
    { id: '2', type: 'x6_fill' as const, description: 'X6 spillover from UQMN...3F5', amount: 0.9, timestamp: '15 min ago', txHash: 'def456' },
    { id: '3', type: 'upgrade' as const, description: 'Upgraded to Level 3', amount: 0, timestamp: '1 hour ago', txHash: 'ghi789' },
    { id: '4', type: 'cycle' as const, description: 'X3 cycle complete - reinvested', amount: 0, timestamp: '3 hours ago', txHash: 'jkl012' },
    { id: '5', type: 'pool' as const, description: 'Weekly pool distribution', amount: 12.45, timestamp: '2 days ago', txHash: 'mno345' },
  ],
  referralData: {
    link: 'https://tongrid.app/r/UQDM...x1A',
    directCount: 8,
    totalCount: 34,
  },
};

const levelCosts = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [connected, setConnected] = useState(mockData.user.connected);
  const [currentLevel, setCurrentLevel] = useState(mockData.currentLevel);

  const handleConnect = () => {
    setConnected(true);
  };

  const handleUpgrade = (level: number) => {
    if (confirm(`Upgrade to Level ${level} for ${levelCosts[level - 1]} TON?`)) {
      setCurrentLevel(level);
    }
  };

  const levels = levelCosts.map((cost, index) => ({
    level: index + 1,
    cost,
    active: index + 1 === currentLevel,
    maxed: index + 1 < currentLevel,
  }));

  return (
    <div className="min-h-screen bg-tongrid-black flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 ml-52">
        {/* Header */}
        <Header 
          connected={connected}
          address={mockData.user.address}
          balance={mockData.user.balance}
          onConnect={handleConnect}
        />

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <StatsCards stats={mockData.stats} />

          {/* Matrix Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <X3Matrix 
              level={mockData.x3Matrix.level}
              slots={mockData.x3Matrix.slots}
              nextCycleTo={mockData.x3Matrix.nextCycleTo}
              userAddress={mockData.user.address}
            />
            <X6Matrix 
              level={mockData.x6Matrix.level}
              row1={mockData.x6Matrix.row1}
              row2={mockData.x6Matrix.row2}
              userAddress={mockData.user.address}
            />
          </div>

          {/* Level Progression */}
          <LevelProgression 
            levels={levels}
            currentLevel={currentLevel}
            onUpgrade={handleUpgrade}
          />

          {/* Rank & Pool Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RankSystem 
              currentRank={mockData.rank}
              directRefs={mockData.directRefs}
              currentLevel={currentLevel}
            />
            <GlobalPool 
              poolData={mockData.poolData}
              rankMultiplier={mockData.stats.rankMultiplier}
            />
          </div>

          {/* Activity & Referral Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity activities={mockData.activities} />
            <ReferralSection referralData={mockData.referralData} />
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-tongrid-white">
                Ton<span className="text-tongrid-cyan">Grid</span>
              </span>
              <span className="text-tongrid-gray text-sm">• TON Matrix Protocol</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-tongrid-gray hover:text-tongrid-cyan text-sm transition-colors">Docs</a>
              <a href="#" className="text-tongrid-gray hover:text-tongrid-cyan text-sm transition-colors">Contract</a>
              <a href="#" className="text-tongrid-gray hover:text-tongrid-cyan text-sm transition-colors">Support</a>
            </div>
            <p className="text-tongrid-gray/60 text-sm font-mono">
              © 2025 TonGrid
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

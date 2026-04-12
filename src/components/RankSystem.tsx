import { Star, Trophy } from 'lucide-react';

interface Rank {
  name: string;
  directRefs: number;
  minLevel: number;
  multiplier: number;
  bonus: string;
  color: string;
}

const ranks: Rank[] = [
  { name: 'Starter', directRefs: 0, minLevel: 1, multiplier: 1, bonus: 'None', color: '#6B7280' },
  { name: 'Bronze', directRefs: 3, minLevel: 3, multiplier: 1.5, bonus: '+5% leadership', color: '#CD7F32' },
  { name: 'Silver', directRefs: 7, minLevel: 6, multiplier: 2, bonus: '+7% leadership', color: '#C0C0C0' },
  { name: 'Gold', directRefs: 15, minLevel: 9, multiplier: 3, bonus: '+10% leadership', color: '#FFD700' },
  { name: 'Platinum', directRefs: 30, minLevel: 12, multiplier: 5, bonus: '+12% leadership', color: '#E5E4E2' },
  { name: 'Diamond', directRefs: 50, minLevel: 15, multiplier: 10, bonus: '+15% leadership', color: '#B9F2FF' },
];

interface RankSystemProps {
  currentRank: string;
  directRefs: number;
  currentLevel: number;
}

export default function RankSystem({ currentRank, directRefs, currentLevel }: RankSystemProps) {
  const currentRankIndex = ranks.findIndex(r => r.name === currentRank);
  const nextRank = ranks[currentRankIndex + 1];
  
  const progressToNext = nextRank ? Math.min(
    ((directRefs / nextRank.directRefs) * 0.5 + (currentLevel / nextRank.minLevel) * 0.5) * 100,
    100
  ) : 100;

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-tongrid-white text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-tongrid-violet" />
            Rank System
          </h3>
          <p className="text-tongrid-gray text-sm mt-1">
            6 tiers • Unlock pool multipliers & leadership bonuses
          </p>
        </div>
        <div 
          className="px-4 py-2 rounded-xl border flex items-center gap-2"
          style={{ 
            backgroundColor: `${ranks[currentRankIndex].color}20`,
            borderColor: `${ranks[currentRankIndex].color}40`
          }}
        >
          <Star className="w-4 h-4" style={{ color: ranks[currentRankIndex].color }} />
          <span className="font-bold" style={{ color: ranks[currentRankIndex].color }}>
            {currentRank}
          </span>
        </div>
      </div>

      {/* Current Rank Details */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-tongrid-gray text-xs mb-1">Pool Multiplier</p>
            <p className="font-mono font-bold text-tongrid-cyan text-2xl">
              {ranks[currentRankIndex].multiplier}x
            </p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-tongrid-gray text-xs mb-1">Direct Referrals</p>
            <p className="font-mono font-bold text-tongrid-white text-2xl">
              {directRefs}
            </p>
          </div>
          <div className="text-center">
            <p className="text-tongrid-gray text-xs mb-1">Leadership Bonus</p>
            <p className="font-mono font-bold text-tongrid-violet text-2xl">
              {ranks[currentRankIndex].bonus.split(' ')[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Progress to Next Rank */}
      {nextRank && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-tongrid-gray text-sm">Progress to {nextRank.name}</span>
            <span className="text-tongrid-cyan text-sm font-medium">{progressToNext.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-tongrid-violet to-tongrid-pink rounded-full transition-all duration-500"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-tongrid-gray">
            <span>Need {Math.max(0, nextRank.directRefs - directRefs)} more direct refs</span>
            <span>Min Level {nextRank.minLevel}</span>
          </div>
        </div>
      )}

      {/* Rank List */}
      <div className="space-y-2">
        {ranks.map((rank, index) => {
          const isCurrent = rank.name === currentRank;
          const isPast = index < currentRankIndex;
          
          return (
            <div 
              key={rank.name}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                isCurrent 
                  ? 'bg-white/10 border border-white/20' 
                  : isPast
                  ? 'bg-green-500/5'
                  : 'bg-white/[0.02] opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${rank.color}30` }}
                >
                  <Star className="w-4 h-4" style={{ color: rank.color }} />
                </div>
                <div>
                  <p className={`font-medium ${isCurrent ? 'text-tongrid-white' : 'text-tongrid-gray'}`}>
                    {rank.name}
                  </p>
                  <p className="text-xs text-tongrid-gray/70">
                    {rank.directRefs} refs • Level {rank.minLevel}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm" style={{ color: rank.color }}>
                  {rank.multiplier}x
                </p>
                <p className="text-xs text-tongrid-gray/70">{rank.bonus}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

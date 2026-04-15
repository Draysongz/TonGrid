import { Lock, Check, ChevronRight, Sparkles } from 'lucide-react';
import { LEVEL_COSTS } from '@/lib/contract.config';

interface Level {
  level: number;
  cost: number;
  active: boolean;
  maxed: boolean;
}

interface LevelProgressionProps {
  levels: Level[];
  currentLevel: number;
  onUpgrade: (level: number) => void;
}

export default function LevelProgression({ currentLevel, onUpgrade }: LevelProgressionProps) {
  

  const getStatus = (level: number) => {
    if (level < currentLevel) return 'completed';
    if (level === currentLevel) return 'active';
    if (level === currentLevel + 1) return 'available';
    return 'locked';
  };

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-tongrid-white text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-tongrid-cyan" />
            Level Progression
          </h3>
          <p className="text-tongrid-gray text-sm mt-1">
            15 levels • Each doubles in cost • Upgrade to earn more
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-tongrid-cyan/10 border border-tongrid-cyan/30">
          <span className="text-tongrid-gray text-xs">Current</span>
          <p className="font-mono font-bold text-tongrid-cyan text-xl">Level {currentLevel}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-tongrid-cyan to-tongrid-blue rounded-full transition-all duration-500"
            style={{ width: `${(currentLevel / 15) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-tongrid-gray text-xs">Level 1</span>
          <span className="text-tongrid-gray text-xs">Level 15</span>
        </div>
      </div>

      {/* Level Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {Object.entries(LEVEL_COSTS).map(([levelStr, cost]) => {
          const level = parseInt(levelStr);
          const status = getStatus(level);
          
          return (
            <div 
              key={level}
              className={`relative p-4 rounded-xl border transition-all duration-300 ${
                status === 'active'
                  ? 'bg-tongrid-cyan/10 border-tongrid-cyan shadow-[0_0_20px_rgba(46,214,255,0.2)]'
                  : status === 'completed'
                  ? 'bg-green-500/10 border-green-500/30'
                  : status === 'available'
                  ? 'bg-white/5 border-white/20 hover:border-tongrid-cyan/50 cursor-pointer'
                  : 'bg-white/[0.02] border-white/10 opacity-60'
              }`}
              onClick={() => status === 'available' && onUpgrade(level)}
            >
              {/* Level Number */}
              <div className="flex items-center justify-between mb-2">
                <span className={`font-mono font-bold text-lg ${
                  status === 'active' ? 'text-tongrid-cyan' :
                  status === 'completed' ? 'text-green-400' :
                  'text-tongrid-white'
                }`}>
                  L{level}
                </span>
                {status === 'completed' && <Check className="w-4 h-4 text-green-400" />}
                {status === 'locked' && <Lock className="w-4 h-4 text-tongrid-gray" />}
              </div>

              {/* Cost */}
              <p className="font-mono text-tongrid-white text-sm">{cost} TON</p>
              
              {/* Status Badge */}
              {status === 'active' && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-tongrid-cyan text-tongrid-black text-xs font-bold">
                  ACTIVE
                </span>
              )}
              
              {/* Upgrade Button */}
              {status === 'available' && (
                <div className="absolute inset-0 flex items-center justify-center bg-tongrid-black/60 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1 text-tongrid-cyan text-sm font-medium">
                    Upgrade <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Upgrade Info */}
      {currentLevel < 15 && (
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-tongrid-gray text-sm">Next Upgrade</p>
              <p className="font-mono text-tongrid-white text-lg">
                Level {currentLevel + 1} • {LEVEL_COSTS[currentLevel+1]} TON
              </p>
            </div>
            <button 
              onClick={() => onUpgrade(currentLevel + 1)}
              className="btn-primary flex items-center gap-2"
            >
              Upgrade Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

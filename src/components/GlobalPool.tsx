import { Droplets, Clock } from 'lucide-react';

interface PoolData {
  poolBalance: number;         // in TON
  totalScore: number;          // raw score integer (not nanoTON)
  userScore: number;           // raw score integer
  userShareTon: number;        // estimated claim amount in TON
  userSharePercent: number;    // basis points / 100 -> e.g. 250 = 2.50%
  totalClaimed: number;        // lifetime claimed in TON
  timeUntilClaim: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  canClaim: boolean;
}

interface GlobalPoolProps {
  poolData: PoolData;
  rankMultiplier: number;
}

export default function GlobalPool({ poolData, rankMultiplier }: GlobalPoolProps) {

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-tongrid-white text-lg flex items-center gap-2">
            <Droplets className="w-5 h-5 text-tongrid-blue" />
            Global Reward Pool
          </h3>
          <p className="text-tongrid-gray text-sm mt-1">
            10% of every activation • Distributed weekly
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-tongrid-blue/20 text-tongrid-blue text-xs font-mono">
          {rankMultiplier}x Multiplier
        </div>
      </div>

      {/* Pool Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-tongrid-blue/20 to-tongrid-violet/20 border border-tongrid-blue/30">
          <p className="text-tongrid-gray text-xs mb-1">Total Pool Size</p>
          <p className="font-mono font-bold text-tongrid-white text-2xl">
            {poolData.poolBalance.toLocaleString()} TON
          </p>
          {/* <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs">+{poolData.weeklyGrowth}% this week</span>
          </div> */}
        </div>
        
        <div className="p-4 rounded-xl bg-tongrid-cyan/10 border border-tongrid-cyan/30">
          <p className="text-tongrid-gray text-xs mb-1">Your Estimated Share</p>
          <p className="font-mono font-bold text-tongrid-cyan text-2xl">
            +{poolData.userShareTon.toFixed(2)} TON
          </p>
          <p className="text-tongrid-gray/70 text-xs mt-1">
            Score: {poolData.userScore.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-5 h-5 text-tongrid-violet" />
          <span className="text-tongrid-white font-medium">Next Distribution</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="font-mono font-bold text-tongrid-white text-2xl">{poolData.timeUntilClaim.days}</p>
              <p className="text-tongrid-gray text-xs">Days</p>
            </div>
            <div className="text-center">
              <p className="font-mono font-bold text-tongrid-white text-2xl">{poolData.timeUntilClaim.hours}</p>
              <p className="text-tongrid-gray text-xs">Hours</p>
            </div>
            <div className="text-center">
              <p className="font-mono font-bold text-tongrid-white text-2xl">{poolData.timeUntilClaim.minutes}</p>
              <p className="text-tongrid-gray text-xs">Minutes</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-2">
        <p className="text-tongrid-gray text-sm font-medium mb-3">How Pool Rewards Work</p>
        <div className="flex items-start gap-3 text-sm">
          <div className="w-6 h-6 rounded-full bg-tongrid-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-tongrid-cyan text-xs font-bold">1</span>
          </div>
          <p className="text-tongrid-gray">10% of every level activation feeds the global pool</p>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <div className="w-6 h-6 rounded-full bg-tongrid-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-tongrid-cyan text-xs font-bold">2</span>
          </div>
          <p className="text-tongrid-gray">Your score increases with referrals and active levels</p>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <div className="w-6 h-6 rounded-full bg-tongrid-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-tongrid-cyan text-xs font-bold">3</span>
          </div>
          <p className="text-tongrid-gray">Higher ranks earn larger shares via multipliers</p>
        </div>
      </div>
    </div>
  );
}

import { User, ArrowDown } from 'lucide-react';

interface Slot {
  address: string;
  amount: number;
  filled: boolean;
}

interface X6MatrixProps {
  level: number;
  row1: Slot[];
  row2: Slot[];
  userAddress: string;
}

export default function X6Matrix({ level, row1, row2, userAddress }: X6MatrixProps) {
  const row1Filled = row1.filter(s => s.filled).length;
  const row2Filled = row2.filter(s => s.filled).length;
  const totalFilled = row1Filled + row2Filled;

  const truncate = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-tongrid-white text-lg flex items-center gap-2">
            X6 Matrix
            <span className="px-2 py-0.5 rounded-full bg-tongrid-violet/20 text-tongrid-violet text-xs font-mono">
              Level {level}
            </span>
          </h3>
          <p className="text-tongrid-gray text-sm mt-1">
            {totalFilled}/6 slots filled • Team spillover
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tongrid-violet to-tongrid-pink flex items-center justify-center">
          <span className="font-mono font-bold text-white text-lg">X6</span>
        </div>
      </div>

      {/* Matrix Visualization */}
      <div className="relative py-4">
        {/* Row 1 - Upline Row */}
        <div className="mb-8">
          <p className="text-tongrid-gray/60 text-xs font-mono uppercase tracking-wider mb-3">
            Row 1 → Upline (2 slots)
          </p>
          <div className="flex justify-center gap-8">
            {row1.map((slot, index) => (
              <div key={`r1-${index}`} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                    slot.filled 
                      ? 'bg-tongrid-violet/20 border-tongrid-violet' 
                      : 'bg-white/5 border-dashed border-white/20'
                  }`}
                >
                  {slot.filled ? (
                    <User className="w-6 h-6 text-tongrid-violet" />
                  ) : (
                    <span className="text-tongrid-gray/40 font-mono">{index + 1}</span>
                  )}
                </div>
                {slot.filled && (
                  <div className="text-center">
                    <p className="font-mono text-tongrid-white text-xs">{truncate(slot.address)}</p>
                    <p className="font-mono text-tongrid-violet text-xs">→ Upline</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Connection Arrows */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-16">
            {[0, 1].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-gradient-to-b from-tongrid-violet/50 to-tongrid-cyan/50" />
                <ArrowDown className="w-4 h-4 text-tongrid-cyan/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Your Earnings Row */}
        <div>
          <p className="text-tongrid-cyan text-xs font-mono uppercase tracking-wider mb-3">
            Row 2 → Your Earnings (4 slots)
          </p>
          <div className="flex justify-center gap-4">
            {row2.map((slot, index) => (
              <div key={`r2-${index}`} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                    slot.filled 
                      ? 'bg-tongrid-cyan/20 border-tongrid-cyan shadow-[0_0_15px_rgba(46,214,255,0.2)]' 
                      : 'bg-white/5 border-dashed border-white/20'
                  }`}
                >
                  {slot.filled ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tongrid-cyan to-tongrid-blue flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <span className="text-tongrid-gray/40 font-mono text-sm">{index + 3}</span>
                  )}
                </div>
                {slot.filled && (
                  <div className="text-center">
                    <p className="font-mono text-tongrid-white text-xs">{truncate(slot.address)}</p>
                    <p className="font-mono text-tongrid-cyan text-sm font-semibold">+{slot.amount} TON</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* You (Center) */}
        <div className="flex justify-center mt-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tongrid-violet to-tongrid-pink flex items-center justify-center shadow-[0_0_25px_rgba(123,97,255,0.3)]">
              <span className="font-bold text-white text-xs">YOU</span>
            </div>
            <p className="text-tongrid-gray text-xs">{truncate(userAddress)}</p>
          </div>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="mt-6 p-4 rounded-xl bg-tongrid-cyan/10 border border-tongrid-cyan/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-tongrid-gray text-xs">Your X6 Earnings (Level {level})</p>
            <p className="font-mono font-bold text-tongrid-cyan text-xl">
              +{(row2.filter(s => s.filled).length * 0.9).toFixed(2)} TON
            </p>
          </div>
          <div className="text-right">
            <p className="text-tongrid-gray text-xs">Spillover Slots</p>
            <p className="font-mono text-tongrid-white text-lg">
              {row2Filled}/4
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

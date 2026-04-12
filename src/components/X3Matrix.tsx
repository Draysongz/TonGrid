import { ArrowRight, User, RotateCcw } from 'lucide-react';

interface Slot {
  address: string;
  amount: number;
  filled: boolean;
}

interface X3MatrixProps {
  level: number;
  slots: Slot[];
  nextCycleTo: string;
  userAddress: string;
}

export default function X3Matrix({ level, slots, nextCycleTo, userAddress }: X3MatrixProps) {
  const filledCount = slots.filter(s => s.filled).length;
  const isCycleReady = filledCount === 3;

  const truncate = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-tongrid-white text-lg flex items-center gap-2">
            X3 Matrix
            <span className="px-2 py-0.5 rounded-full bg-tongrid-cyan/20 text-tongrid-cyan text-xs font-mono">
              Level {level}
            </span>
          </h3>
          <p className="text-tongrid-gray text-sm mt-1">
            {filledCount}/3 slots filled • Direct referrals
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tongrid-cyan to-tongrid-blue flex items-center justify-center">
          <span className="font-mono font-bold text-white text-lg">X3</span>
        </div>
      </div>

      {/* Matrix Visualization */}
      <div className="relative py-8">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-tongrid-cyan/30 via-tongrid-cyan/50 to-tongrid-cyan/30 -translate-y-1/2" />
        
        {/* Slots */}
        <div className="flex items-center justify-between relative z-10">
          {slots.map((slot, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              {/* Slot Circle */}
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  slot.filled 
                    ? 'bg-tongrid-cyan/20 border-tongrid-cyan shadow-[0_0_20px_rgba(46,214,255,0.3)]' 
                    : 'bg-white/5 border-dashed border-white/20'
                }`}
              >
                {slot.filled ? (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tongrid-cyan to-tongrid-blue flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <span className="text-tongrid-gray/40 font-mono text-sm">{index + 1}</span>
                )}
              </div>
              
              {/* Slot Info */}
              <div className="text-center">
                {slot.filled ? (
                  <>
                    <p className="font-mono text-tongrid-white text-xs">{truncate(slot.address)}</p>
                    <p className="font-mono text-tongrid-cyan text-sm font-semibold">+{slot.amount} TON</p>
                  </>
                ) : (
                  <p className="text-tongrid-gray/40 text-xs">Empty</p>
                )}
              </div>

              {/* Arrow (except last) */}
              {index < 2 && (
                <div className="absolute" style={{ left: `${(index + 1) * 33.33}%`, transform: 'translateX(-50%)' }}>
                  <ArrowRight className="w-5 h-5 text-tongrid-cyan/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* You (Receiver) */}
        <div className="flex justify-center mt-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-tongrid-violet to-tongrid-pink flex items-center justify-center shadow-[0_0_30px_rgba(123,97,255,0.3)]">
              <span className="font-bold text-white text-sm">YOU</span>
            </div>
            <p className="text-tongrid-gray text-xs">{truncate(userAddress)}</p>
          </div>
        </div>
      </div>

      {/* Cycle Info */}
      <div className={`mt-6 p-4 rounded-xl border ${
        isCycleReady 
          ? 'bg-tongrid-cyan/10 border-tongrid-cyan/30' 
          : 'bg-white/5 border-white/10'
      }`}>
        <div className="flex items-center gap-3">
          <RotateCcw className={`w-5 h-5 ${isCycleReady ? 'text-tongrid-cyan animate-spin' : 'text-tongrid-gray'}`} />
          <div className="flex-1">
            <p className="text-tongrid-white text-sm font-medium">
              {isCycleReady ? 'Cycle Ready!' : 'Next Cycle'}
            </p>
            <p className="text-tongrid-gray text-xs">
              {isCycleReady 
                ? `0.9 TON → ${truncate(nextCycleTo)} (upline)` 
                : `Slot 3 fills → 0.9 TON to upline, matrix reinvests`}
            </p>
          </div>
          {isCycleReady && (
            <span className="px-2 py-1 rounded-full bg-tongrid-cyan text-tongrid-black text-xs font-bold">
              GO
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

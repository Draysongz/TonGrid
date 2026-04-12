import { TrendingUp, Users, Grid3X3, Droplets } from 'lucide-react';

interface StatsData {
  totalEarned: number;
  x3Earnings: number;
  x6Earnings: number;
  poolShare: number;
  x3FillRate: number;
  x6FillRate: number;
  rankMultiplier: number;
}

interface StatsCardsProps {
  stats: StatsData;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Total Earned',
      value: stats.totalEarned.toFixed(2),
      unit: 'TON',
      change: '+12.5%',
      changePositive: true,
      icon: TrendingUp,
      gradient: 'from-tongrid-cyan to-tongrid-blue',
      glow: 'shadow-glow'
    },
    {
      label: 'X3 Earnings',
      value: stats.x3Earnings.toFixed(2),
      unit: 'TON',
      subtext: `${stats.x3FillRate}/3 slots`,
      icon: Grid3X3,
      gradient: 'from-tongrid-violet to-tongrid-pink',
      glow: 'shadow-glow-violet'
    },
    {
      label: 'X6 Earnings',
      value: stats.x6Earnings.toFixed(2),
      unit: 'TON',
      subtext: `${stats.x6FillRate}/6 slots`,
      icon: Users,
      gradient: 'from-tongrid-pink to-tongrid-cyan',
      glow: ''
    },
    {
      label: 'Pool Share',
      value: stats.poolShare.toFixed(2),
      unit: 'TON',
      subtext: `${stats.rankMultiplier}x multiplier`,
      icon: Droplets,
      gradient: 'from-tongrid-blue to-tongrid-violet',
      glow: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index}
            className="glass-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Top gradient line */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />
            
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4`}>
              <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono font-bold text-tongrid-white text-2xl">
                {card.value}
              </span>
              <span className="text-tongrid-gray text-sm">{card.unit}</span>
            </div>

            {/* Label */}
            <p className="text-tongrid-gray text-sm mb-2">{card.label}</p>

            {/* Change or Subtext */}
            {card.change && (
              <span className={`text-xs font-medium ${card.changePositive ? 'text-green-400' : 'text-red-400'}`}>
                {card.change} this week
              </span>
            )}
            {card.subtext && (
              <span className="text-xs text-tongrid-gray/70 font-mono">
                {card.subtext}
              </span>
            )}

            {/* Background glow */}
            <div 
              className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`}
            />
          </div>
        );
      })}
    </div>
  );
}

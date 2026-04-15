import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  RefreshCw, 
  Layers, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'x3_fill' | 'x6_fill' | 'upgrade' | 'payout' | 'cycle' | 'pool' | 'register';
  description: string;
  amount: number;
  timestamp: string;
  txHash: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'x3_fill':
      return { icon: ArrowDownLeft, color: 'text-tongrid-cyan', bg: 'bg-tongrid-cyan/20' };
    case 'x6_fill':
      return { icon: ArrowDownLeft, color: 'text-tongrid-violet', bg: 'bg-tongrid-violet/20' };
    case 'upgrade':
      return { icon: Layers, color: 'text-tongrid-blue', bg: 'bg-tongrid-blue/20' };
    case 'register':
      return { icon: Layers, color: 'text-tongrid-blue', bg: 'bg-tongrid-blue/20' };
    case 'payout':
      return { icon: ArrowUpRight, color: 'text-green-400', bg: 'bg-green-400/20' };
    case 'cycle':
      return { icon: RefreshCw, color: 'text-tongrid-pink', bg: 'bg-tongrid-pink/20' };
    case 'pool':
      return { icon: ArrowDownLeft, color: 'text-tongrid-blue', bg: 'bg-tongrid-blue/20' };
    default:
      return { icon: ArrowDownLeft, color: 'text-tongrid-gray', bg: 'bg-white/10' };
  }
};

const getActivityLabel = (type: Activity['type']) => {
  switch (type) {
    case 'x3_fill': return 'X3 Fill';
    case 'x6_fill': return 'X6 Spillover';
    case 'upgrade': return 'Level Up';
    case 'register': return 'Registration';
    case 'payout': return 'Payout';
    case 'cycle': return 'Cycle';
    case 'pool': return 'Pool Share';
    default: return 'Activity';
  }
};

export default function RecentActivity({ activities }: RecentActivityProps) {

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-tongrid-white text-lg">
            Recent Activity
          </h3>
          <p className="text-tongrid-gray text-sm mt-1">
            Your latest matrix events and earnings
          </p>
        </div>
        <button className="flex items-center gap-1 text-tongrid-cyan text-sm hover:underline">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.map((activity) => {
          const { icon: Icon, color, bg } = getActivityIcon(activity.type);
          const isPositive = activity.amount > 0;
          
          return (
            <div 
              key={activity.id}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/[0.08] transition-colors group"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-mono uppercase px-2 py-0.5 rounded-full ${bg} ${color}`}>
                    {getActivityLabel(activity.type)}
                  </span>
                  <span className="text-tongrid-gray text-xs">{activity.timestamp}</span>
                </div>
                <p className="text-tongrid-white text-sm truncate">
                  {activity.description}
                </p>
              </div>

              {/* Amount */}
              {activity.amount !== 0 && (
                <div className="text-right flex-shrink-0">
                  <p className={`font-mono font-semibold ${isPositive ? 'text-tongrid-cyan' : 'text-tongrid-gray'}`}>
                    {isPositive ? '+' : ''}{activity.amount} TON
                  </p>
                </div>
              )}

              {/* TX Link */}
              <a 
                href={`https://tonscan.org/tx/${activity.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-4 h-4 text-tongrid-gray hover:text-tongrid-cyan" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Empty State (if no activities) */}
      {activities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-tongrid-gray" />
          </div>
          <p className="text-tongrid-gray">No activity yet</p>
          <p className="text-tongrid-gray/60 text-sm mt-1">Start referring to see activity here</p>
        </div>
      )}
    </div>
  );
}

import { 
  LayoutDashboard, 
  Grid3X3, 
  Layers, 
  Users, 
  Droplets, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'matrix', label: 'Matrix', icon: Grid3X3 },
  { id: 'levels', label: 'Levels', icon: Layers },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'pool', label: 'Pool', icon: Droplets },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#0B0E16] border-r border-white/5 z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-52'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5">
        {!collapsed && (
          <span className="font-display font-bold text-xl">
            Ton<span className="text-tongrid-cyan">Grid</span>
          </span>
        )}
        {collapsed && (
          <span className="font-display font-bold text-xl text-tongrid-cyan">T</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-tongrid-cyan/10 text-tongrid-cyan border-l-2 border-tongrid-cyan' 
                  : 'text-tongrid-gray hover:bg-white/5 hover:text-tongrid-white'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-tongrid-cyan' : ''}`} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-tongrid-gray transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}

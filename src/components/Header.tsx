import { Wallet, Bell, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  connected: boolean;
  address: string;
  balance: number;
  onConnect: () => void;
}

export default function Header({ connected, address, balance, onConnect }: HeaderProps) {
  const [copied, setCopied] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="h-16 bg-[#0B0E16]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Page Title */}
      <h1 className="font-display font-semibold text-tongrid-white text-lg">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-tongrid-gray transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-tongrid-cyan rounded-full animate-pulse" />
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 glass-card p-4 z-50">
              <h3 className="font-semibold text-tongrid-white mb-3">Notifications</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-white/5 text-sm">
                  <p className="text-tongrid-white">X3 Slot filled!</p>
                  <p className="text-tongrid-gray text-xs">+0.9 TON from UQ...x1A</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 text-sm">
                  <p className="text-tongrid-white">Level 4 Activated</p>
                  <p className="text-tongrid-gray text-xs">You can now receive 4 TON payments</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wallet Connection */}
        {connected ? (
          <div className="flex items-center gap-3">
            {/* Balance */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5">
              <span className="font-mono text-tongrid-cyan font-semibold">{balance.toFixed(2)}</span>
              <span className="text-tongrid-gray text-sm">TON</span>
            </div>
            
            {/* Address */}
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tongrid-cyan/10 hover:bg-tongrid-cyan/20 transition-colors"
            >
              <Wallet className="w-4 h-4 text-tongrid-cyan" />
              <span className="font-mono text-tongrid-cyan text-sm">{truncateAddress(address)}</span>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-tongrid-cyan/60" />}
            </button>
          </div>
        ) : (
          <button 
            onClick={onConnect}
            className="btn-primary flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}

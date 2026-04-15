import { Wallet, Bell, Copy, Check, LogOut } from 'lucide-react';
import { useState } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '@/hooks/useTonConnect';
import { shortAddress } from '@/lib/contract.config';

export default function Header() {
  const [copied, setCopied] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { connected, userAddress, disconnect } = useTonConnect();

  const copyAddress = () => {
    if (userAddress) {
      navigator.clipboard.writeText(userAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <header className="h-16 bg-[#0B0E16]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      {/* Page Title - hidden on small mobile */}
      <h1 className="font-display font-semibold text-tongrid-white text-base sm:text-lg">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications - icon only on mobile */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-tongrid-gray transition-colors relative"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-tongrid-cyan rounded-full animate-pulse" />
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 top-12 w-64 sm:w-80 glass-card p-4 z-50">
              <h3 className="font-semibold text-tongrid-white mb-3 text-sm">Notifications</h3>
              <div className="space-y-2">
                <div className="p-2 md:p-3 rounded-lg bg-white/5 text-xs md:text-sm">
                  <p className="text-tongrid-white">X3 Slot filled!</p>
                  <p className="text-tongrid-gray text-xs">+0.9 TON from UQ...x1A</p>
                </div>
                <div className="p-2 md:p-3 rounded-lg bg-white/5 text-xs md:text-sm">
                  <p className="text-tongrid-white">Level 4 Activated</p>
                  <p className="text-tongrid-gray text-xs">You can now receive 4 TON payments</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wallet Connection */}
        {connected && userAddress ? (
          <div className="flex items-center gap-1 md:gap-2">
            {/* Address - hidden on small mobile, show on sm and up */}
            <button
              onClick={copyAddress}
              className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-tongrid-cyan/10 hover:bg-tongrid-cyan/20 transition-colors"
            >
              <Wallet className="w-3 md:w-4 h-3 md:h-4 text-tongrid-cyan" />
              <span className="font-mono text-tongrid-cyan text-xs md:text-sm">{shortAddress(userAddress)}</span>
              {copied ? <Check className="w-3 md:w-4 h-3 md:h-4 text-green-500" /> : <Copy className="w-3 md:w-4 h-3 md:h-4 text-tongrid-cyan/60" />}
            </button>

            {/* Disconnect Button */}
            <button
              onClick={handleDisconnect}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-tongrid-gray hover:text-red-400 transition-colors"
              title="Disconnect wallet"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <TonConnectButton />
        )}
      </div>
    </header>
  );
}

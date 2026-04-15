import { useState } from 'react';
import { Copy, Check, Users, Share2, Link2, MessageCircle, Twitter } from 'lucide-react';
import type { ReferralInfo } from '@/hooks/useContractEvents';

interface ReferralData {
  link: string;
  directCount: number;
  totalCount: number;
  referrals: ReferralInfo[]
  totalEarned: number
}

interface ReferralSectionProps {
  referralData: ReferralData;
}

export default function ReferralSection({ referralData }: ReferralSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(referralData.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTelegram = () => {
    const text = encodeURIComponent(`Join me on TonGrid and start earning TON! ${referralData.link}`);
    window.open(`https://t.me/share/url?url=${referralData.link}&text=${text}`, '_blank');
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`Earning TON passively with TonGrid matrix protocol 🚀 Join my team: ${referralData.link}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="glass-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-tongrid-white text-lg flex items-center gap-2">
            <Link2 className="w-5 h-5 text-tongrid-pink" />
            Your Referral Link
          </h3>
          <p className="text-tongrid-gray text-sm mt-1">
            Share to build your matrix and earn from spillover
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-tongrid-cyan/10 border border-tongrid-cyan/30">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-tongrid-cyan" />
            <span className="text-tongrid-gray text-xs">Direct Referrals</span>
          </div>
          <p className="font-mono font-bold text-tongrid-white text-2xl">
            {referralData.directCount}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-tongrid-violet/10 border border-tongrid-violet/30">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-tongrid-violet" />
            <span className="text-tongrid-gray text-xs">Total Team</span>
          </div>
          <p className="font-mono font-bold text-tongrid-white text-2xl">
            {referralData.totalCount}
          </p>
        </div>
      </div>

      {/* Link Box */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
        <p className="text-tongrid-gray text-xs mb-2">Your unique referral link</p>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-tongrid-white text-sm bg-tongrid-black/50 px-3 py-2 rounded-lg truncate">
            {referralData.link}
          </code>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-tongrid-cyan/10 hover:bg-tongrid-cyan/20 text-tongrid-cyan transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm font-medium">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex gap-3">
        <button
          onClick={shareTelegram}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Telegram</span>
        </button>
        <button
          onClick={shareTwitter}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] transition-colors"
        >
          <Twitter className="w-5 h-5" />
          <span className="text-sm font-medium">Twitter</span>
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-start gap-3">
          <Share2 className="w-5 h-5 text-tongrid-cyan flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-tongrid-white text-sm font-medium mb-1">How referrals work</p>
            <ul className="text-tongrid-gray text-sm space-y-1">
              <li>• Direct referrals fill your X3 matrix (you earn 0.9 TON each)</li>
              <li>• Their referrals fill your X6 matrix (passive spillover)</li>
              <li>• More referrals = higher rank = bigger pool share</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

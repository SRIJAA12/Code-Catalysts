"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import WalletSection from "@/components/WalletSection";
import {
  MdAccountBalanceWallet, MdShield, MdFlashOn,
  MdSupportAgent, MdStar,
} from "react-icons/md";

const FEATURES = [
  { Icon: MdShield,        title: "Secure Payments",     desc: "256-bit encrypted transactions, fully PCI-DSS compliant." },
  { Icon: MdFlashOn,       title: "Instant Top-Up",      desc: "Add money in seconds via UPI, card, or net banking." },
  { Icon: MdStar,          title: "5% Cashback",         desc: "Earn cashback on every wallet-funded booking." },
  { Icon: MdSupportAgent,  title: "24/7 Support",        desc: "Dedicated travel payment support, always on." },
];

function WalletPageContent() {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar activePage="wallet" />

      <div className="max-w-4xl mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-16 space-y-10">

        {/* ── Header ── */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MdAccountBalanceWallet className="text-primary text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Traveloop Wallet</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage your travel funds, top-up, and track every rupee spent.
            </p>
          </div>
        </div>

        {/* ── Wallet Section (balance card + transactions) ── */}
        <WalletSection />

        {/* ── Feature Cards ── */}
        <div>
          <h2 className="text-base font-bold text-gray-700 mb-4">Why use the Wallet?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 hover:shadow-md hover:border-primary/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                  <Icon className="text-primary text-lg" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-[11px] text-gray-300 text-center leading-relaxed">
          Traveloop Wallet is powered by a mock payment gateway for demo purposes.
          No real money is processed. All transactions reset on server restart.
        </p>
      </div>
    </div>
  );
}

export default function WalletPage() {
  return (
    <ProtectedRoute>
      <WalletPageContent />
    </ProtectedRoute>
  );
}

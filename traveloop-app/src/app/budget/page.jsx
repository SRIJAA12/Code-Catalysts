"use client";
import Navbar from "@/components/Navbar";
import WalletSection from "@/components/WalletSection";
import {
  MdAccountBalanceWallet, MdRestaurant, MdHotel, MdTrain,
  MdBeachAccess, MdShoppingBag, MdTrendingUp, MdWarning, MdDownload,
  MdLightbulb, MdSavings,
} from "react-icons/md";

const CATEGORIES = [
  { label: "Accommodation", Icon: MdHotel,               amount: "₹1,890", pct: 38, color: "bg-primary",          textColor: "text-primary" },
  { label: "Food & Dining", Icon: MdRestaurant,           amount: "₹940",   pct: 19, color: "bg-secondary",        textColor: "text-secondary" },
  { label: "Transport",     Icon: MdTrain,                amount: "₹780",   pct: 16, color: "bg-tertiary",         textColor: "text-tertiary" },
  { label: "Activities",    Icon: MdBeachAccess,          amount: "₹650",   pct: 13, color: "bg-green-500",        textColor: "text-green-600" },
  { label: "Shopping",      Icon: MdShoppingBag,          amount: "₹480",   pct: 10, color: "bg-purple-500",       textColor: "text-purple-600" },
  { label: "Miscellaneous", Icon: MdAccountBalanceWallet, amount: "₹200",   pct: 4,  color: "bg-orange-400",       textColor: "text-orange-500" },
];

const TRANSACTIONS = [
  { icon: MdHotel,      label: "Hotel Check-in",    sub: "Today · 2:30 PM",    amount: "-₹380", negative: true,  wallet: false },
  { icon: MdRestaurant, label: "Restaurant Dinner", sub: "Yesterday · 7:45 PM", amount: "-₹85",  negative: true,  wallet: true  },
  { icon: MdSavings,    label: "Budget Refund",     sub: "Jun 12 · 10:00 AM",  amount: "+₹200", negative: false, wallet: false },
  { icon: MdTrain,      label: "Train Ticket",      sub: "Jun 11 · 9:00 AM",   amount: "-₹120", negative: true,  wallet: true  },
];

const BAR_DATA = [
  { day: "Mon", h: 60 }, { day: "Tue", h: 90 }, { day: "Wed", h: 75 },
  { day: "Thu", h: 100 },{ day: "Fri", h: 55 }, { day: "Sat", h: 45 }, { day: "Sun", h: 70 },
];

export default function BudgetPage() {
  const totalBudget = 4940;
  const totalSpent  = 3740;
  const pctSpent    = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="budget" />

      <main className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Budget Analytics</h1>
            <p className="text-sm text-on-surface-variant mt-1">Summer in Europe · Jun 11 – Jun 21, 2024</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-outline-variant/30 rounded-xl text-sm font-bold hover:bg-surface-container transition-all shrink-0">
            <MdDownload className="icon-btn text-on-surface-variant" /> Export Report
          </button>
        </div>

        {/* ── Traveloop Wallet ── */}
        <WalletSection />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Total Budget",     value: "₹4,940", sub: "For 10 days",      bg: "bg-primary text-white",                    Icon: MdAccountBalanceWallet },
            { label: "Amount Spent",     value: "₹3,740", sub: "76% of budget",    bg: "bg-white border border-outline-variant/20", Icon: MdTrendingUp },
            { label: "Remaining",        value: "₹1,200", sub: "24% left",         bg: "bg-white border border-outline-variant/20", Icon: MdSavings },
            { label: "Daily Average",    value: "₹374",   sub: "Budget: ₹494/day", bg: "bg-white border border-outline-variant/20", Icon: MdRestaurant },
          ].map((c) => (
            <div key={c.label} className={`p-6 rounded-2xl shadow-sm flex flex-col gap-2 ${c.bg}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg.includes("primary") ? "bg-white/20" : "bg-primary/8"}`}>
                <c.Icon className={`icon-stat ${c.bg.includes("primary") ? "text-white" : "text-primary"}`} />
              </div>
              <p className={`text-xs font-semibold ${c.bg.includes("primary") ? "text-white/75" : "text-on-surface-variant"}`}>{c.label}</p>
              <p className={`text-2xl font-black ${c.bg.includes("primary") ? "text-white" : "text-on-surface"}`}>{c.value}</p>
              <p className={`text-xs ${c.bg.includes("primary") ? "text-white/60" : "text-on-surface-variant"}`}>{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-base">Daily Spending Trend</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">This week vs. budget target</p>
              </div>
              <div className="flex gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Actual</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-outline-variant inline-block" />Budget</span>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 h-40">
              {BAR_DATA.map(({ day, h }, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full relative flex items-end justify-center gap-0.5 h-32">
                    <div className="w-[45%] bg-primary/20 rounded-t-md" style={{ height: `${h * 0.8}%` }} />
                    <div className={`w-[45%] rounded-t-md ${i === 3 ? "bg-error" : i >= 5 ? "bg-primary/40" : "bg-primary"}`} style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm flex flex-col">
            <h2 className="font-bold text-base mb-5">Spending by Category</h2>
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e7f2" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0058be" strokeWidth="12" strokeDasharray="95 157" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0051d5" strokeWidth="12" strokeDasharray="48 157" strokeDashoffset="-95" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#924700" strokeWidth="12" strokeDasharray="40 157" strokeDashoffset="-143" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-lg font-black">{pctSpent}%</p>
                  <p className="text-[10px] text-on-surface-variant">Spent</p>
                </div>
              </div>
            </div>
            <div className="space-y-2.5 flex-1">
              {CATEGORIES.slice(0, 4).map(({ label, amount, pct, color, Icon }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />
                    <Icon className="icon-xs text-on-surface-variant shrink-0" />
                    <span className="text-xs font-medium text-on-surface-variant truncate">{label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold">{amount}</span>
                    <span className="text-[10px] text-outline">{pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions */}
          <div className="lg:col-span-2 bg-white border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-outline-variant/10 flex items-center justify-between">
              <h2 className="font-bold text-base">Recent Transactions</h2>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {TRANSACTIONS.map((t) => (
                <div key={t.label} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-container-low transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <t.icon className="icon-nav text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-sm font-semibold truncate">{t.label}</p>
                      {t.wallet && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/8 text-primary rounded-md text-[10px] font-bold shrink-0">
                          <MdAccountBalanceWallet style={{ fontSize: 10 }} /> Wallet
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant">{t.sub}</p>
                  </div>
                  <span className={`text-sm font-bold shrink-0 ${t.negative ? "text-error" : "text-green-600"}`}>{t.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm space-y-4">
            <h2 className="font-bold text-base">Budget Insights</h2>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex gap-3 items-start">
              <MdWarning className="icon-btn text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-orange-800">Accommodation Overspend</p>
                <p className="text-xs text-orange-700 mt-0.5 leading-relaxed">Hotels are 12% over your allocated budget for this trip.</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex gap-3 items-start">
              <MdLightbulb className="icon-btn text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-green-800">Transport Savings</p>
                <p className="text-xs text-green-700 mt-0.5 leading-relaxed">You saved $85 by booking rail tickets in advance.</p>
              </div>
            </div>
            {/* Budget bar */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/10">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-on-surface-variant">Overall Progress</span>
                <span className="text-primary">{pctSpent}%</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pctSpent}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-medium text-on-surface-variant">
                <span>Spent: ₹{totalSpent.toLocaleString()}</span>
                <span>Budget: ₹{totalBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

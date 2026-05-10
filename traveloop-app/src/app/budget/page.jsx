"use client";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  MdAccountBalanceWallet, MdRestaurant, MdHotel, MdTrain,
  MdBeachAccess, MdShoppingBag, MdTrendingUp, MdWarning, MdDownload,
  MdLightbulb, MdSavings, MdAdd, MdClose, MdDelete,
} from "react-icons/md";

const CATEGORY_META = {
  accommodation: { label: "Accommodation", Icon: MdHotel,               color: "bg-primary",          textColor: "text-primary" },
  food:          { label: "Food & Dining", Icon: MdRestaurant,           color: "bg-secondary",        textColor: "text-secondary" },
  transport:     { label: "Transport",     Icon: MdTrain,                color: "bg-tertiary",         textColor: "text-tertiary" },
  activities:    { label: "Activities",    Icon: MdBeachAccess,          color: "bg-green-500",        textColor: "text-green-600" },
  shopping:      { label: "Shopping",      Icon: MdShoppingBag,          color: "bg-purple-500",       textColor: "text-purple-600" },
  misc:          { label: "Miscellaneous", Icon: MdAccountBalanceWallet, color: "bg-orange-400",       textColor: "text-orange-500" },
};

function AddExpenseModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ amount: "", category: "food", description: "", date: new Date().toISOString().split("T")[0] });

  async function submit(e) {
    e.preventDefault();
    onAdd(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Add Expense</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container transition-colors"><MdClose className="icon-nav" /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Amount ($)</label>
            <input type="number" required min="0" step="0.01" value={form.amount} onChange={(e) => setForm(f => ({...f, amount: e.target.value}))}
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors" placeholder="0.00" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Category</label>
            <select value={form.category} onChange={(e) => setForm(f => ({...f, category: e.target.value}))}
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors">
              {Object.entries(CATEGORY_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Description</label>
            <input type="text" value={form.description} onChange={(e) => setForm(f => ({...f, description: e.target.value}))}
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors" placeholder="e.g. Hotel booking" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-on-surface-variant">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm(f => ({...f, date: e.target.value}))}
              className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors" />
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

function BudgetContent() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState({ total: 0, byCategory: {} });
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const totalBudget = 5000; // TODO: link to selected trip budget

  const fetchExpenses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/budget?uid=${user.uid}`);
      const data = await res.json();
      setExpenses(data.expenses || []);
      setAnalytics(data.analytics || { total: 0, byCategory: {} });
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

  async function handleAdd(form) {
    setShowAdd(false);
    const res = await fetch("/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid: user.uid, ...form }),
    });
    if (res.ok) fetchExpenses();
  }

  async function handleDelete(id) {
    await fetch(`/api/budget?id=${id}`, { method: "DELETE" });
    setExpenses(prev => prev.filter(e => e.id !== id));
    fetchExpenses();
  }

  const totalSpent = analytics.total || 0;
  const pctSpent   = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;

  const catData = Object.entries(analytics.byCategory || {}).map(([cat, amt]) => ({
    ...CATEGORY_META[cat] || CATEGORY_META.misc,
    cat, amount: amt, pct: totalSpent > 0 ? Math.round((amt / totalSpent) * 100) : 0,
  })).sort((a, b) => b.amount - a.amount);

  // Build bar chart data from last 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });
  const barData = days.map((day) => ({
    day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
    amount: expenses.filter(e => e.date?.startsWith(day)).reduce((s, e) => s + e.amount, 0),
  }));
  const maxBar = Math.max(...barData.map(b => b.amount), 1);

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="budget" />
      {showAdd && <AddExpenseModal onAdd={handleAdd} onClose={() => setShowAdd(false)} />}

      <main className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Budget Analytics</h1>
            <p className="text-sm text-on-surface-variant mt-1">Track your travel spending in real time</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:-translate-y-0.5 transition-all shadow-md">
              <MdAdd className="icon-btn" /> Add Expense
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-outline-variant/30 rounded-xl text-sm font-bold hover:bg-surface-container transition-all shrink-0">
              <MdDownload className="icon-btn text-on-surface-variant" /> Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Total Budget",   value: `$${totalBudget.toLocaleString()}`, sub: "Set for this trip",    bg: "bg-primary text-white",                    Icon: MdAccountBalanceWallet },
            { label: "Amount Spent",   value: `$${totalSpent.toLocaleString()}`,  sub: `${pctSpent}% of budget`, bg: "bg-white border border-outline-variant/20", Icon: MdTrendingUp },
            { label: "Remaining",      value: `$${Math.max(0, totalBudget - totalSpent).toLocaleString()}`, sub: `${100 - pctSpent}% left`, bg: "bg-white border border-outline-variant/20", Icon: MdSavings },
            { label: "Transactions",   value: expenses.length.toString(),         sub: "Total entries",          bg: "bg-white border border-outline-variant/20", Icon: MdRestaurant },
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
                <h2 className="font-bold text-base">Daily Spending (Last 7 Days)</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Based on expense dates</p>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 h-40">
              {barData.map(({ day, amount }, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full relative flex items-end justify-center h-32">
                    <div
                      className="w-full rounded-t-md bg-primary transition-all duration-500"
                      style={{ height: `${maxBar > 0 ? Math.max(4, (amount / maxBar) * 100) : 4}%` }}
                      title={`$${amount.toFixed(2)}`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Donut */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm flex flex-col">
            <h2 className="font-bold text-base mb-5">By Category</h2>
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e7f2" strokeWidth="12" />
                  {catData.slice(0, 3).reduce((acc, cat, i) => {
                    const offset = acc.offset;
                    const dash   = (cat.pct / 100) * 251;
                    acc.elements.push(
                      <circle key={i} cx="50" cy="50" r="40" fill="none"
                        stroke={["#0058be","#0051d5","#924700"][i] || "#888"}
                        strokeWidth="12" strokeDasharray={`${dash} 251`}
                        strokeDashoffset={-offset} strokeLinecap="round" />
                    );
                    acc.offset += dash;
                    return acc;
                  }, { offset: 0, elements: [] }).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-lg font-black">{pctSpent}%</p>
                  <p className="text-[10px] text-on-surface-variant">Spent</p>
                </div>
              </div>
            </div>
            <div className="space-y-2.5 flex-1">
              {catData.slice(0, 5).map(({ label, amount, pct, color, Icon }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${color}`} />
                    <Icon className="icon-xs text-on-surface-variant shrink-0" />
                    <span className="text-xs font-medium text-on-surface-variant truncate">{label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold">${amount.toFixed(0)}</span>
                    <span className="text-[10px] text-outline">{pct}%</span>
                  </div>
                </div>
              ))}
              {catData.length === 0 && <p className="text-sm text-on-surface-variant text-center py-4">No expenses yet</p>}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-outline-variant/10 flex items-center justify-between">
            <h2 className="font-bold text-base">Recent Transactions</h2>
            <span className="text-xs text-on-surface-variant">{expenses.length} entries</span>
          </div>
          {loading ? (
            <div className="p-8 text-center text-sm text-on-surface-variant">Loading…</div>
          ) : expenses.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-on-surface-variant mb-3">No expenses tracked yet</p>
              <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold">Add your first expense</button>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/10">
              {expenses.map((t) => {
                const meta = CATEGORY_META[t.category] || CATEGORY_META.misc;
                return (
                  <div key={t.id} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-container-low transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <meta.Icon className="icon-nav text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{t.description || meta.label}</p>
                      <p className="text-xs text-on-surface-variant">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                    <span className="text-sm font-bold shrink-0 text-error">-${t.amount.toFixed(2)}</span>
                    <button onClick={() => handleDelete(t.id)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 text-error transition-all">
                      <MdDelete className="icon-sm" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function BudgetPage() {
  return <ProtectedRoute><BudgetContent /></ProtectedRoute>;
}

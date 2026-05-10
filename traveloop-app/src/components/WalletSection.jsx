"use client";
import { useState, useEffect, useCallback } from "react";
import {
  MdAccountBalanceWallet, MdAdd, MdArrowUpward, MdArrowDownward,
  MdRefresh, MdCardGiftcard, MdClose, MdCheckCircle, MdError,
  MdHistory, MdChevronRight, MdChevronLeft, MdStar,
} from "react-icons/md";

/* ── helpers ── */
const fmt = (n) => `$${Number(n).toFixed(2)}`;

const TYPE_META = {
  credit:   { label: "Added",    icon: MdArrowDownward, color: "text-emerald-600", bg: "bg-emerald-50",   dot: "bg-emerald-500"  },
  debit:    { label: "Paid",     icon: MdArrowUpward,   color: "text-red-500",     bg: "bg-red-50",       dot: "bg-red-500"      },
  refund:   { label: "Refund",   icon: MdRefresh,       color: "text-sky-600",     bg: "bg-sky-50",       dot: "bg-sky-500"      },
  cashback: { label: "Cashback", icon: MdCardGiftcard,  color: "text-violet-600",  bg: "bg-violet-50",    dot: "bg-violet-500"   },
};

const STATUS_BADGE = {
  success: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100  text-amber-700",
  failed:  "bg-red-100    text-red-700",
};

const PRESET_AMOUNTS = [50, 100, 200, 500];

function relativeTime(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60)   return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ── Add Funds Modal ── */
function AddFundsModal({ balance, onClose, onSuccess }) {
  const [custom, setCustom]     = useState("");
  const [selected, setSelected] = useState(null);
  const [phase, setPhase]       = useState("idle"); // idle | processing | success | failed

  const amount = selected ?? (parseFloat(custom) || 0);

  async function handlePay() {
    if (amount <= 0) return;
    setPhase("processing");
    try {
      const res  = await fetch("/api/wallet/add-funds", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (data.success) { setPhase("success"); onSuccess(data.newBalance); }
      else              { setPhase("failed"); }
    } catch { setPhase("failed"); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative bg-gradient-to-br from-[#0058be] to-[#003a8c] p-6 text-white">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition">
            <MdClose className="icon-btn" />
          </button>
          <p className="text-xs font-semibold opacity-75 mb-1">Traveloop Wallet</p>
          <p className="text-sm opacity-75">Current Balance</p>
          <p className="text-3xl font-black mt-0.5">{fmt(balance)}</p>
        </div>

        {phase === "success" && (
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <MdCheckCircle className="text-emerald-500" style={{ fontSize: 36 }} />
            </div>
            <p className="text-lg font-black text-on-surface">Money Added!</p>
            <p className="text-sm text-on-surface-variant">{fmt(amount)} has been added to your wallet.</p>
            <button onClick={onClose} className="mt-2 btn btn-primary w-full">Done</button>
          </div>
        )}

        {phase === "failed" && (
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <MdError className="text-red-500" style={{ fontSize: 36 }} />
            </div>
            <p className="text-lg font-black text-on-surface">Payment Failed</p>
            <p className="text-sm text-on-surface-variant">Gateway declined. Please try again.</p>
            <button onClick={() => setPhase("idle")} className="mt-2 btn btn-primary w-full">Retry</button>
          </div>
        )}

        {phase === "processing" && (
          <div className="p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-on-surface-variant">Processing payment…</p>
          </div>
        )}

        {phase === "idle" && (
          <div className="p-6 space-y-5">
            {/* presets */}
            <div>
              <p className="text-xs font-bold text-on-surface-variant mb-2">Select Amount</p>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AMOUNTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setSelected(p); setCustom(""); }}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                      selected === p
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-outline-variant/30 text-on-surface-variant hover:border-primary/40"
                    }`}
                  >
                    ${p}
                  </button>
                ))}
              </div>
            </div>

            {/* custom */}
            <div>
              <p className="text-xs font-bold text-on-surface-variant mb-2">Or Enter Custom Amount</p>
              <div className="flex items-center border-2 border-outline-variant/30 rounded-xl px-3 py-2.5 focus-within:border-primary transition">
                <span className="text-on-surface-variant font-bold mr-1">$</span>
                <input
                  type="number" min="1" placeholder="0.00"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                  className="flex-1 bg-transparent text-sm font-bold text-on-surface outline-none"
                />
              </div>
            </div>

            {/* info */}
            <div className="flex items-start gap-2 bg-primary/5 rounded-xl p-3">
              <MdStar className="text-primary shrink-0 mt-0.5 icon-sm" />
              <p className="text-xs text-primary/80 leading-relaxed">
                Earn <strong>5% cashback</strong> on all wallet-funded bookings!
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={amount <= 0}
              className="btn btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add {amount > 0 ? fmt(amount) : "Money"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main WalletSection ── */
export default function WalletSection() {
  const [balance, setBalance]         = useState(null);
  const [transactions, setTxns]       = useState([]);
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [loading, setLoading]         = useState(true);
  const [showModal, setShowModal]     = useState(false);
  const [showAll, setShowAll]         = useState(false);

  const fetchBalance = useCallback(async () => {
    const res  = await fetch("/api/wallet/balance");
    const data = await res.json();
    setBalance(data.balance);
  }, []);

  const fetchTxns = useCallback(async (p = 1) => {
    const res  = await fetch(`/api/wallet/transactions?page=${p}&limit=5`);
    const data = await res.json();
    setTxns(data.transactions);
    setTotalPages(data.totalPages);
    setPage(p);
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBalance(), fetchTxns(1)]).finally(() => setLoading(false));
  }, [fetchBalance, fetchTxns]);

  function handleAddSuccess(newBalance) {
    setBalance(newBalance);
    fetchTxns(1);
  }

  /* wallet spend from transactions */
  const walletSpend = transactions
    .filter((t) => t.type === "debit" && t.status === "success")
    .reduce((s, t) => s + t.amount, 0);

  const walletSaved = transactions
    .filter((t) => (t.type === "cashback" || t.type === "refund") && t.status === "success")
    .reduce((s, t) => s + t.amount, 0);

  const displayTxns = showAll ? transactions : transactions.slice(0, 4);

  if (loading) {
    return (
      <div className="rounded-3xl border border-outline-variant/20 bg-white p-8 flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-on-surface-variant font-medium">Loading wallet…</span>
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <AddFundsModal
          balance={balance}
          onClose={() => setShowModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      <section className="space-y-5">
        {/* ── Balance Hero Card ── */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          {/* gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0058be] via-[#0047a0] to-[#002d6e]" />
          {/* decorative circles */}
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -left-8  w-40 h-40 rounded-full bg-white/5" />

          <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* left */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <MdAccountBalanceWallet className="text-white" style={{ fontSize: 30 }} />
              </div>
              <div>
                <p className="text-white/70 text-xs font-semibold tracking-wide uppercase mb-1">Traveloop Wallet</p>
                <p className="text-white text-4xl font-black tracking-tight">{fmt(balance)}</p>
                <p className="text-white/60 text-xs mt-1">Available Balance</p>
              </div>
            </div>

            {/* right: stats + button */}
            <div className="flex flex-col sm:items-end gap-4">
              <div className="flex gap-5">
                <div className="text-center">
                  <p className="text-white/55 text-[10px] font-semibold uppercase">Spent</p>
                  <p className="text-white font-bold text-sm">{fmt(walletSpend)}</p>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <p className="text-white/55 text-[10px] font-semibold uppercase">Saved</p>
                  <p className="text-white font-bold text-sm text-emerald-300">{fmt(walletSaved)}</p>
                </div>
              </div>
              <button
                id="wallet-add-money-btn"
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-bold text-sm rounded-xl shadow-md hover:bg-primary/5 hover:shadow-lg transition-all active:scale-95"
              >
                <MdAdd className="icon-sm" /> Add Money
              </button>
            </div>
          </div>

          {/* quick stats strip */}
          <div className="relative bg-white/10 backdrop-blur-sm px-6 sm:px-8 py-3 flex gap-6 border-t border-white/10">
            {[
              { label: "Total Added",   val: fmt(balance + walletSpend - walletSaved) },
              { label: "Transactions",  val: transactions.length },
              { label: "Cashback",      val: fmt(walletSaved) },
            ].map(({ label, val }) => (
              <div key={label} className="flex flex-col">
                <span className="text-white/55 text-[10px] font-semibold uppercase">{label}</span>
                <span className="text-white text-sm font-bold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Transaction History ── */}
        <div className="bg-white border border-outline-variant/20 rounded-3xl shadow-sm overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
            <div className="flex items-center gap-2">
              <MdHistory className="icon-btn text-primary" />
              <h3 className="font-bold text-base">Wallet Activity</h3>
            </div>
            <div className="flex items-center gap-2">
              {/* pagination */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    disabled={page <= 1}
                    onClick={() => fetchTxns(page - 1)}
                    className="p-1 rounded-lg hover:bg-surface-container disabled:opacity-30 transition"
                  ><MdChevronLeft className="icon-btn" /></button>
                  <span className="text-xs font-semibold text-on-surface-variant">{page}/{totalPages}</span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => fetchTxns(page + 1)}
                    className="p-1 rounded-lg hover:bg-surface-container disabled:opacity-30 transition"
                  ><MdChevronRight className="icon-btn" /></button>
                </div>
              )}
              <button
                onClick={() => setShowAll((v) => !v)}
                className="text-xs font-bold text-primary hover:underline"
              >{showAll ? "Show Less" : "View All"}</button>
            </div>
          </div>

          {/* list */}
          {displayTxns.length === 0 ? (
            <div className="py-12 flex flex-col items-center gap-3 text-on-surface-variant">
              <MdAccountBalanceWallet style={{ fontSize: 40 }} className="opacity-30" />
              <p className="text-sm font-medium">No transactions yet</p>
            </div>
          ) : (
            <ul className="divide-y divide-outline-variant/10">
              {displayTxns.map((t) => {
                const meta = TYPE_META[t.type] ?? TYPE_META.debit;
                const IconComp = meta.icon;
                const isCredit = t.type === "credit" || t.type === "cashback" || t.type === "refund";
                return (
                  <li key={t.transaction_id} className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors group">
                    {/* icon */}
                    <div className={`w-10 h-10 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}>
                      <IconComp className={`icon-btn ${meta.color}`} />
                    </div>

                    {/* text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-on-surface truncate">{t.description}</p>
                        {/* wallet badge */}
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/8 text-primary rounded-md text-[10px] font-bold shrink-0">
                          <MdAccountBalanceWallet style={{ fontSize: 10 }} /> Wallet
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${STATUS_BADGE[t.status] ?? ""}`}>
                          {t.status}
                        </span>
                        <span className="text-xs text-on-surface-variant">{relativeTime(t.timestamp)}</span>
                      </div>
                    </div>

                    {/* amount */}
                    <span className={`text-sm font-black shrink-0 ${isCredit ? "text-emerald-600" : "text-red-500"}`}>
                      {isCredit ? "+" : "-"}{fmt(t.amount)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

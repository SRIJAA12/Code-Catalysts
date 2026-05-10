/**
 * walletStore.js
 * In-memory wallet state — mimics a real wallet backend.
 * Swap the server-side reads/writes to Firestore when ready.
 */

const MOCK_USER_ID = "user_traveloop_001";

// ── Seed Data ───────────────────────────────────────────────────────────────
let walletState = {
  wallet_id: "wlt_001",
  user_id: MOCK_USER_ID,
  balance: 245.0,
  created_at: new Date("2024-06-01T08:00:00Z").toISOString(),
};

let transactions = [
  {
    transaction_id: "txn_001",
    wallet_id: "wlt_001",
    amount: 500.0,
    type: "credit",
    status: "success",
    description: "Added via Credit Card •••• 4242",
    timestamp: new Date("2024-06-01T08:05:00Z").toISOString(),
  },
  {
    transaction_id: "txn_002",
    wallet_id: "wlt_001",
    amount: 120.0,
    type: "debit",
    status: "success",
    description: "Train Ticket — Paris to Amsterdam",
    timestamp: new Date("2024-06-11T09:00:00Z").toISOString(),
  },
  {
    transaction_id: "txn_003",
    wallet_id: "wlt_001",
    amount: 85.0,
    type: "debit",
    status: "success",
    description: "Restaurant Dinner — Le Petit Bistro",
    timestamp: new Date("2024-06-12T19:45:00Z").toISOString(),
  },
  {
    transaction_id: "txn_004",
    wallet_id: "wlt_001",
    amount: 25.0,
    type: "cashback",
    status: "success",
    description: "Cashback — 5% on Train Ticket",
    timestamp: new Date("2024-06-11T09:01:00Z").toISOString(),
  },
  {
    transaction_id: "txn_005",
    wallet_id: "wlt_001",
    amount: 50.0,
    type: "debit",
    status: "success",
    description: "Eiffel Tower Entry Ticket",
    timestamp: new Date("2024-06-13T14:30:00Z").toISOString(),
  },
  {
    transaction_id: "txn_006",
    wallet_id: "wlt_001",
    amount: 25.0,
    type: "refund",
    status: "success",
    description: "Refund — Museum Tour Cancelled",
    timestamp: new Date("2024-06-14T10:00:00Z").toISOString(),
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Get current wallet state */
export function getWallet() {
  return { ...walletState };
}

/** Get paginated transactions (sorted newest first) */
export function getTransactions({ page = 1, limit = 10 } = {}) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = sorted.slice(start, start + limit);
  return { transactions: data, total, totalPages, page };
}

/**
 * Mock payment gateway — 1.5 s delay, 95% success rate.
 * Returns { success, transactionId, newBalance }
 */
export async function addFunds(amount) {
  const pendingId = generateId("txn");

  // Stage 1: pending transaction
  const pendingTxn = {
    transaction_id: pendingId,
    wallet_id: walletState.wallet_id,
    amount,
    type: "credit",
    status: "pending",
    description: `Adding ₹${amount} via Mock Gateway`,
    timestamp: new Date().toISOString(),
  };
  transactions.push(pendingTxn);

  // Stage 2: simulate gateway delay
  await new Promise((res) => setTimeout(res, 1500));

  // Stage 3: random failure (5%)
  const isSuccess = Math.random() > 0.05;

  const txn = transactions.find((t) => t.transaction_id === pendingId);
  if (isSuccess) {
    txn.status = "success";
    txn.description = `Added $${amount} via Credit Card`;
    walletState.balance = +(walletState.balance + amount).toFixed(2);
    return { success: true, transactionId: pendingId, newBalance: walletState.balance };
  } else {
    txn.status = "failed";
    txn.description = `Failed — $${amount} add attempt`;
    return { success: false, transactionId: pendingId, error: "Payment gateway declined" };
  }
}

/**
 * Pay for an activity using wallet balance.
 * Returns { success, transactionId, newBalance } or { success: false, error }
 */
export async function walletPay({ amount, description }) {
  if (walletState.balance < amount) {
    return { success: false, error: "Insufficient wallet balance" };
  }

  await new Promise((res) => setTimeout(res, 800));

  const txnId = generateId("txn");
  walletState.balance = +(walletState.balance - amount).toFixed(2);

  transactions.push({
    transaction_id: txnId,
    wallet_id: walletState.wallet_id,
    amount,
    type: "debit",
    status: "success",
    description: description || "Trip Activity Payment",
    timestamp: new Date().toISOString(),
  });

  return { success: true, transactionId: txnId, newBalance: walletState.balance };
}

// src/routes/wallet.js — in-memory wallet (swap to DB when ready)
const router = require("express").Router();
const { verifyToken } = require("../middleware/auth");

// Per-user in-memory wallets (keyed by Firebase UID)
const wallets = {};
const txnLog  = {};

function getWallet(uid) {
  if (!wallets[uid]) {
    wallets[uid] = { balance: 0, wallet_id: `wlt_${uid.slice(0, 8)}` };
    txnLog[uid]  = [];
  }
  return wallets[uid];
}

function getTxns(uid) { return txnLog[uid] || []; }

function genId() { return `txn_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`; }

// GET /api/wallet/balance
router.get("/balance", verifyToken, (req, res) => {
  const w = getWallet(req.user.uid);
  res.json({ balance: w.balance, wallet_id: w.wallet_id });
});

// GET /api/wallet/transactions
router.get("/transactions", verifyToken, (req, res) => {
  const page  = parseInt(req.query.page  || "1",  10);
  const limit = parseInt(req.query.limit || "10", 10);
  const all   = [...getTxns(req.user.uid)].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const total = all.length;
  res.json({
    transactions: all.slice((page - 1) * limit, page * limit),
    total, totalPages: Math.ceil(total / limit), page,
  });
});

// POST /api/wallet/add-funds
router.post("/add-funds", verifyToken, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });
  await new Promise(r => setTimeout(r, 1200));
  if (Math.random() < 0.05) {
    txnLog[req.user.uid].push({ transaction_id: genId(), amount, type: "credit", status: "failed", description: `Failed add ₹${amount}`, timestamp: new Date().toISOString() });
    return res.status(402).json({ success: false, error: "Gateway declined" });
  }
  const w = getWallet(req.user.uid);
  w.balance = +(w.balance + amount).toFixed(2);
  const id  = genId();
  txnLog[req.user.uid].push({ transaction_id: id, amount, type: "credit", status: "success", description: `Added ₹${amount} via wallet`, timestamp: new Date().toISOString() });
  res.json({ success: true, transactionId: id, newBalance: w.balance });
});

// POST /api/wallet/pay
router.post("/pay", verifyToken, async (req, res) => {
  const { amount, description } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });
  const w = getWallet(req.user.uid);
  if (w.balance < amount) return res.status(402).json({ success: false, error: "Insufficient balance" });
  await new Promise(r => setTimeout(r, 600));
  w.balance = +(w.balance - amount).toFixed(2);
  const id  = genId();
  txnLog[req.user.uid].push({ transaction_id: id, amount, type: "debit", status: "success", description: description || "Trip payment", timestamp: new Date().toISOString() });
  res.json({ success: true, transactionId: id, newBalance: w.balance });
});

module.exports = router;

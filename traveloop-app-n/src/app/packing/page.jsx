"use client";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  MdAdd, MdCheck, MdCheckCircle, MdSearch, MdDownload,
  MdInventory2, MdCheckroom, MdDevices, MdFolderShared,
  MdMedicalServices, MdLuggage, MdClose, MdDelete, MdAutoAwesome,
} from "react-icons/md";
import { askGemini } from "@/lib/gemini";

const CAT_META = {
  clothing:     { label: "Clothing & Accessories", Icon: MdCheckroom,      color: "bg-blue-100 text-blue-700" },
  electronics:  { label: "Electronics",            Icon: MdDevices,        color: "bg-purple-100 text-purple-700" },
  documents:    { label: "Documents",              Icon: MdFolderShared,   color: "bg-orange-100 text-orange-700" },
  toiletries:   { label: "Health & Toiletries",    Icon: MdMedicalServices,color: "bg-red-100 text-red-700" },
  other:        { label: "Other",                  Icon: MdLuggage,        color: "bg-gray-100 text-gray-700" },
};

function PackingContent() {
  const { user } = useAuth();
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState({ label: "", category: "other" });
  const [aiLoading, setAiLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchItems = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/packing?uid=${user.uid}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newItem.label.trim()) return;
    const res = await fetch("/api/packing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid: user.uid, ...newItem }),
    });
    if (res.ok) {
      setNewItem({ label: "", category: "other" });
      setShowAddForm(false);
      fetchItems();
    }
  }

  async function handleToggle(id, packed) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, packed: !packed } : i));
    await fetch("/api/packing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, packed: !packed }),
    });
  }

  async function handleDelete(id) {
    setItems(prev => prev.filter(i => i.id !== id));
    await fetch(`/api/packing?id=${id}`, { method: "DELETE" });
  }

  async function handleAiSuggest() {
    setAiLoading(true);
    try {
      const prompt = `Give me a packing checklist for a travel trip. Return ONLY a JSON array of objects with fields: label (string) and category (one of: clothing, electronics, documents, toiletries, other). Return exactly 12 diverse items covering different categories. No explanation, just the JSON array.`;
      const response = await askGemini(prompt);
      const match = response.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("No JSON found");
      const suggestions = JSON.parse(match[0]);

      await fetch("/api/packing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.uid, items: suggestions }),
      });
      fetchItems();
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  }

  const filtered = items.filter(i => !search || i.label.toLowerCase().includes(search.toLowerCase()));
  const packed = items.filter(i => i.packed).length;
  const total  = items.length;
  const pct    = total > 0 ? Math.round((packed / total) * 100) : 0;

  // Group by category
  const grouped = Object.entries(CAT_META).map(([key, meta]) => ({
    key, ...meta,
    items: filtered.filter(i => i.category === key),
  })).filter(g => g.items.length > 0);

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />
      <main className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Packing Checklist</h1>
            <p className="text-sm text-on-surface-variant mt-1">{packed}/{total} items packed</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleAiSuggest} disabled={aiLoading} className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/30 bg-primary/5 text-primary rounded-xl text-sm font-bold hover:-translate-y-0.5 transition-all disabled:opacity-60">
              <MdAutoAwesome className="icon-btn" /> {aiLoading ? "Getting suggestions…" : "AI Suggest"}
            </button>
            <button onClick={() => setShowAddForm(v => !v)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all">
              <MdAdd className="icon-btn" /> Add Item
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <form onSubmit={handleAdd} className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-48 space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant">Item Name</label>
              <input type="text" value={newItem.label} onChange={e => setNewItem(f => ({...f, label: e.target.value}))} placeholder="e.g. Passport" required
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface-variant">Category</label>
              <select value={newItem.category} onChange={e => setNewItem(f => ({...f, category: e.target.value}))}
                className="px-4 py-2.5 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors">
                {Object.entries(CAT_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">Add</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container transition-colors"><MdClose className="icon-nav" /></button>
          </form>
        )}

        {/* Progress Banner */}
        <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e7f2" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0058be" strokeWidth="10"
                strokeDasharray={`${pct * 2.51} 251`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.5s ease" }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-primary">{pct}%</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{packed}/{total} Items Packed</h2>
            <p className="text-sm text-on-surface-variant mt-0.5">
              {total === 0 ? "Add items or use AI Suggest to get started." : `${total - packed} items still need to be packed.`}
            </p>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mt-3">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
          {pct >= 75 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2.5 rounded-xl shrink-0">
              <MdCheckCircle className="icon-btn text-green-600" />
              <span className="text-sm font-bold text-green-800">Almost Ready!</span>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 icon-nav text-outline" />
          <input className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant/20 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Search items…" type="search" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Category Grids */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl h-40 animate-pulse border border-outline-variant/20" />)}</div>
        ) : grouped.length === 0 && items.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <MdLuggage className="icon-xl text-outline-variant mx-auto" />
            <p className="text-on-surface-variant">Your packing list is empty.</p>
            <button onClick={handleAiSuggest} disabled={aiLoading} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
              {aiLoading ? "Loading…" : "Generate with AI"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grouped.map((cat) => {
              const catPacked = cat.items.filter(i => i.packed).length;
              return (
                <div key={cat.key} className="bg-white border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.color}`}>
                        <cat.Icon className="icon-nav" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{cat.label}</h3>
                        <p className="text-[11px] text-on-surface-variant">{catPacked}/{cat.items.length} packed</p>
                      </div>
                    </div>
                  </div>
                  <ul className="divide-y divide-outline-variant/8">
                    {cat.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-surface-container-low/50 transition-colors group">
                        <button
                          onClick={() => handleToggle(item.id, item.packed)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${item.packed ? "bg-primary border-primary" : "border-outline-variant hover:border-primary"}`}
                        >
                          {item.packed && <MdCheck className="text-white text-xs" />}
                        </button>
                        <span className={`text-sm flex-1 ${item.packed ? "line-through text-on-surface-variant" : "font-medium"}`}>
                          {item.label}
                        </span>
                        <button onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-50 text-error transition-all">
                          <MdDelete className="icon-xs" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* AI Templates */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <MdInventory2 className="icon-nav text-primary" />
            <h3 className="font-bold text-sm text-primary">Quick Templates</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Beach Holiday", "Ski Trip", "Business Travel", "Backpacking"].map((t) => (
              <button key={t} onClick={handleAiSuggest} className="px-4 py-2 bg-white border border-primary/20 rounded-full text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1.5">
                <MdLuggage className="icon-xs" /> {t}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PackingPage() {
  return <ProtectedRoute><PackingContent /></ProtectedRoute>;
}

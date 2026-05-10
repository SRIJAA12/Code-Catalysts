"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { detectCurrency, formatCurrency } from "@/lib/currency";
import {
  MdSearch, MdLocationOn, MdStar, MdFavorite, MdFavoriteBorder,
  MdFilterList, MdTune, MdSort, MdHiking, MdBeachAccess, MdMuseum, MdForest, MdMap,
  MdAutoAwesome, MdTrain, MdFlight, MdDirectionsCar, MdCalendarMonth,
  MdRefresh, MdAccessTime, MdClose, MdFilterAlt,
} from "react-icons/md";

// ── International destinations (static) ──────────────────────────────────────
const CATEGORIES = [
  { label: "Adventure", Icon: MdHiking },
  { label: "Beach",     Icon: MdBeachAccess },
  { label: "Culture",   Icon: MdMuseum },
  { label: "Nature",    Icon: MdForest },
];

const DESTINATIONS = [
  { city: "Kyoto, Japan",      rating: "4.9", reviews: "2.1k", liked: true,  tall: true,  img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80" },
  { city: "Santorini, Greece", rating: "4.8", reviews: "1.8k", liked: false, tall: false, img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80" },
  { city: "Patagonia, Chile",  rating: "4.7", reviews: "940",  liked: false, tall: true,  img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80" },
  { city: "Morocco, Africa",   rating: "4.6", reviews: "1.2k", liked: true,  tall: false, img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80" },
  { city: "New Zealand",       rating: "4.9", reviews: "3.1k", liked: false, tall: false, img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80" },
  { city: "Banff, Canada",     rating: "4.8", reviews: "2.4k", liked: false, tall: true,  img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80" },
];

const CAT_COLOURS = {
  "Weekend Getaway":    "from-green-400  to-emerald-600",
  "Cultural Deep Dive": "from-amber-400  to-orange-600",
  "The Great Escape":   "from-blue-500   to-indigo-700",
  "City Escape":        "from-violet-500 to-purple-700",
  "Asian Escape":       "from-rose-400   to-red-600",
  "Global Adventure":   "from-sky-400    to-cyan-600",
  "European Dream":     "from-indigo-400 to-blue-700",
};

const modeIcon = (mode = "") => {
  if (mode.toLowerCase().includes("flight")) return MdFlight;
  if (mode.toLowerCase().includes("train"))  return MdTrain;
  return MdDirectionsCar;
};

// ── AI Destination Card ───────────────────────────────────────────────────────
function AICard({ rec, currency, idx }) {
  const grad = CAT_COLOURS[rec.category] || "from-primary to-secondary";
  const ModeIcon = modeIcon(rec.travelMode);

  return (
    <div className="bg-white border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className={`h-36 bg-gradient-to-br ${grad} p-5 flex flex-col justify-between relative overflow-hidden`}>
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
        <span className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30">
          {rec.category}
        </span>
        <div>
          <h3 className="text-white text-xl font-black">{rec.destination}</h3>
          <p className="text-white/75 text-xs flex items-center gap-1 mt-0.5">
            <MdLocationOn className="icon-xs" /> {rec.country}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <p className="text-sm text-on-surface-variant leading-relaxed italic">"{rec.travelHook}"</p>

        <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-on-surface-variant">
          <span className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg">
            <MdAccessTime className="icon-xs" /> {rec.duration}
          </span>
          <span className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg">
            <ModeIcon className="icon-xs" /> {rec.travelMode}
          </span>
          <span className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg">
            <MdCalendarMonth className="icon-xs" /> {rec.bestSeason}
          </span>
        </div>

        {rec.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {rec.highlights.slice(0, 3).map(h => (
              <span key={h} className="text-[10px] bg-primary/8 text-primary font-bold px-2 py-0.5 rounded-full">{h}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-outline-variant/10">
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Est. Budget</p>
            <p className="text-lg font-black text-primary">
              {formatCurrency(rec.estimatedBudget, currency)}
              <span className="text-xs font-normal text-on-surface-variant ml-1">/ person</span>
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-sm">
            Plan Trip →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Filters Panel ─────────────────────────────────────────────────────────────
function FiltersPanel({ cityInput, setCityInput, destFilter, setDestFilter, budgetFilter, setBudgetFilter, currency, loading, onApply }) {
  const vibes = ["Beaches", "Mountains", "Cultural", "Adventure", "City Break", "Nature", "Spiritual", "Luxury", "Budget Travel"];

  return (
    <div className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center gap-2">
        <MdFilterAlt className="icon-nav text-primary" />
        <h3 className="font-bold text-sm">AI Trip Filters</h3>
        <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full font-bold">Optional</span>
      </div>

      {/* Origin city */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Your City</label>
        <div className="relative">
          <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 icon-sm text-primary" />
          <input type="text" value={cityInput} onChange={e => setCityInput(e.target.value)}
            placeholder="e.g. Coimbatore"
            className="w-full pl-9 pr-4 py-2.5 bg-surface-container-low rounded-xl text-sm border border-outline-variant/20 focus:border-primary transition-colors" />
        </div>
      </div>

      {/* Destination vibe */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Destination / Vibe</label>
        <input type="text" value={destFilter} onChange={e => setDestFilter(e.target.value)}
          placeholder="e.g. Beaches, Europe, Kerala…"
          className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm border border-outline-variant/20 focus:border-primary transition-colors" />
        <div className="flex flex-wrap gap-1.5">
          {vibes.map(v => (
            <button key={v} onClick={() => setDestFilter(destFilter === v ? "" : v)}
              className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border transition-all ${destFilter === v ? "bg-primary text-white border-primary" : "border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary"}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          Max Budget ({currency.symbol})
        </label>
        <input type="number" value={budgetFilter} onChange={e => setBudgetFilter(e.target.value)}
          placeholder={`e.g. ${currency.code === "INR" ? "50000" : "1500"}`} min="0"
          className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl text-sm border border-outline-variant/20 focus:border-primary transition-colors" />
        {budgetFilter && (
          <p className="text-[10px] text-primary font-bold">
            Showing trips under {formatCurrency(Number(budgetFilter), currency)}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={onApply} disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-all">
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <MdAutoAwesome className="icon-sm" />}
          {loading ? "Generating…" : "Get AI Picks"}
        </button>
        {(destFilter || budgetFilter) && (
          <button onClick={() => { setDestFilter(""); setBudgetFilter(""); }}
            className="p-2.5 border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors" title="Clear filters">
            <MdClose className="icon-nav text-on-surface-variant" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function ExploreContent() {
  const searchParams = useSearchParams();
  const [currency, setCurrency]         = useState({ code: "INR", symbol: "₹", locale: "en-IN" });
  const [activeCategory, setActiveCategory] = useState("Adventure");
  const [liked, setLiked]               = useState(new Set(DESTINATIONS.filter(d => d.liked).map(d => d.city)));
  const [search, setSearch]             = useState("");

  // Filter state
  const [cityInput, setCityInput]       = useState("Mumbai");
  const [destFilter, setDestFilter]     = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");

  // AI recs
  const [recs, setRecs]                 = useState([]);
  const [loading, setLoading]           = useState(false);
  const [origin, setOrigin]             = useState("Mumbai");

  // Detect currency on mount
  useEffect(() => {
    const c = detectCurrency();
    setCurrency(c);
  }, []);

  const fetchRecs = useCallback(async (city, dest, budget) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        city:     city     || "Mumbai",
        currency: currency.code,
        symbol:   currency.symbol,
        locale:   currency.locale,
        ...(dest   && { dest }),
        ...(budget && { budget }),
      });
      const res  = await fetch(`/api/explore?${params}`);
      const data = await res.json();
      setRecs(data.personalizedDashboard || []);
      setOrigin(city || "Mumbai");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currency]);

  // On mount — read URL params from Dashboard nav, pre-fill filters and fetch
  useEffect(() => {
    const urlDest   = searchParams.get("dest")   || "";
    const urlBudget = searchParams.get("budget") || "";
    if (urlDest)   setDestFilter(urlDest);
    if (urlBudget) setBudgetFilter(urlBudget);
    const c = detectCurrency();
    setCurrency(c);
    // Small delay to let state settle
    setTimeout(() => fetchRecs(cityInput, urlDest, urlBudget), 100);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleApply() {
    fetchRecs(cityInput.trim() || "Mumbai", destFilter, budgetFilter);
  }

  function toggleLike(c) {
    setLiked(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n; });
  }

  const filteredDests = DESTINATIONS.filter(d => !search || d.city.toLowerCase().includes(search.toLowerCase()));
  const hasFilters    = destFilter || budgetFilter;

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="explore" />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="h-72 relative overflow-hidden">
          <img className="absolute inset-0 w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=80" alt="Explore hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-4">
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur border border-white/30 px-4 py-1.5 rounded-full text-white text-xs font-bold">
              <MdAutoAwesome className="icon-xs" /> AI-Powered · {currency.code} · Personalized for you
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-2xl">
              Discover Your Perfect Trip
            </h1>
            <div className="flex w-full max-w-xl gap-2">
              <div className="relative flex-1">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 icon-nav text-on-surface-variant" />
                <input placeholder="Search destinations…" type="search" value={search} onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/95 text-sm focus:ring-2 focus:ring-primary/20 shadow-lg" />
              </div>
              <button className="bg-primary text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-lg">Search</button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* ── AI Personalized Section ── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Filters sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <FiltersPanel
                cityInput={cityInput}   setCityInput={setCityInput}
                destFilter={destFilter} setDestFilter={setDestFilter}
                budgetFilter={budgetFilter} setBudgetFilter={setBudgetFilter}
                currency={currency} loading={loading} onApply={handleApply}
              />
            </div>
          </div>

          {/* AI cards */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black">🤖 AI Picks</h2>
                  {origin && <span className="text-sm text-on-surface-variant">from <strong>{origin}</strong></span>}
                  {hasFilters && (
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                      Filtered
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Budgets shown in <strong>{currency.code}</strong> ({currency.symbol}) · auto-detected from your location
                </p>
              </div>
              <button onClick={handleApply} disabled={loading}
                className="flex items-center gap-1.5 px-4 py-2 border border-outline-variant/30 rounded-xl text-xs font-bold hover:bg-surface-container transition-colors disabled:opacity-50">
                <MdRefresh className={`icon-sm ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-outline-variant/15">
                    <div className="h-36 bg-gradient-to-br from-surface-container to-surface-container-high rounded-t-2xl" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-surface-container-high rounded w-3/4" />
                      <div className="h-3 bg-surface-container-high rounded w-full" />
                      <div className="h-3 bg-surface-container-high rounded w-2/3" />
                      <div className="flex gap-2 mt-2">
                        <div className="h-6 w-16 bg-surface-container-high rounded-full" />
                        <div className="h-6 w-16 bg-surface-container-high rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recs.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <MdAutoAwesome className="icon-xl text-outline-variant mx-auto" />
                <p className="text-sm text-on-surface-variant">No results — try adjusting your filters or budget.</p>
                <button onClick={() => { setDestFilter(""); setBudgetFilter(""); handleApply(); }}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {recs.map((rec, i) => <AICard key={i} rec={rec} currency={currency} idx={i} />)}
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-outline-variant/20" />
          <span className="text-xs font-bold text-outline uppercase tracking-widest px-2">Explore the World</span>
          <div className="flex-1 border-t border-outline-variant/20" />
        </div>

        {/* ── World Grid ── */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm lg:sticky lg:top-24 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Browse Style</h3>
                <MdTune className="icon-nav text-on-surface-variant" />
              </div>
              <div className="space-y-1.5">
                {CATEGORIES.map(({ label, Icon }) => (
                  <button key={label} onClick={() => setActiveCategory(label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all
                      ${activeCategory === label ? "bg-primary text-white font-bold" : "text-on-surface-variant hover:bg-surface-container"}`}>
                    <Icon className="icon-sm shrink-0" /> {label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-outline">Budget</h4>
                {["Economy", "Mid-range", "Luxury"].map(b => (
                  <label key={b} className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-on-surface-variant">{b}</span>
                  </label>
                ))}
              </div>
              <button className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                <MdFilterList className="icon-btn" /> Apply
              </button>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-bold">{activeCategory} Destinations</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Showing {filteredDests.length} results</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <MdSort className="icon-sm" /> Sort by: Rating
              </button>
            </div>

            <div className="masonry-grid">
              {filteredDests.map(d => (
                <div key={d.city} className="masonry-item group cursor-pointer">
                  <div className={`relative rounded-2xl overflow-hidden ${d.tall ? "h-72" : "h-52"}`}>
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={d.img} alt={d.city} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <button aria-label="Like" onClick={() => toggleLike(d.city)}
                      className="absolute top-3 right-3 p-2 bg-black/30 backdrop-blur rounded-full hover:bg-black/50 transition-colors">
                      {liked.has(d.city) ? <MdFavorite className="icon-sm text-red-400" /> : <MdFavoriteBorder className="icon-sm text-white" />}
                    </button>
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="flex items-center gap-1 text-xs font-bold mb-1">
                        <MdStar className="icon-xs text-yellow-400" /> {d.rating}
                        <span className="text-white/60 font-normal">({d.reviews})</span>
                      </div>
                      <h3 className="font-bold text-base">{d.city}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="px-8 py-3 border border-outline-variant/40 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">
                Load More
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return <ProtectedRoute><ExploreContent /></ProtectedRoute>;
}

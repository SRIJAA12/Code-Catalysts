"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  MdAdd, MdSearch, MdSort, MdCalendarToday, MdMoreVert,
  MdFlightTakeoff, MdCheck, MdDrafts, MdSchedule,
  MdAutoAwesome, MdDelete, MdEdit, MdClose,
} from "react-icons/md";
import Link from "next/link";

const STATUS_STYLES = {
  active:    "bg-green-100 text-green-700",
  upcoming:  "bg-orange-100 text-orange-700",
  draft:     "bg-gray-100 text-gray-600",
  completed: "bg-blue-100 text-blue-700",
};

function TripCard({ trip, onDelete }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const startDate = trip.startDate ? new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;
  const endDate   = trip.endDate   ? new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;
  const dateLabel = startDate && endDate ? `${startDate} – ${endDate}` : startDate || "Planning stage";

  const activityCount = trip.cities?.reduce((s, c) => s + (c.activities?.length || 0), 0) || 0;
  const totalActivities = activityCount || 1;
  const progress = activityCount > 0 ? Math.min(100, Math.round((activityCount / (totalActivities + 3)) * 100)) : 0;

  return (
    <article className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={trip.coverImage || `https://source.unsplash.com/400x300/?${encodeURIComponent(trip.destination || trip.title)},travel`}
          alt={trip.title}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&h=300&fit=crop"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${STATUS_STYLES[trip.status] || STATUS_STYLES.draft}`}>
          {trip.status}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-on-surface truncate">{trip.title}</h3>
            <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
              <MdCalendarToday className="icon-xs shrink-0" />
              {dateLabel}
            </p>
          </div>
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-1 rounded-lg hover:bg-surface-container-high transition-colors"
            >
              <MdMoreVert className="icon-nav text-on-surface-variant" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-8 z-20 w-40 bg-white border border-outline-variant/20 rounded-xl shadow-xl py-1 text-sm">
                  <button
                    onClick={() => { setMenuOpen(false); router.push(`/builder?tripId=${trip.id}`); }}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-surface-container-low text-on-surface"
                  >
                    <MdEdit className="icon-sm" /> Edit
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); onDelete(trip.id); }}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-50 text-error"
                  >
                    <MdDelete className="icon-sm" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs font-medium">
            <span className="text-on-surface-variant">Itinerary: {progress}%</span>
            <span className="font-bold text-primary">{trip.budget ? `$${trip.budget.toLocaleString()}` : "TBD"}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

const TABS = ["All", "Upcoming", "Active", "Completed", "Draft"];
const STAT_ICONS = { "Total Trips": MdFlightTakeoff, "Completed": MdCheck, "Upcoming": MdSchedule, "Drafts": MdDrafts };

function MyTripsContent() {
  const { user } = useAuth();
  const [trips, setTrips]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState("All");
  const [search, setSearch]   = useState("");

  const fetchTrips = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/trips?uid=${user.uid}`);
      const data = await res.json();
      setTrips(data.trips || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchTrips(); }, [fetchTrips]);

  async function handleDelete(id) {
    if (!confirm("Delete this trip?")) return;
    await fetch(`/api/trips/${id}`, { method: "DELETE" });
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }

  const filtered = trips.filter((t) => {
    const matchTab = tab === "All" || t.status.toLowerCase() === tab.toLowerCase();
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || (t.destination || "").toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const stats = [
    { label: "Total Trips",  value: trips.length,                                    Icon: MdFlightTakeoff, bg: "bg-primary/10 text-primary" },
    { label: "Completed",    value: trips.filter(t => t.status === "completed").length, Icon: MdCheck,     bg: "bg-green-100 text-green-700" },
    { label: "Upcoming",     value: trips.filter(t => t.status === "upcoming").length,  Icon: MdSchedule,  bg: "bg-orange-100 text-orange-700" },
    { label: "Drafts",       value: trips.filter(t => t.status === "draft").length,     Icon: MdDrafts,    bg: "bg-gray-100 text-gray-600" },
  ];

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />

      <div className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20 flex flex-col lg:flex-row gap-8">
        {/* ── Main Content ── */}
        <main className="flex-1 space-y-8 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">My Trips</h1>
              <p className="text-sm text-on-surface-variant mt-1">Manage and plan your travel adventures</p>
            </div>
            <Link href="/trips/create">
              <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md shrink-0">
                <MdAdd className="icon-btn" /> New Trip
              </button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex gap-2 flex-wrap">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab === t ? "bg-primary text-white shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:ml-auto w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-outline icon-nav" />
                <input
                  className="pl-9 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl w-full sm:w-60 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Search trips…"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="p-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl hover:bg-surface-container-high transition-colors flex items-center gap-1.5 text-sm font-medium text-on-surface-variant shrink-0">
                <MdSort className="icon-nav" /> Sort
              </button>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm h-[280px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((trip) => (
                <TripCard key={trip.id} trip={trip} onDelete={handleDelete} />
              ))}

              {/* Add trip card */}
              <Link href="/trips/create">
                <article className="border-2 border-dashed border-outline-variant/40 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group min-h-[280px]">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <MdAdd className="text-2xl text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-on-surface">New Adventure</h3>
                    <p className="text-xs text-on-surface-variant mt-1">Start planning your next trip</p>
                  </div>
                </article>
              </Link>
            </div>
          )}
        </main>

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-20 space-y-5">
            <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-5">Trip Statistics</h3>
              <div className="space-y-4">
                {stats.map(({ Icon, label, value, bg }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}>
                        <Icon className="icon-sm" />
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <span className="text-xl font-black">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
              <h3 className="font-bold text-lg mb-1 relative z-10">Quick Plan</h3>
              <p className="text-white/80 text-sm mb-4 relative z-10">Start a new itinerary with AI assistance.</p>
              <Link href="/assistant">
                <button className="w-full bg-white text-primary py-2.5 rounded-xl text-sm font-bold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 relative z-10">
                  <MdAutoAwesome className="icon-btn" /> Plan with AI
                </button>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function MyTripsPage() {
  return (
    <ProtectedRoute>
      <MyTripsContent />
    </ProtectedRoute>
  );
}

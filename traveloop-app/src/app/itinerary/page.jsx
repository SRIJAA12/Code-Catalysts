"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  MdAdd, MdLocationOn, MdCalendarMonth, MdAccessTime,
  MdShare, MdEdit, MdDownload, MdVisibility,
  MdFlight, MdAutoAwesome, MdChevronRight,
} from "react-icons/md";

// ── Sample itinerary data (would come from DB in production) ──────────────────
const ITINERARIES = [
  {
    slug: "kerala-explorer-2024",
    title: "Kerala Explorer",
    hero: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    cities: ["Munnar", "Alleppey", "Kochi"],
    startDate: "Dec 20, 2024",
    endDate: "Dec 25, 2024",
    days: 5,
    budget: "₹35,000",
    status: "Draft",
    statusColor: "bg-amber-100 text-amber-700",
    activitiesCount: 9,
  },
  {
    slug: "europe-summer-2024",
    title: "Summer in Europe",
    hero: "https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=800&q=80",
    cities: ["Paris", "London", "Amsterdam"],
    startDate: "Jun 11, 2024",
    endDate: "Jun 21, 2024",
    days: 10,
    budget: "₹2,20,000",
    status: "Completed",
    statusColor: "bg-green-100 text-green-700",
    activitiesCount: 18,
  },
  {
    slug: "bali-zen-2025",
    title: "Bali Zen Retreat",
    hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    cities: ["Ubud", "Seminyak", "Uluwatu"],
    startDate: "Mar 05, 2025",
    endDate: "Mar 12, 2025",
    days: 7,
    budget: "₹85,000",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-700",
    activitiesCount: 14,
  },
];

// ── Itinerary Card ────────────────────────────────────────────────────────────
function ItineraryCard({ trip }) {
  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : "https://traveloop.com"}/share/${trip.slug}`;

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    alert("Share link copied!");
  }

  return (
    <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Hero */}
      <div className="relative h-44 overflow-hidden group">
        <img src={trip.hero} alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${trip.statusColor}`}>
          {trip.status}
        </span>
        <div className="absolute bottom-3 left-3 text-white">
          <div className="flex items-center gap-1.5 flex-wrap">
            {trip.cities.slice(0, 3).map(c => (
              <span key={c} className="text-[10px] bg-white/20 backdrop-blur px-2 py-0.5 rounded-full font-semibold">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h2 className="font-bold text-base text-gray-900">{trip.title}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MdCalendarMonth className="text-primary text-xs" /> {trip.startDate} – {trip.endDate}</span>
          <span className="flex items-center gap-1"><MdAccessTime className="text-primary text-xs" /> {trip.days} days</span>
          <span className="flex items-center gap-1"><MdLocationOn className="text-primary text-xs" /> {trip.cities.length} cities</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Est. Budget</p>
            <p className="font-black text-base text-primary">{trip.budget}</p>
          </div>
          <p className="text-xs text-gray-400">{trip.activitiesCount} activities</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2">
          <Link href={`/itinerary/${trip.slug}`} className="flex-1">
            <button className="w-full flex items-center justify-center gap-1.5 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors">
              <MdEdit className="text-sm" /> Edit Itinerary
            </button>
          </Link>
          <Link href={`/share/${trip.slug}`} target="_blank">
            <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" title="Public View">
              <MdVisibility className="text-sm text-gray-500" />
            </button>
          </Link>
          <button onClick={copyLink} className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors" title="Copy share link">
            <MdShare className="text-sm text-gray-500" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
function ItineraryHubContent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = ITINERARIES.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.cities.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar activePage="trips" />

      <div className="max-w-[1200px] mx-auto pt-24 px-4 sm:px-6 lg:px-8 pb-16 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">My Itineraries</h1>
            <p className="text-sm text-gray-400 mt-1">Plan, edit, and share your travel itineraries</p>
          </div>
          <Link href="/builder">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-sm">
              <MdAdd /> New Itinerary
            </button>
          </Link>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Trips",     value: ITINERARIES.length,                          color: "text-primary" },
            { label: "Upcoming",        value: ITINERARIES.filter(t => t.status === "Upcoming").length,   color: "text-blue-600" },
            { label: "Completed",       value: ITINERARIES.filter(t => t.status === "Completed").length,  color: "text-green-600" },
            { label: "Total Days",      value: ITINERARIES.reduce((s, t) => s + t.days, 0), color: "text-amber-600" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input type="search" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by trip name or city…"
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-primary transition-colors" />
          </div>
          <div className="flex gap-2">
            {["All", "Draft", "Upcoming", "Completed"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${filter === f ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(trip => <ItineraryCard key={trip.slug} trip={trip} />)}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <MdFlight className="text-5xl text-gray-200 mx-auto" />
            <p className="text-gray-400 font-semibold">No itineraries match your filters.</p>
            <Link href="/builder">
              <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold">
                Create Your First Trip
              </button>
            </Link>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MdAutoAwesome />
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">AI-Powered</span>
            </div>
            <h2 className="text-xl font-black">Let AI plan your next trip</h2>
            <p className="text-sm opacity-75 mt-1">Tell Gemini where you want to go — get a full itinerary in seconds</p>
          </div>
          <Link href="/explore">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold text-sm whitespace-nowrap hover:shadow-lg transition-all">
              Explore Destinations <MdChevronRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return <ProtectedRoute><ItineraryHubContent /></ProtectedRoute>;
}

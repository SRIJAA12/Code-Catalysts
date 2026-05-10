"use client";
import { use, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import PDFExportButton from "@/components/PDFExportButton";
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });
import {
  MdLocationOn, MdCalendarMonth, MdAccessTime, MdStar,
  MdContentCopy, MdCheck, MdShare, MdArrowBack,
  MdFlight, MdTrain, MdDirectionsCar, MdHotel, MdRestaurant,
  MdCurrencyRupee, MdAutoAwesome,
} from "react-icons/md";

// ── Mock data (keyed by slug) — replace with DB fetch ────────────────────────
const TRIPS_DB = {
  "kerala-explorer-2024": {
    slug:            "kerala-explorer-2024",
    title:           "Kerala Explorer",
    startDate:       "Dec 20, 2024",
    endDate:         "Dec 25, 2024",
    estimatedBudget: 35000,
    currencySymbol:  "₹",
    shareSlug:       "kerala-explorer-2024",
    hero:            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1600&q=80",
    cities: [
      { cityName: "Munnar",   activities: [
        { name: "Tea Museum Visit",   time: "10:00 AM", cost: 500  },
        { name: "Mattupetty Dam",     time: "02:00 PM", cost: 200  },
        { name: "Eravikulam Park",    time: "09:00 AM", cost: 800  },
        { name: "Top Station Sunset", time: "05:00 PM", cost: 0    },
      ]},
      { cityName: "Alleppey", activities: [
        { name: "Houseboat Check-in", time: "12:00 PM", cost: 12000 },
        { name: "Backwater Cruise",   time: "03:00 PM", cost: 0     },
      ]},
      { cityName: "Kochi",    activities: [
        { name: "Fort Kochi Walk",      time: "09:00 AM", cost: 0    },
        { name: "Chinese Fishing Nets", time: "06:00 PM", cost: 100  },
        { name: "Kochi Food Tour",      time: "11:00 AM", cost: 1200 },
      ]},
    ],
  },
  "europe-summer-2024": {
    slug:            "europe-summer-2024",
    title:           "Summer in Europe",
    startDate:       "Jun 11, 2024",
    endDate:         "Jun 21, 2024",
    estimatedBudget: 220000,
    currencySymbol:  "₹",
    shareSlug:       "europe-summer-2024",
    hero:            "https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=1600&q=80",
    cities: [
      { cityName: "Paris", activities: [
        { name: "Eiffel Tower",       time: "10:00 AM", cost: 3200  },
        { name: "Louvre Museum",      time: "02:00 PM", cost: 2800  },
        { name: "Seine River Cruise", time: "07:00 PM", cost: 1800  },
      ]},
      { cityName: "London", activities: [
        { name: "Tower of London",    time: "10:00 AM", cost: 4500  },
        { name: "Buckingham Palace",  time: "02:00 PM", cost: 0     },
      ]},
    ],
  },
  "bali-zen-2025": {
    slug:            "bali-zen-2025",
    title:           "Bali Zen Retreat",
    startDate:       "Mar 05, 2025",
    endDate:         "Mar 12, 2025",
    estimatedBudget: 85000,
    currencySymbol:  "₹",
    shareSlug:       "bali-zen-2025",
    hero:            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80",
    cities: [
      { cityName: "Ubud",     activities: [
        { name: "Tegallalang Rice Terraces", time: "08:00 AM", cost: 500  },
        { name: "Monkey Forest",             time: "11:00 AM", cost: 300  },
        { name: "Cooking Class",             time: "04:00 PM", cost: 2500 },
      ]},
      { cityName: "Seminyak", activities: [
        { name: "Beach Club Day",       time: "12:00 PM", cost: 3500 },
        { name: "Sunset at Petitenget", time: "05:30 PM", cost: 0    },
      ]},
    ],
  },
};

const NOT_FOUND_TRIP = {
  slug:            "not-found",
  title:           "Itinerary Not Found",
  startDate:       "—",
  endDate:         "—",
  estimatedBudget: 0,
  currencySymbol:  "₹",
  shareSlug:       "not-found",
  hero:            "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80",
  cities:          [],
};

// ── City Section ──────────────────────────────────────────────────────────────
function CitySection({ city, currencySymbol, index }) {
  const total = city.activities.reduce((s, a) => s + Number(a.cost || 0), 0);
  const GRADIENTS = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
  ];
  const grad = GRADIENTS[index % GRADIENTS.length];

  return (
    <div className="space-y-4">
      {/* City header */}
      <div className={`bg-gradient-to-r ${grad} rounded-2xl p-5 text-white flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-black text-lg">
            {index + 1}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-75">Stop #{index + 1}</p>
            <h3 className="font-black text-xl">{city.cityName}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] opacity-75">City Budget</p>
          <p className="font-black text-lg">{currencySymbol}{total.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-3 pl-4">
        {city.activities.map((act, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md hover:border-primary/20 transition-all">
            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-800">{act.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                <MdAccessTime className="text-xs" /> {act.time}
              </p>
            </div>
            <span className={`text-sm font-bold shrink-0 ${act.cost > 0 ? "text-primary" : "text-green-600"}`}>
              {act.cost > 0 ? `${currencySymbol}${Number(act.cost).toLocaleString("en-IN")}` : "Free"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PublicSharePage({ params }) {
  const { slug } = use(params);
  const trip = TRIPS_DB[slug] || NOT_FOUND_TRIP;
  const [copied, setCopied]   = useState(false);
  const shareUrl              = typeof window !== "undefined"
    ? `${window.location.origin}/share/${slug}`
    : `https://traveloop.com/share/${slug}`;

  const totalBudget  = trip.cities.reduce((s, c) =>
    s + c.activities.reduce((ss, a) => ss + Number(a.cost || 0), 0), 0);
  const totalDays    = (() => {
    try {
      const d1 = new Date(trip.startDate); const d2 = new Date(trip.endDate);
      const diff = Math.round((d2 - d1) / 86400000);
      return isNaN(diff) ? "—" : diff;
    } catch { return "—"; }
  })();
  const totalActs    = trip.cities.reduce((s, c) => s + c.activities.length, 0);

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Hero ── */}
      <div className="relative h-80 sm:h-96 overflow-hidden">
        <img src={trip.hero} alt={trip.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back + actions bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link href="/itinerary">
            <button className="flex items-center gap-2 px-3 py-2 bg-black/30 backdrop-blur text-white rounded-xl text-xs font-bold border border-white/20 hover:bg-black/50 transition-colors">
              <MdArrowBack className="text-sm" /> My Trips
            </button>
          </Link>
          <div className="flex gap-2">
            <button onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-2 bg-black/30 backdrop-blur text-white rounded-xl text-xs font-bold border border-white/20 hover:bg-black/50 transition-colors">
              {copied ? <MdCheck className="text-sm text-green-400" /> : <MdContentCopy className="text-sm" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <PDFExportButton trip={trip} />
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-8 left-6 right-6 text-white">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-primary rounded-full uppercase tracking-widest">
              Public Itinerary
            </span>
            <span className="flex items-center gap-1 text-xs text-white/75">
              <MdAutoAwesome className="text-xs text-yellow-400" /> Traveloop
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{trip.title}</h1>
          <div className="flex items-center gap-4 mt-2 flex-wrap text-sm text-white/80">
            <span className="flex items-center gap-1"><MdCalendarMonth className="text-xs" /> {trip.startDate} – {trip.endDate}</span>
            <span className="flex items-center gap-1"><MdLocationOn className="text-xs" /> {trip.cities.map(c => c.cityName).join(" · ")}</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Budget",   value: `${trip.currencySymbol}${totalBudget.toLocaleString("en-IN")}`, color: "text-primary" },
            { label: "Duration",       value: totalDays !== "—" ? `${totalDays} days` : "—",                   color: "text-blue-600" },
            { label: "Stops",          value: `${trip.cities.length} cities`,                                  color: "text-emerald-600" },
            { label: "Activities",     value: `${totalActs} planned`,                                          color: "text-amber-600" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* City sections */}
        {trip.cities.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-xl font-black text-gray-900">Day-by-Day Itinerary</h2>
            {trip.cities.map((city, i) => (
              <CitySection key={i} city={city} currencySymbol={trip.currencySymbol} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3">
            <MdFlight className="text-5xl text-gray-200 mx-auto" />
            <p className="text-gray-400">This itinerary doesn't exist or hasn't been shared yet.</p>
            <Link href="/explore">
              <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold">
                Explore Destinations
              </button>
            </Link>
          </div>
        )}

        {/* Share card + QR */}
        {trip.cities.length > 0 && (
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-75 mb-1">Share This Trip</p>
              <h3 className="font-black text-lg mb-1">Let your friends see the plan!</h3>
              <p className="text-sm opacity-75 mb-4">Anyone with this link can view the itinerary — no sign-up needed.</p>
              <div className="flex gap-2 flex-wrap">
                <button onClick={copyLink}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-primary rounded-xl text-xs font-bold hover:shadow-md transition-all">
                  {copied ? <MdCheck /> : <MdContentCopy />}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <PDFExportButton trip={trip} />
              </div>
            </div>
            <div className="text-center shrink-0">
              <div className="bg-white p-3 rounded-2xl inline-block">
                <QRCode value={shareUrl} size={100} />
              </div>
              <p className="text-[10px] opacity-70 mt-2">Scan to open</p>
            </div>
          </div>
        )}

        {/* Traveloop footer */}
        <div className="text-center pt-6 border-t border-gray-200 space-y-2">
          <p className="font-black text-xl text-primary">Traveloop</p>
          <p className="text-sm text-gray-400">Plan Smarter. Travel Better.</p>
          <Link href="/login">
            <button className="mt-3 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
              Create Your Own Trip →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  MdLocationOn, MdAdd, MdDragIndicator, MdSchedule,
  MdRestaurant, MdCameraAlt, MdDirectionsBoat, MdArrowForward,
  MdWbSunny, MdWarning, MdReceiptLong, MdMap, MdOpenInNew,
  MdShare, MdMoreHoriz,
} from "react-icons/md";

function BuilderContent() {
  const cities = ["Amalfi Coast", "Rome", "Venice"];
  const days = [
    { label: "Day 1: Arrival",            active: false },
    { label: "Day 2: Positano Exploration", active: true },
    { label: "Day 3: Amalfi Boat Tour",   active: false },
  ];
  const quickActions = [
    { Icon: MdReceiptLong, label: "Add Expense" },
    { Icon: MdMap,         label: "View Route" },
  ];

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />
      <main className="pt-20 min-h-screen max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 pb-12">

        {/* ── Left Sidebar ── */}
        <aside className="w-full lg:w-[280px] shrink-0">
          <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm lg:sticky lg:top-24 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary-container flex items-center justify-center shrink-0">
                <MdLocationOn className="icon-stat text-on-primary-container" />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-sm truncate">Summer in Europe</h2>
                <p className="text-xs text-on-surface-variant">12 Destinations</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">Cities</h3>
              <div className="space-y-1">
                {cities.map((city, i) => (
                  <div key={city} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${i === 0 ? "bg-primary-container text-on-primary-container font-semibold" : "text-on-surface-variant hover:bg-surface-container"}`}>
                    <MdLocationOn className="icon-sm shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">Timeline</h3>
              <div className="space-y-1 relative">
                <div className="absolute left-[11px] top-3 bottom-3 w-px bg-outline-variant/30" />
                {days.map((d) => (
                  <div key={d.label} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl group transition-all cursor-grab ${d.active ? "bg-surface-container-high" : "hover:bg-surface-container"}`}>
                    <div className="w-6 flex justify-center z-10 shrink-0">
                      <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-white ${d.active ? "bg-primary" : "bg-outline-variant"}`} />
                    </div>
                    <span className={`text-xs leading-snug ${d.active ? "font-bold text-primary" : "font-medium text-on-surface-variant"}`}>{d.label}</span>
                    <MdDragIndicator className="icon-xs text-outline-variant ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all">
              <MdAdd className="icon-btn" /> Add Day
            </button>
          </div>
        </aside>

        {/* ── Center ── */}
        <section className="flex-1 space-y-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Day 2: Positano Exploration</h1>
              <p className="text-sm text-on-surface-variant mt-1">June 14, 2024 — Coastal bliss and cliffside views.</p>
            </div>
            <div className="flex gap-2">
              {[{ Icon: MdShare, label: "Share" }, { Icon: MdMoreHoriz, label: "More" }].map(({ Icon, label }) => (
                <button key={label} aria-label={label} className="p-2.5 rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-all">
                  <Icon className="icon-nav text-on-surface-variant" />
                </button>
              ))}
            </div>
          </div>

          {/* Activity cards */}
          <div className="space-y-4">
            {/* Hotel */}
            <div className="bg-white border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all group">
              <div className="flex flex-col sm:flex-row h-auto sm:h-44">
                <div className="w-full sm:w-1/3 h-44 sm:h-full overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8a7ThhcfNq6VThMAIxE4P8DJKNPS__7TSASWm5obrYeOVXs2t72aOu2_DzMeEX8Dww_4h23-BmIeFecv11ql8SwGxI5g13GskTuHQZQq7RTtf67-C0U5dBty0ve-O7xgowxn-PNa4zltDF-y_W0S8VC_spUhFPKh_bJg5HojHbS-QoulTykDCAnUFoUpup14cPACHb__SllfctQUpm_6T5CkDU5X2itoZ3-R-LszmLjQn0LhmNu-JBxVP6IVwgudwDx_lsrdwxN8" alt="Hotel" />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase rounded-full mb-2">Hotel</span>
                      <h4 className="font-bold text-base">Le Sirenuse Luxury Stay</h4>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                        <MdSchedule className="icon-xs shrink-0" /> Check-out: 10:00 AM
                      </p>
                    </div>
                    <MdDragIndicator className="icon-nav text-outline-variant cursor-grab shrink-0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-sm">$750 / night</span>
                    <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                      Manage Booking <MdArrowForward className="icon-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { Icon: MdRestaurant, bg: "bg-orange-100 text-orange-600", title: "Lunch at Chez Black", desc: "Famous beachfront restaurant known for its heart-shaped pizza.", time: "1:30 PM", tag: null },
                { Icon: MdCameraAlt,  bg: "bg-blue-100 text-blue-600",   title: "Path of the Gods Hike", desc: "Breathtaking trail above the Amalfi coast.", time: "9:00 AM",  tag: "Free Activity" },
              ].map(({ Icon, bg, title, desc, time, tag }) => (
                <div key={title} className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between gap-4 min-h-[180px]">
                  <div className="flex justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
                      <Icon className="icon-nav" />
                    </div>
                    <MdDragIndicator className="icon-nav text-outline-variant cursor-grab" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{title}</h4>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{desc}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3">
                    <span className="text-xs font-bold text-outline uppercase tracking-wide">{time}</span>
                    {tag && <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{tag}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Transport card */}
            <div className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-secondary-container/20 flex items-center justify-center shrink-0">
                <MdDirectionsBoat className="icon-lg text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm">Private Water Taxi</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Positano Pier → Capri Island Marina</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] uppercase font-bold text-outline">4:00 PM</p>
                <p className="font-bold text-sm">$120</p>
              </div>
              <MdDragIndicator className="icon-nav text-outline-variant cursor-grab shrink-0" />
            </div>

            {/* Add Activity */}
            <button className="w-full h-20 rounded-2xl border-2 border-dashed border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 flex items-center justify-center gap-2 group transition-all">
              <MdAdd className="icon-nav text-outline-variant group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold text-outline-variant group-hover:text-primary transition-colors">Add Activity</span>
            </button>
          </div>
        </section>

        {/* ── Right Sidebar ── */}
        <aside className="w-full lg:w-[320px] shrink-0 space-y-5">
          {/* Weather */}
          <div className="bg-gradient-to-br from-secondary to-primary p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-15">
              <MdWbSunny className="text-8xl" />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-semibold opacity-75 mb-4 flex items-center gap-1">
                <MdLocationOn className="icon-xs" /> Positano, Italy
              </p>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-5xl font-black">28°</span>
                <span className="text-lg font-medium mb-1">Sunny</span>
              </div>
              <div className="flex justify-between bg-white/10 rounded-xl p-3.5 border border-white/10 text-center">
                {[["Humidity","42%"],["Wind","12km/h"],["Rain","0%"]].map(([k,v]) => (
                  <div key={k}>
                    <p className="text-[10px] font-bold opacity-70 uppercase">{k}</p>
                    <p className="font-bold text-sm mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-5">Budget Overview</h3>
            <div className="mb-3">
              <div className="flex justify-between items-end mb-1.5">
                <p className="text-sm font-medium">Daily Spending</p>
                <p className="font-black text-lg">$870 <span className="text-xs font-normal text-outline">/ $800</span></p>
              </div>
              <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-error rounded-full w-[95%]" />
              </div>
            </div>
            <div className="bg-error-container border border-error/10 p-4 rounded-xl flex gap-3 items-start">
              <MdWarning className="icon-btn text-error shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-on-error-container">Over Budget Alert</p>
                <p className="text-[11px] text-on-error-container/80 mt-1 leading-relaxed">You&apos;ve exceeded today&apos;s limit by $70. Consider adjusting dinner or transport.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ Icon, label }) => (
              <button key={label} className="flex flex-col items-center justify-center gap-2 p-4 bg-white border border-outline-variant/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all shadow-sm group">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon className="icon-btn text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-bold">{label}</span>
              </button>
            ))}
          </div>

          {/* Map Preview */}
          <div className="relative h-44 rounded-2xl overflow-hidden group cursor-pointer">
            <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS-mHnZBG6-s0u08x_bce89FJelUecCU-CCEYZ9Iw4kpES7SqFGWnUfUTEaqIlwWQJm2oZjFRy5C3h12Zogf80IgyeRIATsU4g8HEHSkD425fKjfzxCdENl8JtXs0NowhzS-boYpuOhfoPphYyekJGNuGjtWIycFQMHSR6lqAJoFwMGBx4He8M6M2ycTiKSWZEeuKEiB37XdNVdm7zbUSdoSgnr-G-UW6O0xXUA-XF5vvLFZZTEYWKyRFUEx_2sHk2bSJT04v793c" alt="Map" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
                <MdOpenInNew className="icon-xs text-primary" />
                <span className="text-xs font-bold text-on-surface">Expand Map</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default function ItineraryBuilderPage() {
  return (
    <ProtectedRoute>
      <BuilderContent />
    </ProtectedRoute>
  );
}

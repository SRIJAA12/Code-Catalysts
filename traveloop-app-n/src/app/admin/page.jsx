"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  MdPersonAdd, MdMap, MdInsights, MdCalendarToday, MdAdd,
  MdSearch, MdDownload, MdTrendingUp, MdTrendingDown,
  MdLocationOn, MdStar,
} from "react-icons/md";

const METRICS = [
  { label: "New User Growth",  value: "14,284", trend: "+12.5%", up: true,  Icon: MdPersonAdd,  bar: "w-3/4", color: "bg-secondary" },
  { label: "Active Trips",     value: "2,851",  trend: "+8.2%",  up: true,  Icon: MdMap,        bar: "w-1/2", color: "bg-tertiary" },
];

const TOP_CITIES = [
  { city: "Paris, France",    growth: "+24%", rate: "12.5%", spend: "$1,420", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUIzQc6XUtKncR97rFgr5U3zr6go-C5I9Bmr8F6Jb5OIhkqUXB0ipNCWulDtlH5Ma8IdcV0c_d_wF-d2x1wCcg7RlefV8uGv9NrLsIqogll5hqSIuYkj3gbDTJkyYRi6UC970RfXD10lkpQKFE8MqjmcYzXaeiVv62wi8G_TcrVrE5ry5T_BoEkVZYqS6DN4WeyoN0qgAVxQLIVtIvBPsTekGypfh1Ei4gIERCRWGSpDoc4_PcH3yfS_qUQwuX-Kn7t8SJj0EfDik" },
  { city: "Tokyo, Japan",     growth: "+18%", rate: "9.2%",  spend: "$890",   img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGHROb1Cs-oA7S5ZNngM0Si-hjnT3aDBw9yD4c6uOT27wipfy_W6KTvlj1Fy65eRvdxjXblRHn6HB2KLt90lGdwbWOnUKkLYwlpqV70nTtvP72pZDgtmK7Sif8jCbfqSMG_FPacIp2U4bm6a82pzjBWfngyuQBRH5j-lCJzLZFnOe3NN9DlmLak1qYLlzlcZ22QbKyT6WpnhIN2RDSKouOCjgcwg2H5eqhuciaB9NT8Ah7bHzVW4gRKrgI6ulSJneDzbzTUAoWWH4" },
  { city: "Dubai, UAE",       growth: "+31%", rate: "14.8%", spend: "$2,100", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALZY81RgRiLCK2zzYVn5-dXryV9IiRdOf3ns4EQWHlM-xPayvjyVNeKDb9UnT4WIavxr8nODXJAB9lvi2_GeG45WCOdC9oHFsoq38ts3nd4JDdnCdNpj4Y3foYZ3DSXZyNvbuL-m1qa6bPhf9pDtNeeSnQu4PY5TXdPLT2IkHkCoOJ4wdXS7XBQhI82oZzqO40qe14-RmiGj41sE1S7s5CaibKGabThSmhsbKbZ62-N3Hebd8Hr97Hc0GAePKmxCrHBn7xU9PSMt0" },
];

const TABLE_ROWS = [
  { city: "Kyoto, JP",       growth: "+24%", rate: "12.5%", spend: "$1,420" },
  { city: "Barcelona, ES",   growth: "+18%", rate: "9.2%",  spend: "$890" },
  { city: "Reykjavik, IS",   growth: "+31%", rate: "14.8%", spend: "$2,100" },
];

const BAR = [8, 12, 10, 14, 16, 14, 15];

function AdminContent() {
  return (
    <div className="bg-background text-on-surface flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-4 p-6 border-r border-outline-variant/15 bg-surface-container-low/60 backdrop-blur-2xl sticky top-0 h-screen">
        <div className="h-16 flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-primary">Traveloop</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-3 bg-white border border-outline-variant/15 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <MdInsights className="icon-nav text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">Summer in Europe</p>
            <p className="text-[10px] text-on-surface-variant">12 Destinations</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          {[
            { Icon: MdCalendarToday, label: "Timeline" },
            { Icon: MdInsights,      label: "Statistics", active: true },
            { Icon: MdMap,           label: "Map View" },
            { Icon: MdPersonAdd,     label: "Users" },
          ].map(({ Icon, label, active }) => (
            <a key={label} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:bg-surface-variant/40"}`}>
              <Icon className="icon-nav shrink-0" />{label}
            </a>
          ))}
        </nav>
        <button className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
          <MdAdd className="icon-btn" /> Add Event
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15 bg-surface/90 backdrop-blur-xl sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Platform Overview</h1>
            <p className="text-xs text-on-surface-variant mt-0.5">Real-time metrics across the globe</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 icon-xs text-outline" />
              <input className="pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant/15 rounded-xl text-xs w-48" placeholder="Search analytics…" type="search" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all">
              <MdDownload className="icon-sm" /> Export
            </button>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-7 space-y-6 overflow-y-auto">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map(({ label, value, trend, up, Icon, bar, color }) => (
              <div key={label} className="bg-white border border-outline-variant/15 p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center">
                    <Icon className="icon-nav text-on-surface-variant" />
                  </div>
                  <span className={`text-[10px] font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${up ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
                    {up ? <MdTrendingUp className="icon-xs" /> : <MdTrendingDown className="icon-xs" />}{trend}
                  </span>
                </div>
                <p className="text-xs font-semibold text-on-surface-variant">{label}</p>
                <h2 className="text-2xl font-black mt-0.5">{value}</h2>
                <div className="mt-3 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full ${bar}`} />
                </div>
              </div>
            ))}
            <div className="bg-white border border-outline-variant/15 p-5 rounded-2xl shadow-sm sm:col-span-2 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">Engagement Rate</p>
                <h2 className="text-3xl font-black mt-0.5">78.4%</h2>
                <p className="text-xs text-on-surface-variant mt-1">Avg. 42 mins/session · 140 countries</p>
              </div>
              <div className="flex items-end gap-1 h-14 shrink-0">
                {BAR.map((h, i) => (
                  <div key={i} className={`w-3 rounded-t-sm ${i >= 4 ? "bg-primary" : "bg-primary/20"}`} style={{ height: `${h * 3.5}px` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Line Chart */}
            <div className="lg:col-span-2 bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h3 className="font-bold text-sm">Active Users Over Time</h3>
                  <p className="text-xs text-on-surface-variant">Daily unique visitors and trip creations</p>
                </div>
                <div className="flex gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />Desktop</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-outline-variant" />Mobile</span>
                </div>
              </div>
              <div className="relative h-48 w-full">
                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 280 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0058be" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#0058be" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,64 C20,56 40,60 60,52 S100,40 140,36 S180,28 220,20 S260,12 280,8" fill="none" stroke="#0058be" strokeWidth="2" />
                  <path d="M0,64 C20,56 40,60 60,52 S100,40 140,36 S180,28 220,20 S260,12 280,8 V80 H0 Z" fill="url(#gA)" />
                  <path d="M0,72 C20,68 40,70 60,66 S100,58 140,56 S180,52 220,46 S260,38 280,36" fill="none" stroke="#c2c6d6" strokeWidth="1.5" strokeDasharray="4 2" />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] font-bold text-on-surface-variant uppercase">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <span key={d}>{d}</span>)}
                </div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-sm flex flex-col">
              <h3 className="font-bold text-sm mb-5">Popular Destinations</h3>
              <div className="space-y-4 flex-1">
                {TOP_CITIES.map((d, i) => (
                  <div key={d.city} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      <img src={d.img} alt={d.city} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{d.city}</p>
                      <p className="text-[10px] text-on-surface-variant">{d.spend} avg. spend</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-black text-primary">#{i + 1}</p>
                      <p className="text-[10px] text-emerald-600 font-bold">{d.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border border-outline-variant/25 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-colors">
                View Full List
              </button>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Table */}
            <div className="lg:col-span-2 bg-white border border-outline-variant/15 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 className="font-bold text-sm">Top Searched Cities</h3>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <MdLocationOn className="icon-xs" />
                  <span className="text-[10px] font-bold">Global Search Intent</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                    <tr>
                      {["City", "Growth", "Booking Rate", "Avg. Spend"].map((h) => (
                        <th key={h} className="px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/8 text-xs">
                    {TABLE_ROWS.map((row) => (
                      <tr key={row.city} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-5 py-4 font-semibold">{row.city}</td>
                        <td className="px-5 py-4 text-emerald-600 font-bold">{row.growth}</td>
                        <td className="px-5 py-4 text-on-surface-variant">{row.rate}</td>
                        <td className="px-5 py-4 font-semibold">{row.spend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Donut */}
            <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm mb-5">Booking Conversion</h3>
              <div className="flex items-center gap-6 mb-5">
                <div className="relative w-28 h-28 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#e6e7f2" strokeWidth="12" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#0058be" strokeWidth="12" strokeDasharray="152 239" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#316bf3" strokeWidth="12" strokeDasharray="56 239" strokeDashoffset="-152" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg font-black">64%</p>
                    <p className="text-[9px] text-on-surface-variant font-bold">Success</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[["bg-primary","Confirmed","64%"],["bg-secondary-container","Pending","22%"],["bg-outline-variant","Abandoned","14%"]].map(([dot, lbl, val]) => (
                    <div key={lbl} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${dot}`} /><span className="text-xs font-medium">{lbl}</span></div>
                      <span className="text-xs font-black">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-[11px] font-medium text-primary leading-relaxed">
                  Personalized suggestions increased conversion by 12% this month.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <MdAdd className="icon-nav" />
      </button>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}

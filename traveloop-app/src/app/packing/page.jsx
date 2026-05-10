import Navbar from "@/components/Navbar";
import {
  MdAdd, MdCheck, MdCheckCircle, MdSearch, MdDownload,
  MdInventory2, MdCheckroom, MdDevices, MdFolderShared,
  MdMedicalServices, MdLuggage,
} from "react-icons/md";

const CATEGORIES = [
  {
    name: "Clothing & Accessories",
    Icon: MdCheckroom,
    color: "bg-blue-100 text-blue-700",
    items: [
      { label: "Light Jacket", done: true },
      { label: "Comfortable Walking Shoes", done: true },
      { label: "Swimwear", done: false },
      { label: "Formal Outfit", done: false },
      { label: "Rain Poncho", done: true },
    ],
  },
  {
    name: "Electronics",
    Icon: MdDevices,
    color: "bg-purple-100 text-purple-700",
    items: [
      { label: "Universal Adapter", done: true },
      { label: "Phone Charger", done: true },
      { label: "Camera + Extra Battery", done: false },
      { label: "Noise-Canceling Headphones", done: true },
    ],
  },
  {
    name: "Travel Documents",
    Icon: MdFolderShared,
    color: "bg-orange-100 text-orange-700",
    items: [
      { label: "Passport (valid 6+ mo)", done: true },
      { label: "Travel Insurance Card", done: false },
      { label: "Hotel Confirmations", done: true },
      { label: "Flight Tickets", done: true },
    ],
  },
  {
    name: "Health & Medications",
    Icon: MdMedicalServices,
    color: "bg-red-100 text-red-700",
    items: [
      { label: "First Aid Kit", done: false },
      { label: "Prescription Meds", done: true },
      { label: "Sunscreen SPF 50+", done: false },
    ],
  },
];

export default function PackingPage() {
  const allItems  = CATEGORIES.flatMap((c) => c.items);
  const doneCount = allItems.filter((i) => i.done).length;
  const pct       = Math.round((doneCount / allItems.length) * 100);

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />

      <main className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Packing Checklist</h1>
            <p className="text-sm text-on-surface-variant mt-1">Summer in Europe · 10-Day Trip</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-outline-variant/30 rounded-xl text-sm font-bold hover:bg-surface-container transition-all">
              <MdDownload className="icon-btn text-on-surface-variant" /> Export List
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all">
              <MdAdd className="icon-btn" /> Add Item
            </button>
          </div>
        </div>

        {/* Progress Banner */}
        <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e6e7f2" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0058be" strokeWidth="10" strokeDasharray={`${pct * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-black text-primary">{pct}%</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{doneCount}/{allItems.length} Items Packed</h2>
            <p className="text-sm text-on-surface-variant mt-0.5">
              {allItems.length - doneCount} items still need to be packed for your upcoming trip.
            </p>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mt-3">
              <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
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
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant/20 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Search items…"
            type="search"
          />
        </div>

        {/* Category Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {CATEGORIES.map((cat) => {
            const catDone = cat.items.filter((i) => i.done).length;
            return (
              <div key={cat.name} className="bg-white border border-outline-variant/20 rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cat.color}`}>
                      <cat.Icon className="icon-nav" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{cat.name}</h3>
                      <p className="text-[11px] text-on-surface-variant">{catDone}/{cat.items.length} packed</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors">
                    <MdAdd className="icon-sm text-on-surface-variant" />
                  </button>
                </div>
                <ul className="divide-y divide-outline-variant/8">
                  {cat.items.map((item) => (
                    <li key={item.label} className={`flex items-center gap-3.5 px-5 py-3.5 transition-colors hover:bg-surface-container-low/50 ${item.done ? "opacity-70" : ""}`}>
                      <button
                        aria-label={item.done ? "Uncheck" : "Check"}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${item.done ? "bg-primary border-primary" : "border-outline-variant hover:border-primary"}`}
                      >
                        {item.done && <MdCheck className="text-white text-xs" />}
                      </button>
                      <span className={`text-sm flex-1 ${item.done ? "line-through text-on-surface-variant" : "font-medium"}`}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Template Suggestions */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <MdInventory2 className="icon-nav text-primary" />
            <h3 className="font-bold text-sm text-primary">Add from Templates</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Beach Holiday", "Ski Trip", "Business Travel", "Backpacking"].map((t) => (
              <button key={t} className="px-4 py-2 bg-white border border-primary/20 rounded-full text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-1.5">
                <MdLuggage className="icon-xs" /> {t}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

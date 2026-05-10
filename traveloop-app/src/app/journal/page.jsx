"use client";
import {
  MdAdd, MdCalendarToday, MdMap, MdInsights, MdGroup,
  MdEditNote, MdWbSunny, MdOpenInNew, MdSave, MdShare,
  MdFormatQuote, MdSell, MdLocationOn, MdAddAPhoto, MdZoomIn,
} from "react-icons/md";

export default function TripJournalPage() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-2xl border-b border-outline-variant/15 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <span className="text-xl font-black tracking-tight text-primary">Traveloop</span>
          <nav className="hidden md:flex gap-2">
            {["Home", "My Trips", "Explore", "Budget"].map((l, i) => (
              <a key={l} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${i === 1 ? "text-primary font-bold bg-primary/8" : "text-on-surface-variant hover:bg-surface-container"}`} href="#">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"><MdShare className="icon-nav" /></button>
            <img alt="User" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100&h=100" className="w-9 h-9 rounded-full border-2 border-surface-container-high" />
          </div>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-4 p-5 border-r border-outline-variant/15 bg-surface-container-low/60 backdrop-blur-2xl overflow-y-auto notion-scroll sticky top-16 h-[calc(100vh-4rem)]">
          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shrink-0">
              <MdEditNote className="icon-nav text-on-primary-container" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm truncate">Summer in Europe</h2>
              <p className="text-[10px] text-on-surface-variant">12 Destinations</p>
            </div>
          </div>

          <button className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <MdAdd className="icon-btn" /> Add Event
          </button>

          <nav className="space-y-1">
            {[
              { Icon: MdCalendarToday, label: "Timeline" },
              { Icon: MdInsights,      label: "Statistics" },
              { Icon: MdMap,           label: "Map View" },
              { Icon: MdEditNote,      label: "Trip Journal", active: true },
              { Icon: MdGroup,         label: "Collaborators" },
            ].map(({ Icon, label, active }) => (
              <a key={label} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:bg-surface-variant/40"}`}>
                <Icon className="icon-nav shrink-0" />{label}
              </a>
            ))}
          </nav>

          <div className="border-t border-outline-variant/15 pt-4">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-3 px-2">Daily Logs</p>
            <div className="space-y-0.5">
              <div className="px-3 py-2 text-xs font-bold text-primary border-l-2 border-primary ml-0.5">Day 1: Paris Arrival</div>
              {["Day 2: Louvre & Seine", "Day 3: Versailles", "Day 4: Lyon Gastronomy"].map((d) => (
                <div key={d} className="px-3 py-2 text-xs text-on-surface-variant hover:text-primary cursor-pointer transition-colors">{d}</div>
              ))}
            </div>
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="max-w-3xl mx-auto px-5 sm:px-10 lg:px-16 py-12">
            {/* Cover */}
            <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-10 shadow-sm group">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1200" alt="Paris cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-6 flex items-center gap-4 text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-3xl shadow-lg">🇫🇷</div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight">Paris Arrival</h1>
                  <p className="text-white/80 text-xs">August 12, 2024 · 2:30 PM</p>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="flex items-center flex-wrap gap-2 mb-8 text-on-surface-variant">
              {[[MdCalendarToday,"Date"],[MdLocationOn,"Place de la Concorde"]].map(([Icon,label]) => (
                <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-container-high rounded-lg transition-colors text-xs font-medium">
                  <Icon className="icon-xs" />{label}
                </button>
              ))}
              <button className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-surface-container-high rounded-lg transition-colors text-xs font-medium">
                <MdSell className="icon-xs" />
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded text-[10px] font-bold">Adventure</span>
              </button>
            </div>

            {/* Body */}
            <div className="space-y-7 prose-traveloop">
              <p className="text-lg leading-relaxed text-on-surface font-light">
                <span className="float-left text-6xl font-black text-primary leading-none mr-3 mt-1">F</span>
                inally landed in Paris. The air is crisp, and the city feels more alive than ever. From Charles de Gaulle, we took a private transfer through the beautiful Haussmann streets.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                <div className="sm:col-span-7 space-y-4">
                  <h3 className="text-xl font-bold text-on-surface">Afternoon Wanderings</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">We dropped our bags at the hotel in the 1st arrondissement and immediately headed out to find a small café. The first stop was &apos;Café de Flore&apos; — iconic, though perhaps a bit touristy, the chocolate chaud was unmatched.</p>
                  <blockquote className="border-l-2 border-primary/30 pl-4 flex items-start gap-2 text-on-surface-variant italic text-sm">
                    <MdFormatQuote className="icon-sm text-primary/50 shrink-0 mt-0.5" />
                    &ldquo;Paris is always a good idea.&rdquo; — Audrey Hepburn
                  </blockquote>
                </div>
                <div className="sm:col-span-5">
                  <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600" alt="Paris street" className="w-full aspect-[4/5] object-cover" />
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-outline">Photo Gallery</p>
                  <button className="text-primary text-xs font-bold hover:underline">Add More</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { src: "https://images.unsplash.com/photo-1549144863-31f487a8f11e?auto=format&fit=crop&q=80&w=400", alt: "Louvre" },
                    { src: "https://images.unsplash.com/photo-1550110134-d241441d4519?auto=format&fit=crop&q=80&w=400", alt: "Cafe" },
                  ].map(({ src, alt }) => (
                    <div key={alt} className="aspect-square rounded-xl overflow-hidden group relative shadow-sm">
                      <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <MdZoomIn className="icon-nav text-white" />
                      </div>
                    </div>
                  ))}
                  <div className="aspect-square rounded-xl border-2 border-dashed border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center cursor-pointer transition-all group">
                    <MdAddAPhoto className="icon-stat text-outline-variant group-hover:text-primary transition-colors" />
                    <span className="text-xs font-medium text-outline mt-1.5 group-hover:text-primary transition-colors">Upload</span>
                  </div>
                </div>
              </div>

              {/* Writing area */}
              <div className="border-t border-outline-variant/10 pt-8">
                <textarea
                  className="w-full h-48 bg-transparent border-none focus:ring-0 resize-none text-base leading-relaxed text-on-surface placeholder:text-outline-variant editor-focus font-body"
                  placeholder="Start writing your thoughts for today…"
                />
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-6 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant font-medium">
              <div className="flex gap-5"><span>428 Words</span><span>3 Photos</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full" /><span>Auto-saved at 4:32 PM</span></div>
            </footer>
          </div>
        </main>

        {/* Right Widgets */}
        <aside className="hidden xl:flex w-72 shrink-0 flex-col gap-6 p-6 border-l border-outline-variant/15 overflow-y-auto notion-scroll sticky top-16 h-[calc(100vh-4rem)]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Weather Archive</p>
            <div className="bg-white border border-outline-variant/20 p-4 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between">
                <MdWbSunny className="icon-xl text-primary" />
                <div className="text-right"><div className="text-2xl font-black">24°C</div><div className="text-[10px] text-on-surface-variant">Sunny &amp; Clear</div></div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Location Map</p>
            <div className="rounded-2xl overflow-hidden border border-outline-variant/15 shadow-sm relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" alt="Map" className="w-full aspect-video object-cover" />
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold">Paris, France</div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Quick Links</p>
            <div className="space-y-2">
              {["Hotel Confirmation", "Ticket: Louvre"].map((link) => (
                <button key={link} className="flex items-center justify-between px-4 py-3 bg-white border border-outline-variant/15 rounded-xl text-sm hover:bg-surface-container transition-colors w-full">
                  <span className="font-medium truncate">{link}</span>
                  <MdOpenInNew className="icon-xs text-on-surface-variant shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* FABs */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
        <button aria-label="Share" className="w-12 h-12 bg-white/90 backdrop-blur border border-outline-variant/20 text-on-surface-variant rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
          <MdShare className="icon-nav" />
        </button>
        <button aria-label="Save" className="w-12 h-12 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
          <MdSave className="icon-nav" />
        </button>
      </div>
    </div>
  );
}

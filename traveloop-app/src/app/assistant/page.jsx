"use client";
import {
  MdAutoAwesome, MdAdd, MdSearch, MdHistory, MdShare, MdDownload,
  MdMoreVert, MdSend, MdImage, MdMic, MdRestaurant, MdMuseum,
  MdSchedule, MdSave, MdMap, MdTipsAndUpdates, MdClose,
} from "react-icons/md";

const PREV_CHATS = [
  { label: "Paris 3-Day Plan", active: true },
  { label: "Japan Itinerary",   active: false },
  { label: "Bali Budget Trip",  active: false },
];

const SUGGESTIONS = ["Add Day 3", "Show me hotels", "Nearest metro stations", "Best local restaurants"];

const ITINERARY_ITEMS = [
  { time: "9:00 AM",  Icon: MdRestaurant, label: "Le Marais Breakfast",   detail: "Café de Flore — Croissant + café au lait", cost: "$12" },
  { time: "10:30 AM", Icon: MdMuseum,     label: "Louvre Museum",          detail: "Pre-book tickets to skip queues",          cost: "$18" },
  { time: "1:30 PM",  Icon: MdRestaurant, label: "L'As du Fallafel Lunch", detail: "Best falafel in Paris — cash only",       cost: "$8" },
];

const GALLERY = [
  { label: "Louvre Museum", src: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&q=80&w=300" },
  { label: "Montmartre",    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=300" },
  { label: "Seine Cruise",  src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=300" },
];

const BUDGET_BREAKDOWN = [
  { label: "Food",      val: "$120" },
  { label: "Transport", val: "$45" },
  { label: "Activities",val: "$80" },
  { label: "Hotel",     val: "$240" },
];

export default function AIAssistantPage() {
  return (
    <div className="h-screen flex overflow-hidden bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col gap-4 p-5 border-r border-outline-variant/15 bg-surface-container-low/60 backdrop-blur-2xl">
        <div className="flex items-center gap-3 py-2">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-md shrink-0">
            <MdAutoAwesome className="icon-nav text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm">AI Travel Planner</h2>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Powered by Gemini</p>
          </div>
        </div>

        <button className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all">
          <MdAdd className="icon-btn" /> New Chat
        </button>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3 px-2">Previous Chats</p>
          <div className="space-y-0.5">
            {PREV_CHATS.map(({ label, active }) => (
              <button
                key={label}
                className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all truncate ${active ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:bg-surface-variant/50"}`}
              >
                <MdHistory className="icon-xs shrink-0 opacity-60" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 bg-primary/5 border border-primary/10 rounded-2xl">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MdTipsAndUpdates className="icon-sm text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Pro Tip</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">Tell me your budget and travel style for a fully customized itinerary.</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/15 bg-surface/90 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center">
              <MdAutoAwesome className="icon-sm text-on-primary-container" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Paris Weekend Plan</h3>
              <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active Session
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {[[MdShare,"Share"],[MdDownload,"Download"],[MdMoreVert,"More"]].map(([Icon, lbl]) => (
              <button key={lbl} aria-label={lbl} className="p-2 rounded-xl hover:bg-surface-container transition-colors">
                <Icon className="icon-nav text-on-surface-variant" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 custom-scrollbar">
          {/* User */}
          <div className="flex justify-end">
            <div className="max-w-sm bg-primary text-white px-5 py-3.5 rounded-3xl rounded-br-sm shadow-lg">
              <p className="text-sm leading-relaxed">Plan me a 2-day trip to Paris focusing on art &amp; food, budget under $500.</p>
              <p className="text-on-primary/60 text-[10px] mt-2 text-right">2:30 PM</p>
            </div>
          </div>

          {/* Typing */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <MdAutoAwesome className="icon-xs text-white" />
            </div>
            <div className="flex items-center gap-1.5 px-4 py-3 bg-white border border-outline-variant/20 rounded-2xl rounded-bl-sm shadow-sm">
              {[0, 150, 300].map((delay) => (
                <span key={delay} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          </div>

          {/* AI Response */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md mt-0.5">
              <MdAutoAwesome className="icon-xs text-white" />
            </div>
            <div className="flex-1 max-w-2xl min-w-0 bg-white border border-outline-variant/15 rounded-3xl rounded-bl-sm p-5 shadow-sm space-y-5">
              <p className="font-bold text-sm">Here&apos;s your personalized Paris art &amp; food 2-day itinerary! 🗼</p>

              {/* Day 1 */}
              <div className="bg-surface-container-low border border-outline-variant/10 p-5 rounded-2xl">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">Day 1 — Art &amp; Gastronomy</p>
                <div className="space-y-3.5">
                  {ITINERARY_ITEMS.map(({ time, Icon, label, detail, cost }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon className="icon-sm text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <p className="font-bold text-xs">{label}</p>
                            <p className="text-[11px] text-on-surface-variant truncate">{detail}</p>
                          </div>
                          <span className="text-xs font-bold text-primary shrink-0">{cost}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">Suggested Sights</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {GALLERY.map(({ label, src }) => (
                    <div key={label} className="group cursor-pointer">
                      <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
                        <img src={src} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <p className="text-[10px] font-bold text-center mt-1.5 text-on-surface-variant">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">Budget Summary</p>
                <div className="grid grid-cols-4 gap-3 text-center">
                  {BUDGET_BREAKDOWN.map(({ label, val }) => (
                    <div key={label}>
                      <p className="font-black text-sm text-on-surface">{val}</p>
                      <p className="text-[9px] text-on-surface-variant font-medium">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-primary/10 flex justify-between items-center">
                  <span className="text-xs font-bold">Total Estimate</span>
                  <span className="text-base font-black text-primary">$485</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {[[MdSave,"Save to Trips",true],[MdMap,"View on Map",false],[MdShare,"Share",false]].map(([Icon, label, primary]) => (
                  <button key={label} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${primary ? "bg-primary text-white hover:bg-primary/90" : "border border-outline-variant/30 hover:bg-surface-container"}`}>
                    <Icon className="icon-xs" />{label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-5 border-t border-outline-variant/10 bg-surface/90 backdrop-blur-xl shrink-0">
          {/* Chips */}
          <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar pb-1">
            {SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-outline-variant/30 bg-white hover:border-primary hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-end gap-3 bg-white border border-outline-variant/20 rounded-2xl px-4 py-3 shadow-md focus-within:border-primary/30 focus-within:shadow-primary/8 transition-all">
            <textarea
              rows={1}
              placeholder="Plan a trip, discover local tips, ask for budget advice…"
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-sm leading-relaxed py-0.5 max-h-28"
            />
            <div className="flex items-center gap-1.5 shrink-0">
              {[[MdImage,"Image"],[MdMic,"Mic"]].map(([Icon, lbl]) => (
                <button key={lbl} aria-label={lbl} className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all">
                  <Icon className="icon-nav" />
                </button>
              ))}
              <button className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-md">
                <MdSend className="icon-sm" />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-on-surface-variant mt-2.5">AI responses may vary. Always verify travel details before booking.</p>
        </div>
      </main>
    </div>
  );
}

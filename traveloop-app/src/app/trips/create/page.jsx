import Navbar from "@/components/Navbar";
import {
  MdSave, MdArrowForward, MdArrowBack,
  MdSavings, MdHotel, MdDiamond,
  MdHiking, MdMuseum, MdRestaurant, MdForest,
  MdCheck,
} from "react-icons/md";

const STEPS = [
  { step: 1, label: "Basic Details", done: true },
  { step: 2, label: "Preferences",   active: true },
  { step: 3, label: "Dates & Budget" },
  { step: 4, label: "Review" },
];

const BUDGETS = [
  { name: "Budget",   Icon: MdSavings,  price: "< $100/day",  desc: "Hostels, street food, public transport",             selected: false },
  { name: "Standard", Icon: MdHotel,    price: "$100–300/day", desc: "Mid-range hotels, local dining, mix of transport",    selected: true },
  { name: "Luxury",   Icon: MdDiamond,  price: "$300+/day",   desc: "5-star hotels, fine dining, private transfers",        selected: false },
];

const INTERESTS = [
  { label: "Adventure",   Icon: MdHiking,      selected: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDopBjGRJp3r-DGG9pX_rJa4Iz2uNr3lZSYRkCBOhJr5tqkzgBfNfTL2IhS0M6TOxBDLiEO7tl_0n-beTMkqEr33YbVkAo7XA2RMeGZHFCrFWoAuqoKMzNT8YCH_3W2WvBPOPJstR0zqzB8KaOmV-bfckhMg_xPwtMJRR2n0LUX0FNXpQ6aSAqeT6CBSM5wBwEXjvN-DhNTBBmfk2DaWA7qJYA1VCY5o9r0LJD4oJVPHB0R9iLNrK-KBTjj9cHHBw5N16Y1A9w" },
  { label: "Culture",     Icon: MdMuseum,       selected: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxCP7bXd537HN8HJJ_5Sl2cSSstH_Dm_pn3QB8Fdt8KRmq-MHZzbUxDTBMzkBhm77-aLTtiG-8ywtiq07rKcFPpVgMN_GD6_7HsU1xIYpUJsXyJ1Mg-ASLffTIc_t3IGUgApeyotRicWuuRtvp8HMYJqUDPjem_7kyhs27j0fRC0LkeEoG-GpOqix50Q01eE0txKbCIpZH9H-ZNYIrJkqaQ8BRz9FdFYx8txKDvNaC7ZzFlxw8_9Ztz1u2sgoMuxCR6iSvdaJacY" },
  { label: "Gastronomy",  Icon: MdRestaurant,   selected: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbCBq_P9PJxMK6ygp9I-WyhSl1YtvvAgnwp64Xx8G_wQMHmCM4EFav_yzyGtxBsvZJJfnjTCRVdHhlCRjL1HJkYhOxmj-v5VbzE1Ma2tndkW97Q8yTsZ_ybMaIBXvyF6jGTWbLrakj717AsgRITVWPTc12hxvNkxMuR2rQ5Y2sgRJWMoCXcfvEDqFBLnH2by8eJJY-hKelfmgMWDgadt9mZJQmQmS-exVQeF8CGJJzZJvh9HSF_AP6hobFECw6YZ7Et7SQO5CHA54" },
  { label: "Nature",      Icon: MdForest,       selected: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAOhihVmDmR1O30g9XhN8nclA60YzaqMcOSvq7I7gGtcOOWEc1D4jSJGLPzTFnGkSu1xux8Sud3o53d-cfoN-Y3FjMm1kFqLP0mgwz2mWA3vooNmRXGmiBr_FNISCqTeOHEHr22xA13zqnNgQSK8_EsUQ32KCusLewhjaXD7iRULziUvsZWZPDhy-HhnT3YR-JHTkd5ET7HD5yqFk5mhjWA0uK9_L-U-ntUIZbGBmImOs_cPGuYhFXzEgRovngyWubWMhtdgLsUo" },
];

export default function CreateTripPage() {
  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />

      {/* Save Draft */}
      <div className="fixed top-16 right-6 z-40">
        <button className="flex items-center gap-2 bg-white/90 backdrop-blur border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm font-bold text-on-surface shadow-sm hover:shadow-md transition-all mt-2">
          <MdSave className="icon-btn text-on-surface-variant" /> Save Draft
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-32 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Progress</h3>
            {STEPS.map((s) => (
              <div key={s.step} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${s.active ? "bg-primary/8 text-primary font-bold" : s.done ? "text-on-surface-variant" : "text-outline"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.active ? "bg-primary text-white" : s.done ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant"}`}>
                  {s.done && !s.active ? <MdCheck className="text-sm" /> : s.step}
                </div>
                <span className="text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Form */}
        <section className="flex-1 space-y-10 min-w-0">
          {/* Step indicator */}
          <div className="space-y-2">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className={`flex-1 h-1.5 rounded-full transition-all ${n <= 2 ? "bg-primary" : "bg-surface-container-high"}`} />
              ))}
            </div>
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
              <span>Step 2 of 4</span>
              <span className="text-primary">50% Complete</span>
            </div>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Tell us your style</h1>
            <p className="text-sm text-on-surface-variant">We&apos;ll tailor your itinerary recommendations to match.</p>
          </div>

          {/* Budget Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Travel Budget</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BUDGETS.map((b) => (
                <div
                  key={b.name}
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${b.selected ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${b.selected ? "bg-white/20" : "bg-primary/10"}`}>
                      <b.Icon className={`icon-stat ${b.selected ? "text-white" : "text-primary"}`} />
                    </div>
                    <div>
                      <h3 className="font-bold">{b.name}</h3>
                      <p className={`text-xs font-bold ${b.selected ? "text-white/80" : "text-primary"}`}>{b.price}</p>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${b.selected ? "text-white/80" : "text-on-surface-variant"}`}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Your Interests</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {INTERESTS.map((item) => (
                <div
                  key={item.label}
                  className={`relative h-36 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${item.selected ? "ring-2 ring-primary shadow-md" : "hover:ring-1 hover:ring-primary/40"}`}
                >
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} alt={item.label} />
                  <div className={`absolute inset-0 ${item.selected ? "bg-primary/40" : "bg-black/30 group-hover:bg-black/15"} transition-all`} />
                  {item.selected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <MdCheck className="text-white text-xs" />
                    </div>
                  )}
                  <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white">
                    <item.Icon className="icon-xs" />
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-2xl border-t border-outline-variant/15 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant/40 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors">
            <MdArrowBack className="icon-btn" /> Back
          </button>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Skip
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all">
              Next <MdArrowForward className="icon-btn" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

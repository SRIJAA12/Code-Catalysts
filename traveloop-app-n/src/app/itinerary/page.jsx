import Navbar from "@/components/Navbar";
import {
  MdShare, MdMoreHoriz, MdLocationOn, MdSchedule, MdHotel,
  MdRestaurant, MdTrain, MdStar, MdArrowForward,
  MdCalendarMonth, MdMap, MdGroup,
} from "react-icons/md";

const DAYS = [
  {
    date: "Tue, Jun 11",
    items: [
      { time: "2:30 PM", type: "Hotel", Icon: MdHotel,     label: "Grand Hôtel du Palais Royal", sub: "Check-in · 5 nights", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLtVhFHDRlMCVKT-ZDpFR97gKkrRJ-6KLV5Q4ydJLxB9j3LQ7R-LXKcaxVkY8AYFHlb3c_jnL_5n5n04XHiAGm6tHBrROsIL1VdKHuqgLY4jPg6cjAh-v4hrdZjkxDH2llPHUa1YXvZ4KiNLVH7xQBDwi0r5C7TT_3a4iXC_U_k_nLXzGxuTmWvGGSR_Y84pRETVYhJSsicuvHB3Fyz95R5WmKTTgLPCpklM3UR1bSbaBf6BJJXB0_s_R5mEEVCOGFXbYxmIHc" },
      { time: "4:00 PM", type: "Explore", Icon: MdLocationOn, label: "Jardin du Palais Royal", sub: "Stroll · 1 km walk", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxCP7bXd537HN8HJJ_5Sl2cSSstH_Dm_pn3QB8Fdt8KRmq-MHZzbUxDTBMzkBhm77-aLTtiG-8ywtiq07rKcFPpVgMN_GD6_7HsU1xIYpUJsXyJ1Mg-ASLffTIc_t3IGUgApeyotRicWuuRtvp8HMYJqUDPjem_7kyhs27j0fRC0LkeEoG-GpOqix50Q01eE0txKbCIpZH9H-ZNYIrJkqaQ8BRz9FdFYx8txKDvNaC7ZzFlxw8_9Ztz1u2sgoMuxCR6iSvdaJacY" },
      { time: "7:30 PM", type: "Restaurant", Icon: MdRestaurant, label: "Le Grand Véfour", sub: "Dinner reservation · 2 guests", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbCBq_P9PJxMK6ygp9I-WyhSl1YtvvAgnwp64Xx8G_wQMHmCM4EFav_yzyGtxBsvZJJfnjTCRVdHhlCRjL1HJkYhOxmj-v5VbzE1Ma2tndkW97Q8yTsZ_ybMaIBXvyF6jGTWbLrakj717AsgRITVWPTc12hxvNkxMuR2rQ5Y2sgRJWMoCXcfvEDqFBLnH2by8eJJY-hKelfmgMWDgadt9mZJQmQmS-exVQeF8CGJJzZJvh9HSF_AP6hobFECw6YZ7Et7SQO5CHA54" },
    ],
  },
  {
    date: "Wed, Jun 12",
    items: [
      { time: "9:00 AM",  type: "Transport", Icon: MdTrain,      label: "Eurostar to London", sub: "Gare du Nord · Platform 10", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTdw_t1QdfXFhWHDsVKeouIfLj8NZnr54zfENhY1Bs-wfdQcPT9Kv3pTvZzpJNenkS0aXEmC3TBNMBdOKcZPfb8j-qqzFmHbsLDY2hNnhEqviHuiSEfP-8De7UrqY8F-8pKSQ8c2b-PtAkWiuLDD_g4kqGukcvEeFDCtlFVrZtEvTspGsbcqXpO-_H3ZZ9ad5TtZowWl3uphSn6NdG5zQwU7Z3GoVeSXyxcGnnUnQbeP-UxglVOWecJd8r5Kxp6qKRh2wZ5zLbO2Q" },
    ],
  },
];

export default function ItineraryViewPage() {
  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />

      {/* Hero */}
      <div className="relative h-[480px] overflow-hidden group">
        <img
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9L2CPyqxoaBHjgmCaqU90zewI8lASIdDwrQ8p1V-mCaKgCCXoXL5038xSVb03kVGmuMdZXl-qqa-BMt-VdR13fLJ8yBXat1lUrje1RvaBYpyX6zrcwYPwEAR1aJW7s1R2crWIDXHG8PE61q9yhqg1khA95ggrhP5dmQ1_eovu5X9eltjXd5CE41_DG1r6qF9JL3fVkmmavUkiL9Jlxb4K16sScodYhFoLhbCjvaZvG8WN9UnWbt3HZ3Qul78VfUPFsuJ7kZnB08s"
          alt="Paris hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-10 left-6 sm:left-12 right-6 sm:right-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Europe Highlights</span>
              <span className="text-white/80 text-xs flex items-center gap-1"><MdSchedule className="icon-xs" /> 10 Days</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">Summer in Europe</h1>
            <div className="flex items-center gap-4 flex-wrap text-sm text-white/90">
              <span className="flex items-center gap-1"><MdCalendarMonth className="icon-sm" /> Jun 11 – Jun 21, 2024</span>
              <span className="flex items-center gap-1"><MdLocationOn className="icon-sm" /> Paris · London · Amsterdam</span>
            </div>
          </div>
          <div className="flex gap-2">
            {[{ Icon: MdShare, label: "Share" }, { Icon: MdMoreHoriz, label: "More" }].map(({ Icon, label }) => (
              <button key={label} aria-label={label} className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/25 hover:bg-white/30 transition-all text-white">
                <Icon className="icon-nav" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">
        {/* ── Timeline ── */}
        <main className="flex-1 space-y-10 min-w-0">
          {/* Sub-nav */}
          <div className="flex gap-2 border-b border-outline-variant/20 pb-4 overflow-x-auto">
            {[{ Icon: MdCalendarMonth, label: "Timeline", active: true }, { Icon: MdMap, label: "Map View" }, { Icon: MdGroup, label: "Collaborators" }].map(({ Icon, label, active }) => (
              <button key={label} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${active ? "text-primary bg-primary/8" : "text-on-surface-variant hover:bg-surface-container"}`}>
                <Icon className="icon-sm" /> {label}
              </button>
            ))}
          </div>

          {/* Days */}
          {DAYS.map((day) => (
            <div key={day.date} className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-outline flex items-center gap-2">
                <MdCalendarMonth className="icon-sm" /> {day.date}
              </h2>
              <div className="space-y-4 relative pl-6">
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-outline-variant/30" />
                {day.items.map((item) => (
                  <div key={item.label} className="relative flex gap-4 group cursor-pointer">
                    <div className="absolute -left-6 top-5 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10 group-hover:scale-125 transition-transform" />
                    <div className="flex-1 min-w-0 bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col sm:flex-row">
                      <div className="w-full sm:w-28 h-28 sm:h-auto overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} alt={item.label} />
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between gap-2 min-w-0">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">{item.type}</span>
                            <span className="text-xs text-on-surface-variant">{item.time}</span>
                          </div>
                          <h3 className="font-bold text-sm mt-1 leading-snug">{item.label}</h3>
                          <p className="text-xs text-on-surface-variant mt-0.5 truncate">{item.sub}</p>
                        </div>
                        <div className="flex items-center gap-1 text-primary text-xs font-bold">
                          View Details <MdArrowForward className="icon-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>

        {/* ── Sticky Map ── */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24 bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between">
              <h3 className="font-bold text-sm">Trip Route</h3>
              <MdMap className="icon-nav text-primary" />
            </div>
            <div className="h-80 relative">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_bMQ_RGuouZwi1yoBn7bu_i-jGVE4RU1lxV1Q1p9jWnN_ujny5zpZ6oN2sckWNz44hHQ3X2TufWcUnqx7ED6nPLiRfVPLPc0-XzDUvbAD1hTdJtRCo0mVA3d3349BILXi-GaTYedqgBXn5C5ABMSNU16S8dh-6k_H9uOaIG_q25z4FonIAzPhkV-ky04qFGiFJMhj_0Z9lf5o_PXHrDJ3EaOpy9W43R5tUL_GzxEWusrwtsdAaiMEweUnz0pKaLqr36vtqqh6mfU" alt="Route map" />
            </div>
            <div className="p-4 space-y-3">
              {[["Flight", "LHR → CDG · Jun 11", MdTrain], ["Hotel", "Grand Hôtel · 5 nights", MdHotel], ["Rating", "4.9 · Excellent", MdStar]].map(([label, val, Icon]) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="icon-sm text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-xs text-on-surface-variant">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import {
  MdAdd, MdSearch, MdSort, MdCalendarToday, MdMoreVert,
  MdFlightTakeoff, MdCheck, MdDrafts, MdSchedule,
  MdAutoAwesome,
} from "react-icons/md";

const TRIPS = [
  {
    title: "Summer in Kyoto",
    dates: "Jul 12 — Jul 25, 2024",
    status: "Active",
    statusBg: "bg-green-100 text-green-700",
    progress: 65,
    budget: "$4,500",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbCBq_P9PJxMK6ygp9I-WyhSl1YtvvAgnwp64Xx8G_wQMHmCM4EFav_yzyGtxBsvZJJfnjTCRVdHhlCRjL1HJkYhOxmj-v5VbzE1Ma2tndkW97Q8yTsZ_ybMaIBXvyF6jGTWbLrakj717AsgRITVWPTc12hxvNkxMuR2rQ5Y2sgRJWMoCXcfvEDqFBLnH2by8eJJY-hKelfmgMWDgadt9mZJQmQmS-exVQeF8CGJJzZJvh9HSF_AP6hobFECw6YZ7Et7SQO5CHA54",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUqM_FJsmJ4IhLeYbX0TP-OMCJdJC0oppgwFTo63IdZ-SY2ix6BEZqytkd-LirgENMIqNIpyUXyAoA2IcGV0wLdM73sWbUF25JxdndFtpZhp0NOQSY6mcumrH9AD5XWvEJgY30Mz-ELmUv-dVGwtG3AriBH6H4wOprcNUKrtkz1DuXLCwWFsvXcBPf0vLmilqjohDBvTtq1uDKUwtj37uwX9KbqizS8fFRuCMIYFBH0J-7YVFNApgwvcChPB4ePCWkuA2UlTfPsiw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2wHBzgTYp9UNn-P0b2Nab1Scmt_s4cJg75gVYeKT0x-adXNCw1B16PzxC_xl9bLxgs1ODvWYJwQREvXdKsgrK1dXmn2XHzukhZRd4BvC51z5_otd_RBeAJgPu-PinFL8MtckqUTcWVTwv7ugIFp_LtxceaT1ofIBqibLHh_FTFZG1sFkh-29gHDHdFy4M0SVcz74d8_klW4gO1urh00PtY1wyA063QgX5ynSd7F3-B3Z1FnX-Hj-t8x7GbDEnjpEBEyA01Tjg5B4",
    ],
  },
  {
    title: "Paris Fashion Week",
    dates: "Sep 23 — Oct 01, 2024",
    status: "Upcoming",
    statusBg: "bg-orange-100 text-orange-700",
    progress: 10,
    budget: "$8,200",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTygnMzArFsQzNwITDl4VIL6WP5xMMzVaFrEkHczutIBOj7KmiOTpAhwPUSgA2fVp_y7uoKx5HxZbwTdKsl6mrQ5VZr8Q1KiUJx9tOVlwDVpP59EzyMxeiAMQ1J4Iya1dAODwp-d6nXP8MYQ51Y6FtKz5Ku5loL_7mXpNPacIG6wMXUkgxLElYlwIPZlP5Cz-2Ht4F5boZ__0c_yuTMr_q5kJGyWKaXFCAD_gmqa4NdZo6F1WACi_hxk1sMO7SZxXdZpOypD3iRKc",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLY7sWl9RdJ1apNw9sfVI5NfW-XmUnkzcf-BVTdtNxYTpDFMqH5BQMpb1KYuJa0727I48jxktaJo4SWWAirAHMl_6UvYQehB6prtjqvtXjO8_DWIDlG1zbYnEhi4M0EVtlcVf1hYYU0UEMrnrj8t5ftqL8NLxdJZvV9m6o13Qrmw4rp1uLia4Vaxq8bizjdXfNZsK_efWX6J9eOqwAYYJkTmSl1u_kKLH53Nb0SdT3RkXyUpoQFAc9krxyMuiu9DPsKwutrjz17MI",
    ],
  },
];

const STATS = [
  { icon: MdFlightTakeoff, label: "Total Trips",  value: "12", bg: "bg-primary/10 text-primary" },
  { icon: MdCheck,         label: "Completed",    value: "8",  bg: "bg-green-100 text-green-700" },
  { icon: MdSchedule,      label: "Upcoming",     value: "3",  bg: "bg-orange-100 text-orange-700" },
  { icon: MdDrafts,         label: "Drafts",       value: "1",  bg: "bg-gray-100 text-gray-600" },
];

export default function MyTripsPage() {
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
            <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md shrink-0">
              <MdAdd className="icon-btn" /> New Trip
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex gap-2 flex-wrap">
              {["Upcoming", "Completed", "Drafts"].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${i === 0 ? "bg-primary text-white shadow-sm" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"}`}
                >
                  {tab}
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
                />
              </div>
              <button className="p-2.5 bg-surface-container-low border border-outline-variant/20 rounded-xl hover:bg-surface-container-high transition-colors flex items-center gap-1.5 text-sm font-medium text-on-surface-variant shrink-0">
                <MdSort className="icon-nav" /> Sort
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {TRIPS.map((trip) => (
              <article
                key={trip.title}
                className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={trip.img}
                    alt={trip.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold ${trip.statusBg}`}>
                    {trip.status}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h3 className="font-bold text-on-surface truncate">{trip.title}</h3>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                        <MdCalendarToday className="icon-xs shrink-0" />
                        {trip.dates}
                      </p>
                    </div>
                    <button className="p-1 rounded-lg hover:bg-surface-container-high transition-colors shrink-0">
                      <MdMoreVert className="icon-nav text-on-surface-variant" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${trip.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-on-surface-variant">Itinerary: {trip.progress}%</span>
                      <span className="font-bold text-primary">{trip.budget}</span>
                    </div>
                  </div>

                  <div className="flex -space-x-2 mt-auto">
                    {trip.avatars.map((av, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                        <img src={av} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* Add trip card */}
            <article className="border-2 border-dashed border-outline-variant/40 rounded-2xl flex flex-col items-center justify-center gap-3 p-10 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group min-h-[280px]">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <MdAdd className="text-2xl text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-on-surface">New Adventure</h3>
                <p className="text-xs text-on-surface-variant mt-1">Start planning your next trip</p>
              </div>
            </article>
          </div>
        </main>

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-20 space-y-5">
            <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-5">Trip Statistics</h3>
              <div className="space-y-4">
                {STATS.map(({ icon: Icon, label, value, bg }) => (
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
              <button className="w-full bg-white text-primary py-2.5 rounded-xl text-sm font-bold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 relative z-10">
                <MdAutoAwesome className="icon-btn" /> Plan with AI
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-2xl z-50 px-6 py-3 flex items-center justify-around border-t border-outline-variant/10">
        {[
          { icon: MdFlightTakeoff, label: "Home" },
          { icon: MdFlightTakeoff, label: "My Trips", active: true },
          { icon: MdSearch, label: "Explore" },
        ].map(({ icon: Icon, label, active }) => (
          <button key={label} className={`flex flex-col items-center gap-1 ${active ? "text-primary" : "text-on-surface-variant"}`}>
            <Icon className="icon-nav" />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

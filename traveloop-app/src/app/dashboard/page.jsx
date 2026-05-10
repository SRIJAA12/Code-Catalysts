import Navbar from "@/components/Navbar";
import {
  MdCalendarToday, MdPublic, MdPayments, MdSchedule,
  MdAddCircle, MdAdd, MdStar, MdChevronLeft, MdChevronRight,
} from "react-icons/md";

export default function DashboardPage() {
  const trips = [
    {
      title: "Summer in Kyoto",
      dates: "Jul 12 – Jul 25, 2024",
      status: "Ongoing",
      statusColor: "bg-green-100 text-green-700",
      progress: 65,
      budget: "$4,500",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbCBq_P9PJxMK6ygp9I-WyhSl1YtvvAgnwp64Xx8G_wQMHmCM4EFav_yzyGtxBsvZJJfnjTCRVdHhlCRjL1HJkYhOxmj-v5VbzE1Ma2tndkW97Q8yTsZ_ybMaIBXvyF6jGTWbLrakj717AsgRITVWPTc12hxvNkxMuR2rQ5Y2sgRJWMoCXcfvEDqFBLnH2by8eJJY-hKelfmgMWDgadt9mZJQmQmS-exVQeF8CGJJzZJvh9HSF_AP6hobFECw6YZ7Et7SQO5CHA54",
    },
    {
      title: "Paris Fashion Week",
      dates: "Sep 23 – Oct 01, 2024",
      status: "Upcoming",
      statusColor: "bg-orange-100 text-orange-700",
      progress: 10,
      budget: "$8,200",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTygnMzArFsQzNwITDl4VIL6WP5xMMzVaFrEkHczutIBOj7KmiOTpAhwPUSgA2fVp_y7uoKx5HxZbwTdKsl6mrQ5VZr8Q1KiUJx9tOVlwDVpP59EzyMxeiAMQ1J4Iya1dAODwp-d6nXP8MYQ51Y6FtKz5Ku5loL_7mXpNPacIG6wMXUkgxLElYlwIPZlP5Cz-2Ht4F5boZ__0c_yuTMr_q5kJGyWKaXFCAD_gmqa4NdZo6F1WACi_hxk1sMO7SZxXdZpOypD3iRKc",
    },
    {
      title: "Bali Zen Retreat",
      dates: "Planning stage",
      status: "Draft",
      statusColor: "bg-gray-100 text-gray-600",
      progress: 0,
      budget: "TBD",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1RCS2bsrV_UZe0prGOjqcB3srV3_wT4_dTJMVwdBOsYdBbZdLc38lVw_h6aIXOBsCNLCVUvk1uzWQ4it0p1iByjqOwwgJdOgjd_YEzSvqUEzLcS-UQRZ9Jya875OJ_3lKfTlV7qwAw1UFL7mLA9jUUBN3z7CfXKmYfWqjWCwaB0LYbqb3o4VJ6ZRzyecxo4V9LEC98uHHqkuW-NIngB7BBD788Rp6nd9NBRqIOwKb_eAuJRF8TSP-hDvQzpkcPE2CH0viiE-FaNM",
    },
  ];

  const stats = [
    { label: "Upcoming Trips", value: "3",    Icon: MdCalendarToday, bg: "bg-primary-container text-on-primary-container" },
    { label: "Countries Planned", value: "12", Icon: MdPublic,         bg: "bg-secondary-container text-on-secondary-container" },
    { label: "Total Budget",    value: "$14.2k", Icon: MdPayments,       bg: "bg-tertiary-fixed text-on-tertiary-fixed" },
    { label: "Days Traveling",  value: "45",   Icon: MdSchedule,       bg: "bg-surface-container-high text-on-surface" },
  ];

  const destinations = [
    { city: "Tokyo, Japan",   price: "From $1,200", rating: "4.9", col: "col-span-3", row: "row-span-2", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC04eLiG6VZ7BOtwZNtEOGeLs0mpZY7xrhlOqvHYCEFHZwkWtceIuUBTtibnq3dteUbizKYHRizC_ej0hlqVujuhA8QL6JfaQDaV9ryfQJWMA0e7xy5-GcaeH6lGAMdTdjtvB1Kgy1h4A0xoSMoi1mM1E6Wv6p7MaUbMoO9uQGI2I-HOCY9jyG1egn9kyV1Th2R1x5xVGuBY1vsXOUXDpnIZsZQ9wBy0m72XEmpGMpGmR1SRiMoD-GbKuVB6G44ksbG_1k-46hV88o" },
    { city: "Dubai, UAE",     price: "$2,500",      rating: "4.7", col: "col-span-1", row: "row-span-1", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTdw_t1QdfXFhWHDsVKeouIfLj8NZnr54zfENhY1Bs-wfdQcPT9Kv3pTvZzpJNenkS0aXEmC3TBNMBdOKcZPfb8j-qqzFmHbsLDY2hNnhEqviHuiSEfP-8De7UrqY8F-8pKSQ8c2b-PtAkWiuLDD_g4kqGukcvEeFDCtlFVrZtEvTspGsbcqXpO-_H3ZZ9ad5TtZowWl3uphSn6NdG5zQwU7Z3GoVeSXyxcGnnUnQbeP-UxglVOWecJd8r5Kxp6qKRh2wZ5zLbO2Q" },
    { city: "Paris, France",  price: "From $1,800", rating: "4.9", col: "col-span-2", row: "row-span-1", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxCP7bXd537HN8HJJ_5Sl2cSSstH_Dm_pn3QB8Fdt8KRmq-MHZzbUxDTBMzkBhm77-aLTtiG-8ywtiq07rKcFPpVgMN_GD6_7HsU1xIYpUJsXyJ1Mg-ASLffTIc_t3IGUgApeyotRicWuuRtvp8HMYJqUDPjem_7kyhs27j0fRC0LkeEoG-GpOqix50Q01eE0txKbCIpZH9H-ZNYIrJkqaQ8BRz9FdFYx8txKDvNaC7ZzFlxw8_9Ztz1u2sgoMuxCR6iSvdaJacY" },
    { city: "Zermatt, CH",    price: "$3,200",      rating: "4.8", col: "col-span-2", row: "row-span-1", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAOhihVmDmR1O30g9XhN8nclA60YzaqMcOSvq7I7gGtcOOWEc1D4jSJGLPzTFnGkSu1xux8Sud3o53d-cfoN-Y3FjMm1kFqLP0mgwz2mWA3vooNmRXGmiBr_FNISCqTeOHEHr22xA13zqnNgQSK8_EsUQ32KCusLewhjaXD7iRULziUvsZWZPDhy-HhnT3YR-JHTkd5ET7HD5yqFk5mhjWA0uK9_L-U-ntUIZbGBmImOs_cPGuYhFXzEgRovngyWubWMhtdgLsUo" },
    { city: "Banff, Canada",  price: "From $900",   rating: "4.7", col: "col-span-6", row: "row-span-2", top: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbSRuras1H44hCdm8zc0iIbqrKQDMJS5lrbNUgwExzSXtqkKRhaBtJY-9gcJQ_FFgSpa4w64XKMYjN0jxKldkeUokLk8XuRQJ47anbgmkLsFngvCNeNQH3-ikeBPGQygN_sqLul4OXIHzW-wO3wpwidKudL7bmiqEgsYboOHX1PXHtyAHZebvTbnfkrzB0sdiXC6p0djF-q9CBlDQgWstRJ2hf2GHjlO3YdrmLneWD_PhTYEnEPDyuWZazGwzgiOqPkh6gNWzowjY" },
  ];

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="home" />

      <main className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20 space-y-14">
        {/* ── Hero ── */}
        <section className="relative h-[480px] rounded-3xl overflow-hidden group">
          <img
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB60gqF8oc82vmmtLr2dpHOaHxyaL8UfoRcWK4dyDbEWOd3r5l1sL4j_PUCWu-kNtOvuGnxWBwyYqaBmHMtq2-hhY9GVH0pTA0SAgqpO2cpWv1XpHY05JfMKjzvM66jQrAR2Et4EjubDo59ikGmigR7jTevwhc495fhR0k_uOT_ekT3NaSOssbJfELzdgFRu1B3f3kbxrh7tq884zaS3hl8CGuhdZcYamMHjlgUW2_ZtgnlRS7sF3ZEDF0BjdmcgB3Q3Rv8b64rtcM"
            alt="Mountain hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 gap-5">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-2xl leading-[1.1]">
              Where do you want to go next?
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-primary text-white px-7 py-3.5 rounded-full font-bold flex items-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm">
                <MdAddCircle className="icon-btn" />
                Plan New Trip
              </button>
              <div className="flex flex-wrap gap-2">
                {["Japan 2024", "Alps Skiing", "Bali Retreat"].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30 cursor-pointer hover:bg-white/30 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(({ label, value, Icon, bg }) => (
            <div key={label} className={`${bg} p-5 sm:p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300 group`}>
              <div className="p-2.5 rounded-xl bg-black/5 group-hover:scale-110 transition-transform shrink-0">
                <Icon className="icon-stat" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold opacity-70 truncate">{label}</p>
                <p className="text-2xl sm:text-3xl font-black">{value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Recent Trips ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Recent Trips</h2>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <article
                key={trip.title}
                className="bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={trip.img}
                    alt={trip.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold ${trip.statusColor}`}>
                    {trip.status}
                  </span>
                </div>
                <div className="p-5 space-y-4 flex-1">
                  <div>
                    <h3 className="text-base font-bold text-on-surface">{trip.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                      <MdCalendarToday className="icon-xs" />
                      {trip.dates}
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${trip.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-on-surface-variant">Progress: {trip.progress}%</span>
                      <span className="text-primary font-bold">{trip.budget}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Popular Destinations ── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Popular Destinations</h2>
            <div className="flex gap-2">
              {[MdChevronLeft, MdChevronRight].map((Ic, i) => (
                <button key={i} className="p-2 border border-outline-variant rounded-full hover:bg-surface-container-low transition-colors">
                  <Ic className="icon-nav" />
                </button>
              ))}
            </div>
          </div>

          {/* Bento grid — responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 grid-rows-none lg:grid-rows-[240px_240px] gap-4 min-h-[auto] lg:h-[500px]">
            {destinations.map((d) => (
              <div
                key={d.city}
                className={`${d.col} ${d.row} relative rounded-2xl overflow-hidden group h-48 lg:h-auto`}
              >
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={d.img}
                  alt={d.city}
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4 text-white space-y-0.5">
                  {d.rating && (
                    <div className="flex items-center gap-1 text-xs font-bold">
                      <MdStar className="icon-xs text-yellow-400" />
                      {d.rating}
                    </div>
                  )}
                  <h4 className={`font-bold ${d.top ? "text-2xl" : "text-lg"}`}>{d.city}</h4>
                  <p className="text-white/80 text-xs font-medium">{d.price}</p>
                </div>
                {d.top && (
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                    Top Rated
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
        <MdAdd className="text-2xl" />
      </button>
    </div>
  );
}

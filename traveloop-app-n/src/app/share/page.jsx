"use client";
import {
  MdNotifications, MdContentCopy, MdIosShare,
  MdFlightTakeoff, MdTrain, MdLocationOn, MdStar,
  MdShare, MdMail, MdLink, MdPhotoLibrary, MdMap,
} from "react-icons/md";

export default function SharedItineraryPage() {
  const segments = [
    { days: "Days 1–3",  title: "The City of Light",   place: "Paris, France",             active: true },
    { days: "Days 4–7",  title: "Alpine Serenity",     place: "Interlaken, Switzerland",   active: false },
    { days: "Days 8–12", title: "Tuscan Sunsets",      place: "Florence & Tuscany, Italy", active: false },
  ];
  const stats = [
    { v: "12", l: "Destinations" },
    { v: "1.2k", l: "Saves" },
    { v: "4.9", l: "Rating" },
  ];

  return (
    <div className="bg-background text-on-surface">
      {/* Shared-page header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-2xl border-b border-outline-variant/15 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight text-primary">Traveloop</span>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-surface-container transition-colors">
              <MdNotifications className="icon-nav text-on-surface-variant" />
            </button>
            <img className="w-9 h-9 rounded-full border-2 border-surface-container-high" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa_KsFHUmF3gAwspV4WnUCew0fubhMmK51ftHcoViQ4tVV-9AVErU4JAauoNSbAAorGRVm1mlA4uxN0GwNG1iUVdaNsdpQYMCLzabsuIKl7INO1WQ0iBl_hb-ealrvhMxa-Co_ekyZFBDs4zsXmhaqVaXhl_LeE26llf-pZXkJcGfukiCWYrwUHw3jea3o3y51Wj_WQ7f34tED_bnTj8oE0RDQUbOGpkzUHyDIe9ApuE_fhiRjLcqgXdrUVo25ngXSvX69-WF6nkw" alt="User" />
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero */}
        <section className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-xl group">
          <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9L2CPyqxoaBHjgmCaqU90zewI8lASIdDwrQ8p1V-mCaKgCCXoXL5038xSVb03kVGmuMdZXl-qqa-BMt-VdR13fLJ8yBXat1lUrje1RvaBYpyX6zrcwYPwEAR1aJW7s1R2crWIDXHG8PE61q9yhqg1khA95ggrhP5dmQ1_eovu5X9eltjXd5CE41_DG1r6qF9JL3fVkmmavUkiL9Jlxb4K16sScodYhFoLhbCjvaZvG8WN9UnWbt3HZ3Qul78VfUPFsuJ7kZnB08s" alt="Europe hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">Featured Trip</span>
                <span className="text-white/80 text-xs">12 Days</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">Summer in Europe</h1>
              <p className="text-base text-white/85 max-w-xl font-light">A curated exploration of hidden gems and iconic landmarks across France, Italy, and Switzerland.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-2 bg-white text-on-surface px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <MdContentCopy className="icon-btn" /> Copy Trip
              </button>
              <button className="p-2.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all">
                <MdIosShare className="icon-nav" />
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left */}
          <div className="lg:col-span-8 space-y-10">
            {/* Creator meta */}
            <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <img className="w-14 h-14 rounded-2xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0o8meJ9dF_TwnqoB14A5MVy8bcf-x2eLyzfuOg4YCBrgZ0rdztwgW2ebFdkXmmCQ7rLt7LBGu3_-9W3fa41t3pTUm--lt8Rvi5qcEpjQYBC6KLsAPkIi7l-6m1PBhEEOvS4m61_giEIsQR2QcKPZRq1TUY_ymvNiTqXcUJw0wAZj4IFURfSNkxrrtRhFfIYiiog113FqAus1RDjB-T6pdHnGUBXSa7sLEk1T1R09tx_rBzQFZ5_2Qg9IMY0b5Hift3RB3QYHHCHc" alt="Elena" />
                <div>
                  <p className="text-xs text-on-surface-variant">Created by</p>
                  <h3 className="font-bold text-base">Elena Rodriguez</h3>
                </div>
              </div>
              <div className="flex gap-8">
                {stats.map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="text-xl font-black text-primary">{s.v}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-3 h-80">
              <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden group">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4W6HxlGj1IbyCQl2hMePVjol1_huY-FlsBhk-NW6AVmMDCaPqAzJ9rY8uZmlSQkbKNs7ZThSe6UYbjIweEehv6mf-iS7DO4aMvYHnzSewYvHn6UecdZLsft2GhQIvcKQ6RrZPlDl_q57xBkFoldL0mb04c2dvSjuNsSTBZnxnvabpq9U4Vi4QYB5ZdnLSMptauXNdbTuIu8aWbQtCCVSqoTN-KjXWdWl7V1MCyf5o9UpMo-SFBlaItwHub3cKXivW8clo4Sel_m4" alt="Amalfi" />
              </div>
              <div className="col-span-2 rounded-2xl overflow-hidden group">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZwsGsarhzJGR_QaRBgRYlj27kTKODaRFYdiliwMZubZpzy8RzowkWd7zXaTEyqUDgUxSAzZSaVarzvH-I5z6Gug1gZ_rPea77vTS9r3UIkyILDh3N9x8aRA_QeaCYj_m5BuziIr8cnMyEK60VER8fkBFRrTd7qbCS5nipQWFA0iRnJzQqDinxykm6ayoFGGWW4lDEmuTo-RExASffRXNuArT5pi3U8wHCN9qukZAxPnNCgHt-RhV2DOXSLqIHMBb_YrLOOJXK_hA" alt="Venice" />
              </div>
              <div className="col-span-1 rounded-2xl overflow-hidden group">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0NSnBtA0UDWSNOOp9bMREQJHKrmpx7ORGzLzQBadBcYAmGbNgnJEBnYaOOCSBZ1T2aFe0nwIzk7T3NOUq8MK1qfw6aJVDQt4hq3pefZdwADUVpY12oiI_5DWn66UOZElHBCZwcC-CwETx6VR9FAanYCO2w86rpduM7AiUh6b0J42SXLlQxr0K4Y_IQysW7fBZra1zJev3kPCYHA6MqSrkRd3mVQvkTFXxdFnim2wnaQLNvopEssnlOvhr4cEbWOxUmWmsUKtLNf0" alt="Alps" />
              </div>
              <div className="col-span-1 rounded-2xl bg-primary flex flex-col items-center justify-center text-white cursor-pointer hover:bg-primary/80 transition-colors">
                <MdPhotoLibrary className="icon-lg mb-1" />
                <span className="text-xs font-bold">+18 More</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Trip Timeline</h2>
              <div className="relative pl-8 space-y-10 itinerary-line">
                {segments.map((seg) => (
                  <div key={seg.days} className="relative">
                    <span className={`absolute -left-8 top-0 w-4 h-4 rounded-full ring-4 ring-background z-10 ${seg.active ? "bg-primary" : "bg-outline-variant"}`} />
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-base">{seg.days}: {seg.title}</h4>
                        <p className="text-sm text-on-surface-variant">{seg.place}</p>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant italic bg-surface-container-low px-4 py-3 rounded-xl">&quot;A wonderful journey through the best of Europe.&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm lg:sticky lg:top-24">
              <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 className="font-bold text-sm">Trip Route</h3>
                <MdMap className="icon-nav text-primary" />
              </div>
              <div className="h-64 relative overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_bMQ_RGuouZwi1yoBn7bu_i-jGVE4RU1lxV1Q1p9jWnN_ujny5zpZ6oN2sckWNz44hHQ3X2TufWcUnqx7ED6nPLiRfVPLPc0-XzDUvbAD1hTdJtRCo0mVA3d3349BILXi-GaTYedqgBXn5C5ABMSNU16S8dh-6k_H9uOaIG_q25z4FonIAzPhkV-ky04qFGiFJMhj_0Z9lf5o_PXHrDJ3EaOpy9W43R5tUL_GzxEWusrwtsdAaiMEweUnz0pKaLqr36vtqqh6mfU" alt="Map" />
              </div>
              <div className="p-4 space-y-3">
                {[[MdFlightTakeoff, "Total Distance", "1,240 km"],[MdTrain,"Transfers","4 High-speed rails"],[MdStar,"Trip Rating","4.9 · Exceptional"]].map(([Icon, label, val]) => (
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

            {/* CTA */}
            <div className="bg-primary p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-lg font-black mb-1 relative z-10">Like this trip?</h3>
              <p className="text-white/80 text-sm mb-5 relative z-10">Duplicate to your Traveloop workspace and customize your journey.</p>
              <button className="w-full bg-white text-primary py-3 rounded-xl font-black text-sm hover:bg-surface-container-low transition-colors relative z-10">
                Copy to My Trips
              </button>
              <div className="mt-5 pt-4 border-t border-white/20 flex justify-between items-center relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">Share</span>
                <div className="flex gap-3">
                  {[[MdShare,"Share"],[MdMail,"Mail"],[MdLink,"Link"]].map(([Icon,lbl]) => (
                    <button key={lbl} aria-label={lbl} className="hover:text-secondary-fixed transition-colors">
                      <Icon className="icon-btn" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-outline-variant/10 px-8 py-10 flex flex-wrap justify-between items-center gap-4 opacity-60 max-w-[1440px] mx-auto">
        <div className="flex items-center flex-wrap gap-6 text-xs font-medium">
          <span className="font-black text-base text-on-surface">Traveloop</span>
          {["Privacy Policy","Terms of Service","Help Center"].map((l) => <a key={l} href="#" className="hover:text-primary">{l}</a>)}
        </div>
        <p className="text-xs">© 2024 Traveloop Inc.</p>
      </footer>
    </div>
  );
}

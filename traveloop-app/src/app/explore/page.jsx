import Navbar from "@/components/Navbar";
import {
  MdSearch, MdLocationOn, MdStar, MdFavorite, MdFavoriteBorder,
  MdFilterList, MdTune, MdSort, MdHiking, MdBeachAccess, MdMuseum, MdForest, MdMap,
} from "react-icons/md";

const FILTERS = [
  { label: "Category" },
  { label: "Budget" },
  { label: "Duration" },
  { label: "Best For" },
];

const CATEGORIES = [
  { label: "Adventure",    Icon: MdHiking,       active: true },
  { label: "Beach",        Icon: MdBeachAccess,  active: false },
  { label: "Culture",      Icon: MdMuseum,       active: false },
  { label: "Nature",       Icon: MdForest,       active: false },
];

const DESTINATIONS = [
  { city: "Kyoto, Japan",       rating: "4.9", reviews: "2.1k", price: "From $1,200", liked: true,  tall: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbCBq_P9PJxMK6ygp9I-WyhSl1YtvvAgnwp64Xx8G_wQMHmCM4EFav_yzyGtxBsvZJJfnjTCRVdHhlCRjL1HJkYhOxmj-v5VbzE1Ma2tndkW97Q8yTsZ_ybMaIBXvyF6jGTWbLrakj717AsgRITVWPTc12hxvNkxMuR2rQ5Y2sgRJWMoCXcfvEDqFBLnH2by8eJJY-hKelfmgMWDgadt9mZJQmQmS-exVQeF8CGJJzZJvh9HSF_AP6hobFECw6YZ7Et7SQO5CHA54" },
  { city: "Santorini, Greece",  rating: "4.8", reviews: "1.8k", price: "From $2,100", liked: false, tall: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZwsGsarhzJGR_QaRBgRYlj27kTKODaRFYdiliwMZubZpzy8RzowkWd7zXaTEyqUDgUxSAzZSaVarzvH-I5z6Gug1gZ_rPea77vTS9r3UIkyILDh3N9x8aRA_QeaCYj_m5BuziIr8cnMyEK60VER8fkBFRrTd7qbCS5nipQWFA0iRnJzQqDinxykm6ayoFGGWW4lDEmuTo-RExASffRXNuArT5pi3U8wHCN9qukZAxPnNCgHt-RhV2DOXSLqIHMBb_YrLOOJXK_hA" },
  { city: "Patagonia, Chile",   rating: "4.7", reviews: "940",  price: "From $1,800", liked: false, tall: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4W6HxlGj1IbyCQl2hMePVjol1_huY-FlsBhk-NW6AVmMDCaPqAzJ9rY8uZmlSQkbKNs7ZThSe6UYbjIweEehv6mf-iS7DO4aMvYHnzSewYvHn6UecdZLsft2GhQIvcKQ6RrZPlDl_q57xBkFoldL0mb04c2dvSjuNsSTBZnxnvabpq9U4Vi4QYB5ZdnLSMptauXNdbTuIu8aWbQtCCVSqoTN-KjXWdWl7V1MCyf5o9UpMo-SFBlaItwHub3cKXivW8clo4Sel_m4" },
  { city: "Morocco, Africa",    rating: "4.6", reviews: "1.2k", price: "From $800",   liked: true,  tall: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0NSnBtA0UDWSNOOp9bMREQJHKrmpx7ORGzLzQBadBcYAmGbNgnJEBnYaOOCSBZ1T2aFe0nwIzk7T3NOUq8MK1qfw6aJVDQt4hq3pefZdwADUVpY12oiI_5DWn66UOZElHBCZwcC-CwETx6VR9FAanYCO2w86rpduM7AiUh6b0J42SXLlQxr0K4Y_IQysW7fBZra1zJev3kPCYHA6MqSrkRd3mVQvkTFXxdFnim2wnaQLNvopEssnlOvhr4cEbWOxUmWmsUKtLNf0" },
  { city: "New Zealand",        rating: "4.9", reviews: "3.1k", price: "From $2,400", liked: false, tall: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC04eLiG6VZ7BOtwZNtEOGeLs0mpZY7xrhlOqvHYCEFHZwkWtceIuUBTtibnq3dteUbizKYHRizC_ej0hlqVujuhA8QL6JfaQDaV9ryfQJWMA0e7xy5-GcaeH6lGAMdTdjtvB1Kgy1h4A0xoSMoi1mM1E6Wv6p7MaUbMoO9uQGI2I-HOCY9jyG1egn9kyV1Th2R1x5xVGuBY1vsXOUXDpnIZsZQ9wBy0m72XEmpGMpGmR1SRiMoD-GbKuVB6G44ksbG_1k-46hV88o" },
  { city: "Canadian Rockies",   rating: "4.8", reviews: "2.4k", price: "From $1,600", liked: false, tall: true,  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAOhihVmDmR1O30g9XhN8nclA60YzaqMcOSvq7I7gGtcOOWEc1D4jSJGLPzTFnGkSu1xux8Sud3o53d-cfoN-Y3FjMm1kFqLP0mgwz2mWA3vooNmRXGmiBr_FNISCqTeOHEHr22xA13zqnNgQSK8_EsUQ32KCusLewhjaXD7iRULziUvsZWZPDhy-HhnT3YR-JHTkd5ET7HD5yqFk5mhjWA0uK9_L-U-ntUIZbGBmImOs_cPGuYhFXzEgRovngyWubWMhtdgLsUo" },
];

export default function ExplorePage() {
  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="explore" />

      {/* Search Hero */}
      <section className="relative pt-20">
        <div className="h-72 relative overflow-hidden">
          <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMAOhihVmDmR1O30g9XhN8nclA60YzaqMcOSvq7I7gGtcOOWEc1D4jSJGLPzTFnGkSu1xux8Sud3o53d-cfoN-Y3FjMm1kFqLP0mgwz2mWA3vooNmRXGmiBr_FNISCqTeOHEHr22xA13zqnNgQSK8_EsUQ32KCusLewhjaXD7iRULziUvsZWZPDhy-HhnT3YR-JHTkd5ET7HD5yqFk5mhjWA0uK9_L-U-ntUIZbGBmImOs_cPGuYhFXzEgRovngyWubWMhtdgLsUo" alt="Explore hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-5">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight max-w-xl text-balance">
              Discover Your Next Adventure
            </h1>
            {/* Search bar */}
            <div className="flex w-full max-w-xl gap-2">
              <div className="relative flex-1">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 icon-nav text-on-surface-variant" />
                <input
                  placeholder="Search destinations, activities…"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/95 border border-outline-variant/20 text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-lg"
                  type="search"
                />
              </div>
              <button className="bg-primary text-white px-5 py-3.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shrink-0 flex items-center gap-1.5">
                <MdSearch className="icon-btn" /> Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm lg:sticky lg:top-24 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Filters</h3>
              <MdTune className="icon-nav text-on-surface-variant" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-outline">Category</h4>
              {CATEGORIES.map(({ label, Icon, active }) => (
                <button
                  key={label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? "bg-primary text-white font-bold" : "text-on-surface-variant hover:bg-surface-container"}`}
                >
                  <Icon className="icon-sm shrink-0" /> {label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-outline">Budget Range</h4>
              <div className="space-y-1">
                {["< $500", "$500–1,500", "$1,500–3,000", "$3,000+"].map((b) => (
                  <label key={b} className="flex items-center gap-2.5 cursor-pointer py-1.5">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-on-surface-variant">{b}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <MdFilterList className="icon-btn" /> Apply Filters
            </button>
          </div>
        </aside>

        {/* ── Grid ── */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold">Adventure Destinations</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">Showing {DESTINATIONS.length} results</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low border border-outline-variant/20 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors">
              <MdSort className="icon-sm" /> Sort by: Rating
            </button>
          </div>

          {/* Masonry */}
          <div className="masonry-grid">
            {DESTINATIONS.map((d) => (
              <div key={d.city} className="masonry-item group cursor-pointer">
                <div className={`relative rounded-2xl overflow-hidden ${d.tall ? "h-72" : "h-52"}`}>
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={d.img} alt={d.city} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <button
                    aria-label="Like"
                    className="absolute top-3 right-3 p-2 bg-black/30 backdrop-blur rounded-full hover:bg-black/50 transition-colors"
                  >
                    {d.liked
                      ? <MdFavorite className="icon-sm text-red-400" />
                      : <MdFavoriteBorder className="icon-sm text-white" />
                    }
                  </button>
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-center gap-1 text-xs font-bold mb-1">
                      <MdStar className="icon-xs text-yellow-400" /> {d.rating}
                      <span className="text-white/60 font-normal">({d.reviews})</span>
                    </div>
                    <h3 className="font-bold text-base leading-tight">{d.city}</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <MdMap className="icon-xs" /> {d.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 border border-outline-variant/40 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors">
              Load More Destinations
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

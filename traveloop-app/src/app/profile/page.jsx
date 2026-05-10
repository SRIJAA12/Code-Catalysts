import Navbar from "@/components/Navbar";
import {
  MdPerson, MdSecurity, MdNotifications, MdPayments, MdLanguage,
  MdPhotoLibrary, MdStar, MdMap, MdPublic, MdCalendarMonth,
  MdEdit, MdDarkMode, MdTranslate, MdCurrencyExchange, MdAdd, MdLocationOn,
} from "react-icons/md";

const SETTINGS_NAV = [
  { Icon: MdPerson,        label: "Profile Details",     active: true },
  { Icon: MdSecurity,      label: "Privacy & Safety",    active: false },
  { Icon: MdNotifications, label: "Notification Prefs",  active: false },
  { Icon: MdPayments,      label: "Billing & Payments",  active: false },
  { Icon: MdLanguage,      label: "Language & Region",   active: false },
];

const STATS = [
  { Icon: MdPublic,       value: "24",   label: "Countries", bg: "bg-primary text-white" },
  { Icon: MdMap,          value: "142",  label: "Cities",    bg: "bg-secondary-container text-on-secondary-container" },
  { Icon: MdPhotoLibrary, value: "1.2k", label: "Shared",    bg: "bg-tertiary-fixed text-on-tertiary-fixed" },
  { Icon: MdStar,         value: "4.9",  label: "Rating",    bg: "bg-inverse-surface text-inverse-on-surface" },
];

const SAVED = [
  { city: "Amsterdam, NL", places: "8 Places", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEH4mNABQgpSMGXGDtHtfQa6JTL-6QQgMHs7Ymjg42XfZETtRDyIUwKdd7YLryGWwKrZj2OwVbrCYFFlv1O8nGiKgpNIlW-qfJ0PjxAL0T1vfc7uJQAlci-wRXvHLZvmEs0XdcBcPm9FFkHz7xzZYyL-iGEKAyZRyappP03iHHX3EEeybhAsYbgvyWvu0uX6Y1HglOyS6LGi9HEQ6QxZ0mOi_f4bkxOAcXxzHsmYsgZJoHZa4bRSIEoyJ8jmkMu7Dmnq5BzPKBeqc" },
  { city: "Reykjavik, IS", places: "12 Places", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMHymNYjCCYPclHsnzDiuhj27b1sfrv0LokYu9uQfca9_QOXTu6fvTR2FPuojL063JeI-eLxPUJT45eKQpLDY-lZr4rIM3MYVv1MD28c9zfN__R4HdhfybAkfrT-kuPbIaIiWQuml_aM8wEf90515-rB8-udaq35juTdoLRfKq28uuYt4WsL7wHanTym4j-DdeMKX0x4Jle8OiAreinFRj2AM-zEHZlLkjX3xcJhYHUXJRXeoB7YiBl7TUy9PrNABY0yX-B5SJ4yI" },
  { city: "Venice, IT",    places: "5 Places",  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNfE9om0k7PasZHmCLbI7nriYvdcvUHw4CUg2LMdSuwjlVQl8_jD_kvMoFKqMcN-heEQ8G3qx2R2aylglVoSY5ZzqANHw63kl3BduE7bEOMvRx1P4grjOsfhl59LXdZ5BPcD72fN-iT2NhmeVkWvR0DbyWSkLJJ7ItwqiCVMhQtN-VFA_46Pp9a-deJoxcRrohF89BUwpsd1MNgu83LRGzoRr3hImsNRmwJslOSJ8udTu2nc8n587ny92Cz-EV5GfsGrqbPxQYKXA" },
];

export default function UserProfilePage() {
  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="home" />

      <div className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-20 flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24 bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm space-y-1">
            <h2 className="text-xs font-bold uppercase tracking-widest text-outline mb-4 px-2">Account Settings</h2>
            {SETTINGS_NAV.map(({ Icon, label, active }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:bg-surface-container"}`}
              >
                <Icon className="icon-nav shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}

            <div className="mt-6 pt-4 border-t border-outline-variant/10">
              <div className="bg-primary/5 border border-primary/10 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Storage</span>
                  <span className="text-[10px] font-bold text-primary">85%</span>
                </div>
                <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-primary rounded-full" />
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2">12.4 GB of 15 GB used</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1 space-y-8 min-w-0">
          {/* Profile Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-8 bg-white border border-outline-variant/20 rounded-2xl p-7 shadow-sm relative">
              <button className="absolute top-5 right-5 p-2 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors">
                <MdEdit className="icon-nav text-primary" />
              </button>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-surface-container shadow-sm">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuxy7uK4bzZJYzZoo9-qJMip2yfsEkS05Zw2fmd6kbU3PLnsXiaC08FX6VEoaO33EzOGzrcjcVSd6NAwBKTOo-co29pyjvnlUjYZkwIAXbfbKdaCnikQVV_J4L1zPsLn-zG3eL9fK11CLHvamdYiKqXqAMyqxp1jP_CxLiLzVRTGLY9lSaNhcZeehf6e8cFmvmI0UJb3MW0XplQ1y5mxuQxcB-l2LFdNDjK90cHAEqq1J0BF0wIpgFFQdnjmVAPyvuE3i9NhS3tew" alt="Julian" />
                  </div>
                  <span className="absolute -bottom-2 -right-2 bg-secondary text-on-secondary text-[9px] font-bold px-2 py-0.5 rounded-full">Explorer</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Julian Martinez</h1>
                  <p className="text-sm text-on-surface-variant mt-1 max-w-md leading-relaxed">Digital nomad and amateur photographer currently exploring hidden gems of Central Europe.</p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {[[MdLocationOn, "Barcelona, ES"],[MdCalendarMonth, "Joined Jan 2022"]].map(([Icon, label]) => (
                      <div key={label} className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-xl text-xs font-semibold">
                        <Icon className="icon-xs text-primary" />{label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-3">
              {STATS.map(({ Icon, value, label, bg }) => (
                <div key={label} className={`${bg} rounded-2xl p-4 flex flex-col justify-between min-h-[100px]`}>
                  <Icon className="icon-stat" />
                  <div>
                    <div className="text-2xl font-black">{value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map & Preferences */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-8 bg-white border border-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between">
                <h3 className="font-bold text-sm">World Footprint</h3>
                <div className="flex gap-3 text-xs font-semibold text-on-surface-variant">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Visited</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-outline-variant inline-block" /> Wishlist</span>
                </div>
              </div>
              <div className="h-64 relative">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArPO9ltIdT0UaflpKPruW0szGr5LXtc9r3NAT_XOsmnavLPy9QYpQiOD47WTzCELRsItdQL58eBRjR_qchXUZQEakxP18_OcpOPGqFCGsiRyIx_1oR5hFX6NRkP-tRfezdJESqGK-x_5ETXXta1ysdFnqZQLaafdlajEYnM5Cq3R--XXY_IJbxZxRrAf6lEavhaq4bjd3qDfuGxqVSSH8TuvdRbP20VLAXMkNOScPKJFCouRRoxY77vnLYJGDBJ3-FAzZttcw82EA" alt="World map" />
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm space-y-5">
              <h3 className="font-bold text-sm">Quick Preferences</h3>
              {[
                { Icon: MdDarkMode,        label: "Appearance",   val: null,    toggle: true },
                { Icon: MdTranslate,       label: "Language",     val: "English (US)" },
                { Icon: MdCurrencyExchange,label: "Currency",     val: "USD ($)" },
              ].map(({ Icon, label, val, toggle }) => (
                <div key={label} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-surface-container rounded-lg flex items-center justify-center">
                      <Icon className="icon-sm text-primary" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  {toggle
                    ? <button className="w-11 h-6 bg-primary rounded-full relative transition-all flex items-center justify-end px-0.5"><div className="w-5 h-5 bg-white rounded-full shadow" /></button>
                    : <span className="text-xs font-bold text-on-surface-variant">{val}</span>
                  }
                </div>
              ))}

              <div className="border-t border-outline-variant/10 pt-4">
                <h3 className="font-bold text-sm mb-3">Active Trip</h3>
                <div className="relative rounded-xl overflow-hidden aspect-video group cursor-pointer">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPDxlBaxdMt7zLk9FlCwFVRuNFFOMSiO1MEcSKCLPvah2ynd7QWkLSzM0kiuU_nTClpQ4QXu2I7eoHlIF8Kjitt8pv_SMoCLvzdcArGZ0ZEJjZF8TZAHalzK2iRAQg9jbFQcAPnUXlmR4IEN1nGWN7BYy0nAag3woVpYzca4YrBBLuz2J00OygysJxkHbqzPMy2Zd1poEpNceph2vNTlJA-ol_9ZfhpvnuwZGvv64IJlnaIPIKTlEjFvTFPruUX9XXefsCGZb2xJw" alt="Trip" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 p-3 flex flex-col justify-end">
                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">In 4 days</p>
                    <h4 className="text-white text-sm font-bold">Chamonix Adventure</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Destinations */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold tracking-tight">Saved Destinations</h3>
              <button className="text-primary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {SAVED.map(({ city, places, img }) => (
                <div key={city} className="group cursor-pointer">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2 shadow-sm border border-outline-variant/10">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={img} alt={city} />
                  </div>
                  <h4 className="font-bold text-sm truncate">{city}</h4>
                  <p className="text-xs text-on-surface-variant">{places}</p>
                </div>
              ))}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-2 border-2 border-dashed border-outline-variant/30 hover:border-primary/50 bg-surface-container-low flex flex-col items-center justify-center hover:bg-primary/5 transition-all">
                  <MdAdd className="text-3xl text-outline-variant group-hover:text-primary transition-colors" />
                  <span className="text-xs font-bold text-outline-variant group-hover:text-primary mt-1 transition-colors">New Collection</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

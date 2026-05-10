"use client";
import Link from "next/link";
import { useState } from "react";
import {
  MdNotifications,
  MdHome,
  MdLuggage,
  MdExplore,
  MdPayments,
  MdMenu,
  MdClose,
} from "react-icons/md";

export default function Navbar({ activePage = "home" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home",     href: "/dashboard", key: "home",    Icon: MdHome },
    { label: "My Trips", href: "/trips",     key: "trips",   Icon: MdLuggage },
    { label: "Explore",  href: "/explore",   key: "explore", Icon: MdExplore },
    { label: "Budget",   href: "/budget",    key: "budget",  Icon: MdPayments },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-2xl border-b border-outline-variant/20 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/dashboard"
          className="text-xl font-black tracking-tight text-primary shrink-0"
        >
          Traveloop
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 flex-1 ml-4">
          {navLinks.map(({ label, href, key }) => (
            <Link
              key={key}
              href={href}
              className={
                activePage === key
                  ? "px-4 py-2 rounded-xl text-sm font-semibold text-primary bg-primary/8 transition-all"
                  : "px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
              }
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all"
          >
            <MdNotifications className="icon-nav" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-surface-container-high ml-1 shrink-0">
            <img
              alt="User profile"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARs4Ze3s-HmHduLaa9r72jvXUG2y_aCxvVwSvgLemJDzMTNish93tfF1Muj9H6D9OvCj_JVpMk4fILFSLip_Or3jp5_19jCwpoW72PeuE2FrJ1XwJubyuTIlX2iTJ9tiG6MTgMmEryFaNAG-0adPhNcZrweJxN5lNBgbx3n96UCk8Lu-ayssdeAPEX7KNjJzT_e64GeHAPQ_yiakyZPy-zElleKpWAgjpaS5GB9hpU96WHs6vvtI1es2uDGrMf3m8PxfnppRsC21M"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Menu"
            className="md:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <MdClose className="icon-nav" /> : <MdMenu className="icon-nav" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/20 px-6 py-4 space-y-1">
          {navLinks.map(({ label, href, key, Icon }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={
                activePage === key
                  ? "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-primary bg-primary/8"
                  : "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container"
              }
            >
              <Icon className="icon-nav" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

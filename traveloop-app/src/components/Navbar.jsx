"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  MdNotifications,
  MdHome,
  MdLuggage,
  MdExplore,
  MdPayments,
  MdMenu,
  MdClose,
  MdAutoAwesome,
  MdPerson,
  MdLogout,
  MdSettings,
} from "react-icons/md";

export default function Navbar({ activePage = "home" }) {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [avatarOpen,  setAvatarOpen]  = useState(false);
  const { user, signOut }             = useAuth();

  const navLinks = [
    { label: "Home",      href: "/dashboard", key: "home",      Icon: MdHome },
    { label: "My Trips",  href: "/trips",     key: "trips",     Icon: MdLuggage },
    { label: "Explore",   href: "/explore",   key: "explore",   Icon: MdExplore },
    { label: "Budget",    href: "/budget",    key: "budget",    Icon: MdPayments },
    { label: "Assistant", href: "/assistant", key: "assistant", Icon: MdAutoAwesome },
  ];

  // Avatar initials fallback
  const displayName  = user?.displayName || user?.email?.split("@")[0] || "User";
  const initials     = displayName.slice(0, 2).toUpperCase();
  const photoURL     = user?.photoURL;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-2xl border-b border-outline-variant/20 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/dashboard" className="text-xl font-black tracking-tight text-primary shrink-0">
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

          {/* Avatar + Dropdown */}
          <div className="relative ml-1">
            <button
              onClick={() => setAvatarOpen((v) => !v)}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-surface-container-high shrink-0 flex items-center justify-center bg-primary/10"
              aria-label="Account menu"
            >
              {photoURL ? (
                <img alt="User profile" src={photoURL} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-black text-primary">{initials}</span>
              )}
            </button>

            {/* Dropdown */}
            {avatarOpen && (
              <>
                {/* Backdrop */}
                <div className="fixed inset-0 z-10" onClick={() => setAvatarOpen(false)} />
                <div className="absolute right-0 top-11 z-20 w-52 bg-white border border-outline-variant/20 rounded-2xl shadow-xl py-2 overflow-hidden">
                  <div className="px-4 py-3 border-b border-outline-variant/10">
                    <p className="text-sm font-bold text-on-surface truncate">{displayName}</p>
                    <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                  >
                    <MdPerson className="icon-sm" /> Profile
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                  >
                    <MdSettings className="icon-sm" /> Admin
                  </Link>
                  <button
                    onClick={() => { setAvatarOpen(false); signOut(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-red-50 transition-colors"
                  >
                    <MdLogout className="icon-sm" /> Sign out
                  </button>
                </div>
              </>
            )}
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
          <button
            onClick={() => { setMobileOpen(false); signOut(); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error hover:bg-red-50 transition-colors"
          >
            <MdLogout className="icon-nav" /> Sign out
          </button>
        </div>
      )}
    </header>
  );
}

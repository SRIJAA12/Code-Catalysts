"use client";
// src/context/AuthContext.jsx
// Global auth state — wraps entire app, provides user/loading/signOut
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthChange, signOut } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const router                = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe; // cleanup listener on unmount
  }, []);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — throws if used outside <AuthProvider> */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

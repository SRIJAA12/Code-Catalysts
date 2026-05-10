"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MdTravelExplore,
  MdMail,
  MdLock,
  MdPerson,
  MdVisibility,
  MdVisibilityOff,
  MdExplore,
  MdFlightTakeoff,
  MdMap,
  MdBeachAccess,
  MdArrowForward,
  MdCheckCircle,
} from "react-icons/md";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  resetPassword,
} from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

// ── Small helpers ───────────────────────────────────────────────

function Spinner() {
  return (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
  );
}

function ErrorBanner({ msg }) {
  if (!msg) return null;
  return (
    <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
      <span className="mt-0.5 shrink-0">⚠</span>
      <span>{msg}</span>
    </div>
  );
}

function SuccessBanner({ msg }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium">
      <MdCheckCircle className="shrink-0" />
      <span>{msg}</span>
    </div>
  );
}

// ── Firebase error messages ─────────────────────────────────────

function parseFirebaseError(code) {
  const map = {
    "auth/user-not-found":       "No account found with this email.",
    "auth/wrong-password":       "Incorrect password. Please try again.",
    "auth/invalid-credential":   "Invalid email or password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password":        "Password must be at least 6 characters.",
    "auth/invalid-email":        "Please enter a valid email address.",
    "auth/too-many-requests":    "Too many attempts. Please try again later.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Please check your connection.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

// ── Main Page ───────────────────────────────────────────────────

export default function LoginPage() {
  const router         = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Mode: "login" | "signup" | "reset"
  const [mode, setMode]           = useState("login");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

  // Form fields
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");

  // Already logged in → go to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, authLoading, router]);

  function resetForm() {
    setError("");
    setSuccess("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
  }

  function switchMode(next) {
    resetForm();
    setMode(next);
  }

  // ── Submit handlers ───────────────────────────────────────────

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
        router.replace("/dashboard");
      } else if (mode === "signup") {
        await signUpWithEmail(email, password, name.trim() || undefined);
        router.replace("/dashboard");
      } else if (mode === "reset") {
        await resetPassword(email);
        setSuccess("Password reset email sent! Check your inbox.");
      }
    } catch (err) {
      setError(parseFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      router.replace("/dashboard");
    } catch (err) {
      setError(parseFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  // Auth still initialising — show full-page spinner
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── UI ────────────────────────────────────────────────────────

  const isLogin  = mode === "login";
  const isSignup = mode === "signup";
  const isReset  = mode === "reset";

  return (
    <main className="min-h-screen flex w-full bg-surface overflow-hidden">
      {/* ── LEFT: Visual Panel ── */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-start justify-end p-14 bg-primary-container">
        {/* Background hero image */}
        <img
          alt="Amalfi Coast travel scenery"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7ArApE5dOlw8KFbBJPx93fS5jzDyuCoL7c42q5rgGvUAcSvRy6E8vZQwb_Gpe4JIHY15bPG5FTHx6jNPK7U1fET9Tt8BH4slWKwYR8_e-WV9bFdLZjXLkFa6qQss3KFkXD7WYPmgZgtAbue8Hrn3RrkqEmUYz3Y6AUZ4i509RjXWudmaIX_DYBrHXrz2RD2968YytgtbZeMS8CppcGsPrlsR4gMfmfjD9LvORJyfZs0-5Xy4jdfi6_nd99z4zfq92axmv-VR-rmw"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-black tracking-tight text-white leading-[1.1] mb-5">
            Plan Smarter.<br />Travel Better.
          </h1>
          <p className="text-lg text-white/85 font-normal leading-relaxed mb-12 max-w-sm">
            Join over 500,000 travelers using Traveloop to craft seamless
            itineraries and unforgettable memories.
          </p>

          {/* Floating Info Cards */}
          <div className="relative h-52 w-full">
            {/* Card: Santorini */}
            <div className="absolute top-0 left-0 glass-card px-4 py-3 rounded-2xl apple-shadow w-52 rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-primary/15 rounded-lg flex items-center justify-center">
                  <MdExplore className="text-primary icon-sm" />
                </div>
                <span className="text-sm font-bold text-on-surface">Santorini, GR</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[65%] rounded-full" />
              </div>
              <span className="text-[10px] text-outline mt-1.5 block font-medium">Itinerary 65% Complete</span>
            </div>

            {/* Card: Paris Flight */}
            <div className="absolute bottom-0 right-8 glass-card px-4 py-3 rounded-2xl apple-shadow w-56 rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all duration-500 delay-75 cursor-default">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MdFlightTakeoff className="text-orange-600 icon-sm" />
                </div>
                <span className="text-sm font-bold text-on-surface">Paris Flight</span>
              </div>
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-semibold">
                <span>LHR</span>
                <MdArrowForward className="icon-xs text-outline" />
                <span>CDG</span>
              </div>
              <span className="text-[10px] text-primary font-bold mt-1.5 block">Confirmed · Terminal 5</span>
            </div>

            {/* Pill chips */}
            <div className="absolute top-[45%] left-[36%] glass-card px-3 py-1.5 rounded-full apple-shadow flex items-center gap-2">
              <MdMap className="text-primary icon-xs" />
              <span className="text-xs font-bold text-on-surface">Tokyo</span>
            </div>
            <div className="absolute top-[15%] right-0 glass-card px-3 py-1.5 rounded-full apple-shadow flex items-center gap-2">
              <MdBeachAccess className="text-secondary icon-xs" />
              <span className="text-xs font-bold text-on-surface">Bali</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── RIGHT: Auth Form ── */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 xl:p-16 bg-surface-bright">
        <div className="w-full max-w-[420px]">
          {/* Brand */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
              <MdTravelExplore className="text-white text-xl" />
            </div>
            <span className="text-xl font-black tracking-tight text-on-surface">Traveloop</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            {isLogin && (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Welcome back</h2>
                <p className="text-sm text-on-surface-variant">Please enter your details to sign in.</p>
              </>
            )}
            {isSignup && (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Create account</h2>
                <p className="text-sm text-on-surface-variant">Start planning your next adventure today.</p>
              </>
            )}
            {isReset && (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Reset password</h2>
                <p className="text-sm text-on-surface-variant">Enter your email and we&apos;ll send you a reset link.</p>
              </>
            )}
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleEmailSubmit}>
            {/* Error / Success */}
            <ErrorBanner msg={error} />
            <SuccessBanner msg={success} />

            {/* Name — signup only */}
            {isSignup && (
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-on-surface-variant block">
                  Full name
                </label>
                <div className="relative focus-glow rounded-xl">
                  <MdPerson className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline icon-sm pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Alex Johnson"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline/50 border border-outline-variant/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-on-surface-variant block">
                Email address
              </label>
              <div className="relative focus-glow rounded-xl">
                <MdMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline icon-sm pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline/50 border border-outline-variant/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Password — not shown on reset */}
            {!isReset && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-on-surface-variant">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => switchMode("reset")}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative focus-glow rounded-xl">
                  <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline icon-sm pointer-events-none" />
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-11 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline/50 border border-outline-variant/30 focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <MdVisibilityOff className="icon-sm" /> : <MdVisibility className="icon-sm" />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password — signup only */}
            {isSignup && (
              <div className="space-y-1.5">
                <label htmlFor="confirm" className="text-sm font-semibold text-on-surface-variant block">
                  Confirm password
                </label>
                <div className="relative focus-glow rounded-xl">
                  <MdLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline icon-sm pointer-events-none" />
                  <input
                    id="confirm"
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-outline/50 border border-outline-variant/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <Spinner />
              ) : isLogin ? (
                "Sign in to Traveloop"
              ) : isSignup ? (
                "Create my account"
              ) : (
                "Send reset link"
              )}
            </button>

            {/* Back to login from reset */}
            {isReset && (
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="w-full py-3 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
              >
                ← Back to sign in
              </button>
            )}

            {/* Divider — not on reset */}
            {!isReset && (
              <>
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant/30" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-surface-bright text-xs text-outline font-medium">Or continue with</span>
                  </div>
                </div>

                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-5 border border-outline-variant/40 rounded-xl text-sm font-semibold text-on-surface bg-white hover:bg-surface-container-low transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {/* Google SVG mark */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  {isLogin ? "Sign in with Google" : "Sign up with Google"}
                </button>
              </>
            )}
          </form>

          {/* Mode switch links */}
          <p className="mt-8 text-center text-sm text-on-surface-variant">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-bold text-primary hover:underline"
                >
                  Sign up for free
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-bold text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          {/* Footer links */}
          <div className="mt-10 flex items-center justify-center gap-5 flex-wrap">
            {["Privacy Policy", "Terms of Service", "Help Center"].map((l) => (
              <a key={l} href="#" className="text-[11px] font-bold text-outline/60 uppercase tracking-widest hover:text-primary transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
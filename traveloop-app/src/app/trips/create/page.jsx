"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  MdSave, MdArrowForward, MdArrowBack,
  MdSavings, MdHotel, MdDiamond,
  MdHiking, MdMuseum, MdRestaurant, MdForest,
  MdCheck, MdPlace, MdCalendarToday, MdAccountBalanceWallet,
  MdImage,
} from "react-icons/md";

const BUDGETS = [
  { name: "Budget",   Icon: MdSavings, price: "< $100/day",   desc: "Hostels, street food, public transport",          value: "budget"   },
  { name: "Standard", Icon: MdHotel,   price: "$100–300/day",  desc: "Mid-range hotels, local dining, mix of transport", value: "standard" },
  { name: "Luxury",   Icon: MdDiamond, price: "$300+/day",     desc: "5-star hotels, fine dining, private transfers",    value: "luxury"   },
];

const INTEREST_OPTIONS = [
  { label: "Adventure",  Icon: MdHiking,      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDopBjGRJp3r-DGG9pX_rJa4Iz2uNr3lZSYRkCBOhJr5tqkzgBfNfTL2IhS0M6TOxBDLiEO7tl_0n-beTMkqEr33YbVkAo7XA2RMeGZHFCrFWoAuqoKMzNT8YCH_3W2WvBPOPJstR0zqzB8KaOmV-bfckhMg_xPwtMJRR2n0LUX0FNXpQ6aSAqeT6CBSM5wBwEXjvN-DhNTBBmfk2DaWA7qJYA1VCY5o9r0LJD4oJVPHB0R9iLNrK-KBTjj9cHHBw5N16Y1A9w" },
  { label: "Culture",    Icon: MdMuseum,       img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxCP7bXd537HN8HJJ_5Sl2cSSstH_Dm_pn3QB8Fdt8KRmq-MHZzbUxDTBMzkBhm77-aLTtiG-8ywtiq07rKcFPpVgMN_GD6_7HsU1xIYpUJsXyJ1Mg-ASLffTIc_t3IGUgApeyotRicWuuRtvp8HMYJqUDPjem_7kyhs27j0fRC0LkeEoG-GpOqix50Q01eE0txKbCIpZH9H-ZNYIrJkqaQ8BRz9FdFYx8txKDvNaC7ZzFlxw8_9Ztz1u2sgoMuxCR6iSvdaJacY" },
  { label: "Gastronomy", Icon: MdRestaurant,   img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbCBq_P9PJxMK6ygp9I-WyhSl1YtvvAgnwp64Xx8G_wQMHmCM4EFav_yzyGtxBsvZJJfnjTCRVdHhlCRjL1HJkYhOxmj-v5VbzE1Ma2tndkW97Q8yTsZ_ybMaIBXvyF6jGTWbLrakj717AsgRITVWPTc12hxvNkxMuR2rQ5Y2sgRJWMoCXcfvEDqFBLnH2by8eJJY-hKelfmgMWDgadt9mZJQmQmS-exVQeF8CGJJzZJvh9HSF_AP6hobFECw6YZ7Et7SQO5CHA54" },
  { label: "Nature",     Icon: MdForest,       img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMAOhihVmDmR1O30g9XhN8nclA60YzaqMcOSvq7I7gGtcOOWEc1D4jSJGLPzTFnGkSu1xux8Sud3o53d-cfoN-Y3FjMm1kFqLP0mgwz2mWA3vooNmRXGmiBr_FNISCqTeOHEHr22xA13zqnNgQSK8_EsUQ32KCusLewhjaXD7iRULziUvsZWZPDhy-HhnT3YR-JHTkd5ET7HD5yqFk5mhjWA0uK9_L-U-ntUIZbGBmImOs_cPGuYhFXzEgRovngyWubWMhtdgLsUo" },
];

const STEPS = [
  { step: 1, label: "Basic Details" },
  { step: 2, label: "Travel Style" },
  { step: 3, label: "Dates & Budget" },
  { step: 4, label: "Review" },
];

function CreateTripContent() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({
    title:       "",
    destination: "",
    coverImage:  "",
    budgetStyle: "standard",
    interests:   [],
    startDate:   "",
    endDate:     "",
    budget:      "",
  });

  function update(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  function toggleInterest(label) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(label)
        ? f.interests.filter((i) => i !== label)
        : [...f.interests, label],
    }));
  }

  function canProceed() {
    if (step === 1) return form.title.trim().length > 0;
    if (step === 2) return true;
    if (step === 3) return true;
    return true;
  }

  async function handleSubmit() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/trips", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email:       user.email,
          name:        user.displayName,
          ...form,
          status: form.startDate && new Date(form.startDate) > new Date() ? "upcoming" : "draft",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create trip");
      router.push(`/trips`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveDraft() {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/trips", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.uid, email: user.email, name: user.displayName, ...form, status: "draft" }),
      });
      router.push("/trips");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  const progress = Math.round((step / 4) * 100);

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />

      {/* Save Draft */}
      <div className="fixed top-16 right-6 z-40">
        <button
          onClick={saveDraft}
          disabled={saving || !form.title}
          className="flex items-center gap-2 bg-white/90 backdrop-blur border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm font-bold text-on-surface shadow-sm hover:shadow-md transition-all mt-2 disabled:opacity-50"
        >
          <MdSave className="icon-btn text-on-surface-variant" /> Save Draft
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-32 flex gap-8">
        {/* Sidebar progress */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 bg-white border border-outline-variant/20 rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Progress</h3>
            {STEPS.map((s) => (
              <div
                key={s.step}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${step === s.step ? "bg-primary/8 text-primary font-bold" : step > s.step ? "text-on-surface-variant" : "text-outline"}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step === s.step ? "bg-primary text-white" : step > s.step ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant"}`}>
                  {step > s.step ? <MdCheck className="text-sm" /> : s.step}
                </div>
                <span className="text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Form */}
        <section className="flex-1 space-y-10 min-w-0">
          {/* Step indicator */}
          <div className="space-y-2">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className={`flex-1 h-1.5 rounded-full transition-all ${n <= step ? "bg-primary" : "bg-surface-container-high"}`} />
              ))}
            </div>
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
              <span>Step {step} of 4</span>
              <span className="text-primary">{progress}% Complete</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
              ⚠ {error}
            </div>
          )}

          {/* ── Step 1: Basic Details ── */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Create your trip</h1>
                <p className="text-sm text-on-surface-variant">Tell us the basics to get started.</p>
              </div>

              <div className="space-y-5 max-w-xl">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
                    <MdPlace className="icon-sm text-primary" /> Trip Name *
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="e.g. Summer in Kyoto"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/30 focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
                    <MdPlace className="icon-sm text-primary" /> Destination
                  </label>
                  <input
                    type="text"
                    value={form.destination}
                    onChange={(e) => update("destination", e.target.value)}
                    placeholder="e.g. Tokyo, Japan"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/30 focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
                    <MdImage className="icon-sm text-primary" /> Cover Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={form.coverImage}
                    onChange={(e) => update("coverImage", e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/30 focus:border-primary transition-colors"
                  />
                  {form.coverImage && (
                    <img src={form.coverImage} alt="Cover preview" className="mt-2 h-32 w-full object-cover rounded-xl" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Travel Style ── */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Tell us your style</h1>
                <p className="text-sm text-on-surface-variant">We&apos;ll tailor your itinerary recommendations to match.</p>
              </div>

              {/* Budget Cards */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold">Travel Budget</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {BUDGETS.map((b) => (
                    <div
                      key={b.value}
                      onClick={() => update("budgetStyle", b.value)}
                      className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${form.budgetStyle === b.value ? "border-primary bg-primary text-white shadow-lg shadow-primary/20" : "border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5"}`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${form.budgetStyle === b.value ? "bg-white/20" : "bg-primary/10"}`}>
                          <b.Icon className={`icon-stat ${form.budgetStyle === b.value ? "text-white" : "text-primary"}`} />
                        </div>
                        <div>
                          <h3 className="font-bold">{b.name}</h3>
                          <p className={`text-xs font-bold ${form.budgetStyle === b.value ? "text-white/80" : "text-primary"}`}>{b.price}</p>
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed ${form.budgetStyle === b.value ? "text-white/80" : "text-on-surface-variant"}`}>{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold">Your Interests</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {INTEREST_OPTIONS.map((item) => {
                    const selected = form.interests.includes(item.label);
                    return (
                      <div
                        key={item.label}
                        onClick={() => toggleInterest(item.label)}
                        className={`relative h-36 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${selected ? "ring-2 ring-primary shadow-md" : "hover:ring-1 hover:ring-primary/40"}`}
                      >
                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} alt={item.label} />
                        <div className={`absolute inset-0 ${selected ? "bg-primary/40" : "bg-black/30 group-hover:bg-black/15"} transition-all`} />
                        {selected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <MdCheck className="text-white text-xs" />
                          </div>
                        )}
                        <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white">
                          <item.Icon className="icon-xs" />
                          <span className="text-xs font-bold">{item.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 3: Dates & Budget ── */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Dates & Budget</h1>
                <p className="text-sm text-on-surface-variant">When are you going and what&apos;s your total budget?</p>
              </div>

              <div className="space-y-5 max-w-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
                      <MdCalendarToday className="icon-sm text-primary" /> Start Date
                    </label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => update("startDate", e.target.value)}
                      className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
                      <MdCalendarToday className="icon-sm text-primary" /> End Date
                    </label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => update("endDate", e.target.value)}
                      min={form.startDate}
                      className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-on-surface-variant flex items-center gap-1.5">
                    <MdAccountBalanceWallet className="icon-sm text-primary" /> Total Budget ($)
                  </label>
                  <input
                    type="number"
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    placeholder="e.g. 2500"
                    min="0"
                    className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Review ── */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">Review your trip</h1>
                <p className="text-sm text-on-surface-variant">Everything look good? Hit create to save your trip.</p>
              </div>

              <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 shadow-sm space-y-5 max-w-xl">
                <div className="flex gap-4">
                  {form.coverImage && (
                    <img src={form.coverImage} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  )}
                  <div>
                    <h2 className="text-xl font-black">{form.title || "Untitled Trip"}</h2>
                    <p className="text-sm text-on-surface-variant">{form.destination || "Destination TBD"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-outline font-bold uppercase tracking-wide">Style</p><p className="font-semibold capitalize">{form.budgetStyle}</p></div>
                  <div><p className="text-xs text-outline font-bold uppercase tracking-wide">Budget</p><p className="font-semibold">{form.budget ? `$${parseInt(form.budget).toLocaleString()}` : "TBD"}</p></div>
                  <div><p className="text-xs text-outline font-bold uppercase tracking-wide">Start</p><p className="font-semibold">{form.startDate || "TBD"}</p></div>
                  <div><p className="text-xs text-outline font-bold uppercase tracking-wide">End</p><p className="font-semibold">{form.endDate || "TBD"}</p></div>
                  {form.interests.length > 0 && (
                    <div className="col-span-2"><p className="text-xs text-outline font-bold uppercase tracking-wide mb-1">Interests</p><div className="flex gap-1.5 flex-wrap">{form.interests.map((i) => <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold">{i}</span>)}</div></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-2xl border-t border-outline-variant/15 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant/40 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors disabled:opacity-40"
          >
            <MdArrowBack className="icon-btn" /> Back
          </button>
          <div className="flex gap-3">
            {step < 4 ? (
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all disabled:opacity-50 disabled:translate-y-0"
              >
                Next <MdArrowForward className="icon-btn" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:-translate-y-0.5 hover:shadow-md transition-all disabled:opacity-70"
              >
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <MdCheck className="icon-btn" />}
                Create Trip
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CreateTripPage() {
  return (
    <ProtectedRoute>
      <CreateTripContent />
    </ProtectedRoute>
  );
}

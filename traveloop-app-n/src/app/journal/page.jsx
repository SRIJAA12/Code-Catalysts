"use client";
import { useState, useEffect, useCallback } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {
  MdAdd, MdCalendarToday, MdMap, MdInsights, MdGroup,
  MdEditNote, MdWbSunny, MdOpenInNew, MdSave, MdShare,
  MdFormatQuote, MdSell, MdLocationOn, MdDelete, MdClose, MdEdit,
} from "react-icons/md";

function NoteModal({ note, onSave, onClose }) {
  const [title,   setTitle]   = useState(note?.title   || "");
  const [content, setContent] = useState(note?.content || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ ...note, title, content });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{note?.id ? "Edit Note" : "New Journal Entry"}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container transition-colors"><MdClose className="icon-nav" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Entry title…"
            className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors font-semibold" />
          <textarea value={content} onChange={e => setContent(e.target.value)} required rows={8}
            placeholder="Write your thoughts, memories, and experiences…"
            className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-sm border border-outline-variant/30 focus:border-primary transition-colors resize-none leading-relaxed" />
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
            {note?.id ? "Save Changes" : "Create Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}

function JournalContent() {
  const { user } = useAuth();
  const [notes, setNotes]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]     = useState(null); // null | {} | note object
  const [active, setActive]   = useState(null); // currently reading note

  const fetchNotes = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res  = await fetch(`/api/journal?uid=${user.uid}`);
      const data = await res.json();
      const n    = data.notes || [];
      setNotes(n);
      if (n.length > 0 && !active) setActive(n[0]);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  async function handleSave(note) {
    setModal(null);
    if (note.id) {
      await fetch("/api/journal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: note.id, title: note.title, content: note.content }),
      });
    } else {
      await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUid: user.uid, title: note.title, content: note.content }),
      });
    }
    fetchNotes();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this journal entry?")) return;
    setNotes(prev => prev.filter(n => n.id !== id));
    if (active?.id === id) setActive(null);
    await fetch(`/api/journal?id=${id}`, { method: "DELETE" });
  }

  const displayNote = active || notes[0];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-2xl border-b border-outline-variant/15 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <span className="text-xl font-black tracking-tight text-primary">Traveloop</span>
          <nav className="hidden md:flex gap-2">
            {[["Home","/dashboard"],["My Trips","/trips"],["Journal","#"]].map(([l, href]) => (
              <a key={l} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${l === "Journal" ? "text-primary font-bold bg-primary/8" : "text-on-surface-variant hover:bg-surface-container"}`} href={href}>{l}</a>
            ))}
          </nav>
          <button onClick={() => setModal({})} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:-translate-y-0.5 transition-all">
            <MdAdd className="icon-btn" /> New Entry
          </button>
        </div>
      </header>

      {modal !== null && <NoteModal note={modal?.id ? modal : null} onSave={handleSave} onClose={() => setModal(null)} />}

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar — list of entries */}
        <aside className="hidden lg:flex w-64 shrink-0 flex-col gap-4 p-5 border-r border-outline-variant/15 bg-surface-container-low/60 backdrop-blur-2xl overflow-y-auto notion-scroll sticky top-16 h-[calc(100vh-4rem)]">
          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shrink-0">
              <MdEditNote className="icon-nav text-on-primary-container" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm truncate">Trip Journal</h2>
              <p className="text-[10px] text-on-surface-variant">{notes.length} entries</p>
            </div>
          </div>

          <button onClick={() => setModal({})} className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all">
            <MdAdd className="icon-btn" /> Add Entry
          </button>

          <nav className="space-y-1">
            {[
              { Icon: MdCalendarToday, label: "Timeline" },
              { Icon: MdInsights,      label: "Statistics" },
              { Icon: MdEditNote,      label: "Trip Journal", active: true },
            ].map(({ Icon, label, active: isActive }) => (
              <button key={label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${isActive ? "bg-primary-container text-on-primary-container font-bold" : "text-on-surface-variant hover:bg-surface-variant/40"}`}>
                <Icon className="icon-nav shrink-0" />{label}
              </button>
            ))}
          </nav>

          <div className="border-t border-outline-variant/15 pt-4">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-3 px-2">Entries</p>
            <div className="space-y-0.5">
              {loading ? (
                <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-8 bg-surface-container-high rounded-lg animate-pulse" />)}</div>
              ) : notes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActive(n)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors truncate ${active?.id === n.id ? "text-primary border-l-2 border-primary font-bold bg-primary/5" : "text-on-surface-variant hover:text-primary"}`}
                >
                  {n.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Editor / Viewer */}
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="max-w-3xl mx-auto px-5 sm:px-10 lg:px-16 py-12">
            {!displayNote ? (
              <div className="text-center py-24 space-y-4">
                <MdEditNote className="icon-xl text-outline-variant mx-auto" />
                <h2 className="text-xl font-bold text-on-surface">No journal entries yet</h2>
                <p className="text-sm text-on-surface-variant">Start capturing your travel memories.</p>
                <button onClick={() => setModal({})} className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all">
                  Write First Entry
                </button>
              </div>
            ) : (
              <>
                {/* Cover */}
                <div className="relative h-52 w-full rounded-2xl overflow-hidden mb-10 shadow-sm group">
                  <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1200" alt="Journal cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-5 left-6 text-white">
                    <h1 className="text-3xl font-black tracking-tight">{displayNote.title}</h1>
                    <p className="text-white/80 text-xs mt-1">
                      {new Date(displayNote.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mb-8">
                  <button onClick={() => setModal(displayNote)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors">
                    <MdEdit className="icon-xs" /> Edit
                  </button>
                  <button onClick={() => handleDelete(displayNote.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-red-200 text-error rounded-xl hover:bg-red-50 transition-colors">
                    <MdDelete className="icon-xs" /> Delete
                  </button>
                </div>

                {/* Body */}
                <div className="space-y-7">
                  <div className="text-base leading-relaxed text-on-surface whitespace-pre-wrap">{displayNote.content}</div>
                </div>

                <footer className="mt-16 pt-6 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant font-medium">
                  <span>{displayNote.content?.split(/\s+/).length || 0} words</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Saved to Supabase</span>
                  </div>
                </footer>
              </>
            )}
          </div>
        </main>

        {/* Right Widgets */}
        <aside className="hidden xl:flex w-72 shrink-0 flex-col gap-6 p-6 border-l border-outline-variant/15 overflow-y-auto notion-scroll sticky top-16 h-[calc(100vh-4rem)]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3">All Entries ({notes.length})</p>
            <div className="space-y-2">
              {notes.map(n => (
                <button key={n.id} onClick={() => setActive(n)} className={`w-full text-left p-3 rounded-xl border transition-all text-sm ${active?.id === n.id ? "border-primary bg-primary/5 font-semibold text-primary" : "border-outline-variant/15 hover:border-primary/30 hover:bg-surface-container"}`}>
                  <p className="font-semibold truncate">{n.title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 truncate">{n.content?.slice(0, 40)}…</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* FABs */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
        <button onClick={() => setModal({})} aria-label="New Entry" className="w-12 h-12 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
          <MdAdd className="icon-nav" />
        </button>
      </div>
    </div>
  );
}

export default function TripJournalPage() {
  return <ProtectedRoute><JournalContent /></ProtectedRoute>;
}

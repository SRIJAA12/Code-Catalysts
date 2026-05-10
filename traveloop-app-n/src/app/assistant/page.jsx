"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  MdAutoAwesome, MdAdd, MdHistory, MdShare, MdDownload,
  MdMoreVert, MdSend, MdRestaurant, MdMuseum,
  MdSchedule, MdSave, MdMap, MdTipsAndUpdates, MdClose,
  MdDelete,
} from "react-icons/md";

// ── Gemini setup ──────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are Traveloop's AI Travel Planner, powered by Gemini. You help users plan trips, suggest destinations, create itineraries, recommend packing lists, and provide budget advice.

When the user asks for a trip itinerary, respond with a friendly explanation followed by a JSON block in this exact format (inside triple backticks with "json" label):
\`\`\`json
{
  "type": "trip_plan",
  "title": "Trip Title",
  "destination": "City, Country",
  "days": 2,
  "budget_estimate": 485,
  "budget_style": "standard",
  "itinerary": [
    {
      "day": 1,
      "label": "Day 1 - Theme",
      "activities": [
        { "time": "9:00 AM", "title": "Activity Name", "description": "Short detail", "cost": 12, "category": "food" }
      ]
    }
  ]
}
\`\`\`

Otherwise respond in friendly, concise plain text. Keep responses helpful and travel-focused.`;

const SUGGESTIONS = ["Plan a 3-day trip to Paris", "Suggest packing list for beach", "Budget tips for Southeast Asia", "Best time to visit Japan"];

const PREV_CHATS = [
  { label: "Paris 3-Day Plan", id: "paris" },
  { label: "Japan Itinerary",  id: "japan" },
  { label: "Bali Budget Trip", id: "bali"  },
];

// ── Helpers ───────────────────────────────────────────────────

function parseTripPlan(text) {
  try {
    const match = text.match(/```json\s*([\s\S]*?)```/);
    if (!match) return null;
    return JSON.parse(match[1]);
  } catch { return null; }
}

function stripJson(text) {
  return text.replace(/```json[\s\S]*?```/g, "").trim();
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
        <MdAutoAwesome className="icon-xs text-white" />
      </div>
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white border border-outline-variant/20 rounded-2xl rounded-bl-sm shadow-sm">
        {[0, 150, 300].map((delay) => (
          <span key={delay} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${delay}ms` }} />
        ))}
      </div>
    </div>
  );
}

function TripPlanCard({ plan, onSave }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 p-5 rounded-2xl space-y-4">
      <div>
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">AI Trip Plan</p>
        <h3 className="font-bold text-base">{plan.title}</h3>
        <p className="text-xs text-on-surface-variant">{plan.destination} · {plan.days} days · Est. ${plan.budget_estimate?.toLocaleString()}</p>
      </div>

      {plan.itinerary?.map((day) => (
        <div key={day.day} className="space-y-2">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{day.label}</p>
          {day.activities?.map((act, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                {act.category === "food" ? <MdRestaurant className="icon-sm text-primary" /> : <MdMuseum className="icon-sm text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-bold text-xs">{act.title}</p>
                    <p className="text-[11px] text-on-surface-variant">{act.description}</p>
                  </div>
                  {act.cost && <span className="text-xs font-bold text-primary shrink-0">${act.cost}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/10">
        <button
          onClick={() => onSave(plan)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-all"
        >
          <MdSave className="icon-xs" /> Use This Plan
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant/30 hover:bg-surface-container transition-all">
          <MdShare className="icon-xs" /> Share
        </button>
      </div>
    </div>
  );
}

function MessageBubble({ msg, onSavePlan }) {
  const plan = msg.role === "assistant" ? parseTripPlan(msg.text) : null;
  const displayText = plan ? stripJson(msg.text) : msg.text;

  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-sm bg-primary text-white px-5 py-3.5 rounded-3xl rounded-br-sm shadow-lg">
          <p className="text-sm leading-relaxed">{msg.text}</p>
          <p className="text-on-primary/60 text-[10px] mt-2 text-right">{msg.time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-md mt-0.5">
        <MdAutoAwesome className="icon-xs text-white" />
      </div>
      <div className="flex-1 max-w-2xl min-w-0 bg-white border border-outline-variant/15 rounded-3xl rounded-bl-sm p-5 shadow-sm space-y-4">
        {displayText && <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayText}</p>}
        {plan && <TripPlanCard plan={plan} onSave={onSavePlan} />}
        <p className="text-[10px] text-on-surface-variant">{msg.time}</p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────

function AIAssistantContent() {
  const { user } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm your AI travel planner powered by Gemini. Ask me to plan a trip, suggest destinations, create packing lists, or give budget advice!",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput]   = useState("");
  const [typing, setTyping] = useState(false);
  const [chatTitle, setChatTitle] = useState("New Conversation");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback(async (text) => {
    const userText = text.trim();
    if (!userText || typing) return;

    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { role: "user", text: userText, time }]);
    setInput("");
    setTyping(true);

    if (chatTitle === "New Conversation") setChatTitle(userText.slice(0, 30));

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Build conversation context
      const history = messages.map((m) => ({
        role:  m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({
        history: [
          { role: "user",  parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood! I'm ready to help plan amazing trips. What would you like to explore?" }] },
          ...history,
        ],
      });

      const result = await chat.sendMessage(userText);
      const reply  = result.response.text();

      setMessages((prev) => [...prev, {
        role: "assistant",
        text: reply,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        text: "Sorry, I had trouble connecting. Please check your Gemini API key or try again.",
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }]);
    } finally {
      setTyping(false);
    }
  }, [messages, typing, chatTitle]);

  async function handleSavePlan(plan) {
    try {
      const res = await fetch("/api/trips", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: user.uid,
          email:       user.email,
          name:        user.displayName,
          title:       plan.title,
          destination: plan.destination,
          budget:      plan.budget_estimate,
          budgetStyle: plan.budget_style || "standard",
          status:      "draft",
        }),
      });
      if (res.ok) router.push("/trips");
    } catch (e) {
      console.error(e);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background text-on-surface">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col gap-4 p-5 border-r border-outline-variant/15 bg-surface-container-low/60 backdrop-blur-2xl">
        <div className="flex items-center gap-3 py-2">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-md shrink-0">
            <MdAutoAwesome className="icon-nav text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sm">AI Travel Planner</h2>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Powered by Gemini</p>
          </div>
        </div>

        <button
          onClick={() => { setMessages([{ role: "assistant", text: "Hi! 👋 I'm your AI travel planner. Ask me anything about travel!", time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }]); setChatTitle("New Conversation"); }}
          className="w-full py-2.5 bg-primary text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-md transition-all"
        >
          <MdAdd className="icon-btn" /> New Chat
        </button>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-3 px-2">Previous Chats</p>
          <div className="space-y-0.5">
            {PREV_CHATS.map(({ label, id }) => (
              <button
                key={id}
                className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all truncate text-on-surface-variant hover:bg-surface-variant/50"
              >
                <MdHistory className="icon-xs shrink-0 opacity-60" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 bg-primary/5 border border-primary/10 rounded-2xl">
          <div className="flex items-center gap-1.5 mb-1.5">
            <MdTipsAndUpdates className="icon-sm text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Pro Tip</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">Tell me your budget and travel style for a fully customized itinerary.</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/15 bg-surface/90 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center">
              <MdAutoAwesome className="icon-sm text-on-primary-container" />
            </div>
            <div>
              <h3 className="font-bold text-sm truncate max-w-[200px]">{chatTitle}</h3>
              <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active Session
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {[[MdShare, "Share"], [MdDownload, "Download"], [MdMoreVert, "More"]].map(([Icon, lbl]) => (
              <button key={lbl} aria-label={lbl} className="p-2 rounded-xl hover:bg-surface-container transition-colors">
                <Icon className="icon-nav text-on-surface-variant" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 custom-scrollbar">
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} onSavePlan={handleSavePlan} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-5 border-t border-outline-variant/10 bg-surface/90 backdrop-blur-xl shrink-0">
          {/* Chips */}
          <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar pb-1">
            {SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                onClick={() => sendMessage(chip)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-outline-variant/30 bg-white hover:border-primary hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-end gap-3 bg-white border border-outline-variant/20 rounded-2xl px-4 py-3 shadow-md focus-within:border-primary/30 transition-all">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Plan a trip, discover local tips, ask for budget advice…"
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-sm leading-relaxed py-0.5 max-h-28"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:scale-100 shrink-0"
            >
              <MdSend className="icon-sm" />
            </button>
          </div>
          <p className="text-center text-[10px] text-on-surface-variant mt-2.5">AI responses may vary. Always verify travel details before booking.</p>
        </div>
      </main>
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <ProtectedRoute>
      <AIAssistantContent />
    </ProtectedRoute>
  );
}

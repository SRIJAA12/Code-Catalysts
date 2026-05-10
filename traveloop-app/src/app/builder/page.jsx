"use client";
import { useState, useCallback } from "react";
import {
  DndContext, DragOverlay, PointerSensor, useSensor, useSensors,
  closestCenter, useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext, useSortable, verticalListSortingStrategy, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import PDFExportButton from "@/components/PDFExportButton";
import WeatherWidget from "@/components/WeatherWidget";
import {
  MdAdd, MdDragIndicator, MdLocationOn, MdAccessTime,
  MdCurrencyRupee, MdDelete,
} from "react-icons/md";

// ── Default trip state ────────────────────────────────────────────────────────
const DEFAULT_TRIP = {
  id: "trip_kerala",
  title: "Kerala Explorer",
  startDate: "2024-12-20",
  endDate: "2024-12-25",
  estimatedBudget: 35000,
  currencySymbol: "₹",
  shareSlug: "kerala-explorer-2024",
  cities: [
    { id: "city_1", name: "Munnar",   days: [1, 2] },
    { id: "city_2", name: "Alleppey", days: [3]    },
    { id: "city_3", name: "Kochi",    days: [4, 5]  },
  ],
  activities: {
    day_1: [
      { id: "act_1", title: "Tea Museum Visit",   cost: 500,   time: "10:00 AM" },
      { id: "act_2", title: "Mattupetty Dam",     cost: 200,   time: "02:00 PM" },
    ],
    day_2: [
      { id: "act_3", title: "Eravikulam Park",    cost: 800,   time: "09:00 AM" },
      { id: "act_4", title: "Top Station Sunset", cost: 0,     time: "05:00 PM" },
    ],
    day_3: [
      { id: "act_5", title: "Houseboat Check-in", cost: 12000, time: "12:00 PM" },
      { id: "act_6", title: "Backwater Cruise",   cost: 0,     time: "03:00 PM" },
    ],
    day_4: [
      { id: "act_7", title: "Fort Kochi Walk",    cost: 0,     time: "09:00 AM" },
      { id: "act_8", title: "Chinese Fishing Nets",cost: 100,  time: "06:00 PM" },
    ],
    day_5: [
      { id: "act_9", title: "Kochi Food Tour",    cost: 1200,  time: "11:00 AM" },
    ],
  },
};

let nextId = 100;
function genId() { return `act_${++nextId}`; }

// ── Sortable Activity Card ────────────────────────────────────────────────────
function ActivityCard({ activity, dayKey, onDelete, isDraggingOver }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
    data: { dayKey },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl p-3.5 shadow-sm flex items-start gap-3 group transition-all
        ${isDragging ? "ring-2 ring-primary/50 border-primary/30" : "border-gray-200 hover:border-primary/30 hover:shadow-md"}`}
    >
      <button
        {...attributes} {...listeners}
        className="mt-0.5 cursor-grab active:cursor-grabbing text-gray-300 hover:text-primary transition-colors shrink-0"
      >
        <MdDragIndicator className="text-lg" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-800 truncate">{activity.title}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <MdAccessTime className="text-xs" /> {activity.time}
          </span>
          <span className="flex items-center gap-1 font-bold text-primary">
            <MdCurrencyRupee className="text-xs" />
            {Number(activity.cost).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(dayKey, activity.id)}
        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all text-gray-300 shrink-0"
      >
        <MdDelete className="text-sm" />
      </button>
    </div>
  );
}

// ── Day Container ─────────────────────────────────────────────────────────────
function DayContainer({ dayKey, dayNum, activities, onAddActivity, onDelete, cityName }) {
  const { setNodeRef, isOver } = useDroppable({ id: dayKey });
  const dayTotal = activities.reduce((s, a) => s + Number(a.cost || 0), 0);

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl border-2 transition-all ${isOver ? "border-primary/50 bg-primary/5" : "border-gray-100 bg-gray-50/50"}`}
    >
      {/* Day header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="font-bold text-sm text-gray-800">Day {dayNum}</p>
          {cityName && (
            <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
              <MdLocationOn className="text-xs text-primary" /> {cityName}
            </p>
          )}
        </div>
        <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          ₹{dayTotal.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Activities */}
      <div className="p-3 space-y-2.5 min-h-[80px]">
        <SortableContext items={activities.map(a => a.id)} strategy={verticalListSortingStrategy}>
          {activities.map(act => (
            <ActivityCard key={act.id} activity={act} dayKey={dayKey} onDelete={onDelete} />
          ))}
        </SortableContext>
        {activities.length === 0 && (
          <div className={`h-16 rounded-xl border-2 border-dashed flex items-center justify-center text-xs text-gray-300 transition-colors ${isOver ? "border-primary/50 text-primary/60" : "border-gray-200"}`}>
            Drop activity here
          </div>
        )}
      </div>

      {/* Add activity */}
      <div className="px-3 pb-3">
        <button
          onClick={() => onAddActivity(dayKey)}
          className="w-full py-2 rounded-xl border border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 text-xs font-semibold text-gray-400 hover:text-primary flex items-center justify-center gap-1.5 transition-all"
        >
          <MdAdd className="text-sm" /> Add Activity
        </button>
      </div>
    </div>
  );
}

// ── City Sidebar Item ─────────────────────────────────────────────────────────
function CitySidebarItem({ city, index, isActive, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: city.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all select-none
        ${isDragging ? "opacity-40 ring-2 ring-primary/30" : ""}
        ${isActive ? "bg-primary text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing shrink-0" onClick={e => e.stopPropagation()}>
        <MdDragIndicator className="text-base opacity-50" />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate">{city.name}</p>
        <p className={`text-[10px] ${isActive ? "text-white/70" : "text-gray-400"}`}>
          Day{city.days.length > 1 ? "s" : ""} {city.days.join(", ")}
        </p>
      </div>
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${isActive ? "bg-white/20" : "bg-gray-100 text-gray-500"}`}>
        #{index + 1}
      </span>
    </div>
  );
}

// ── Budget Widget ─────────────────────────────────────────────────────────────
function BudgetWidget({ tripState, selectedDay }) {
  const allActivities = Object.values(tripState.activities).flat();
  const totalSpent    = allActivities.reduce((s, a) => s + Number(a.cost || 0), 0);
  const remaining     = tripState.estimatedBudget - totalSpent;
  const dayKey        = `day_${selectedDay}`;
  const dayActs       = tripState.activities[dayKey] || [];
  const dayTotal      = dayActs.reduce((s, a) => s + Number(a.cost || 0), 0);
  const pct           = Math.min(100, Math.round((totalSpent / (tripState.estimatedBudget || 1)) * 100));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="font-bold text-sm text-gray-800">Budget Overview</h3>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
          <span>Spent</span><span>{pct}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-400" : "bg-primary"}`}
            style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {[
          ["Total Budget",  `₹${tripState.estimatedBudget.toLocaleString("en-IN")}`, "text-gray-700"],
          ["Total Spent",   `₹${totalSpent.toLocaleString("en-IN")}`,                "text-primary font-bold"],
          ["Remaining",     `₹${remaining.toLocaleString("en-IN")}`,                  remaining < 0 ? "text-red-500 font-bold" : "text-green-600 font-bold"],
        ].map(([l, v, cls]) => (
          <div key={l} className="flex justify-between items-center border-t border-gray-50 pt-2">
            <span className="text-gray-500 text-xs">{l}</span>
            <span className={`text-xs ${cls}`}>{v}</span>
          </div>
        ))}
      </div>

      {/* Day total */}
      <div className="bg-primary/8 rounded-xl p-3">
        <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Day {selectedDay} Total</p>
        <p className="text-xl font-black text-primary">₹{dayTotal.toLocaleString("en-IN")}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{dayActs.length} activit{dayActs.length !== 1 ? "ies" : "y"}</p>
      </div>
    </div>
  );
}


// ── Main Builder ──────────────────────────────────────────────────────────────
function BuilderContent({ initialTrip = DEFAULT_TRIP, slug }) {
  const [tripState, setTripState]     = useState(initialTrip);
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeItem, setActiveItem]   = useState(null); // for DragOverlay
  const [activeCityId, setActiveCityId] = useState(tripState.cities[0]?.id);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  // City for the selected day
  const cityForDay = (dayNum) =>
    tripState.cities.find(c => c.days.includes(dayNum))?.name || "";

  // ── DnD handlers ────────────────────────────────────────────────────────
  function onDragStart({ active }) {
    const dayKey = active.data.current?.dayKey;
    if (dayKey) {
      const act = (tripState.activities[dayKey] || []).find(a => a.id === active.id);
      setActiveItem(act || null);
    } else {
      setActiveItem(null);
    }
  }

  function onDragEnd({ active, over }) {
    setActiveItem(null);
    if (!over) return;

    const srcDayKey  = active.data.current?.dayKey;
    const overDropId = over.id;                       // could be dayKey or actId
    const destDayKey = tripState.activities[overDropId]
      ? overDropId                                    // dropped on day container
      : Object.keys(tripState.activities).find(dk =>
          (tripState.activities[dk] || []).some(a => a.id === overDropId)
        );

    if (!srcDayKey || !destDayKey) return;

    setTripState(prev => {
      const srcActs  = [...(prev.activities[srcDayKey] || [])];
      const destActs = srcDayKey === destDayKey ? srcActs : [...(prev.activities[destDayKey] || [])];

      const srcIdx  = srcActs.findIndex(a => a.id === active.id);
      const destIdx = destActs.findIndex(a => a.id === overDropId);

      if (srcDayKey === destDayKey) {
        const reordered = arrayMove(srcActs, srcIdx, destIdx === -1 ? srcActs.length - 1 : destIdx);
        return { ...prev, activities: { ...prev.activities, [srcDayKey]: reordered } };
      }

      // Move across days
      const [moved] = srcActs.splice(srcIdx, 1);
      if (destIdx === -1) destActs.push(moved);
      else destActs.splice(destIdx, 0, moved);

      return {
        ...prev,
        activities: {
          ...prev.activities,
          [srcDayKey]: srcActs,
          [destDayKey]: destActs,
        },
      };
    });
  }

  // ── City reorder ─────────────────────────────────────────────────────────
  function onCityDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    setTripState(prev => {
      const ids = prev.cities.map(c => c.id);
      const from = ids.indexOf(active.id);
      const to   = ids.indexOf(over.id);
      return { ...prev, cities: arrayMove(prev.cities, from, to) };
    });
  }

  // ── Add activity ─────────────────────────────────────────────────────────
  const addActivity = useCallback((dayKey) => {
    setTripState(prev => {
      const newAct = { id: genId(), title: "New Activity", cost: 0, time: "09:00 AM" };
      return {
        ...prev,
        activities: {
          ...prev.activities,
          [dayKey]: [...(prev.activities[dayKey] || []), newAct],
        },
      };
    });
  }, []);

  // ── Delete activity ───────────────────────────────────────────────────────
  const deleteActivity = useCallback((dayKey, actId) => {
    setTripState(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [dayKey]: prev.activities[dayKey].filter(a => a.id !== actId),
      },
    }));
  }, []);

  const dayKeys = Object.keys(tripState.activities).sort((a, b) =>
    Number(a.replace("day_", "")) - Number(b.replace("day_", ""))
  );

  // Build trip object for PDF export
  const pdfTrip = {
    ...tripState,
    cities: tripState.cities.map(c => ({
      cityName: c.name,
      activities: c.days.flatMap(d =>
        (tripState.activities[`day_${d}`] || []).map(a => ({ ...a, name: a.title }))
      ),
    })),
  };

  return (
    <div className="bg-background text-on-surface">
      <Navbar activePage="trips" />

      <div className="max-w-[1400px] mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">{tripState.title}</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {tripState.startDate} → {tripState.endDate} · {dayKeys.length} days · {tripState.cities.length} cities
            </p>
            {slug && <p className="text-xs text-gray-300 mt-0.5">slug: {slug}</p>}
          </div>
          <PDFExportButton trip={pdfTrip} />
        </div>

        {/* ── 3-column grid ── */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-5">

            {/* ── Left: Cities ── */}
            <aside className="lg:sticky lg:top-24 self-start space-y-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Cities / Route</h2>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onCityDragEnd}>
                  <SortableContext items={tripState.cities.map(c => c.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-1">
                      {tripState.cities.map((city, i) => (
                        <CitySidebarItem
                          key={city.id}
                          city={city}
                          index={i}
                          isActive={city.id === activeCityId}
                          onClick={() => { setActiveCityId(city.id); setSelectedDay(city.days[0]); }}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

              {/* Day selector */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Jump to Day</h2>
                <div className="flex flex-wrap gap-1.5">
                  {dayKeys.map(dk => {
                    const n = Number(dk.replace("day_", ""));
                    return (
                      <button key={dk} onClick={() => setSelectedDay(n)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all
                          ${selectedDay === n ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"}`}>
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ── Center: Day planner ── */}
            <main className="space-y-5 min-w-0">
              {dayKeys.map(dk => {
                const dayNum = Number(dk.replace("day_", ""));
                return (
                  <DayContainer
                    key={dk}
                    dayKey={dk}
                    dayNum={dayNum}
                    activities={tripState.activities[dk] || []}
                    cityName={cityForDay(dayNum)}
                    onAddActivity={addActivity}
                    onDelete={deleteActivity}
                  />
                );
              })}
            </main>

            {/* ── Right: Widgets ── */}
            <aside className="lg:sticky lg:top-24 self-start space-y-4">
              <BudgetWidget tripState={tripState} selectedDay={selectedDay} />
              <WeatherWidget city={cityForDay(selectedDay)} />
            </aside>
          </div>

          {/* Drag overlay (ghost card) */}
          <DragOverlay>
            {activeItem && (
              <div className="bg-white border-2 border-primary rounded-xl p-3.5 shadow-2xl opacity-95 ring-2 ring-primary/30 w-[260px]">
                <p className="font-semibold text-sm text-gray-800">{activeItem.title}</p>
                <p className="text-xs text-primary font-bold mt-1">₹{Number(activeItem.cost).toLocaleString("en-IN")}</p>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

export default function ItineraryBuilderPage({ slug } = {}) {
  return (
    <ProtectedRoute>
      <BuilderContent slug={slug} />
    </ProtectedRoute>
  );
}

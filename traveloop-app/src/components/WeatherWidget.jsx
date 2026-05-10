"use client";
import { useState, useEffect } from "react";
import {
  MdWbSunny, MdCloud, MdThunderstorm, MdGrain,
  MdAcUnit, MdWaterDrop, MdAir, MdVisibility,
  MdLocationOn, MdRefresh,
} from "react-icons/md";

// ── Weather code → icon + label mapping (WMO codes) ─────────────────────────
function getWeatherInfo(code) {
  if (code === 0)              return { Icon: MdWbSunny,     label: "Clear",       color: "text-amber-400",  bg: "from-amber-400 to-orange-500" };
  if (code <= 3)               return { Icon: MdCloud,       label: "Cloudy",      color: "text-slate-400",  bg: "from-slate-400 to-slate-600"  };
  if (code <= 67)              return { Icon: MdGrain,       label: "Rainy",       color: "text-blue-400",   bg: "from-blue-400 to-blue-600"    };
  if (code <= 77)              return { Icon: MdAcUnit,      label: "Snowy",       color: "text-cyan-300",   bg: "from-cyan-400 to-blue-500"    };
  if (code <= 82)              return { Icon: MdGrain,       label: "Showers",     color: "text-blue-400",   bg: "from-blue-400 to-indigo-500"  };
  return                              { Icon: MdThunderstorm, label: "Storm",      color: "text-purple-400", bg: "from-purple-500 to-indigo-700" };
}

// ── Forecast day label ────────────────────────────────────────────────────────
function dayLabel(dateStr, index) {
  if (index === 0) return "Today";
  if (index === 1) return "Tmrw";
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse">
      <div className="h-36 bg-gray-200" />
      <div className="bg-white p-4 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
/**
 * Props:
 *   city       – city name string used for geocoding (required)
 *   compact    – boolean; if true renders a compact single-row card
 */
export default function WeatherWidget({ city = "", compact = false }) {
  const [data,    setData]    = useState(null);
  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [ts,      setTs]      = useState(Date.now());

  useEffect(() => {
    if (!city) { setData(null); return; }

    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        // Step 1 – Geocode city → lat/lng via Open-Meteo geocoding (free, no key)
        const geoRes  = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );
        const geoData = await geoRes.json();
        if (!geoData.results?.length) throw new Error("City not found");

        const { latitude, longitude, name, country_code } = geoData.results[0];

        // Step 2 – Fetch 5-day forecast + current weather (Open-Meteo, free)
        const wRes  = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode,apparent_temperature` +
          `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum` +
          `&timezone=auto&forecast_days=5`
        );
        const w = await wRes.json();

        setData({
          city: name,
          country: country_code?.toUpperCase() || "",
          current: w.current,
          daily:   w.daily,
        });
      } catch (e) {
        setError(e.message || "Weather unavailable");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, ts]);

  // ── Loading ──
  if (loading) return <Skeleton />;

  // ── Error / No city ──
  if (!city || error) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Weather</p>
        <div className="flex items-center gap-1.5 mb-3">
          <MdLocationOn className="text-sm" />
          <p className="font-bold text-sm">{city || "No city selected"}</p>
        </div>
        {error ? (
          <p className="text-xs opacity-70">{error}</p>
        ) : (
          <p className="text-xs opacity-70">Select a city to see live weather.</p>
        )}
      </div>
    );
  }

  if (!data) return null;

  const { current, daily } = data;
  const info = getWeatherInfo(current.weathercode);
  const Icon = info.Icon;

  // ── Compact card ──
  if (compact) {
    return (
      <div className={`bg-gradient-to-br ${info.bg} rounded-2xl p-4 text-white shadow-sm`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">{data.city}, {data.country}</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-black">{Math.round(current.temperature_2m)}°C</span>
              <span className="text-sm opacity-80 mb-1">{info.label}</span>
            </div>
          </div>
          <Icon className="text-5xl opacity-90" />
        </div>
      </div>
    );
  }

  // ── Full card ──
  return (
    <div className={`bg-gradient-to-br ${info.bg} rounded-2xl overflow-hidden shadow-sm text-white`}>
      {/* Top: current weather */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Live Weather</p>
            <p className="font-bold text-sm flex items-center gap-1 mt-0.5">
              <MdLocationOn className="text-xs" /> {data.city}, {data.country}
            </p>
          </div>
          <button
            onClick={() => setTs(Date.now())}
            className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
            title="Refresh weather"
          >
            <MdRefresh className="text-sm" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Icon className="text-6xl opacity-95" />
          <div>
            <p className="text-5xl font-black">{Math.round(current.temperature_2m)}°C</p>
            <p className="text-sm opacity-80 mt-0.5">{info.label} · Feels {Math.round(current.apparent_temperature)}°C</p>
          </div>
        </div>

        {/* Stat strip */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
          {[
            { Icon: MdWaterDrop, val: `${current.relative_humidity_2m}%`,    label: "Humidity" },
            { Icon: MdAir,       val: `${Math.round(current.wind_speed_10m)} km/h`, label: "Wind"     },
          ].map(({ Icon: I, val, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <I className="text-sm opacity-80" />
              <div>
                <p className="text-xs font-bold">{val}</p>
                <p className="text-[10px] opacity-65">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-day forecast strip */}
      <div className="bg-black/15 backdrop-blur-sm px-4 py-3 flex justify-between">
        {daily.time.slice(0, 5).map((dateStr, i) => {
          const fi   = getWeatherInfo(daily.weathercode[i]);
          const FIcon = fi.Icon;
          return (
            <div key={dateStr} className="text-center flex flex-col items-center gap-1">
              <p className="text-[10px] font-bold opacity-70">{dayLabel(dateStr, i)}</p>
              <FIcon className="text-base opacity-90" />
              <p className="text-xs font-bold">{Math.round(daily.temperature_2m_max[i])}°</p>
              <p className="text-[10px] opacity-55">{Math.round(daily.temperature_2m_min[i])}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

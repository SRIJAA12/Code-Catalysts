// src/app/api/explore/route.js
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_SERVER_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

function buildPrompt(origin, currency, destFilter, budgetFilter) {
  const formattedDest   = destFilter   || "Leave Blank (diverse mix: local getaway + domestic + international)";
  const formattedBudget = budgetFilter || "Leave Blank (no budget limit)";

  return `You are the Traveloop Discovery Engine, an elite AI travel curator.
Generate exactly 3 personalized trip recommendations for the user's Explore Dashboard.

### DYNAMIC INPUTS:
- User Origin: ${origin}
- User Local Currency: ${currency.code} (symbol: ${currency.symbol})
- Preferred Destination/Vibe (Optional): ${formattedDest}
- Maximum Budget per Person (Optional): ${formattedBudget}

### CRITICAL RULES:
1. CURRENCY: All estimatedBudget values MUST be in ${currency.code}. Set "currencySymbol" to "${currency.symbol}".
2. BUDGET: If a Maximum Budget is provided, every recommendation's estimatedBudget MUST be ≤ that number. If budget is too low for international travel, only suggest local/regional destinations.
3. DESTINATION FILTER: If a vibe/destination is provided, all 3 must match it. If blank, provide 1 Local Weekend Getaway + 1 Domestic/Regional + 1 International Bucket-List.
4. TRAVEL HOOK: Each must mention logistics from the User Origin (e.g., "Take a direct flight from ${origin}...").
5. HIGHLIGHTS: Include 3 specific must-do highlights per destination.

### DESTINATION KNOWLEDGE BASE:
- Indian: Jaipur, Varanasi, Munnar, Goa, Udaipur, Rishikesh, Andaman, Darjeeling, Hampi, Leh-Ladakh, Coorg, Pondicherry, Spiti, Meghalaya, Ooty, Alleppey
- Asian: Bali, Tokyo/Kyoto, Phuket/Bangkok, Hanoi/Da Nang, Maldives, Sri Lanka, Singapore, Seoul
- European: Paris, Rome/Amalfi, Swiss Alps, Santorini, Barcelona, Amsterdam, Prague, Dubrovnik
- Global: Dubai, Cape Town, New York, Banff, Queenstown, Marrakech, Machu Picchu

### OUTPUT FORMAT — respond ONLY with valid JSON in triple backticks:
\`\`\`json
{
  "personalizedDashboard": [
    {
      "category": "Weekend Getaway",
      "destination": "City Name",
      "country": "Country",
      "estimatedBudget": 12000,
      "currencySymbol": "${currency.symbol}",
      "duration": "2N/3D",
      "travelHook": "One sentence mentioning travel from ${origin}.",
      "imageKeyword": "descriptive photo keyword",
      "highlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
      "bestSeason": "Month range",
      "travelMode": "Train/Flight/Drive"
    }
  ]
}
\`\`\``;
}

const FALLBACKS = {
  INR: [
    { category: "Weekend Getaway",  destination: "Lonavala",         country: "India",       estimatedBudget: 7000,   currencySymbol: "₹",  duration: "1N/2D", travelHook: "Just 2 hours by train from Mumbai to the misty Sahyadri valleys.", imageKeyword: "lonavala monsoon bhushi dam", highlights: ["Tiger's Leap", "Bhushi Dam", "Pavna Lake"], bestSeason: "Jun–Sep", travelMode: "Train" },
    { category: "Cultural Deep Dive",destination: "Hampi",            country: "India",       estimatedBudget: 18000,  currencySymbol: "₹",  duration: "3N/4D", travelHook: "An overnight train south to the UNESCO stone city of Vijayanagara.", imageKeyword: "hampi ruins virupaksha", highlights: ["Virupaksha Temple", "Vittala Temple", "Matanga Hill"], bestSeason: "Oct–Feb", travelMode: "Overnight Train" },
    { category: "The Great Escape",  destination: "Andaman Islands",  country: "India",       estimatedBudget: 45000,  currencySymbol: "₹",  duration: "5N/6D", travelHook: "A short flight to India's most pristine coral reefs and white sand beaches.", imageKeyword: "radhanagar beach havelock andaman", highlights: ["Radhanagar Beach", "Scuba Diving", "Cellular Jail"], bestSeason: "Oct–May", travelMode: "Flight" },
  ],
  USD: [
    { category: "Weekend Getaway",  destination: "Banff",            country: "Canada",      estimatedBudget: 600,    currencySymbol: "$",  duration: "2N/3D", travelHook: "A short drive through the Rockies to one of North America's most stunning national parks.", imageKeyword: "banff lake louise rockies", highlights: ["Lake Louise", "Icefields Parkway", "Johnston Canyon"], bestSeason: "Jun–Sep", travelMode: "Drive" },
    { category: "City Escape",       destination: "New York City",    country: "USA",         estimatedBudget: 1200,   currencySymbol: "$",  duration: "3N/4D", travelHook: "Hop on a direct flight to the city that never sleeps.", imageKeyword: "new york city manhattan skyline", highlights: ["Central Park", "Times Square", "Brooklyn Bridge"], bestSeason: "Apr–Jun", travelMode: "Flight" },
    { category: "Global Adventure",  destination: "Queenstown",       country: "New Zealand", estimatedBudget: 3500,   currencySymbol: "$",  duration: "6N/7D", travelHook: "The long-haul flight is absolutely worth it for the world's adventure capital.", imageKeyword: "queenstown new zealand fjord", highlights: ["Milford Sound", "Bungy Jumping", "Remarkables Ski"], bestSeason: "Dec–Feb", travelMode: "Flight" },
  ],
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const origin      = searchParams.get("city")     || "Mumbai";
  const currCode    = searchParams.get("currency")  || "INR";
  const currSymbol  = searchParams.get("symbol")    || "₹";
  const currLocale  = searchParams.get("locale")    || "en-IN";
  const destFilter  = searchParams.get("dest")      || "";
  const budgetFilter= searchParams.get("budget")    || "";

  const currency = { code: currCode, symbol: currSymbol, locale: currLocale };

  try {
    const model  = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = buildPrompt(origin, currency, destFilter, budgetFilter);
    const result = await model.generateContent(prompt);
    const text   = result.response.text();

    const match  = text.match(/```json\s*([\s\S]*?)```/);
    if (!match) throw new Error("No JSON block");
    const parsed = JSON.parse(match[1]);

    // Enforce budget cap client-side too
    if (budgetFilter) {
      const cap = Number(budgetFilter);
      parsed.personalizedDashboard = parsed.personalizedDashboard.filter(r => r.estimatedBudget <= cap);
    }

    return NextResponse.json({ success: true, origin, currency, ...parsed });
  } catch (err) {
    console.error("Explore API:", err.message);
    const fallback = FALLBACKS[currCode] || FALLBACKS["USD"];
    return NextResponse.json({
      success: false, origin, currency,
      personalizedDashboard: budgetFilter
        ? fallback.filter(r => r.estimatedBudget <= Number(budgetFilter))
        : fallback,
    });
  }
}

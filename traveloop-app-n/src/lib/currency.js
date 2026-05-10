// src/lib/currency.js
// Detects user's local currency from browser locale / timezone

export const CURRENCY_MAP = {
  // South Asia
  IN: { code: "INR", symbol: "₹",  locale: "en-IN"  },
  // East Asia
  JP: { code: "JPY", symbol: "¥",  locale: "ja-JP"  },
  CN: { code: "CNY", symbol: "¥",  locale: "zh-CN"  },
  KR: { code: "KRW", symbol: "₩",  locale: "ko-KR"  },
  // Southeast Asia
  TH: { code: "THB", symbol: "฿",  locale: "th-TH"  },
  SG: { code: "SGD", symbol: "S$", locale: "en-SG"  },
  ID: { code: "IDR", symbol: "Rp", locale: "id-ID"  },
  // Middle East
  AE: { code: "AED", symbol: "د.إ",locale: "ar-AE"  },
  // Europe
  DE: { code: "EUR", symbol: "€",  locale: "de-DE"  },
  FR: { code: "EUR", symbol: "€",  locale: "fr-FR"  },
  IT: { code: "EUR", symbol: "€",  locale: "it-IT"  },
  GB: { code: "GBP", symbol: "£",  locale: "en-GB"  },
  CH: { code: "CHF", symbol: "Fr", locale: "de-CH"  },
  // Americas
  US: { code: "USD", symbol: "$",  locale: "en-US"  },
  CA: { code: "CAD", symbol: "C$", locale: "en-CA"  },
  // Oceania
  AU: { code: "AUD", symbol: "A$", locale: "en-AU"  },
  NZ: { code: "NZD", symbol: "NZ$",locale: "en-NZ"  },
  // Africa
  ZA: { code: "ZAR", symbol: "R",  locale: "en-ZA"  },
};

// Timezone → likely country (best-effort, client-side only)
const TZ_TO_COUNTRY = {
  "Asia/Kolkata":         "IN",
  "Asia/Calcutta":        "IN",
  "Asia/Tokyo":           "JP",
  "Asia/Seoul":           "KR",
  "Asia/Shanghai":        "CN",
  "Asia/Bangkok":         "TH",
  "Asia/Singapore":       "SG",
  "Asia/Jakarta":         "ID",
  "Asia/Dubai":           "AE",
  "Europe/Paris":         "FR",
  "Europe/Berlin":        "DE",
  "Europe/London":        "GB",
  "Europe/Rome":          "IT",
  "Europe/Zurich":        "CH",
  "America/New_York":     "US",
  "America/Chicago":      "US",
  "America/Los_Angeles":  "US",
  "America/Toronto":      "CA",
  "Australia/Sydney":     "AU",
  "Pacific/Auckland":     "NZ",
  "Africa/Johannesburg":  "ZA",
};

/**
 * Returns { code, symbol, locale } for the user's detected locale.
 * Falls back to USD if not detected.
 */
export function detectCurrency() {
  if (typeof window === "undefined") return CURRENCY_MAP["US"];

  // 1. Try timezone
  try {
    const tz      = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = TZ_TO_COUNTRY[tz];
    if (country && CURRENCY_MAP[country]) return CURRENCY_MAP[country];
  } catch (_) {}

  // 2. Try navigator.language (e.g. "en-IN")
  try {
    const lang    = navigator.language || "";
    const region  = lang.split("-")[1]?.toUpperCase();
    if (region && CURRENCY_MAP[region]) return CURRENCY_MAP[region];
  } catch (_) {}

  return CURRENCY_MAP["US"]; // default
}

/**
 * Formats a number as a currency string using the detected locale.
 * e.g. formatCurrency(12000, { code:"INR", symbol:"₹", locale:"en-IN" }) → "₹12,000"
 */
export function formatCurrency(amount, currency) {
  if (!amount && amount !== 0) return "—";
  try {
    return new Intl.NumberFormat(currency.locale, {
      style:                 "currency",
      currency:              currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (_) {
    return `${currency.symbol}${Number(amount).toLocaleString()}`;
  }
}

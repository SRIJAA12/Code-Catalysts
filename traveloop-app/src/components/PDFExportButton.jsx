"use client";
import { useRef, useState, forwardRef } from "react";
import dynamic from "next/dynamic";
import { MdDownload, MdHourglassEmpty } from "react-icons/md";
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

// ── helpers ──────────────────────────────────────────────────────────────────
function fmt(amount, symbol = "₹") {
  return `${symbol}${Number(amount || 0).toLocaleString("en-IN")}`;
}

// ── Hidden PDF Template ───────────────────────────────────────────────────────
const PDFTemplate = forwardRef(function PDFTemplate({ trip }, ref) {
  const { title, startDate, endDate, estimatedBudget, currencySymbol = "₹", shareSlug, cities = [] } = trip;
  const qrUrl = `https://traveloop.com/share/${shareSlug || "trip"}`;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed", left: "-9999px", top: 0,
        width: "794px",            // A4 width at 96dpi
        background: "#ffffff",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        color: "#1a1a1a",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(135deg,#0058be 0%,#316bf3 100%)", borderRadius: "16px", padding: "32px", marginBottom: "32px", color: "#fff" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.75, marginBottom: "8px" }}>
          TRAVELOOP · ITINERARY
        </p>
        <h1 style={{ fontSize: "32px", fontWeight: 900, margin: "0 0 16px" }}>{title || "My Trip"}</h1>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: "10px", opacity: 0.7, margin: 0 }}>DATES</p>
            <p style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>
              {startDate || "—"} → {endDate || "—"}
            </p>
          </div>
          <div>
            <p style={{ fontSize: "10px", opacity: 0.7, margin: 0 }}>ESTIMATED BUDGET</p>
            <p style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>
              {fmt(estimatedBudget, currencySymbol)}
            </p>
          </div>
          {cities.length > 0 && (
            <div>
              <p style={{ fontSize: "10px", opacity: 0.7, margin: 0 }}>CITIES</p>
              <p style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>
                {cities.map(c => c.cityName || c.name).join(" · ")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── City Breakdown ── */}
      {cities.length > 0 ? (
        cities.map((city, ci) => (
          <div key={ci} style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ width: "8px", height: "32px", background: "#0058be", borderRadius: "4px" }} />
              <h2 style={{ fontSize: "18px", fontWeight: 800, margin: 0 }}>{city.cityName || city.name}</h2>
            </div>
            {(city.activities || []).length > 0 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9" }}>
                    {["Activity", "Time", "Cost"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#64748b" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {city.activities.map((act, ai) => (
                    <tr key={ai} style={{ borderBottom: "1px solid #e2e8f0", background: ai % 2 === 0 ? "#fff" : "#f8fafc" }}>
                      <td style={{ padding: "11px 14px", fontSize: "13px", fontWeight: 600 }}>{act.name || act.title}</td>
                      <td style={{ padding: "11px 14px", fontSize: "13px", color: "#64748b" }}>{act.time || "—"}</td>
                      <td style={{ padding: "11px 14px", fontSize: "13px", fontWeight: 700, color: "#0058be" }}>
                        {fmt(act.cost, currencySymbol)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#eff6ff" }}>
                    <td colSpan={2} style={{ padding: "10px 14px", fontSize: "12px", fontWeight: 700, color: "#0058be" }}>City Total</td>
                    <td style={{ padding: "10px 14px", fontSize: "14px", fontWeight: 900, color: "#0058be" }}>
                      {fmt((city.activities || []).reduce((s, a) => s + Number(a.cost || 0), 0), currencySymbol)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 0 18px" }}>No activities added yet.</p>
            )}
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "14px", padding: "40px 0" }}>
          No cities added to this itinerary yet.
        </p>
      )}

      {/* ── Footer / QR ── */}
      <div style={{ marginTop: "40px", borderTop: "2px solid #e2e8f0", paddingTop: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
        <div>
          <p style={{ fontSize: "22px", fontWeight: 900, color: "#0058be", margin: "0 0 4px" }}>Traveloop</p>
          <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 2px" }}>Plan Smarter. Travel Better.</p>
          <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>Generated · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ background: "#fff", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "12px", display: "inline-block" }}>
            <QRCode value={qrUrl} size={96} />
          </div>
          <p style={{ fontSize: "10px", color: "#64748b", margin: "6px 0 0", fontWeight: 600 }}>Scan to view trip online</p>
        </div>
      </div>
    </div>
  );
}); // end forwardRef

// ── Main component ────────────────────────────────────────────────────────────
export default function PDFExportButton({ trip = {} }) {
  const templateRef = useRef(null);
  const [loading, setLoading]   = useState(false);

  async function handleDownload() {
    if (!templateRef.current) return;
    setLoading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(templateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData  = canvas.toDataURL("image/png");
      const pdf      = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pdfW     = pdf.internal.pageSize.getWidth();
      const pdfH     = pdf.internal.pageSize.getHeight();
      const ratio    = canvas.height / canvas.width;
      const imgH     = pdfW * ratio;

      // Multi-page support
      let yOffset = 0;
      while (yOffset < imgH) {
        if (yOffset > 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -yOffset, pdfW, imgH);
        yOffset += pdfH;
      }

      const fileName = `${(trip.title || "Traveloop-Itinerary").replace(/\s+/g, "-")}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        {loading ? (
          <>
            <MdHourglassEmpty className="icon-sm animate-spin" />
            Generating PDF…
          </>
        ) : (
          <>
            <MdDownload className="icon-sm" />
            Download Itinerary (PDF)
          </>
        )}
      </button>

      {/* Off-screen template rendered for html2canvas */}
      <PDFTemplate trip={trip} ref={templateRef} />
    </>
  );
}

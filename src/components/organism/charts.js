"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const METRICS = [
  { full: "Produktivitas Kerja",     mid: "Prod. Kerja",   short: "Prod",      denganAI: 92, tanpaAI: 58 },
  { full: "Efisiensi Operasional",   mid: "Efisiensi Ops", short: "Efisiensi",  denganAI: 85, tanpaAI: 48 },
  { full: "Kecepatan Analisis Data", mid: "Analisis Data", short: "Analisis",   denganAI: 89, tanpaAI: 41 },
  { full: "Retensi & Resolusi CS",   mid: "Retensi CS",    short: "CS",         denganAI: 82, tanpaAI: 64 },
  { full: "Penghematan Biaya Ops",   mid: "Hemat Biaya",   short: "Biaya",      denganAI: 60, tanpaAI: 25 },
];

const denganAI = METRICS.map((m) => m.denganAI);
const tanpaAI  = METRICS.map((m) => m.tanpaAI);
const avgAI    = Math.round(denganAI.reduce((a, b) => a + b, 0) / denganAI.length);
const avgNoAI  = Math.round(tanpaAI.reduce((a, b) => a + b, 0) / tanpaAI.length);
const uplift   = Math.round(((avgAI - avgNoAI) / avgNoAI) * 100);

function getLabels(width) {
  if (width < 400) return METRICS.map((m) => m.short);
  if (width < 640) return METRICS.map((m) => m.mid);
  return METRICS.map((m) => m.full);
}

export default function PerformanceChart() {
  const canvasRef  = useRef(null);
  const chartRef   = useRef(null);
  const wrapperRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const buildChart = useCallback(async () => {
    const { Chart, registerables } = await import("chart.js");
    Chart.register(...registerables);

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width   = wrapperRef.current?.offsetWidth ?? window.innerWidth;
    const mobile  = width < 640;
    const labels  = getLabels(width);
    setIsMobile(mobile);

    chartRef.current = new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Dengan AI",
            data: denganAI,
            borderColor: "#60a5fa",
            backgroundColor: "rgba(96,165,250,0.08)",
            borderWidth: mobile ? 2 : 2.5,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#60a5fa",
            pointBorderColor: "#0f172a",
            pointBorderWidth: 2,
            pointRadius: mobile ? 4 : 5,
            pointHoverRadius: mobile ? 6 : 7,
          },
          {
            label: "Tanpa AI",
            data: tanpaAI,
            borderColor: "#34d399",
            backgroundColor: "rgba(52,211,153,0.06)",
            borderWidth: mobile ? 2 : 2.5,
            borderDash: [6, 3],
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#0f172a",
            pointBorderColor: "#34d399",
            pointBorderWidth: 2,
            pointRadius: mobile ? 4 : 5,
            pointHoverRadius: mobile ? 6 : 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external({ tooltip: t }) {
              if (t.opacity === 0) { setTooltip(null); return; }
              const idx   = t.dataPoints?.[0]?.dataIndex ?? 0;
              const items = t.dataPoints?.map((p) => ({
                label: p.dataset.label,
                value: p.raw,
                color: p.dataset.borderColor,
              })) ?? [];
              setTooltip({ x: t.caretX, y: t.caretY, title: METRICS[idx].full, items });
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.05)", drawTicks: false },
            border: { display: false },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              color: "#64748b",
              font: {
                size: mobile ? 10 : 11,
                weight: "500",
              },
              padding: mobile ? 6 : 10,
            },
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: "rgba(255,255,255,0.05)" },
            border: { display: false },
            ticks: {
              stepSize: 25,
              color: "#64748b",
              font: { size: mobile ? 9 : 11 },
              padding: mobile ? 4 : 8,
              callback: (v) => v,
            },
          },
        },
        layout: {
          padding: {
            top: 8,
            right: mobile ? 4 : 8,
            left: mobile ? 0 : 0,
            bottom: mobile ? 4 : 0,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    buildChart();
    let timer;
    const onResize = () => { clearTimeout(timer); timer = setTimeout(buildChart, 150); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); chartRef.current?.destroy(); };
  }, [buildChart]);

  const CARDS = [
    { label: "Rata-rata\ndengan AI", value: avgAI,         color: "text-blue-400",    glow: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.2)" },
    { label: "Rata-rata\ntanpa AI",  value: avgNoAI,       color: "text-emerald-400", glow: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.2)" },
    { label: "Peningkatan",          value: `+${uplift}%`, color: "text-violet-300",  glow: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.2)" },
  ];

  return (
    <div ref={wrapperRef} className="relative w-full overflow-hidden rounded-3xl p-[1px]"
      style={{
        background: "linear-gradient(135deg, rgba(96,165,250,0.25) 0%, rgba(52,211,153,0.15) 50%, rgba(139,92,246,0.2) 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Glass card */}
      <div
        className="relative w-full rounded-3xl p-4 sm:p-7"
        style={{
          background: "rgba(15, 18, 30, 0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Legend — horizontal, compact on mobile */}
        <div className="flex flex-row items-center gap-2 mb-4 sm:mb-6">
          {[
            { label: "Dengan AI", dot: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.25)", text: "text-blue-300" },
            { label: "Tanpa AI",  dot: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)",  text: "text-emerald-300" },
          ].map(({ label, dot, bg, border, text }) => (
            <span
              key={label}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5`}
              style={{ background: bg, border: `1px solid ${border}`, backdropFilter: "blur(8px)" }}
            >
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full" style={{ background: dot, boxShadow: `0 0 6px ${dot}` }} />
              <span className={`text-[10px] sm:text-[11px] font-medium tracking-wide whitespace-nowrap ${text}`}>{label}</span>
            </span>
          ))}
        </div>

        {/* Chart */}
        <div className="relative h-52 sm:h-80 lg:h-96 w-full">
          {tooltip && (
            <div
              className="pointer-events-none absolute z-10 min-w-[120px] rounded-xl px-2.5 py-2 text-xs shadow-2xl"
              style={{
                left: Math.min(tooltip.x + 10, (wrapperRef.current?.offsetWidth ?? 300) - 150),
                top: Math.max(tooltip.y - 48, 4),
                background: "rgba(10, 12, 20, 0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <p className="font-medium text-white mb-1 text-[10px] sm:text-xs leading-tight">{tooltip.title}</p>
              {tooltip.items.map((item) => (
                <p key={item.label} className="flex justify-between gap-3 text-[10px] sm:text-xs" style={{ color: item.color }}>
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </p>
              ))}
            </div>
          )}
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Line chart comparing AI vs non-AI performance metrics"
          />
        </div>

        {/* Divider */}
        <div className="my-4 sm:my-5 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {CARDS.map(({ label, value, color, glow, border }) => (
            <div
              key={label}
              className="rounded-xl sm:rounded-2xl px-2 py-3 sm:px-3 sm:py-4 text-center flex flex-col items-center justify-between gap-1"
              style={{ background: glow, border: `1px solid ${border}`, backdropFilter: "blur(8px)" }}
            >
              <p className="text-[9px] sm:text-[10px] text-white/40 leading-tight whitespace-pre-line">{label}</p>
              <p className={`text-lg sm:text-2xl font-semibold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
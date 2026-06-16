"use client";

import { useEffect, useRef } from "react";

const data = [
  { name: "Produktivitas Kerja", denganAI: 92, tanpaAI: 58 },
  { name: "Efisiensi Operasional", denganAI: 85, tanpaAI: 48 },
  { name: "Kecepatan Analisis Data", denganAI: 89, tanpaAI: 41 },
  { name: "Retensi & Resolusi CS", denganAI: 82, tanpaAI: 64 },
  { name: "Penghematan Biaya Ops", denganAI: 60, tanpaAI: 25 }
];

const fullLabels = data.map((d) => d.name);
const denganAI = data.map((d) => d.denganAI);
const tanpaAI = data.map((d) => d.tanpaAI);

// Menyesuaikan jumlah label dinamis (5 data) agar pas di layar mobile/tablet tanpa memotong data
const mediumLabels = [
  "Prod Kerja",
  "Efisiensi Ops",
  "Analisis Data",
  "Resolusi CS",
  "Hemat Biaya"
];

// PLUGIN: Membuat efek glow/neon pekat pada garis dan lingkaran node data
const neonGlowPlugin = {
  id: "neonGlow",
  beforeDatasetsDraw(chart) {
    // Membuat garis utama ikut memancarkan pendaran neon
    const { ctx } = chart;
    chart.data.datasets.forEach((ds, dsIndex) => {
      const meta = chart.getDatasetMeta(dsIndex);
      if (meta.hidden) return;
      ctx.save();
      ctx.shadowColor = ds.glowColor || ds.borderColor;
      ctx.shadowBlur = ds.glowBlur || 25;
      ctx.lineWidth = ds.borderWidth;
      ctx.strokeStyle = ds.borderColor;
    });
  },
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach((ds, dsIndex) => {
      const meta = chart.getDatasetMeta(dsIndex);
      if (meta.hidden) return;
      ctx.save();
      
      // Mengatur intensitas efek neon bulat pada titik simpul (node)
      ctx.shadowColor = ds.glowColor || ds.borderColor;
      ctx.shadowBlur = 30; // Menaikkan intensitas pancaran cahaya luar
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      meta.data.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2); // Ukuran node diperbesar agar pendaran lebih luas
        ctx.fillStyle = "#ffffff"; // Titik tengah putih solid menciptakan kontras lampu neon menyala
        ctx.strokeStyle = ds.borderColor;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();
      });
      ctx.restore();
    });
  },
};

const verticalDashPlugin = {
  id: "verticalDash",
  afterDraw(chart) {
    const {
      ctx,
      chartArea: { top, bottom },
      scales: { x },
    } = chart;
    
    chart.data.labels.forEach((_, i) => {
      const xPos = x.getPixelForValue(i);
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xPos, top);
      ctx.lineTo(xPos, bottom);
      ctx.stroke();
      ctx.restore();
    });
  },
};

export default function CustomChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    import("chart.js").then(({ Chart, registerables }) => {
      Chart.register(...registerables);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = canvasRef.current.getContext("2d");

      chartRef.current = new Chart(ctx, {
        type: "line",
        plugins: [neonGlowPlugin, verticalDashPlugin],
        data: {
          labels: fullLabels,
          datasets: [
            {
              label: "Dengan AI",
              data: denganAI,
              borderColor: "#60a5fa",
              borderWidth: 4, // Ketebalan garis ditingkatkan agar jalur neon terlihat solid
              glowColor: "#3b82f6",
              tension: 0.4,
              fill: false,
            },
            {
              label: "Tanpa AI",
              data: tanpaAI,
              borderColor: "#34d399",
              borderWidth: 4,
              glowColor: "#10b981",
              tension: 0.4,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 15,
              bottom: 10,
              left: 10,
              right: 10
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true, // DIUBAH: Kembali aktif normal menggunakan interaksi internal Chart.js
              backgroundColor: "rgba(15,18,25,0.95)",
              borderColor: "rgba(255,255,255,0.1)",
              borderWidth: 1,
              padding: 12,
              titleFont: { size: 12, weight: "bold" },
              bodyFont: { size: 12 },
              displayColors: true,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: {
                color: "#64748b",
                font: { size: 10, weight: "500" },
                padding: 12,
                maxRotation: 0,
                minRotation: 0,
                autoSkip: false,
                callback: function (value, index) {
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    return mediumLabels[index];
                  }
                  return fullLabels[index];
                },
              },
            },
            y: {
              display: false,
              min: 0,
              max: 100,
            },
          },
          // Mencakup mode interaksi indeks agar saat area didekati, kedua garis ter-hover bersamaan
          interaction: { mode: "index", intersect: false },
        },
      });
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-[#0f1219] p-5 sm:p-6 rounded-[24px] border border-white/[0.05] shadow-2xl">
      
      {/* Legend Badge */}
      <div className="flex flex-row items-center justify-start gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#253954]/50 border border-[#3b82f6]/25 rounded-full backdrop-blur-sm">
          <span
            className="w-2 h-2 rounded-full bg-[#60a5fa]"
            style={{ boxShadow: "0 0 10px #3b82f6" }}
          />
          <span className="text-[11px] font-medium text-[#b8d4f8] tracking-wide whitespace-nowrap">
            Dengan AI
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#142d24]/50 border border-[#34d399]/20 rounded-full backdrop-blur-sm">
          <span
            className="w-2 h-2 rounded-full bg-[#34d399]"
            style={{ boxShadow: "0 0 10px #10b981" }}
          />
          <span className="text-[11px] font-medium text-[#6ee7b7] tracking-wide whitespace-nowrap">
            Tanpa AI
          </span>
        </div>
      </div>

      {/* Container Canvas */}
      <div className="relative w-full aspect-[2/1] min-h-[260px] sm:min-h-[320px]">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Line chart comparing AI vs non-AI performance metrics"
        />
      </div>
    </div>
  );
}
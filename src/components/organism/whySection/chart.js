"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";

const EfficiencyParallax = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [tooltip, setTooltip] = useState(null);
  const [progress, setProgress] = useState(0);

  // Data efisiensi berdasarkan laporan nyata 2024–2026
  const dataNonAI = [22, 35, 48, 30, 25, 40, 15, 20];
  const dataAI = [88, 76, 94, 85, 87, 92, 75, 45];
  
  const monthLabels = [
    "Produktivitas",
    "Efisiensi Ops",
    "Kinerja Karyw.",
    "Pemasaran",
    "Analisis Data",
    "Akurasi Forecast",
    "Lead Gen",
    "Profitabilitas",
  ];
  const monthLabelsFull = [
    "Produktivitas Operasional",
    "Efisiensi Operasional",
    "Kinerja Karyawan",
    "Pemasaran & Creative",
    "Analisis Data Konsumen",
    "Akurasi Forecast Penjualan",
    "Lead Generation",
    "Profitabilitas",
  ];

  // Chart dimensions
  const W = 880;
  const H = 320;
  const padX = 20;
  const padY = 36;
  const minY = 0;
  const maxY = 100;

  const getX = (i) => padX + (i * (W - padX * 2)) / (dataAI.length - 1);
  const getY = (v) => H - padY - ((v - minY) / (maxY - minY)) * (H - padY * 2);

  // Smooth cubic bezier path
  const smoothPath = (data) => {
    let d = "";
    for (let i = 0; i < data.length; i++) {
      const x = getX(i);
      const y = getY(data[i]);
      if (i === 0) {
        d += `M ${x},${y}`;
      } else {
        const px = getX(i - 1);
        const py = getY(data[i - 1]);
        const cp1x = px + (x - px) * 0.5;
        const cp2x = x - (x - px) * 0.5;
        d += ` C ${cp1x},${py} ${cp2x},${y} ${x},${y}`;
      }
    }
    return d;
  };

  const pathNonAI = smoothPath(dataNonAI);
  const pathAI = smoothPath(dataAI);

  // Area fill path for AI line
  const areaAI = () => {
    const base = H - padY;
    let d = `M ${getX(0)},${base}`;
    for (let i = 0; i < dataAI.length; i++) {
      const x = getX(i);
      const y = getY(dataAI[i]);
      if (i === 0) {
        d += ` L ${x},${y}`;
      } else {
        const px = getX(i - 1);
        const py = getY(dataAI[i - 1]);
        const cp1x = px + (x - px) * 0.5;
        const cp2x = x - (x - px) * 0.5;
        d += ` C ${cp1x},${py} ${cp2x},${y} ${x},${y}`;
      }
    }
    d += ` L ${getX(dataAI.length - 1)},${base} Z`;
    return d;
  };

  // Scroll-driven progress
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setProgress(Math.min(1, Math.max(0, (v - 0.1) / 0.9)));
    });
    return () => unsub();
  }, [scrollYProgress]);

  // Heading motion
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  // Active dot position along AI line (follows scroll)
  const activeIndex = Math.min(
    dataAI.length - 1,
    Math.floor(progress * (dataAI.length - 1)),
  );
  const dotX = getX(activeIndex);
  const dotY = getY(dataAI[activeIndex]);

  // Horizontal grid lines
  const gridLines = [25, 50, 75, 100];

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 w-full">
          {/* Heading */}
          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="mx-auto pb-18 w-[90%] flex flex-col justify-center items-center"
          >
            <H2 align="center">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Efisiensi Meningkat Drastis
              </span>{" "}
              dengan AI & Otomatisasi
            </H2>
            <Paragraph align="center">
              Grafik berikut menunjukkan dampak nyata teknologi cerdas terhadap
              efisiensi bisnis.
            </Paragraph>
          </motion.div>

          {/* Chart Card */}
          <div
            className="
              relative overflow-hidden rounded-[20px] 
              border border-white/10 px-6 pt-7 pb-5 
              bg-[#0000006e] backdrop-blur-xl 
              transition-all duration-500 
              shadow-[0_0_60px_rgba(59,130,246,0.25)] 
              hover:shadow-[0_0_100px_rgba(59,130,246,0.50)]
            "
          >
            {/* 🌈 Gradient Glow - Background Layer */}
            <div className="
              pointer-events-none
              absolute -inset-[1px]
              rounded-[20px]
              blur-xl
              opacity-70
            " />

            {/* ✨ Inner subtle light */}
            <div className="
              pointer-events-none
              absolute inset-0
              rounded-[20px]
              bg-gradient-to-b from-white/5 to-transparent
            " />

            {/* 🔥 CONTENT */}
            <div className="relative z-10">
              {/* Subtle inner glow top - converted to Tailwind */}
              <div className="absolute top-0 left-[20%] right-[20%] h-px pointer-events-none bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

              {/* Legend badges — top right */}
              <div className="absolute top-5 right-6 flex flex-col gap-2 items-end z-10">
                {/* Dengan AI */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500 text-white text-[11px] font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  Dengan AI
                </div>

                {/* Tanpa AI */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 text-white/40 text-[11px] font-medium tracking-wide border border-dashed border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
                  Tanpa AI
                </div>
              </div>

              {/* SVG Chart */}
              <div className="relative">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full h-auto block overflow-visible"
                >
                  <defs>
                    <linearGradient id="areaGradAI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                    <clipPath id="progressClip">
                      <rect x="0" y="0" width={W * progress} height={H + 40} />
                    </clipPath>
                    <filter
                      id="dotGlow"
                      x="-100%"
                      y="-100%"
                      width="300%"
                      height="300%"
                    >
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Horizontal grid lines */}
                  {gridLines.map((val) => (
                    <line
                      key={val}
                      x1={padX}
                      y1={getY(val)}
                      x2={W - padX}
                      y2={getY(val)}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Bottom axis line */}
                  <line
                    x1={padX}
                    y1={H - padY}
                    x2={W - padX}
                    y2={H - padY}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />

                  {/* Area fill — AI */}
                  <path
                    d={areaAI()}
                    fill="url(#areaGradAI)"
                    clipPath="url(#progressClip)"
                  />

                  {/* Non-AI line */}
                  <motion.path
                    d={pathNonAI}
                    fill="none"
                    stroke="rgba(150,160,180,0.5)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                    clipPath="url(#progressClip)"
                  />

                  {/* AI line */}
                  <motion.path
                    d={pathAI}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    clipPath="url(#progressClip)"
                  />

                  {/* Data point dots — Non AI */}
                  {dataNonAI.map((v, i) => {
                    if (i > activeIndex) return null;
                    return (
                      <circle
                        key={`n-${i}`}
                        cx={getX(i)}
                        cy={getY(v)}
                        r={i === activeIndex ? 5 : 3.5}
                        fill={
                          i === activeIndex
                            ? "rgba(150,160,180,0.9)"
                            : "rgba(150,160,180,0.5)"
                        }
                        stroke={i === activeIndex ? "#0d1117" : "none"}
                        strokeWidth="2"
                        className="cursor-pointer"
                        onMouseEnter={() =>
                          setTooltip({
                            type: "nonai",
                            index: i,
                            x: getX(i),
                            y: getY(v),
                          })
                        }
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}

                  {/* Data point dots — AI */}
                  {dataAI.map((v, i) => {
                    if (i > activeIndex) return null;
                    return (
                      <circle
                        key={`a-${i}`}
                        cx={getX(i)}
                        cy={getY(v)}
                        r={i === activeIndex ? 6 : 3.5}
                        fill={
                          i === activeIndex ? "#3b82f6" : "rgba(59,130,246,0.7)"
                        }
                        stroke={i === activeIndex ? "#0d1117" : "none"}
                        strokeWidth="2"
                        filter={i === activeIndex ? "url(#dotGlow)" : undefined}
                        className="cursor-pointer"
                        onMouseEnter={() =>
                          setTooltip({
                            type: "ai",
                            index: i,
                            x: getX(i),
                            y: getY(v),
                          })
                        }
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}

                  {/* Pulse ring on active AI dot */}
                  {progress > 0 && (
                    <circle
                      cx={dotX}
                      cy={dotY}
                      r="14"
                      fill="none"
                      stroke="rgba(59,130,246,0.35)"
                      strokeWidth="1.5"
                    >
                      <animate
                        attributeName="r"
                        values="10;18;10"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0;0.5"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Month labels on X axis */}
                  {monthLabels.map((m, i) => (
                    <text
                      key={m}
                      x={getX(i)}
                      y={H - 6}
                      textAnchor="middle"
                      fill={
                        i <= activeIndex
                          ? "rgba(255,255,255,0.35)"
                          : "rgba(255,255,255,0.12)"
                      }
                      fontSize="11"
                      fontFamily="inherit"
                      className="transition-colors duration-300"
                    >
                      {m}
                    </text>
                  ))}
                </svg>
              </div>

              {/* Legend — bottom */}
              <div className="flex justify-center gap-6 mt-3 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <svg width="22" height="2" viewBox="0 0 22 2">
                    <line
                      x1="0"
                      y1="1"
                      x2="22"
                      y2="1"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Dengan AI (2024–2026)
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="22" height="2" viewBox="0 0 22 2">
                    <line
                      x1="0"
                      y1="1"
                      x2="22"
                      y2="1"
                      stroke="rgba(150,160,180,0.6)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Tanpa AI / Metode Konvensional
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip - rendered outside SVG but positioned absolutely */}
      {tooltip && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: tooltip.x + (tooltip.x > W * 0.75 ? -100 : 8),
            top: tooltip.y + (tooltip.y < padY + 30 ? 10 : -50),
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="bg-[#0d1117]/92 border border-white/10 rounded-lg px-2.5 py-1.5 text-white whitespace-nowrap backdrop-blur-md text-[11px]">
            <span className={tooltip.type === "ai" ? "text-blue-500" : "text-white/60"}>
              {tooltip.type === "ai" ? "Dengan AI" : "Tanpa AI"}
            </span>
            <br />
            <span className="text-white/60 text-[10px]">
              {monthLabelsFull[tooltip.index]} • {tooltip.type === "ai" ? dataAI[tooltip.index] : dataNonAI[tooltip.index]}%
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default EfficiencyParallax;
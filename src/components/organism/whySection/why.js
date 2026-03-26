"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { H2, H3 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";
import { motion } from "framer-motion";
import { FiCpu, FiTrendingUp, FiClock, FiGrid } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const EfficiencyParallax = dynamic(() => import("./chart"), { ssr: false });

const features = [
  {
    key: "tech",
    icon: <FiCpu className="w-5 h-5" />,
    tag: "INOVASI",
    title: "Teknologi Inovasi Terbaru",
    desc: "Kami menggunakan teknologi dan pendekatan terbaru untuk memastikan solusi Anda selalu relevan, cepat, dan kompetitif.",
    accent: "from-blue-400 to-indigo-500",
    glow: "shadow-blue-500/20",
    featured: true,
  },
  {
    key: "roi",
    icon: <FiTrendingUp className="w-5 h-5" />,
    tag: "ROI",
    title: "Fokus pada ROI",
    desc: "Setiap strategi kami dirancang untuk memberikan hasil nyata dan meningkatkan return on investment bisnis Anda.",
    accent: "from-cyan-400 to-blue-500",
    glow: "shadow-cyan-500/20",
    featured: false,
  },
  {
    key: "ai",
    icon: <FiClock className="w-5 h-5" />,
    tag: "24/7 AI",
    title: "Layanan 24 Jam Berbasis AI",
    desc: "Didukung sistem AI yang siap membantu dan mengoptimalkan operasional Anda selama 24/7 tanpa henti.",
    accent: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/20",
    featured: false,
  },
  {
    key: "workflow",
    icon: <FiGrid className="w-5 h-5" />,
    tag: "WORKFLOW",
    title: "Workflow Terstruktur",
    desc: "Proses kerja yang rapi, terukur, dan transparan sehingga setiap langkah dapat dipantau dengan jelas.",
    accent: "from-rose-400 to-pink-500",
    glow: "shadow-rose-500/20",
    featured: false,
  },
];

export default function WhyUsSection() {
  const [hovered, setHovered] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Flag untuk menghindari hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <EfficiencyParallax />

      <section className="mt-[-120px]  text-white py-28 px-6">
        <div className="max-w-6xl mx-auto text-center relative">
          {/* TITLE */}
          <label className="text-sm text-neutral-400">WHY US</label>
          <H2 align="center" className="mb-12">
            Mengapa Memilih Kami?
          </H2>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  relative rounded-2xl border p-6 cursor-pointer transition-all duration-500 group overflow-hidden backdrop-blur-sm bg-white/[0.03] border-white/[0.07] hover:border-white/15 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-white/5'
                  }
                `}
              >
                {/* Hover Glow */}

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full justify-center items-center">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg
                    ${item.featured ? 'bg-white/20 text-white' : `bg-gradient-to-br ${item.accent} text-white shadow-lg ${item.glow}`}
                  `}>
                    {item.icon}
                  </div>

                  {/* Tag */}
                  {item.tag && (
                    <span className={`text-xs tracking-widest font-semibold mb-2 uppercase ${item.featured ? 'text-white/60' : 'text-white/30'}`}>
                      {item.tag}
                    </span>
                  )}

                  {/* Title */}
                  <H3 align="center" className="leading-snug mb-3 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </H3>

                  {/* Description */}
                  <Paragraph align='center' fontSize="sm" className={`flex-1 transition-colors duration-300 ${item.featured ? 'text-white/70' : 'text-white/40 group-hover:text-white/60'}`}>
                    {item.desc}
                  </Paragraph>

                </div>

                {/* Featured Decorations */}
                {item.featured && (
                  <>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
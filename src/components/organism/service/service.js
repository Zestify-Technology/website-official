"use client";

import { useState, useEffect } from "react";
import { H2, H3 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";
import Section from "@/components/template/section/section";
import {
  FaBolt,
  FaProjectDiagram,
  FaRobot,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";
import Overlay from "@/components/template/overlay/overlay";
import Efficiency, {
  AIAgent,
  AIWorkflow,
  IntegratedBusinessSystem,
} from "./detail";

const services = [
  {
    id: 1,
    icon: <FaBolt className="w-5 h-5" />,
    tag: "EFISIENSI",
    title: "Operational Efisiensi Upgrade",
    desc: "Identifikasi celah operasional dan transformasikan alur kerja bisnis Anda menjadi mesin yang lebih cepat, lebih hemat, dan bebas dari hambatan manual.",
    accent: "from-violet-600 to-indigo-600",
    glow: "shadow-violet-500/30",
    featured: true,
    component: "Efficiency",
  },
  {
    id: 2,
    icon: <FaProjectDiagram className="w-5 h-5" />,
    tag: "INTEGRASI",
    title: "Integrated Business System Setup",
    desc: "Hubungkan semua platform bisnis Anda — CRM, ERP, hingga tools marketing — dalam satu ekosistem terintegrasi yang saling berbicara secara otomatis.",
    accent: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    featured: false,
    component: "IntegratedBusinessSystem",
  },
  {
    id: 3,
    icon: <FaRobot className="w-5 h-5" />,
    tag: "AI WORKFLOW",
    title: "AI-Enhanced Workflow System",
    desc: "Otomatiskan keputusan berulang dan percepat eksekusi tim dengan sistem workflow yang ditenagai kecerdasan buatan — dari inbox hingga laporan akhir bulan.",
    accent: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    featured: false,
    component: "AIWorkflow",
  },
  {
    id: 4,
    icon: <FaComments className="w-5 h-5" />,
    tag: "AI AGENT",
    title: "Custom AI Agent Deployment",
    desc: "Bangun dan deploy AI agent khusus bisnis Anda — mulai dari agen customer service 24/7, agen analitik data real-time, hingga agen negosiasi vendor yang bekerja tanpa henti.",
    accent: "from-rose-500 to-pink-600",
    glow: "shadow-rose-500/20",
    featured: false,
    component: "AIAgent",
  },
];

const componentMap = {
  Efficiency: Efficiency,
  IntegratedBusinessSystem: IntegratedBusinessSystem,
  AIWorkflow: AIWorkflow,
  AIAgent: AIAgent,
};

export default function ServicesSection() {
  const [hovered, setHovered] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  // Flag to check client rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLearnMore = (componentName) => {
    const Component = componentMap[componentName];
    if (Component) {
      setActiveComponent(() => Component);
      setOpenOverlay(true);
    }
  };

  const handleCloseOverlay = () => {
    setOpenOverlay(false);
    // Delay clearing the component to allow exit animation
    setTimeout(() => {
      setActiveComponent(null);
    }, 300);
  };

  const ActiveDetailComponent = activeComponent;

  return (
    <>
      {/* Overlay with isOpen prop */}
      <Overlay onClose={handleCloseOverlay} isOpen={openOverlay}>
        {ActiveDetailComponent && <ActiveDetailComponent />}
      </Overlay>

      <Section id="solution" className="py-28 px-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-700/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-white/50 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Layanan Kami
              </div>
              <H2 align="left" className="text-4xl lg:text-5xl">
                Solusi AI untuk{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Bisnis Modern
                </span>
              </H2>
            </div>
            <div className="lg:max-w-xs lg:text-right">
              <Paragraph align="right">
                Kami merancang implementasi AI yang bukan sekadar tren — tapi
                benar-benar menggerakkan pertumbuhan operasional bisnis Anda
                secara terukur.
              </Paragraph>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-2xl border p-6 transition-all duration-500 group overflow-hidden backdrop-blur-sm flex flex-col
                  ${
                    service.featured
                      ? `bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 border-transparent shadow-2xl ${service.glow}`
                      : "bg-white/[0.03] border-white/[0.07] hover:border-white/15 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-white/5"
                  }`}
              >
                {/* Hover Glow only on client */}
                {isClient && !service.featured && hovered === service.id && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-5 transition-opacity duration-500`}
                  />
                )}

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg
                    ${service.featured ? "bg-white/20 text-white" : `bg-gradient-to-br ${service.accent} text-white shadow-lg ${service.glow}`}
                  `}
                  >
                    {service.icon}
                  </div>
                  <span
                    className={`text-xs tracking-widest font-semibold mb-2 uppercase ${service.featured ? "text-white/60" : "text-white/30"}`}
                  >
                    {service.tag}
                  </span>
                  <H3
                    align="left"
                    className="leading-snug mb-3 transition-colors duration-300 group-hover:text-white"
                  >
                    {service.title}
                  </H3>
                  <Paragraph
                    fontSize="sm"
                    className={`flex-1 transition-colors duration-300 mb-4 ${service.featured ? "text-white/70" : "text-white/40 group-hover:text-white/60"}`}
                  >
                    {service.desc}
                  </Paragraph>{" "}
                  <br />
                  {/* Learn More Button */}
                  <button
                    onClick={() => handleLearnMore(service.component)}
                    className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group/btn
                      ${
                        service.featured
                          ? "text-white/80 hover:text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                  >
                    <span>Pelajari Lebih Lanjut</span>
                    <FaArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>

                {/* Featured Decoration */}
                {service.featured && (
                  <>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

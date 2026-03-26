"use client";

import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";
import Section from "@/components/template/section/section";
import { useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Perkenalan identitas bisnis",
    description:
      "Memperkenalkan bisnis untuk menyelaraskan persepsi terhadap bisnis dan produknya.",
  },
  {
    number: "02",
    title: "Identifikasi & pemecahan masalah",
    description:
      "Mengidentifikasi masalah-masalah yang ada di dalam sistem dan alur bisnis dan merancang solusi untuk mengatasi masalah tersebut.",
  },
  {
    number: "03",
    title: "Eksekusi dan eksperimen",
    description:
      "Membangun sistem teknologi yang telah dirancang dan terus dilanjukan kedalam tahap pengembangan.",
  },
];

// Fixed height per step - no layout shift
const STEP_HEIGHT = 120; // px
const BUBBLE_SIZE = 40;
const BUBBLE_OFFSET = (STEP_HEIGHT - BUBBLE_SIZE) / 2;

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Line geometry - purely mathematical
  const firstBubbleCenter = BUBBLE_OFFSET + BUBBLE_SIZE / 2;
  const stepSpacing = STEP_HEIGHT;
  const activeBubbleCenter =
    activeStep * stepSpacing + BUBBLE_OFFSET + BUBBLE_SIZE / 2;
  const trackTotal = (steps.length - 1) * stepSpacing;

  return (
    <Section
      id="workflow"
      className="isolate  overflow-hidden w-full py-28 px-6"
    >
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-center">
        {/* ── LEFT ── */}
        <div className="flex flex-col gap-5">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-blue-400">
            Tahapan Eksperimen
          </span>
          <H2>Merencanakan solusi teknologi terbaru pada bisnis</H2>
          <Paragraph>
            Pada tahapan awal ini kami menyadari bahwa kami perlu terus
            mengembangkan kemampuan kami dalam menciptakan solusi dari berbagai
            permasalahan yang ada pada bisnis, sebab itu kami terus berlatih
            menciptakan solusi di beberapa bisnis sebagai tempat eksperimen
            kami.
          </Paragraph>
        </div>

        {/* ── RIGHT ── */}
        <div className="w-full">
          {/* Steps container - fixed total height, NO layout shift */}
          <div
            className="relative"
            style={{ height: steps.length * STEP_HEIGHT }}
          >
            {/* Background track */}
            <div
              className="absolute left-[19px] w-[2px] bg-white/10 rounded-full pointer-events-none"
              style={{
                top: firstBubbleCenter,
                height: trackTotal,
              }}
            />

            {/* Animated fill line */}
            <div
              className="absolute left-[19px] w-[2px] rounded-full pointer-events-none bg-gradient-to-b from-blue-400 to-blue-700 transition-all duration-700 ease-in-out"
              style={{
                top: firstBubbleCenter,
                height: Math.max(0, activeBubbleCenter - firstBubbleCenter),
                boxShadow: "0 0 10px rgba(59,130,246,0.7)",
              }}
            />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className="absolute left-0 right-0 flex gap-6 items-start cursor-pointer group"
                style={{ top: i * STEP_HEIGHT, height: STEP_HEIGHT }}
                onClick={() => setActiveStep(i)}
              >
                {/* Number bubble - vertically centered */}
                <div
                  className="flex-shrink-0 z-10"
                  style={{ marginTop: BUBBLE_OFFSET }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      activeStep === i
                        ? "bg-gradient-to-br from-blue-400 to-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                        : "bg-[#0e1220] border border-white/10 text-neutral-500 group-hover:border-white/30"
                    }`}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Text content - fixed height, description uses absolute position */}
                <div
                  className="flex-1 min-w-0 flex flex-col justify-center relative"
                  style={{ height: STEP_HEIGHT }}
                >
                  {/* Step label */}
                  <p
                    className={`text-[10px] font-semibold tracking-[0.18em] uppercase mb-1 text-blue-400 transition-all duration-300 ${
                      activeStep === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1"
                    }`}
                  >
                    Step {step.number}
                  </p>

                  {/* Title - margin reduced to avoid layout shift */}
                  <h3
                    className={`font-bold text-base leading-snug mb-0 transition-colors duration-300 ${
                      activeStep === i ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Description - ABSOLUTE POSITION, does NOT affect layout height */}
                  <div className="relative">
                    <p
                      className={`absolute left-0 right-0 text-sm text-neutral-500 leading-relaxed transition-all duration-500 ${
                        activeStep === i
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                      style={{ top: "4px" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-20 ml-16">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                  activeStep === i
                    ? "bg-blue-500 w-9"
                    : "bg-white/20 w-6 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

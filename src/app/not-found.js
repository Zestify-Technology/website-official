"use client";

import { useEffect, useRef } from "react";
import { GlassButton } from "@/components/molecules/button/button";
import Footer from "@/components/molecules/footer/footer";



export default function NotFound() {
  const canvasRef = useRef(null);

  // ── floating particles effect ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));

    let animId;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* ── ambient background glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[800px] h-[600px] rounded-full bg-white/[0.03] blur-[140px]" />
        </div>

        {/* ── particle canvas ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-40"
        />

        {/* ── content wrapper ── */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* ── big 404 (Moved Up) ── */}
          <h1
            className="select-none text-[clamp(140px,26vw,300px)] font-black tracking-tighter leading-none
                       text-transparent bg-clip-text mb-[-2rem] md:mb-[-4rem]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.03) 100%)",
              WebkitTextStroke: "1px rgba(255,255,255,0.12)",
            }}
          >
            404
          </h1>

          {/* ── glassmorphism card ── */}
          <div
            className="w-[clamp(300px,42vw,440px)]
                       rounded-3xl px-8 py-10
                       flex flex-col items-center gap-5
                       border border-white/[0.08]
                       shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]"
            style={{
              background: "linear-gradient(150deg, rgba(24,24,24,0.9) 0%, rgba(12,12,12,0.96) 100%)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* card top highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/5 h-px
                            bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="space-y-2 text-center">
              <h2 className="text-white text-2xl font-bold tracking-tight">
                Oops, page not found
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-[280px] mx-auto">
                Halaman yang kamu cari mungkin sudah dipindahkan, dihapus, atau tidak pernah ada.
              </p>
            </div>

<GlassButton href="/" />
          </div>
        </div>

        {/* ── bottom decorative orb ── */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2
                        w-96 h-48 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      </main>
      <Footer />
    </>
  );
}
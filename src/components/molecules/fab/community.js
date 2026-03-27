"use client";

import { useState } from "react";

export default function CommunityComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.6) 0%,
            rgba(255,255,255,1) 30%,
            rgba(165,180,252,1) 50%,
            rgba(255,255,255,1) 70%,
            rgba(255,255,255,0.6) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .fade-up-1 { animation: fadeSlideUp 0.45s ease forwards; animation-delay: 0.05s; opacity: 0; }
        .fade-up-2 { animation: fadeSlideUp 0.45s ease forwards; animation-delay: 0.15s; opacity: 0; }
        .fade-up-3 { animation: fadeSlideUp 0.45s ease forwards; animation-delay: 0.25s; opacity: 0; }
        .fade-up-4 { animation: fadeSlideUp 0.45s ease forwards; animation-delay: 0.35s; opacity: 0; }
        .fade-up-5 { animation: fadeSlideUp 0.45s ease forwards; animation-delay: 0.45s; opacity: 0; }
      `}</style>

      <div className="relative flex flex-col min-h-full w-full overflow-hidden text-white/90">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full w-[300px] h-[300px] -top-20 -right-24"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 py-2">

          {/* Badge */}
          <div className="fade-up-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/12 border border-indigo-500/30 text-[0.65rem] tracking-[0.1em] uppercase font-semibold text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_6px_#6366f1] inline-block" />
              Segera Hadir
            </div>
          </div>

          {/* Headline */}
          <div className="fade-up-2">
            <h2
              className="font-bold leading-tight mb-1 bg-gradient-to-r from-white to-indigo-500 bg-clip-text text-transparent"
              style={{ fontSize: "clamp(1.3rem, 4vw, 1.6rem)" }}
            >
              Komunitas Teknologi
              <br />
              Enthusiast
            </h2>
            <p className="text-indigo-300/70 text-[0.7rem] tracking-wide">
              by Zestify
            </p>
          </div>

          {/* Description */}
          <div className="fade-up-3">
            <p className="text-white/40 text-[0.8rem] leading-relaxed">
              Ruang bagi para tech enthusiast untuk berbagi, belajar, dan tumbuh bersama —
              diskusi, insight, dan kolaborasi nyata dalam satu ekosistem.
            </p>
          </div>

          {/* Feature list */}
          <div className="fade-up-3 flex flex-col gap-2">
            {[
              { icon: "💬", label: "Forum Diskusi" },
              { icon: "⚡", label: "Tech Insights" },
              { icon: "🤝", label: "Kolaborasi" },
              { icon: "🎯", label: "Workshop" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 text-[0.78rem] text-white/50"
              >
                <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-500/12 text-[0.75rem]">
                  {f.icon}
                </span>
                {f.label}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="fade-up-4">
            <div className="h-px bg-white/7" />
          </div>

          {/* Notify form */}
          <div className="fade-up-4">
            <p className="mb-2 text-[0.7rem] text-white/30">
              Daftarkan email untuk notifikasi
            </p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email kamu..."
                  className="flex-1 rounded-xl px-3 py-2 text-[0.78rem] bg-white/5 border border-white/10 text-white/90 placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-xl px-4 py-2 text-white font-semibold flex-shrink-0 text-[0.75rem] bg-indigo-400/85 hover:bg-indigo-500 transition-colors"
                >
                  Daftar
                </button>
              </form>
            ) : (
              <div className="py-2.5 px-3 rounded-xl text-[0.78rem] text-indigo-300 bg-indigo-500/10 border border-indigo-500/25">
                ✓ &nbsp;Terdaftar! Kami akan kabari segera.
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="fade-up-5 pb-2">
            <a
              href="https://zestify.id"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-white font-semibold text-[0.82rem] no-underline bg-gradient-to-r from-indigo-500 to-purple-500 hover:translate-y-[-1px] hover:shadow-[0_8px_24px_rgba(99,102,241,0.4)] hover:brightness-110 transition-all duration-200"
            >
              <span>Kunjungi Website Zestify</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
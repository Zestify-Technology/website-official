"use client";

import Image from "next/image";
import { useState } from "react";


const footerLinks = [
  {
    heading: "Layanan",
    links: ["Otomasi Workflow", "Integrasi Sistem", "AI Workflow", "Custom AI Agent"],
  },
  {
    heading: "Perusahaan",
    links: ["Mengapa Kami", "Solusi", "About Us", "Karir"],
  },
  {
    heading: "Dukungan",
    links: ["FAQ", "Hubungi Kami", "Status Sistem"],
  },
  {
    heading: "Legal",
    links: ["Syarat & Ketentuan", "Kebijakan Privasi", "Keamanan Data", "NDA Policy"],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer className="relative w-full  overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(140,100,255,0.4), transparent)" }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[120px]"
        style={{ background: "radial-gradient(ellipse, rgba(100,60,220,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-16 pb-10">

        {/* ── Top Row ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-20 mb-14">

          {/* Left — Brand + Newsletter */}
          <div>
            {/* Logo */}
            <div className="flex text-white text-xl items-center gap-2.5 mb-5">
                Zestify
            </div>

            <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-xs">
              Daftarkan email Anda untuk mendapatkan tips otomasi bisnis dan update layanan terbaru dari kami.
            </p>

            {/* Email form */}
            {submitted ? (
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Terima kasih, Anda sudah terdaftar!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="flex-1 min-w-0 bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all duration-200"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-400 text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_16px_rgba(120,60,220,0.3)] hover:shadow-[0_0_24px_rgba(120,60,220,0.5)]"
                >
                  Kirim
                </button>
              </form>
            )}

            <p className="text-neutral-600 text-xs mt-3 leading-relaxed max-w-xs">
              Dengan mendaftar, Anda menyetujui{" "}
              <span className="text-neutral-500 hover:text-purple-400 cursor-pointer transition-colors">Kebijakan Privasi</span>
              {" "}kami dan bersedia menerima informasi dari perusahaan.
            </p>
          </div>

          {/* Right — Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p
                  className="text-white text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-neutral-500 hover:text-neutral-200 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* ── Bottom Row ── */}
        <div className="flex pb-15  flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} Zestify. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="text-neutral-600 hover:text-neutral-300 transition-colors duration-200">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M16.667 2H3.333A1.333 1.333 0 002 3.333v13.334A1.333 1.333 0 003.333 18h13.334A1.333 1.333 0 0018 16.667V3.333A1.333 1.333 0 0016.667 2zM6.667 15.333H4.444V8h2.223v7.333zM5.556 7.022a1.289 1.289 0 110-2.578 1.289 1.289 0 010 2.578zM15.556 15.333h-2.223v-3.556c0-.844-.016-1.93-1.178-1.93-1.178 0-1.36.92-1.36 1.867v3.619H8.572V8h2.133v1.002h.03c.297-.563.934-1.178 1.923-1.178 2.057 0 2.438 1.353 2.438 3.112v4.397z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="text-neutral-600 hover:text-neutral-300 transition-colors duration-200">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 2c-2.173 0-2.445.009-3.299.048-.852.039-1.433.174-1.943.372a3.917 3.917 0 00-1.417.923 3.917 3.917 0 00-.923 1.417c-.198.51-.333 1.09-.372 1.943C2.009 7.555 2 7.827 2 10s.009 2.445.048 3.299c.039.852.174 1.433.372 1.943.205.526.478.972.923 1.417.445.445.891.718 1.417.923.51.198 1.09.333 1.943.372C7.555 17.991 7.827 18 10 18s2.445-.009 3.299-.048c.852-.039 1.433-.174 1.943-.372a3.917 3.917 0 001.417-.923 3.917 3.917 0 00.923-1.417c.198-.51.333-1.09.372-1.943C17.991 12.445 18 12.173 18 10s-.009-2.445-.048-3.299c-.039-.852-.174-1.433-.372-1.943a3.917 3.917 0 00-.923-1.417 3.917 3.917 0 00-1.417-.923c-.51-.198-1.09-.333-1.943-.372C12.445 2.009 12.173 2 10 2zm0 1.802c2.136 0 2.39.008 3.233.046.78.036 1.203.166 1.485.276.373.145.64.318.92.598.28.28.453.547.598.92.11.282.24.705.276 1.485.038.844.046 1.097.046 3.233s-.008 2.39-.046 3.233c-.036.78-.166 1.203-.276 1.485a2.477 2.477 0 01-.598.92c-.28.28-.547.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.046-3.233.046s-2.39-.008-3.233-.046c-.78-.036-1.203-.166-1.485-.276a2.477 2.477 0 01-.92-.598 2.477 2.477 0 01-.598-.92c-.11-.282-.24-.705-.276-1.485C3.81 12.39 3.802 12.136 3.802 10s.008-2.39.046-3.233c.036-.78.166-1.203.276-1.485.145-.373.318-.64.598-.92.28-.28.547-.453.92-.598.282-.11.705-.24 1.485-.276C7.61 3.81 7.864 3.802 10 3.802zm0 3.063a3.135 3.135 0 100 6.27 3.135 3.135 0 000-6.27zm0 5.168a2.033 2.033 0 110-4.066 2.033 2.033 0 010 4.066zm3.99-5.29a.733.733 0 11-1.466 0 .733.733 0 011.466 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      
    </footer>
  );
}
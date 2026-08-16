"use client";

import { useState, useEffect } from "react";
import { Convergence } from "next/font/google";
import { Menu, X } from "lucide-react";
import { BlueButton } from "../button/button";

// Inisialisasi font Convergence
// Next.js akan mengurus link font secara otomatis
const convergence = Convergence({
  subsets: ["latin"],
  weight: "400",
});

const NAV_LINKS = [
  { label: "Masalah", href: "#problem" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Workflow", href: "#workflow" },
  { label: "Sumber Daya", href: "#sumber" },
  { label: "Klien", href: "#klien" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Gunakan class font dari next/font */
    <nav
      className={`
        ${convergence.className}
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        w-[calc(100%-2rem)] max-w-5xl
        px-5 py-3
        rounded-2xl
        flex items-center justify-between gap-4
        backdrop-blur-xl
        bg-white/5
        border border-white/10
        shadow-[0_4px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]
        transition-all duration-300
        ${scrolled ? "bg-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]" : ""}
      `}
    >
      {/* ── Logo ── */}
      <a
        href="#"
        className="text-white text-xl font-normal tracking-[0.15em] select-none shrink-0 hover:text-blue-300 transition-colors duration-200"
      >
        Zestify
      </a>

      {/* ── Desktop Nav Links ── */}
      <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="px-4 py-1.5 text-[13.5px] text-white/70 rounded-lg hover:text-white hover:bg-white/8 active:bg-white/12 transition-all duration-150 whitespace-nowrap"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* ── CTA Button ── */}
      <div className="hidden md:block shrink-0">
        <BlueButton className="!min-w-0 !w-auto !px-6 !py-2 !text-sm !rounded-xl !shadow-md">
          Kontak
        </BlueButton>
      </div>

      {/* ── Mobile: Hamburger ── */}
      <button
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 border border-white/15 text-white/80 hover:text-white hover:bg-white/15 transition-all duration-150 shrink-0"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* ── Mobile Dropdown ── */}
<div
  className={`
    absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden
    
    /* PENTING: Gunakan backdrop-blur dan background transparan */
    backdrop-blur-lg
    bg-gray-500/98
    
    /* Border halus agar batas kaca terlihat */
    border border-white/10
    
    /* Shadow untuk memberikan kedalaman */
    shadow-[0_8px_32px_rgba(0,0,0,0.5)]
    
    transition-all duration-300 ease-out origin-top
    ${menuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
    md:hidden
  `}
>
  <ul className="flex flex-col py-2">
    {NAV_LINKS.map((link) => (
      <li key={link.label}>
        <a
          href={link.href}
          className="block px-5 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150"
          onClick={() => setMenuOpen(false)}
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
  
  <div className="px-4 pb-4 pt-1 border-t border-white/5">
    {/* Tambahkan !important jika style dari komponen BlueButton menimpa ini */}
    <BlueButton className="!w-full !py-2.5 !text-sm !rounded-xl shadow-none">
      Kontak
    </BlueButton>
  </div>
</div>
    </nav>
  );
}
"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import ChatAI from "../ai chat/AiChat";
import CommunityComingSoon from "./community";

// ─── Overlay Wrapper ────────────────────────────────────────────────────────
function Overlay({ isOpen, onClose, children }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "unset";
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <section
      className={`
        fixed z-[9999] inset-0 mx-auto no-scrollbar
        w-full h-full rounded-none
        lg:right-48 lg:left-auto lg:top-1/2 lg:-translate-y-1/2
        lg:w-[30%] lg:h-[700px] lg:rounded-2xl lg:mx-0
        overflow-y-auto
        bg-[#000000] border border-[#393939]
        transition-all duration-300
        ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
      style={{
        boxShadow: isAnimating
          ? "0 0 80px 20px rgba(99,102,241,0.18), 0 0 160px 40px rgba(99,102,241,0.08), 0 32px 80px rgba(0,0,0,0.6)"
          : "none",
      }}
    >
      {/* Back button — visible on mobile, hidden on desktop */}
      <button
        onClick={onClose}
        className="
          lg:hidden
          absolute top-4 left-4 z-10
          flex items-center gap-1.5
          text-white/70 hover:text-white
          transition-colors duration-200
          bg-white/10 hover:bg-white/20
          rounded-full px-3 py-1.5 text-sm font-medium
          backdrop-blur-sm
        "
      >
        <IoArrowBack size={16} />
        <span>Kembali</span>
      </button>

      {/* Close button — visible on desktop */}
      <button
        onClick={onClose}
        className="
          hidden lg:flex
          absolute top-3 right-3 z-10
          items-center justify-center
          w-8 h-8 rounded-full
          bg-white/10 hover:bg-white/20
          text-white/70 hover:text-white
          transition-colors duration-200
          text-lg leading-none
        "
        aria-label="Close"
      >
        ✕
      </button>

      <div className="space-y-10 pb-10 pt-14 lg:pt-4 p-6 md:p-8">
        {children}
      </div>
    </section>
  );
}

// ─── Main FAB ────────────────────────────────────────────────────────────────
const IconFAB = () => {
  const [fabOpen, setFabOpen] = useState(false);
  // overlay: null | "ai" | "form"
  const [overlay, setOverlay] = useState(null);

  const handleWhatsApp = () => {
    const phone = "6285188338823"; // ← ganti dengan nomor WA tujuan
    const message = encodeURIComponent("Hai saya membutuhkan anda segera! Saya ingin mengajukan prioritas anda!");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const openOverlay = (type) => {
    setOverlay(type);
    setFabOpen(false);
  };

  const closeOverlay = () => setOverlay(null);

  return (
    <>
      {/* ── FAB ── */}
      <div
        className={`fab fixed right-4 bottom-14 lg:bottom-20 lg:right-9 z-[9997] ${
          fabOpen ? "fab-open" : ""
        }`}
      >
        {/* Main trigger */}
        <div
          tabIndex={0}
          role="button"
          onClick={() => setFabOpen((v) => !v)}
          className="btn outline-none btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 backdrop-blur-md text-white hover:scale-105 transition cursor-pointer"
        >
          {fabOpen ? (
            <span className="text-xl font-bold">✕</span>
          ) : (
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z" />
            </svg>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          WhatsApp{" "}
          <button
            onClick={handleWhatsApp}
            className="btn btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500"
          >
            <FaWhatsapp size={24} />
          </button>
        </div>

        {/* Zestify AI */}
        <div>
          Zestify AI{" "}
          <button
            onClick={() => openOverlay("ai")}
            className="btn btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
          </button>
        </div>

        {/* Community / Form */}
        <div>
          Community{" "}
          <button
            onClick={() => openOverlay("form")}
            className="btn btn-lg btn-circle bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500"
          >
            <MdForum size={24} />
          </button>
        </div>
      </div>

      {/* ── Overlay: AI Chat ── */}
      <Overlay isOpen={overlay === "ai"} onClose={closeOverlay}>
        <ChatAI />
      </Overlay>

      {/* ── Overlay: Consultation Form ── */}
      <Overlay isOpen={overlay === "form"} onClose={closeOverlay}>
        <CommunityComingSoon />
      </Overlay>
    </>
  );
};

export default IconFAB;
"use client";

import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function Overlay({ children, onClose, isOpen }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger enter animation
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      // Wait for exit animation to complete before removing from DOM
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
    <>
      {/* Backdrop with dimming */}
      <div
        className={`fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm transition-all duration-300
          ${isAnimating ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Original overlay section */}
      <section
        className={`
          /* Dasar & Posisi Tengah di Mobile */
          fixed z-[9999] inset-0 mx-auto no-scrollbar left-1/2 top-1/2 -translate-1/2 
          w-[85%] h-[85%] 
          
          /* Penyesuaian Desktop (lg) */
          lg:left-1/2 lg:top-1/2 -translate-1/2 lg:mx-0 lg:w-[60%] lg:h-[700px] 
          
          /* Styling & Scroll */
          overflow-y-auto p-6 md:p-8 
          bg-[#161616] rounded-2xl border border-[#303030] shadow-2xl
          
          /* Transition animations */
          transition-all duration-300
          ${isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            w-8 h-8 rounded-full
            bg-white/10 hover:bg-white/20
            flex items-center justify-center
            transition-all duration-300
            group
          "
          aria-label="Close overlay"
        >
          <IoClose className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </button>

        <div className="space-y-10 pb-10">{children}</div>
        <div className="pb-10">
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} Zestify. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Notion-style "open to side" detail panel.
 *
 * Props:
 * - isOpen: boolean — controls visibility (panel + overlay)
 * - onClose: () => void — called on backdrop click, Escape key, or the X button
 * - title: string
 * - subtitle: small eyebrow label above the title (optional)
 * - children: detail content (properties, description, etc.)
 * - footer: action buttons (e.g. Delete / Save changes)
 * - widthClass: tailwind width classes for the panel on larger screens
 */
export default function SideDetailPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  widthClass = "sm:w-[420px] lg:w-[480px]",
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed inset-y-0 right-0 z-[70] flex h-screen w-full ${widthClass} flex-col border-l border-white/[0.08] bg-[#0e0e10] shadow-[0_0_60px_-15px_rgba(124,140,250,0.2)] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-white/[0.06] px-6 py-5">
          <div className="min-w-0">
            {subtitle && (
              <p className="truncate text-xs uppercase tracking-wide text-white/35">
                {subtitle}
              </p>
            )}
            <h2 className="mt-1 truncate text-lg font-semibold text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-3 shrink-0 rounded-lg p-1.5 text-white/40 transition hover:bg-white/[0.06] hover:text-white/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
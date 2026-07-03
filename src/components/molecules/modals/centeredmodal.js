"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * Centered "add data" style modal.
 *
 * Props:
 * - isOpen: boolean — controls visibility
 * - onClose: () => void — called on backdrop click, Escape key, or the X button
 * - title: string
 * - children: form / body content
 * - footer: action buttons (e.g. Cancel / Save)
 * - maxWidth: tailwind max-width class, defaults to "max-w-md"
 */
export default function CenterModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-md",
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        aria-hidden
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative flex max-h-[85vh] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121214] shadow-[0_0_60px_-15px_rgba(124,140,250,0.2)]`}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/[0.06] hover:text-white/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-white/[0.06] px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
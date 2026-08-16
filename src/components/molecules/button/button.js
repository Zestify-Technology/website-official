"use client"

import ShinyText from "@/components/animation/shinnytext";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ── Button 1: Blue Gradient ──────────────────────────────────────────────────
export function BlueButton({ children = "Button", href, onClick, className = "" }) {
  const router = useRouter();

  const handleClick = (e) => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-full sm:w-fit md:min-w-[180px] px-6 py-2.5 sm:px-8 sm:py-3
        rounded-xl font-semibold text-white text-sm sm:text-base tracking-wide
        bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600
        hover:from-blue-500 hover:via-blue-600 hover:to-blue-700
        active:scale-[0.98] active:brightness-90
        shadow-lg shadow-blue-500/30
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// ── Button 2: White / Outlined ───────────────────────────────────────────────
export function WhiteButton({ children = "Button", href, onClick, className = "" }) {
  const router = useRouter();

  const handleClick = (e) => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-full sm:w-fit md:min-w-[180px] px-6 py-2.5 sm:px-8 sm:py-3
        rounded-xl font-semibold text-gray-700 text-sm sm:text-base tracking-wide
        bg-white border border-gray-300
        hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
        active:scale-[0.98] active:bg-gray-100
        shadow-sm
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// ── Button 3: Glass Style with Icon ─────────────────────────────────────────
export function GlassButton({ href = '/', children = "Kembali", icon: Icon = Home, onClick, className = "" }) {
  const router = useRouter();

  const handleClick = (e) => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative px-5 py-2.5 sm:px-6 sm:py-3
        inline-flex items-center justify-center sm:justify-start gap-3
        rounded-full font-medium text-gray-200 text-sm sm:text-base tracking-wide
        bg-white/10 backdrop-blur-md
        border border-white/20
        hover:bg-white/20 hover:border-white/30 hover:text-white
        active:scale-[0.98] active:bg-white/25
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.3)]
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent
        cursor-pointer
        ${className}
      `}
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
      }}
    >
      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="sm:size-4" strokeWidth={2} />
      </span>
      <span>{children}</span>
    </button>
  );
}

export function ShinyButton({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative overflow-hidden text-gray-300 bg-[#14161a] py-[0.15rem] px-[0.6rem] rounded-md border border-gray-700/50 text-sm w-auto inline-flex items-center justify-center opacity-0">
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      className="relative overflow-hidden text-gray-300 bg-[#14161a] py-[0.15rem] px-[0.6rem] rounded-md border border-gray-700/50 text-sm w-auto inline-flex items-center justify-center hover:bg-[#1e2024] hover:text-white ease-in-out duration-200"
    >
      <ShinyText text={children} disabled={false} speed={2} />
    </button>
  );
}

export function SubmitButton({ children = "Button", href, onClick, className = "" }) {
  const router = useRouter();

  const handleClick = (e) => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="submit"
      onClick={handleClick}
      className={`
        relative w-full sm:w-fit md:min-w-[180px] px-6 py-2.5 sm:px-8 sm:py-3
        rounded-xl font-semibold text-gray-700 text-sm sm:text-base tracking-wide
        bg-white border border-gray-300
        hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
        active:scale-[0.98] active:bg-gray-100
        shadow-sm
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}
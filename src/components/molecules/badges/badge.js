// GlassBadge.jsx
// Glass style: Light 22°/80%, Refraction 34, Depth 20, Dispersion 50, Frost 4

// ── Single Badge ─────────────────────────────────────────────────────────────
export function GlassBadge({
  children,
  active = false,
  onClick,
  className = "",
}) {
  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={`
        inline-flex items-center justify-center
        px-4 py-1.5
        rounded-full
        text-sm font-medium tracking-wide
        select-none whitespace-nowrap
        cursor-${onClick ? "pointer" : "default"}
        transition-all duration-200 ease-out

        ${active
          ? `
            text-[#a8c8ff]
            bg-gradient-to-br from-[rgba(120,170,255,0.22)] to-[rgba(80,130,240,0.10)]
            border border-[rgba(140,190,255,0.45)]
            shadow-[0_0_16px_rgba(100,160,255,0.30),0_2px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(180,210,255,0.25)]
            backdrop-blur-[6px]
          `
          : `
            text-[rgba(255,255,255,0.70)]
            bg-gradient-to-br from-[rgba(255,255,255,0.09)] to-[rgba(255,255,255,0.04)]
            border border-[rgba(255,255,255,0.12)]
            shadow-[0_2px_12px_rgba(0,0,0,0.40),inset_0_1px_0_rgba(255,255,255,0.08)]
            backdrop-blur-[6px]
            hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.20)] hover:text-white
          `
        }

        ${className}
      `}
    >
      {children}
    </span>
  );
}

// ── Badge Group (convenience wrapper) ────────────────────────────────────────
export function GlassBadgeGroup({ badges = [], activeBadge, onSelect, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {badges.map((badge) => (
        <GlassBadge
          key={badge.value ?? badge.label}
          active={activeBadge === (badge.value ?? badge.label)}
          onClick={onSelect ? () => onSelect(badge.value ?? badge.label) : undefined}
        >
          {badge.label}
        </GlassBadge>
      ))}
    </div>
  );
}

// ── Demo ─────────────────────────────────────────────────────────────────────
import { useState } from "react";

export default function BadgeDemo() {
  const [active, setActive] = useState("zestify");

  const badges = [
    { label: "Zestify Tech",       value: "zestify" },
    { label: "Agensi Teknologi AI", value: "agensi" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c14] flex flex-col items-center justify-center gap-10 p-8">

      {/* Interactive group */}
      <GlassBadgeGroup
        badges={badges}
        activeBadge={active}
        onSelect={setActive}
      />

      {/* Static examples */}
      <div className="flex flex-wrap items-center gap-3 justify-center">
        <GlassBadge active>Active Badge</GlassBadge>
        <GlassBadge>Default Badge</GlassBadge>
        <GlassBadge active>New ✦</GlassBadge>
        <GlassBadge>Beta</GlassBadge>
      </div>

    </div>
  );
}
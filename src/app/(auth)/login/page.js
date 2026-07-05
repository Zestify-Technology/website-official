"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import Heading from "@/components/atoms/heading";

const DASHBOARD_URL = "https://dashboard.zestify.my.id";
const REDIRECT_SECONDS = 5;

export default function DashboardMovedPage() {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      window.location.href = DASHBOARD_URL;
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  function goNow() {
    window.location.href = DASHBOARD_URL;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(DASHBOARD_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0c] px-4">
      {/* ambient glow, matches the rest of the app */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#7c8cfa]/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[#a78bfa]/10 blur-[140px]"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center">
          <Heading level={2}>Zestify</Heading>
        </div>

        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-xl">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard sudah pindah rumah
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Dashboard sudah terpisah dari domain utama. Silakan lanjut ke{" "}
            <span className="font-medium text-white/80">
              dashboard.zestify.my.id
            </span>{" "}
            untuk melanjutkan.
          </p>

          <button
            onClick={goNow}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#7c8cfa] px-4 py-2.5 text-sm font-medium text-[#0a0a0c] shadow-[0_0_20px_rgba(124,140,250,0.25)] transition hover:bg-[#8f9dfb]"
          >
            Buka Dashboard
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            onClick={copyLink}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.05]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-300" />
                Link disalin
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Salin link
              </>
            )}
          </button>

          <p className="mt-5 text-xs text-white/30">
            Mengalihkan otomatis dalam {secondsLeft} detik…
          </p>
        </div>
      </div>
    </main>
  );
}

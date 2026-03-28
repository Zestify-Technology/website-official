'use client';

import { BackButton } from '@/components/atoms/button/button';
import H1, { H2, H3 } from '@/components/atoms/heading/heading';
import Paragraph from '@/components/atoms/paragraph/paragraph';
import FormEksperimen from '@/components/molecules/form/eksperimen/eksperimenform';
import Overlay from '@/components/template/overlay/overlay';
import { useState, useEffect, useRef } from 'react';





// ── Reusable atoms (sesuaikan dengan import Zestify kamu) ──────────────────
// import { BackButton } from '@/components/atoms/button/button';
// import H1 from '@/components/atoms/heading/heading';
// import Paragraph from '@/components/atoms/paragraph/paragraph';

// ── Data ───────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Akses Teknologi AI Terdepan',
    desc: 'Dapatkan akses langsung ke solusi AI mutakhir yang disesuaikan dengan kebutuhan spesifik bisnis Anda tanpa investasi riset awal.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M17.5 14v7M14 17.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Integrasi Tanpa Friksi',
    desc: 'Tim kami merancang integrasi yang menyesuaikan diri dengan infrastruktur dan stack teknologi yang sudah Anda miliki.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Periode Uji 30 Hari',
    desc: 'Uji coba penuh selama 30 hari tanpa biaya awal. Buktikan dampaknya sebelum memutuskan untuk melanjutkan kemitraan.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pendampingan Dedicated',
    desc: 'Setiap mitra mendapat tim pendamping teknis yang siap membantu dari onboarding hingga evaluasi pasca-implementasi.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Respons Cepat 48 Jam',
    desc: 'Setiap pengajuan kerjasama ditanggapi dalam 2×24 jam kerja. Tidak ada antrian panjang, tidak ada birokrasi berbelit.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Co-Development Opportunity',
    desc: 'Mitra terpilih berkesempatan terlibat langsung dalam pengembangan fitur baru sesuai kebutuhan industri mereka.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Ajukan Kerjasama',
    desc: 'Isi formulir pengajuan dengan informasi usaha, kontak, dan kebutuhan teknis Anda. Proses ini hanya membutuhkan waktu 5 menit.',
  },
  {
    num: '02',
    title: 'Sesi Diskusi Awal',
    desc: 'Tim kami menghubungi Anda dalam 48 jam untuk menjadwalkan sesi diskusi — bisa online maupun offline sesuai preferensi Anda.',
  },
  {
    num: '03',
    title: 'Penyesuaian Solusi',
    desc: 'Bersama-sama kami merancang solusi AI yang tepat sasaran, disesuaikan dengan alur kerja, infrastruktur, dan tujuan bisnis Anda.',
  },
  {
    num: '04',
    title: 'Uji Coba & Evaluasi',
    desc: 'Implementasi selama 30 hari dengan pemantauan penuh. Di akhir periode, kami bersama mengevaluasi dampak dan merencanakan langkah berikutnya.',
  },
];

const faqs = [
  {
    q: 'Siapa yang bisa mengajukan kerjasama ini?',
    a: 'Program ini terbuka untuk semua pelaku usaha — mulai dari startup, UMKM, hingga perusahaan skala menengah yang ingin mengeksplorasi penerapan AI dalam operasional bisnis mereka.',
  },
  {
    q: 'Apakah ada biaya yang dikenakan?',
    a: 'Tidak ada biaya awal selama periode uji coba 30 hari. Setelah evaluasi bersama, skema keberlanjutan akan didiskusikan dan disesuaikan dengan kebutuhan serta kapasitas mitra.',
  },
  {
    q: 'Teknologi AI apa saja yang tersedia?',
    a: 'Kami menawarkan berbagai solusi AI termasuk otomasi proses bisnis, analitik prediktif, pemrosesan dokumen otomatis, chatbot cerdas, dan integrasi model bahasa untuk kebutuhan spesifik industri Anda.',
  },
  {
    q: 'Berapa lama proses dari pengajuan hingga implementasi?',
    a: 'Rata-rata 1–2 minggu dari pengajuan hingga sesi diskusi pertama. Implementasi awal biasanya dapat dimulai dalam 2–4 minggu setelah kesepakatan desain solusi.',
  },
  {
    q: 'Apakah data bisnis kami aman?',
    a: 'Keamanan data adalah prioritas utama kami. Semua data yang dibagikan selama proses kerjasama dilindungi oleh perjanjian kerahasiaan (NDA) dan ditangani sesuai standar keamanan industri.',
  },
];

// ── Intersection observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── FAQ Item ───────────────────────────────────────────────────────────────
function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`border-b border-neutral-800 transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 leading-relaxed">
          {q}
        </span>
        <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border border-neutral-700 flex items-center justify-center transition-all duration-300
          ${open ? 'bg-blue-500 border-blue-500 rotate-45' : 'group-hover:border-blue-500'}`}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 2v6M2 5h6" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}>
        <Paragraph fontSize='sm'>{a}</Paragraph>
      </div>
    </div>
  );
}

// ── Benefit Card ───────────────────────────────────────────────────────────
function BenefitCard({ item, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group p-6 rounded-xl border border-neutral-800 hover:border-blue-500/40
        bg-white/[0.02] hover:bg-blue-500/[0.04]
        transition-all duration-500
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4
        group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
        {item.icon}
      </div>
      <H3>{item.title}</H3>
      <Paragraph>{item.desc}</Paragraph>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function KerjasamaPage() {
  const [heroVisible, setHeroVisible] = useState(false);
const [openOverlay, setOpenOverlay] = useState(false);

 const handleOpenForm = () => {
      setOpenOverlay(true);
  };

  const handleCloseOverlay = () => {
    setOpenOverlay(false);
  };

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const [processRef, processInView] = useInView(0.1);

  return (
    <>
      <Overlay onClose={handleCloseOverlay} isOpen={openOverlay}>
        <FormEksperimen/>
      </Overlay>
      <BackButton/>
      <main className="min-h-screen bg-transparent text-white">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-32 max-w-6xl mx-auto overflow-hidden">

          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />



          {/* Heading */}
          <div className="max-w-3xl">
            <H1>
              Kerjasama Eksperimen<br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Penerapan Teknologi AI
              </span>
            </H1>

            <Paragraph
              className={`text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl font-mono text-sm
                transition-all duration-700 delay-200
                ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Kami membuka akses terbatas bagi pelaku usaha yang ingin mengeksplorasi dan
              mengintegrasikan solusi kecerdasan buatan ke dalam ekosistem bisnis mereka —
              tanpa biaya awal, tanpa risiko, dengan pendampingan penuh.
            </Paragraph>
          </div>

          {/* CTA + stats */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-8
              transition-all duration-700 delay-300
              ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* CTA Button — handler dikosongkan, isi sendiri */}
            <button
              onClick={() => handleOpenForm()}
              className="group relative flex items-center gap-3 px-7 py-4 bg-blue-500 hover:bg-blue-600
                active:scale-[0.98] rounded-xl text-white text-sm font-bold tracking-wide
                transition-all duration-200 overflow-hidden
                shadow-[0_4px_24px_rgba(59,130,246,0.35)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)]"
            >
              <span>Mulai Kerjasama</span>
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {/* shimmer */}
              <span className="absolute top-0 left-[-60%] w-1/2 h-full
                bg-gradient-to-r from-transparent via-white/15 to-transparent
                animate-[shimmer_2.5s_infinite]" />
            </button>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {[['48h', 'Respons Tim'], ['30d', 'Periode Uji'], ['0', 'Biaya Awal']].map(([val, lbl], i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-extrabold text-white leading-none tracking-tight">{val}</span>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-500 mt-1 font-mono">{lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative grid corner */}
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full border border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/40 via-neutral-800 to-transparent" />
          </div>
        </div>

        {/* ── BENEFIT ──────────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
          <div className="mb-12">
            <H2>
              Mengapa Bermitra<br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">dengan Zestify Technology?</span>
            </H2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((item, i) => <BenefitCard key={i} item={item} index={i} />)}
          </div>
        </section>

        {/* ── CARA KERJA ───────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 border-t border-neutral-800/60">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <H2>
                Bagaimana Cara Kerjanya?
              </H2>
            </div>

            <div
              ref={processRef}
              className="grid md:grid-cols-4 gap-0 relative"
            >
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-px
                bg-gradient-to-r from-blue-500/60 via-blue-500/20 to-transparent pointer-events-none" />

              {steps.map((s, i) => (
                <div
                  key={i}
                  style={{ transitionDelay: `${i * 120}ms` }}
                  className={`relative flex flex-col gap-4 px-6 pb-10 md:pb-0
                    transition-all duration-600
                    ${processInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 md:flex-col md:items-start">
                    <div className="w-14 h-14 rounded-full border border-blue-500/40 bg-blue-500/10
                      flex items-center justify-center shrink-0 relative z-10">
                      <span className="text-blue-300 font-mono font-bold text-sm">{s.num}</span>
                    </div>
                    {/* Mobile connector */}
                    {i < steps.length - 1 && (
                      <div className="md:hidden flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-2 leading-snug">{s.title}</h3>
                    <p className="text-neutral-500 text-[13px] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 border-t border-neutral-800/60">
          <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-20">

            {/* Left sticky label */}
            <div className="md:col-span-2">
              <H2>
                Pertanyaan<br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">yang Sering Ditanyakan</span>
              </H2>
              <Paragraph>
                Tidak menemukan jawaban yang kamu cari?{' '}
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
                  Hubungi kami langsung.
                </span>
              </Paragraph>
            </div>

            {/* Right FAQ list */}
            <div className="md:col-span-3">
              {faqs.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <section className="px-6 py-20 md:py-28 border-t border-neutral-800/60">
          <div className="max-w-6xl mx-auto relative">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-40 bg-blue-600/10 blur-[80px] rounded-full" />
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center
              justify-between gap-8 p-8 md:p-12 rounded-2xl border border-neutral-800
              bg-white/[0.02]">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-blue-400 font-mono mb-3">
                  Siap Bergabung?
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                  Mulai Eksperimen AI<br />untuk Bisnis Anda
                </h2>
                <p className="text-neutral-500 text-sm max-w-md leading-relaxed font-mono">
                  Slot terbatas. Pengajuan dibuka secara berkala setiap bulan.
                </p>
              </div>

              <button
                onClick={() => { /* TODO: tambahkan handler navigasi kamu di sini */ }}
                className="group shrink-0 flex items-center gap-3 px-7 py-4
                  bg-blue-500 hover:bg-blue-600 active:scale-[0.98] rounded-xl
                  text-white text-sm font-bold tracking-wide
                  transition-all duration-200
                  shadow-[0_4px_24px_rgba(59,130,246,0.35)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.5)]"
              >
                <span>Ajukan Kerjasama Sekarang</span>
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes shimmer {
            0%   { left: -60%; }
            100% { left: 160%; }
          }
          .font-display { font-family: 'Syne', sans-serif; }
          .font-mono    { font-family: 'Space Mono', monospace; }
        `}</style>
      </main>
    </>
  );
}
"use client";

import { H2 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";
import Section from "@/components/template/section/section";
import { useEffect, useState } from "react";

const guarantees = [
  {
    id: 1,
    tag: "Kepemilikan Data",
    title: "Data Anda, Milik Anda Sepenuhnya",
    desc: "Semua data bisnis yang Anda berikan tidak pernah kami gunakan untuk kepentingan lain. Kami hanya memproses sesuai instruksi Anda, tidak lebih.",
    iconBg: "bg-purple-600",
    featured: true,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 2,
    tag: "Transparansi Penuh",
    title: "Anda Tahu Data Apa yang Dipakai AI",
    desc: "Sebelum sistem AI kami berjalan, kami dokumentasikan secara tertulis data apa saja yang diakses, untuk tujuan apa, dan bagaimana cara kerjanya.",
    iconBg: "bg-cyan-500",
    featured: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    tag: "Enkripsi & Isolasi",
    title: "Data Klien Terisolasi Satu Sama Lain",
    desc: "Setiap klien memiliki environment terpisah. Data bisnis Anda tidak tercampur dengan klien lain, dienkripsi AES-256 saat disimpan maupun dikirim.",
    iconBg: "bg-emerald-500",
    featured: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect
          x="3"
          y="11"
          width="18"
          height="11"
          rx="2"
          strokeLinecap="round"
        />
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 4,
    tag: "Kontrak & NDA",
    title: "Terikat NDA Sejak Hari Pertama",
    desc: "Sebelum proyek dimulai, kami tanda tangani NDA yang melindungi seluruh informasi bisnis Anda secara hukum. Kerahasiaan bukan janji lisan — ini kontrak.",
    iconBg: "bg-pink-500",
    featured: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
          strokeLinecap="round"
        />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 5,
    tag: "Audit Log",
    title: "Setiap Akses Tercatat & Bisa Diaudit",
    desc: "Kami sediakan log aktivitas lengkap yang bisa Anda akses kapan saja — siapa yang mengakses data Anda, kapan, dan dari mana. Transparansi adalah bukti nyata.",
    iconBg: "bg-blue-500",
    featured: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 6,
    tag: "Hak Hapus Data",
    title: "Hak Penuh Menarik & Menghapus Data",
    desc: "Kapan pun Anda mengakhiri kerja sama, semua data dihapus permanen dari sistem kami dalam 7 hari kerja dan kami berikan konfirmasi tertulis.",
    iconBg: "bg-orange-500",
    featured: false,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <polyline points="3 6 5 6 21 6" strokeLinecap="round" />
        <path
          d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"
          strokeLinecap="round"
        />
        <path d="M10 11v6M14 11v6" strokeLinecap="round" />
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const principles = [
  "Tidak dijual ke pihak ketiga",
  "Tidak dipakai untuk training model AI lain",
  "Tidak diakses tanpa izin eksplisit Anda",
  "Tidak disimpan setelah kontrak berakhir",
];

export default function SecuritySection() {
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setVisible(true);
  }, []);

  return (
    <Section id="data-security" className="overflow-hidden py-28 px-6 relative">
      {/* Orb glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(90,50,200,0.16) 0%, rgba(50,30,150,0.06) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-[-60px] w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(50,90,220,0.1) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,100,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(140,100,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`flex flex-col justify-center items-center text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="w-[70%]">
            <H2 align="center">
              Kami Bekerja dengan Data Anda —{" "}
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Bukan Memilikinya
              </span>
            </H2>
            <Paragraph align="center">
              Sebagai agensi teknologi yang mengintegrasikan sistem ke bisnis
              Anda, kepercayaan dibangun dari transparansi. Berikut jaminan
              konkret yang bisa Anda verifikasi.
            </Paragraph>
          </div>
        </div>

        {/* Komitmen strip */}
        <div
          className={`mb-14 rounded-2xl border border-purple-500/20 bg-[#0a0a12]/40 backdrop-blur-sm px-8 py-7 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ boxShadow: "inset 0 1px 0 rgba(150,100,255,0.1)" }}
        >
          <p
            className="text-white font-semibold text-base mb-5"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Data bisnis Anda tidak akan pernah:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {principles.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="#a78bfa"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm text-neutral-300">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guarantees.map((g, i) => (
            <div
              key={g.id}
              onMouseEnter={() => setHovered(g.id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 group overflow-hidden
                ${
                  g.featured
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600"
                    : "bg-[#13131f] border border-white/[0.07] hover:border-white/[0.14] hover:bg-[#16162a]"
                }`}
              style={{
                transitionDelay: `${i * 60}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms, background 0.3s, border-color 0.3s`,
              }}
            >
              {/* Icon — rounded square solid color */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110 ${g.iconBg}`}
              >
                {g.icon}
              </div>

              {/* Tag */}
              <p
                className={`text-xs tracking-widest font-semibold uppercase mb-3 ${g.featured ? "text-white/60" : "text-white/30"}`}
              >
                {g.tag}
              </p>

              {/* Title */}
              <h3
                className={`font-bold text-lg leading-snug mb-3 ${g.featured ? "text-white" : "text-white"}`}
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {g.title}
              </h3>

              {/* Desc */}
              <Paragraph fontSize="sm" color={g.featured ? 'white' : ''}
                
              >
                {g.desc}
              </Paragraph>

              {/* Featured decoration */}
              {g.featured && (
                <>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

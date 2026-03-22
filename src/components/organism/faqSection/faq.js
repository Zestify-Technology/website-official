"use client";

import { H2, H3 } from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";
import Section from "@/components/template/section/section";
import { useEffect, useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Apakah data bisnis kami aman saat menggunakan layanan AI Anda?",
    answer:
      "Ya, sepenuhnya aman. Setiap klien memiliki environment terisolasi. Data Anda dienkripsi AES-256 saat disimpan maupun dikirim, dan tidak pernah tercampur dengan data klien lain. Kami juga menandatangani NDA sebelum proyek dimulai.",
  },
  {
    id: 2,
    question: "Data apa saja yang Anda akses untuk membangun sistem AI kami?",
    answer:
      "Sebelum sistem berjalan, kami mendokumentasikan secara tertulis data apa yang diakses, untuk tujuan apa, dan bagaimana prosesnya. Tidak ada data yang diproses tanpa sepengetahuan dan persetujuan eksplisit Anda.",
  },
  {
    id: 3,
    question: "Apakah data kami dipakai untuk melatih model AI lain?",
    answer:
      "Tidak. Data bisnis Anda tidak pernah digunakan untuk melatih model AI pihak ketiga maupun model kami sendiri. Data Anda hanya diproses untuk kebutuhan sistem yang kami bangun khusus untuk bisnis Anda.",
  },
  {
    id: 4,
    question: "Apa yang terjadi pada data kami setelah kontrak berakhir?",
    answer:
      "Setelah kontrak berakhir, semua data Anda dihapus permanen dari seluruh sistem dan server kami dalam 7 hari kerja. Kami menyediakan konfirmasi penghapusan secara tertulis sebagai bukti.",
  },
  {
    id: 5,
    question: "Berapa lama proses implementasi sistem AI ke bisnis kami?",
    answer:
      "Tergantung kompleksitas kebutuhan. Untuk otomasi workflow standar biasanya 2–4 minggu. Integrasi sistem penuh atau custom AI agent bisa memakan waktu 4–8 minggu. Kami selalu memberikan timeline yang jelas di awal proyek.",
  },
  {
    id: 6,
    question:
      "Apakah kami perlu tim teknis internal untuk menggunakan layanan ini?",
    answer:
      "Tidak perlu. Kami menangani seluruh proses teknis — dari desain sistem, integrasi, hingga deployment. Tim Anda hanya perlu menjalankan bisnis seperti biasa; kami yang memastikan sistem AI bekerja di belakang layar.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <Section id="faq" className="relative overflow-hidden py-24 px-4 sm:px-8">
      {/* Orb glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(90,50,200,0.12) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(50,90,220,0.08) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,100,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(140,100,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">
        {/* ── LEFT ── */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Heading */}
          <H2>
            Pertanyaan yang
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              sering ditanyakan
            </span>
          </H2>

          {/* Subtext */}
          <Paragraph>
            Pilih layanan yang sesuai kebutuhan dan skala bisnis Anda. Tidak ada
            biaya tersembunyi — semua transparan sejak awal diskusi.
          </Paragraph>
        </div>

        {/* ── RIGHT — Accordion ── */}
        <div
          className={`flex flex-col gap-3 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-purple-500/40 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-sm"
                    : "border-white/[0.07] bg-[#0e0e1a] hover:border-white/[0.12]"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms, border-color 0.3s, background 0.3s`,
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span
                    className={`text-sm font-semibold leading-snug transition-colors duration-300 ${
                      isOpen
                        ? "text-white"
                        : "text-neutral-400 group-hover:text-neutral-200"
                    }`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {faq.question}
                  </span>

                  {/* Toggle icon */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-purple-600 text-white"
                        : "bg-white/[0.06] text-neutral-400 group-hover:bg-white/[0.1]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-6 text-sm text-neutral-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');`}</style>
    </Section>
  );
}

'use client';

import { BackButton } from '@/components/atoms/button/button';
import { useState } from 'react';


const industries = [
  'SaaS / Platform Digital',
  'Manufaktur & Industri',
  'Kesehatan & Medis',
  'Pendidikan & EdTech',
  'Keuangan & Fintech',
  'Logistik & Supply Chain',
  'Retail & E-Commerce',
  'Pemerintahan & Publik',
  'Lainnya',
];

export default function B2BFormPage() {
  const [formData, setFormData] = useState({
    nama: '',
    instansi: '',
    telepon: '',
    email: '',
    industri: '',
    alasan: '',
    detail: '',
  });
  const [focused, setFocused] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-transparent">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-neutral-200 dark:border-neutral-700 mb-8">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14.5L11.5 20L22 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900 dark:text-neutral-100" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 tracking-tight">
            Pengajuan Diterima
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-8">
            Tim kami akan meninjau pengajuan B2B Anda dan menghubungi dalam <span className="text-neutral-700 dark:text-neutral-300 font-medium">2×24 jam</span> kerja.
          </p>
          <button
            onClick={() => { setSubmitted(false); setFormData({ nama: '', instansi: '', telepon: '', email: '', industri: '', alasan: '', detail: '' }); }}
            className="text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300 transition-colors duration-200 border-b border-neutral-200 dark:border-neutral-700 hover:border-neutral-800 dark:hover:border-neutral-300 pb-0.5"
          >
            Ajukan Kembali
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
    <BackButton/>
    <main className="min-h-screen px-6 py-16 md:py-24 bg-transparent">
      <div className="max-w-6xl mx-auto">

        {/* Header badge */}
        <div className="mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 font-medium mb-6">
            <span className="w-4 h-px bg-neutral-300 dark:bg-neutral-700"></span>
            Program Eksperimental
            <span className="w-4 h-px bg-neutral-300 dark:bg-neutral-700"></span>
          </span>
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-neutral-100 leading-[1.05] tracking-tight">
                Uji Solusi<br />
                <em className="not-italic text-indigo-500">Teknologi</em><br />
                untuk Bisnis Anda
              </h1>
            </div>
            <div className="md:pb-2">
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-sm">
                Kami membuka akses terbatas untuk mitra B2B yang ingin menguji dan mengintegrasikan solusi teknologi kami ke dalam ekosistem bisnis mereka.
              </p>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100">48h</span>
                  <span className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mt-0.5">Respons Tim</span>
                </div>
                <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100">30d</span>
                  <span className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mt-0.5">Periode Uji</span>
                </div>
                <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-semibold text-neutral-900 dark:text-neutral-100">0</span>
                  <span className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mt-0.5">Biaya Awal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-100 dark:bg-neutral-800 mb-12 md:mb-16"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-12 md:gap-16">

          {/* Left col — labels/context */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 mb-2 font-medium">01 / Identitas</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">Informasi dasar tentang Anda dan perusahaan yang akan mengajukan pengujian.</p>
            </div>
            <div className="w-full h-px bg-neutral-100 dark:bg-neutral-800"></div>
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 mb-2 font-medium">02 / Pengajuan</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">Jelaskan mengapa bisnis Anda cocok untuk program eksperimental ini dan apa yang ingin dicapai.</p>
            </div>
            <div className="w-full h-px bg-neutral-100 dark:bg-neutral-800"></div>
            <div className="hidden md:block p-5 border border-neutral-100 dark:border-neutral-800 rounded-xl">
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">Kontak Langsung</p>
              <a href="mailto:b2b@example.com" className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors mb-2.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M1 4.5L7 8L13 4.5" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                b2b@example.com
              </a>
              <a href="tel:+62211234567" className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M2.5 2.5C2.5 2.5 4 2 4.5 4L5 6C5 6 5 7 4 7.5L3.5 7.8C3.5 7.8 4.5 10 6.2 11L6.5 10.5C7 9.5 8 9.5 8 9.5L10 10C12 10.5 11.5 12 11.5 12C11.5 12 11 13 8.5 12C6 11 3 8 2 5.5C1 3 2.5 2.5 2.5 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                +62 21 1234 5678
              </a>
            </div>
          </div>

          {/* Right col — inputs */}
          <div className="md:col-span-3 space-y-5">

            {/* Nama */}
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-medium flex items-center gap-1">
                Nama Lengkap <span className="text-neutral-300 dark:text-neutral-600">*</span>
              </label>
              <input
                type="text"
                name="nama"
                required
                placeholder="Budi Santoso"
                value={formData.nama}
                onChange={handleChange}
                onFocus={() => setFocused('nama')}
                onBlur={() => setFocused('')}
                className={`w-full px-4 py-3.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-600 border rounded-xl outline-none transition-all duration-200 bg-transparent
                  ${focused === 'nama' ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
              />
            </div>

            {/* Instansi + Industri */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                  Nama Instansi <span className="text-neutral-300 dark:text-neutral-600">*</span>
                </label>
                <input
                  type="text"
                  name="instansi"
                  required
                  placeholder="PT. Maju Bersama"
                  value={formData.instansi}
                  onChange={handleChange}
                  onFocus={() => setFocused('instansi')}
                  onBlur={() => setFocused('')}
                  className={`w-full px-4 py-3.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-600 border rounded-xl outline-none transition-all duration-200 bg-transparent
                    ${focused === 'instansi' ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                  Industri <span className="text-neutral-300 dark:text-neutral-600">*</span>
                </label>
                <div className="relative">
                  <select
                    name="industri"
                    required
                    value={formData.industri}
                    onChange={handleChange}
                    onFocus={() => setFocused('industri')}
                    onBlur={() => setFocused('')}
                    className={`w-full px-4 py-3.5 text-sm border rounded-xl outline-none transition-all duration-200 bg-transparent appearance-none
                      ${formData.industri ? 'text-neutral-800 dark:text-neutral-200' : 'text-neutral-300 dark:text-neutral-600'}
                      ${focused === 'industri' ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
                  >
                    <option value="" disabled>Pilih sektor</option>
                    {industries.map((i) => (
                      <option key={i} value={i} className="text-neutral-800 dark:text-neutral-200">{i}</option>
                    ))}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 dark:text-neutral-500" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Telepon + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                  No. Telepon <span className="text-neutral-300 dark:text-neutral-600">*</span>
                </label>
                <input
                  type="tel"
                  name="telepon"
                  required
                  placeholder="+62 812 3456 7890"
                  value={formData.telepon}
                  onChange={handleChange}
                  onFocus={() => setFocused('telepon')}
                  onBlur={() => setFocused('')}
                  className={`w-full px-4 py-3.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-600 border rounded-xl outline-none transition-all duration-200 bg-transparent
                    ${focused === 'telepon' ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-medium">
                  Email <span className="text-neutral-300 dark:text-neutral-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="budi@perusahaan.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  className={`w-full px-4 py-3.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-600 border rounded-xl outline-none transition-all duration-200 bg-transparent
                    ${focused === 'email' ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
                />
              </div>
            </div>

            {/* Divider dalam form */}
            <div className="w-full h-px bg-neutral-100 dark:bg-neutral-800 my-2"></div>

            {/* Alasan */}
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-medium flex justify-between">
                <span>Alasan Pengajuan B2B <span className="text-neutral-300 dark:text-neutral-600">*</span></span>
                <span className={`normal-case tracking-normal ${formData.alasan.length > 280 ? 'text-red-400' : 'text-neutral-300 dark:text-neutral-600'}`}>
                  {formData.alasan.length}/300
                </span>
              </label>
              <textarea
                name="alasan"
                required
                maxLength={300}
                rows={3}
                placeholder="Jelaskan mengapa bisnis Anda membutuhkan program B2B ini dan manfaat yang diharapkan..."
                value={formData.alasan}
                onChange={handleChange}
                onFocus={() => setFocused('alasan')}
                onBlur={() => setFocused('')}
                className={`w-full px-4 py-3.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-600 border rounded-xl outline-none transition-all duration-200 bg-transparent resize-none leading-relaxed
                  ${focused === 'alasan' ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
              />
            </div>

            {/* Detail Teknis */}
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-medium flex justify-between">
                <span>Detail Kebutuhan Teknis</span>
                <span className={`normal-case tracking-normal ${formData.detail.length > 450 ? 'text-red-400' : 'text-neutral-300 dark:text-neutral-600'}`}>
                  {formData.detail.length}/500
                </span>
              </label>
              <textarea
                name="detail"
                maxLength={500}
                rows={4}
                placeholder="Deskripsikan infrastruktur teknis yang ada, stack teknologi, volume pengguna, dan ekspektasi integrasi..."
                value={formData.detail}
                onChange={handleChange}
                onFocus={() => setFocused('detail')}
                onBlur={() => setFocused('')}
                className={`w-full px-4 py-3.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder-neutral-300 dark:placeholder-neutral-600 border rounded-xl outline-none transition-all duration-200 bg-transparent resize-none leading-relaxed
                  ${focused === 'detail' ? 'border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'}`}
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-xs">
                Dengan mengirim, Anda menyetujui syarat program eksperimental kami.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex items-center gap-3 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap overflow-hidden"
              >
                <span className={`transition-all duration-300 ${loading ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
                  Kirim Pengajuan
                </span>
                {loading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                      <path d="M8 2C4.686 2 2 4.686 2 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}
                {!loading && (
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Bottom note */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 tracking-wide">
            © 2025 TechSolusi · Program B2B Eksperimental
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">Pendaftaran terbuka · Slot terbatas</p>
          </div>
        </div>

      </div>
    </main>
    </>
  );
}
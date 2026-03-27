"use client";

import { useState } from "react";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("legalitas");
  const [imgError, setImgError] = useState(false);

  const tabs = [
    { id: "legalitas", label: "Legalitas" },
    { id: "nib", label: "NIB" },
    { id: "lisensi", label: "Lisensi" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-gray-900 dark:text-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600&display=swap');
      `}</style>

      <div className="flex-1 max-w-[680px] mx-auto w-full px-8 py-14 pb-24">
        <h1 className="font-['Lora',Georgia,serif] text-[34px] font-semibold text-gray-900 dark:text-gray-100 mb-7 tracking-[-0.02em] leading-tight">
          Legalitas &amp; Izin Teknologi
        </h1>

        <nav className="flex border-b border-gray-300 dark:border-gray-700 mb-11">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`bg-transparent border-none cursor-pointer py-2.5 mr-6 font-['Source_Serif_4',Georgia,serif] text-sm border-b-2 -mb-px transition-colors duration-150 ${
                activeTab === t.id
                  ? "text-gray-900 dark:text-gray-100 border-gray-900 dark:border-gray-100"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 border-transparent"
              }`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* ── LEGALITAS ── */}
        {activeTab === "legalitas" && (
          <>
            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Ikhtisar
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Usaha ini beroperasi secara resmi dan sah berdasarkan hukum yang berlaku di Republik Indonesia.
                Seluruh kegiatan bisnis dijalankan di bawah nama founder yang terdaftar dalam Nomor Induk
                Berusaha (NIB) yang dikeluarkan oleh Pemerintah Republik Indonesia melalui sistem Online
                Single Submission (OSS).
              </p>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">
                Kehadiran NIB memastikan bahwa kami memiliki hak legal untuk menjalankan usaha di bidang
                teknologi informasi dan jasa digital, sesuai dengan klasifikasi usaha dalam dokumen perizinan resmi kami.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Dasar hukum
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Nomor Induk Berusaha (NIB) diterbitkan berdasarkan Peraturan Pemerintah Nomor 5 Tahun 2021
                tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko. NIB berlaku sekaligus sebagai:
              </p>
              <div className="flex gap-2.5 mb-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">1.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Tanda Daftar Perusahaan (TDP) yang sah dan diakui secara nasional.</span>
              </div>
              <div className="flex gap-2.5 mb-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">2.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Angka Pengenal Impor (API) sesuai ketentuan yang berlaku, apabila diperlukan.</span>
              </div>
              <div className="flex gap-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">3.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Akses keikutsertaan dalam program ketenagakerjaan dan fasilitas pemerintah bagi pelaku usaha terdaftar.</span>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Tanggung jawab pengguna
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Dengan menggunakan layanan kami, Anda menyatakan telah memenuhi usia dewasa menurut hukum
                yang berlaku di wilayah Anda, dan bertanggung jawab penuh atas seluruh aktivitas melalui akun Anda.
              </p>
              <blockquote className="border-l-2 border-[#c8a96e] pl-4 py-0.5 my-4 italic text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Anda tidak boleh menggunakan produk kami untuk tujuan yang melanggar hukum, termasuk namun
                tidak terbatas pada pelanggaran hak cipta, penipuan, atau kegiatan yang merugikan pihak lain.
              </blockquote>
              <div className="flex gap-2.5 mb-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">1.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Anda tidak boleh mengirimkan malware, virus, atau kode berbahaya melalui layanan kami.</span>
              </div>
              <div className="flex gap-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">2.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Pelanggaran terhadap ketentuan ini dapat mengakibatkan penonaktifan layanan Anda secara segera.</span>
              </div>
            </div>
          </>
        )}

        {/* ── NIB ── */}
        {activeTab === "nib" && (
          <>
            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Dokumen NIB
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Berikut adalah salinan Nomor Induk Berusaha (NIB) yang terdaftar atas nama founder
                dan berlaku secara hukum di wilayah Republik Indonesia.
              </p>

              <div className="w-full max-w-[300px] aspect-square bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center mb-7 overflow-hidden">
                {!imgError ? (
                  <img src="/nib-document.jpg" alt="Dokumen NIB Resmi" className="w-full h-full object-cover" onError={() => setImgError(true)} />
                ) : (
                  <div className="text-center p-5">
                    <div className="text-4xl mb-3 opacity-25">📄</div>
                    <small className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed block">
                      Taruh foto NIB di<br /><strong className="font-mono">/public/nib-document.jpg</strong>
                    </small>
                  </div>
                )}
              </div>

              <table className="w-full border-collapse mb-6">
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-2.5 text-sm text-gray-500 dark:text-gray-400 w-[180px] pr-3">Nama Pemilik / Founder</td>
                    <td className="py-2.5 text-sm text-gray-900 dark:text-gray-100">[ Nama Lengkap Founder ]</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-2.5 text-sm text-gray-500 dark:text-gray-400 w-[180px] pr-3">Nomor Induk Berusaha</td>
                    <td className="py-2.5 text-sm text-gray-900 dark:text-gray-100 font-mono tracking-[0.04em]">[ Nomor NIB ]</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-2.5 text-sm text-gray-500 dark:text-gray-400 w-[180px] pr-3">Nama Usaha</td>
                    <td className="py-2.5 text-sm text-gray-900 dark:text-gray-100">[ Nama Perusahaan / Brand ]</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-2.5 text-sm text-gray-500 dark:text-gray-400 w-[180px] pr-3">Bidang Usaha</td>
                    <td className="py-2.5 text-sm text-gray-900 dark:text-gray-100">Teknologi Informasi &amp; Jasa Digital</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-2.5 text-sm text-gray-500 dark:text-gray-400 w-[180px] pr-3">Tanggal Terbit</td>
                    <td className="py-2.5 text-sm text-gray-900 dark:text-gray-100">[ Tanggal Penerbitan ]</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-2.5 text-sm text-gray-500 dark:text-gray-400 w-[180px] pr-3">Instansi Penerbit</td>
                    <td className="py-2.5 text-sm text-gray-900 dark:text-gray-100">OSS — BKPM Republik Indonesia</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-2.5 text-sm text-gray-500 dark:text-gray-400 w-[180px] pr-3">Status</td>
                    <td className="py-2.5 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-[#2d7d46] text-[13.5px]">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#2d7d46] flex-shrink-0" />
                        Aktif &amp; Berlaku
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Verifikasi independen
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Masyarakat atau mitra bisnis dapat memverifikasi keaslian NIB ini secara mandiri
                melalui portal resmi pemerintah yang tersedia untuk umum.
              </p>
              <div className="flex items-center justify-between gap-4 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 mt-5">
                <p className="text-[13px] text-gray-600 dark:text-gray-400 m-0">Cek keabsahan NIB melalui portal OSS Pemerintah Republik Indonesia</p>
                <a href="https://oss.go.id" target="_blank" rel="noopener noreferrer" className="text-[13px] text-gray-900 dark:text-gray-100 underline underline-offset-[3px] whitespace-nowrap flex-shrink-0">
                  oss.go.id →
                </a>
              </div>
            </div>
          </>
        )}

        {/* ── LISENSI ── */}
        {activeTab === "lisensi" && (
          <>
            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Lisensi &amp; Kepatuhan
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Kami berkomitmen penuh terhadap kepatuhan lisensi dalam pengembangan dan pengoperasian layanan kami.
                Seluruh perangkat lunak dan teknologi yang digunakan telah melalui proses verifikasi lisensi.
              </p>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">
                Produk ini dibangun menggunakan berbagai teknologi open-source yang dilisensikan secara bebas 
                untuk penggunaan komersial, dengan tetap menghormati hak cipta dan ketentuan dari masing-masing 
                pemilik lisensi.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Klarifikasi Lisensi
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Kami dengan ini menyatakan bahwa:
              </p>
              <div className="flex gap-2.5 mb-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">1.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Tidak ada klaim kepemilikan atas kode sumber, library, atau komponen pihak ketiga yang digunakan dalam pengembangan produk ini.</span>
              </div>
              <div className="flex gap-2.5 mb-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">2.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Seluruh ketentuan lisensi yang berlaku (MIT, Apache-2.0, dan lisensi open-source lainnya) telah kami patuhi secara penuh.</span>
              </div>
              <div className="flex gap-2.5 mb-2.5">
                <span className="text-[#c8a96e] font-semibold text-[14.5px] leading-relaxed flex-shrink-0">3.</span>
                <span className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed">Kami tidak mengintegrasikan atau mendistribusikan ulang perangkat lunak yang melanggar ketentuan lisensi sumber terbuka.</span>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="font-['Lora',Georgia,serif] text-[19px] font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Pemberitahuan Hak Cipta
              </h2>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Seluruh notifikasi hak cipta, teks lisensi, dan atribusi dari komponen pihak ketiga yang digunakan 
                telah dipertahankan sesuai dengan ketentuan yang berlaku. Informasi lengkap mengenai lisensi 
                dan sumber daya yang digunakan tersedia dalam dokumentasi teknis kami.
              </p>
              <blockquote className="border-l-2 border-[#c8a96e] pl-4 py-0.5 my-4 italic text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Pengguna tidak diwajibkan untuk menyertakan atribusi tambahan, namun kami menghargai dan 
                mendukung ekosistem open-source dengan tetap mematuhi seluruh kewajiban lisensi yang ada.
              </blockquote>
              <p className="text-[14.5px] text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Untuk pertanyaan lebih lanjut terkait lisensi atau kepatuhan hukum, silakan hubungi tim legal kami 
                melalui kanal resmi yang tersedia.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-gray-700 bg-transparent py-7 px-12 flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-md flex items-center justify-center text-white dark:text-gray-900 font-['Lora',serif] text-[15px] font-semibold">
            N
          </div>
          <div>
            <span className="block text-[13px] font-semibold text-gray-900 dark:text-gray-100">[ Nama Brand ]</span>
            <span className="block text-[11px] text-gray-500 dark:text-gray-400">Startup landing template</span>
          </div>
        </div>
        <div className="flex gap-10">
          <div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 uppercase tracking-[0.08em] font-sans">Produk</p>
            <a href="#" className="block text-[13px] text-gray-700 dark:text-gray-400 no-underline mb-1 hover:text-gray-900 dark:hover:text-gray-200 font-['Source_Serif_4',serif]">Fitur</a>
            <a href="#" className="block text-[13px] text-gray-700 dark:text-gray-400 no-underline mb-1 hover:text-gray-900 dark:hover:text-gray-200 font-['Source_Serif_4',serif]">Harga</a>
            <a href="#" className="block text-[13px] text-gray-700 dark:text-gray-400 no-underline mb-1 hover:text-gray-900 dark:hover:text-gray-200 font-['Source_Serif_4',serif]">Dokumentasi</a>
          </div>
          <div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5 uppercase tracking-[0.08em] font-sans">Perusahaan</p>
            <a href="#" className="block text-[13px] text-gray-700 dark:text-gray-400 no-underline mb-1 hover:text-gray-900 dark:hover:text-gray-200 font-['Source_Serif_4',serif]">Tentang Kami</a>
            <a href="#" className="block text-[13px] text-gray-700 dark:text-gray-400 no-underline mb-1 hover:text-gray-900 dark:hover:text-gray-200 font-['Source_Serif_4',serif]">Kontak</a>
            <a href="#" className="block text-[13px] text-gray-700 dark:text-gray-400 no-underline mb-1 hover:text-gray-900 dark:hover:text-gray-200 font-['Source_Serif_4',serif]">Legalitas</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
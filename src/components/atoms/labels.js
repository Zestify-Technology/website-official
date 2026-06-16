import React from "react";

export default function Label({ children, variant = "gradient", className = "" }) {
  // Perubahan pada baseStyles:
  // 1. Padding & Text Size responsif (berbeda di layar HP vs Layar besar)
  // 2. Ditambahkan text-center dan break-words agar teks yang turun ke bawah tetap rata tengah
  // 3. Mengubah rounded-full menjadi rounded-[2rem] (atau 3xl) agar jika multi-baris bentuknya tetap bagus seperti bubble
  const baseStyles =
    "px-4 py-2.5 sm:px-6 sm:py-3 rounded-[2rem] text-xs sm:text-sm font-medium inline-flex items-center justify-center text-center transition-all duration-200 max-w-full break-words";

  const variants = {
    gradient:
      "bg-gradient-to-r from-[#60B0FF] to-[#D0E6FF] text-gray-900 shadow-sm",

    glass:
      "bg-white/5 backdrop-blur-md border border-white/20 text-gray-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:bg-white/10",
  };

  return (
    // Menambahkan prop className agar kamu bisa bebas mengatur lebar (width) dari luar jika dibutuhkan
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span>{children}</span>
    </div>
  );
}
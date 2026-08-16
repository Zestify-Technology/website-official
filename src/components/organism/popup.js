"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function PopupOverlay({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop Luar
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          {/* Kotak Konten dengan Style Glass Pilihanmu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 30, filter: "blur(8px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }} // Disamakan durasinya dengan transition Tailwind (200ms)
            onClick={(e) => e.stopPropagation()}
            // Menggunakan kelas Tailwind milikmu (disesuaikan sedikit dari inline-flex ke block agar pas untuk container)
            // Ubah menjadi satu baris lurus atau hapus enter-nya
            className="relative flex flex-col justify-center gap-3 rounded-3xl font-medium text-gray-200 text-sm sm:text-base tracking-wide bg-black/40 backdrop-blur-md w-[90%] max-w-lg p-6 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {/* Tombol Close Lingkaran yang Senada dengan Tema Kaca */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/10 text-xs text-gray-300 transition-all hover:bg-white/20 hover:text-white active:scale-95"
              aria-label="Tutup Popup"
            >
              ✕
            </button>

            {/* Wadah Konten Dinamis */}
            <div className="mt-2 text-gray-200">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client"; // Wajib di Next.js App Router

import { motion } from "framer-motion";

// Kita tambahkan props 'delay' di sini, dengan nilai default 0 (dalam hitungan detik)
export default function ScrollOnceWrapper({ children, delay = 0 }) {
  return (
    <motion.div
    className="w-full"
      initial={{ 
        opacity: 0, 
        y: 40, 
        filter: "blur(8px)" 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)" 
      }}
      viewport={{ 
        once: true,       
        amount: 0.15,     
        margin: "0px 0px -50px 0px" 
      }}
      transition={{
        duration: 0.7,
        delay: delay, // <-- Ini dia kuncinya, memasukkan nilai jeda ke Framer Motion
        ease: [0.21, 1.02, 0.43, 1.01], 
      }}
      style={{ 
        willChange: "transform, opacity, filter" 
      }}
    >
      {children}
    </motion.div>
  );
}
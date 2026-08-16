

/**
 * MorphGlassContainer
 * Responsive 1:1 ratio container dengan efek morphic glass dark.
 * Letakkan semua konten (gambar, teks, dll) sebagai children.
 *
 * Props:
 *   children   – konten bebas di dalam kartu
 *   className  – override ukuran/posisi dari luar, mis. "max-w-sm"
 *
 * Contoh:
 *   <MorphGlassContainer className="max-w-[600px]">
 *     <img src="/3d-visual.png" ... />
 *     <h2>Visi & Misi</h2>
 *   </MorphGlassContainer>
 */
/**
 * MorphGlassContainer
 * Responsive 1:1 ratio container dengan efek morphic glass dark.
 */
export default function MorphGlassContainer({ children, className = "" }) {
  return (
    <div
      className={`
        relative 
        w-full aspect-square 
        flex flex-col items-center justify-center p-3 sm:p-8 
        rounded-4xl font-medium text-gray-200 text-sm sm:text-base tracking-wide
        bg-white/10 backdrop-blur-md
        border border-white/20
        hover:bg-white/20 hover:border-white/30 hover:text-white
        active:scale-[0.98] active:bg-white/25
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.3)]
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent 
        ${className}
      `}
    >
      {children}
    </div>
  );
}
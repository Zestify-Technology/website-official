import React from 'react';

const Paragraph = ({ size = "base", children, className = "" }) => {
  // Definisikan variasi ukuran teks
  const sizeStyles = {
    sm: "text-sm md:text-lg text-zinc-400",
    base: "text-sm md:text-xl text-zinc-400",
    lg: "text-lg md:text-lg text-zinc-400",
    xl: "text-xl text-zinc-400 font-light",
  };

  return (
    <p className={`leading-relaxed ${sizeStyles[size] || sizeStyles.base} ${className}`}>
      {children}
    </p>
  );
};

export default Paragraph;
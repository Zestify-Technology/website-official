import React from 'react';

const Heading = ({ level = 1, children, className = "" }) => {
  const Tag = `h${level}`;

  // Definisikan style berdasarkan level heading
  const baseStyles = "text-white dark:text-white";
  const sizeStyles = {
    1: "text-4xl md:text-6xl",
    2: "text-xl md:text-5xl",
    3: "text-2xl md:text-3xl",
    5: "text-3xl md:text-[4vw]",
  };

  return (
    <Tag className={`${baseStyles} ${sizeStyles[level] || sizeStyles[1]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
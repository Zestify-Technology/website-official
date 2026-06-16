import React from 'react';

const Heading = ({ level = 1, children, className = "" }) => {
  const Tag = `h${level}`;

  // Definisikan style berdasarkan level heading
  const baseStyles = "text-gray-900 dark:text-white";
  const sizeStyles = {
    1: "text-4xl md:text-6xl",
    2: "text-xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
  };

  return (
    <Tag className={`${baseStyles} ${sizeStyles[level] || sizeStyles[1]} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
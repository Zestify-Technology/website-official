import React from 'react';

const Section = ({id, children, direction = "col", className = "" }) => {
  
  const directionClass = direction === "row" ? "flex-row" : "flex-col";

  return (
    <section 
    id={id}
      // Pindahkan ${className} ke depan agar directionClass internal ("flex-col") yang menang jika ada konflik
      className={`w-full min-h-screen flex justify-center items-center ${className} ${directionClass}`}
    >
      {children}
    </section>
  );
};

export default Section;
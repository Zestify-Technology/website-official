"use client";



import Image from "next/image";
import { useEffect, useRef } from "react";
import Paragraph from "../atoms/paragraph";
import { ShinyButton } from "../molecules/button/button";

// BAGIAN TECH STACK
export default function TechStack() {
  // INITIAL DATA
  const techData = [
    {
      name: "AWS",
      icon: "/icons/aws.svg",
      color: "#F55036",
    },
    {
      name: "Domainesia",
      icon: "/icons/domainesia.svg",
      color: "#2D9CDB",
    },
    {
      name: "Gemini",
      icon: "/icons/gemini.svg",
      color: "#FFFFFF",
    },
    {
      name: "Vercel",
      icon: "/icons/vercel.svg",
      color: "#FFFFFF",
    },
  ];

  const sectionRef = useRef(null);

  // EFEK MEMUDAR SEDERHANA
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    const elements = document.querySelectorAll(".fade-in-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    // BAGIAN UTAMA (CLIENT)
    <section
      id="stack-tech"
      height="full"
      className="py-10 flex flex-col justify-center items-center relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background - Hanya Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:54px_54px]"></div>
      </div>

      {/* Header Section dengan fade-in effect */}
      <div className="fade-in-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out md:w-[50%] flex flex-col gap-2 relative z-10 mb-8">
        <Paragraph
        size="lg"
          className="text-lg md:text-xl font-light tracking-wider text-center"
        >
          Teknologi yang digunakan.
        </Paragraph>

        {/* Simple line */}
        <div className="h-[1px] w-24 mx-auto bg-white/20"></div>
      </div>

      {/* Tech Icons */}
      <div className="flex flex-wrap justify-center items-center md:gap-16 lg:gap-20 relative z-10">
        {techData.map((tech, index) => (
          <div
            key={index}
            className="fade-in-on-scroll opacity-0 translate-y-10 transition-all duration-700 ease-out group relative flex flex-col items-center cursor-pointer"
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Icon Container */}
            <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center ">
              <div className="relative w-[70%] h-[70%]">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain transition-all duration-500 group-hover:scale-110  invert-0 lg:invert-50 group-hover:invert-10"
                  sizes="80px"
                />
              </div>
            </div>

            {/* Nama Tech muncul saat hover */}
            <div className="absolute hidden md:block -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap group-hover:translate-y-0 translate-y-2">
              <ShinyButton className="text-xs md:text-sm">
                {tech.name}
              </ShinyButton>
            </div>
          </div>
        ))}
      </div>

      {/* Simple decorative line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-white/10"></div>
    </section>
  );
}
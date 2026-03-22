"use client";

import "@/app/css/buttonstars.css";
import Link from "next/link";
import ShinyText from "../animation/shinnytext/shinnytext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

// GRADIENT BUTTON
const GradientButton = ({
  as: Component = "button",
  className = "",
  href,
  color = "white",
  speed = "3s",
  thickness = 3,
  children,
  onClick,
  ...rest
}) => {
  const content = (
    <div className="inner-content relative overflow-hidden text-white py-[0.3em] px-[1rem] rounded-[20px] z-[1] max-w-[500px] w-full text-center">
      {children}
    </div>
  );

  return (
    <Component
      className={`star-border-container cursor-pointer ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style,
      }}
      aria-label={typeof children === "string" ? children : rest["aria-label"]}
      {...rest}
      onClick={onClick}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>

      {href ? (
        <Link
          href={href}
          aria-label={
            typeof children === "string" ? children : rest["aria-label"]
          }
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </Component>
  );
};

// SOLID BUTTON
export function SolidButton({
  as: Component = "button",
  className = "",
  href,
  color = "white",
  speed = "3s",
  thickness = 3,
  children,
  onClick,
  ...rest
}) {
  const content = (
    <div className="relative overflow-hidden text-[#242424] bg-white py-[0.3rem] px-[1rem] rounded-[20px] z-[1] max-w-[200px] w-full text-center hover:bg-[#14161a] hover:text-white ease-in-out duration-200">
      {children}
    </div>
  );

  return (
    <Component
      className={`star-border-container cursor-pointer ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...rest.style,
      }}
      aria-label={typeof children === "string" ? children : rest["aria-label"]}
      {...rest}
      onClick={onClick}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>

      {href ? <Link href={href}>{content}</Link> : content}
    </Component>
  );
}

// SHINY BUTTON - FIXED: No line breaks in className
export function ShinyButton({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative overflow-hidden text-gray-300 bg-[#14161a] py-[0.15rem] px-[0.6rem] rounded-md border border-gray-700/50 text-sm w-auto inline-flex items-center justify-center opacity-0">
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      className="relative overflow-hidden text-gray-300 bg-[#14161a] py-[0.15rem] px-[0.6rem] rounded-md border border-gray-700/50 text-sm w-auto inline-flex items-center justify-center hover:bg-[#1e2024] hover:text-white ease-in-out duration-200"
    >
      <ShinyText text={children} disabled={false} speed={2} />
    </button>
  );
}

// SHINY BUTTON - Alternative simpler version without ShinyText
export function ShinyButtonSimple({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative overflow-hidden text-gray-300 bg-[#14161a] py-[0.15rem] px-[0.6rem] rounded-md border border-gray-700/50 text-sm w-auto inline-flex items-center justify-center opacity-0">
        {children}
      </button>
    );
  }

  return (
    <button
      className="relative overflow-hidden text-gray-300 bg-[#14161a] py-[0.15rem] px-[0.6rem] rounded-md border border-gray-700/50 text-sm w-auto inline-flex items-center justify-center hover:bg-[#1e2024] hover:text-white ease-in-out duration-200 group"
    >
      {/* Shiny effect overlay */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// BACK BUTTON
export function BackButton({ href = "/" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed top-4 left-4 z-50 opacity-0">
        <div className="w-20 h-8 bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white text-black px-3 py-2 rounded-xl shadow-lg transition-colors duration-200 hover:bg-[#318aff] hover:text-white"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
      <span className="text-sm font-medium">Kembali</span>
    </Link>
  );
}

export default GradientButton;
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faQuestionCircle,
  faServer,
  faProjectDiagram,
  faBriefcase,
  faShieldAlt,
  faComments,
  faEnvelope,
  faTimes,
  faArrowRight,
  faXTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-solid-svg-icons";
import {
  faXTwitter as faXTwitterBrand,
  faInstagram as faInstagramBrand,
  faLinkedin as faLinkedinBrand,
} from "@fortawesome/free-brands-svg-icons";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const listNav = [
    { name: "Mengapa Kami", href: "#mengapa-kami", icon: faQuestionCircle },
    { name: "Solusi", href: "#solution", icon: faServer },
    { name: "Workflow", href: "#workflow", icon: faProjectDiagram },
    // { name: "Portfolio", href: "#portfolio", icon: faBriefcase },
    { name: "Data Security", href: "#data-security", icon: faShieldAlt },
    { name: "FAQ", href: "#faq", icon: faComments },
    // { name: "Contact", href: "#contact", icon: faEnvelope },
  ];

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        !e.target.closest(".mobile-menu-container") &&
        !e.target.closest(".menu-toggle-btn")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  // Close menu and restore scroll
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <nav className="navbar z-[9999] fixed top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 w-[95%] sm:w-[90%] md:w-[85%] xl:w-[80%] max-w-7xl backdrop-blur-md bg-[#0b0b0b46] border border-white/10 rounded-full shadow-lg min-h-[70px] py-2">
        <div className="navbar-start flex items-center gap-2">
          <div className="2xl:hidden w-10 h-10"></div>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo Zestify Technology"
              width={70}
              height={45}
              className="w-[90px] md:w-[100px] h-auto object-contain"
              priority
            />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="bg-gradient-to-r from-[#0184ff] to-[#00c6ff] text-white text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-2.5 rounded-full whitespace-nowrap opacity-0">
            Hubungi Kami!
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={`navbar z-[9999] fixed top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4
           w-[95%] sm:w-[90%] md:w-[85%] xl:w-[80%] max-w-7xl
           backdrop-blur-md bg-[#0b0b0b46] border border-white/10 
           rounded-full shadow-lg min-h-[70px] py-2 transition-all duration-300
           ${isScrolled ? "bg-[#0b0b0b46] backdrop-blur-lg shadow-xl" : ""}`}
      >
        {/* Navbar start - Logo */}
        <div className="navbar-start flex items-center gap-3">
          <div
            className={`2xl:hidden ${isMenuOpen ? "hidden" : ""} transition-all duration-75`}
          >
            <button
              onClick={toggleMenu}
              className="-translate-y-[-10px] menu-toggle-btn btn btn-ghost btn-sm relative w-10 h-10 p-2 focus:outline-none hover:bg-white/10 rounded-full transition-all"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`}
                ></span>
                <span
                  className={`absolute h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-0 translate-x-3" : "opacity-100 w-5"}`}
                ></span>
                <span
                  className={`absolute h-0.5 w-5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}`}
                ></span>
              </div>
            </button>
          </div>

          <Link href="/" onClick={closeMenu}>
            <Image
              src="/logo text.png"
              width={150}
              height={40}
              style={{ width: "100px", height: "auto" }} // Mengunci ukuran mobile secara instan
              className="md:!w-[130px] lg:!w-[150px] h-auto object-contain"
              alt="Logo"
              priority
            />
          </Link>
        </div>

        {/* Navbar center - Desktop Menu - Muncul di atas 1536px (2xl) */}
        <div className="navbar-center hidden 2xl:flex">
          <ul className="flex items-center gap-1">
            {listNav.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="text-sm text-white/80 hover:text-white rounded-full hover:bg-[#0184ff] px-4 py-2 transition-all duration-300 font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navbar end - Contact Button */}
        <div className="navbar-end">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-[#0184ff] to-[#00c6ff] text-white text-sm sm:text-base px-5 sm:px-7 py-2 sm:py-2.5 rounded-full hover:shadow-lg hover:shadow-[#0184ff]/30 transition-all duration-300 font-semibold whitespace-nowrap"
          >
            Hubungi Kami!
          </Link>
        </div>
      </nav>

      {/* Overlay dengan animasi fade */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-9998 transition-all duration-500 ease-out 2xl:hidden
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Container - Lebar 50% dengan animasi dari kanan */}
      <div
        className={`w-[70%] fixed top-0 right-0 h-full z-9999 2xl:hidden
          transition-transform duration-500 ease-out transform
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-xl border-l border-white/10 shadow-2xl overflow-y-auto">
          {/* Header dengan close button */}
          <div className="sticky top-0 bg-[#131313] backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-white font-semibold text-base">
                  Selamat Datang!
                </h3>
                <p className="text-white/40 text-xs">Zestify Technology</p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="w-4 h-4 text-white/60 group-hover:text-white"
              />
            </button>
          </div>

          {/* Menu Items dengan animasi staggered */}
          <div className="md:p-6">
            <ul className="space-y-1">
              {listNav.map((item, index) => (
                <li
                  key={index}
                  className={`transform transition-all duration-500 
                    ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-3.5 text-white/80 hover:text-white rounded-xl hover:bg-[#0184ff]/10 transition-all duration-300 group"
                  >
                    <span className="w-1.5 h-8 bg-gradient-to-b from-[#0184ff] to-[#00c6ff] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>

                    {/* Icon Font Awesome berdasarkan menu */}
                    <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#0184ff]/20 transition-colors">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="w-4 h-4 text-white/80 group-hover:text-white"
                      />
                    </span>

                    <span className="flex-1 font-medium text-base">
                      {item.name}
                    </span>

                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="w-4 h-4 text-white/20 group-hover:text-[#0184ff] transform group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer dengan social media */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0f1217] to-transparent">
            <div className="border-t border-white/10 pt-5">
              <p className="text-white/40 text-xs mb-3">Follow kami</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-white/40 hover:text-[#0184ff] transition-colors"
                >
                  <FontAwesomeIcon icon={faXTwitterBrand} className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-white/40 hover:text-[#0184ff] transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faInstagramBrand}
                    className="w-5 h-5"
                  />
                </a>
                <a
                  href="#"
                  className="text-white/40 hover:text-[#0184ff] transition-colors"
                >
                  <FontAwesomeIcon icon={faLinkedinBrand} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

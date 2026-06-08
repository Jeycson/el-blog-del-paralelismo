"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PROJECT_META } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navigationLinks = [
    { href: "/#articles", label: "Artículos" },
    { href: "/#hardware", label: "Entornos" },
    { href: "/#about", label: "Equipo" },
    { href: "/#hypothesis", label: "Hipótesis" },
  ] as const;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-14 h-14 relative">
            <img src="/escudo.png" alt="Logo" />
          </div>
          <span className="font-serif text-[15px] font-semibold text-slate-900 tracking-tight leading-none">
            {PROJECT_META.shortTitle}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#articles"
            className="text-[13px] tracking-wide uppercase font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150"
          >
            Artículos
          </Link>
          <Link
            href="/#hardware"
            className="text-[13px] tracking-wide uppercase font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150"
          >
            Entornos
          </Link>
          <Link
            href="/#about"
            className="text-[13px] tracking-wide uppercase font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150"
          >
            Equipo
          </Link>
          <Link
            href="/#hypothesis"
            className="text-[13px] tracking-wide uppercase font-medium text-slate-500 hover:text-slate-900 transition-colors duration-150"
          >
            Hipótesis
          </Link>
          <a
            href={PROJECT_META.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-slate-200 rounded px-3 py-1.5 text-[12px] tracking-wide uppercase font-medium text-slate-600 hover:border-[#1e3a5f] hover:text-[#1e3a5f] transition-all duration-150"
          >
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-px bg-slate-700 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-px bg-slate-700 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-slate-700 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[13px] tracking-wide uppercase font-medium text-slate-600 hover:text-slate-900"
            >
              {label}
            </Link>
          ))}
          <a
            href={PROJECT_META.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-wide uppercase font-medium text-slate-600"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
}

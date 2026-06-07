"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/types";

interface TableOfContentsProps {
  items: TocItem[];
  downloadLabel?: string;
  onDownload?: () => void;
}

export default function TableOfContents({
  items,
  downloadLabel = "Descargar datos (.csv)",
  onDownload,
}: TableOfContentsProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    // Guardamos las secciones que están visibles en un mapa
    const visibleSections: Record<string, boolean> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Actualizamos el estado de visibilidad de esta sección exacta
          visibleSections[entry.target.id] = entry.isIntersecting;
        });

        // Buscamos cuál es la PRIMERA sección que está cruzando la pantalla actualmente
        const activeSection = items.find(({ id }) => visibleSections[id]);

        // Si encontramos una sección visible, la pintamos de azul
        if (activeSection) {
          setActive(activeSection.id);
        }
      },
      // Flexibilizamos el margen para dar más espacio a los h2/h3 del MDX
      { rootMargin: "-12% 0% -60% 0%", threshold: 0.1 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Tabla de contenidos" className="sticky top-24">
      <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-4">
        Contenido
      </p>

      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = active === item.id;
          const indent =
            item.level === 2 ? "ml-3" : item.level === 3 ? "ml-6" : "";

          return (
            <li key={item.id} className={indent}>
              <a
                href={`#${item.id}`}
                className={`block text-[12px] leading-snug py-1 border-l-2 pl-3 transition-all duration-150 ${
                  isActive
                    ? "border-[#1e3a5f] text-[#1e3a5f] font-semibold"
                    : "border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Download button */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-[#1e3a5f] text-[#1e3a5f] text-[11px] tracking-wide uppercase font-semibold rounded-sm hover:bg-[#1e3a5f] hover:text-white transition-all duration-150 group"
        >
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 fill-current"
            aria-hidden
          >
            <path d="M8 12L3 7h3V1h4v6h3L8 12z" />
            <rect x="1" y="13" width="14" height="2" />
          </svg>
          {downloadLabel}
        </button>
      </div>

      {/* Back link */}
      <div className="mt-4">
        <a
          href="/"
          className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-700 transition-colors"
        >
          <span aria-hidden>←</span> Volver al inicio
        </a>
      </div>
    </nav>
  );
}

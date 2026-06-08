"use client"

import { useState } from "react"
import Image from "next/image"

// ── Types ────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  src: string
  alt: string
  label: string          // label corto para el selector: "Sin hilos", "2 hilos"…
  figureNumber?: number
}

export interface GalleryGroup {
  id: string
  title: string          // nombre del tab: "Secuencial", "SIMD", "OMP", "Python"
  images: GalleryImage[]
}

interface ChartGalleryProps {
  groups: GalleryGroup[]
  caption?: string       // pie de figura general (opcional)
  baseFigureNumber?: number  // si quieres numerar desde un offset
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ChartGallery({
  groups,
  caption,
  baseFigureNumber,
}: ChartGalleryProps) {
  const [activeGroup, setActiveGroup] = useState(0)
  const [activeImage, setActiveImage] = useState(0)

  // Resetear imagen al cambiar de grupo
  function handleGroupChange(idx: number) {
    setActiveGroup(idx)
    setActiveImage(0)
  }

  const group = groups[activeGroup]
  const image = group.images[activeImage]

  // Número de figura global si se provee baseFigureNumber
  const figNum = (() => {
    if (baseFigureNumber === undefined) return image.figureNumber
    let count = baseFigureNumber
    for (let g = 0; g < activeGroup; g++) count += groups[g].images.length
    count += activeImage
    return count
  })()

  return (
    <figure className="my-10 not-prose">
      {/* ── Group tabs ── */}
      <div
        role="tablist"
        aria-label="Seleccionar configuración"
        className="flex flex-wrap gap-1.5 mb-4"
      >
        {groups.map((g, i) => {
          const isActive = i === activeGroup
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`gallery-panel-${g.id}`}
              onClick={() => handleGroupChange(i)}
              className={`px-3 py-1.5 text-[11px] tracking-widest uppercase font-bold rounded-sm border transition-all duration-150 ${
                isActive
                  ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#1e3a5f] hover:text-[#1e3a5f]"
              }`}
            >
              {g.title}
            </button>
          )
        })}
      </div>

      {/* ── Image panel ── */}
      <div
        id={`gallery-panel-${group.id}`}
        role="tabpanel"
        className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm"
      >
        {/* Image area */}
        <div className="relative w-full bg-slate-50 flex items-center justify-center min-h-[280px] sm:min-h-[360px]">
          <img
            key={image.src}   // fuerza re-render al cambiar imagen
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-[420px] w-auto h-auto object-contain p-4"
          />

          {/* Prev / Next arrows — solo si hay más de 1 imagen en el grupo */}
          {group.images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImage((p) => Math.max(0, p - 1))}
                disabled={activeImage === 0}
                aria-label="Imagen anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:border-[#1e3a5f] hover:text-[#1e3a5f] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
              >
                ←
              </button>
              <button
                onClick={() => setActiveImage((p) => Math.min(group.images.length - 1, p + 1))}
                disabled={activeImage === group.images.length - 1}
                aria-label="Imagen siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:border-[#1e3a5f] hover:text-[#1e3a5f] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* ── Variant selector strip ── */}
        {group.images.length > 1 && (
          <div
            className="flex flex-wrap gap-1.5 px-4 py-3 border-t border-slate-100 bg-slate-50/70"
            role="group"
            aria-label="Seleccionar variante"
          >
            {group.images.map((img, i) => {
              const isActive = i === activeImage
              return (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-pressed={isActive}
                  className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-sm border transition-all duration-100 ${
                    isActive
                      ? "bg-[#1e3a5f]/10 text-[#1e3a5f] border-[#1e3a5f]/30 font-semibold"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {img.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Caption ── */}
      <figcaption className="mt-3 max-w-prose">
        {figNum !== undefined && (
          <span className="font-semibold text-slate-800 text-[13px]">
            Figura {figNum}.{" "}
          </span>
        )}
        <span className="text-[13px] text-slate-600 leading-relaxed">
          {image.alt}
          {caption && (
            <span className="block text-[12px] text-slate-400 mt-0.5">
              {caption}
            </span>
          )}
        </span>
        {/* Progress indicator */}
        <span className="block text-[11px] text-slate-400 mt-1.5 font-mono">
          {group.title} — {activeImage + 1} / {group.images.length}
          {groups.length > 1 && (
            <span className="ml-2 text-slate-300">
              · {activeGroup + 1} de {groups.length} grupos
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  )
}
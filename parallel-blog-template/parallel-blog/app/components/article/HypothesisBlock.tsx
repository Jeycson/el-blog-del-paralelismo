"use client"

import { useState } from "react"

// ── Types ────────────────────────────────────────────────────────────────────

export interface HypothesisEntry {
  author: string
  initials: string
  response: string
}

export interface HypothesisQuestion {
  id: string
  number: number
  question: string
  entries: HypothesisEntry[]
}

interface HypothesisBlockProps {
  questions: HypothesisQuestion[]
  title?: string
  description?: string
}

// ── Author color map (consistent across renders) ─────────────────────────────

const AUTHOR_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  default0: { bg: "#1e3a5f",  text: "#ffffff", border: "#1e3a5f" },
  default1: { bg: "#0f6e56",  text: "#ffffff", border: "#0f6e56" },
  default2: { bg: "#854F0B",  text: "#ffffff", border: "#854F0B" },
  default3: { bg: "#533AB7",  text: "#ffffff", border: "#533AB7" },
}

function getAuthorColor(index: number) {
  return AUTHOR_COLORS[`default${index % 4}`]
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AuthorCard({
  entry,
  colorIndex,
}: {
  entry: HypothesisEntry
  colorIndex: number
}) {
  const color = getAuthorColor(colorIndex)
  return (
    <div className="flex gap-3 p-4 bg-white border border-slate-100 rounded-sm hover:border-slate-200 transition-colors duration-100">
      {/* Avatar */}
      <div
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
        style={{ background: color.bg, color: color.text }}
        aria-hidden
      >
        {entry.initials}
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[11px] font-bold tracking-wide uppercase mb-1.5"
          style={{ color: color.bg }}
        >
          {entry.author}
        </p>
        <p className="text-[13px] text-slate-600 leading-relaxed">
          {entry.response}
        </p>
      </div>
    </div>
  )
}

function QuestionAccordion({
  question,
  isOpen,
  onToggle,
}: {
  question: HypothesisQuestion
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`border rounded-sm overflow-hidden transition-colors duration-150 ${
        isOpen ? "border-[#1e3a5f]/30" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Question header / trigger */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`hypothesis-panel-${question.id}`}
        className={`w-full flex items-start gap-4 px-5 py-4 text-left transition-colors duration-150 ${
          isOpen ? "bg-[#1e3a5f]/5" : "bg-white hover:bg-slate-50"
        }`}
      >
        {/* Number badge */}
        <span
          className={`shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-150 ${
            isOpen
              ? "bg-[#1e3a5f] text-white"
              : "bg-slate-100 text-slate-500"
          }`}
          aria-hidden
        >
          {question.number}
        </span>

        {/* Question text */}
        <span
          className={`flex-1 text-[13px] font-medium leading-snug transition-colors duration-150 ${
            isOpen ? "text-[#1e3a5f]" : "text-slate-800"
          }`}
        >
          {question.question}
        </span>

        {/* Chevron */}
        <span
          className={`shrink-0 mt-0.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          ▾
        </span>
      </button>

      {/* Answers panel */}
      {isOpen && (
        <div
          id={`hypothesis-panel-${question.id}`}
          role="region"
          className="px-5 pb-5 pt-3 bg-slate-50/60 border-t border-slate-100"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.entries.map((entry, i) => (
              <AuthorCard key={entry.author} entry={entry} colorIndex={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HypothesisBlock({
  questions,
  title = "Hipótesis previas al experimento",
  description,
}: HypothesisBlockProps) {
  // Open first question by default
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section className="my-10 not-prose" aria-labelledby="hypothesis-heading">
      {/* Accordion */}
      <div className="flex flex-col gap-2">
        {questions.map((q, i) => (
          <QuestionAccordion
            key={q.id}
            question={q}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
        Hipótesis formuladas antes de la ejecución del experimento.{" "}
        <span className="italic">
          Grupo 804 — Sistemas de Cómputo Paralelo y Distribuido, UNISTMO Tehuantepec.
        </span>
      </p>
    </section>
  )
}
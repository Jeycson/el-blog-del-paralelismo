import type { Metadata } from "next";
import { HYPOTHESES, HYPOTHESIS_META, PROJECT_META } from "@/lib/data";
import HypothesisBlock from "@/app/components/article/HypothesisBlock";

export const metadata: Metadata = {
  title: "Hipótesis",
  description: HYPOTHESIS_META.description,
};

export default function HipotesisPage() {
  return (
    <div className="max-w-7xl mx-auto px-1">

      {/* ── Content ── */}
      <div className="max-w-4xl">

        {/* Context callout */}
        <div className="mb-10 flex gap-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-sm not-prose">
          <span className="text-amber-500 text-lg mt-0.5 leading-none" aria-hidden>⚠</span>
          <div>
            <p className="text-[11px] tracking-widest uppercase font-bold text-amber-700 mb-1">
              Nota metodológica
            </p>
            <p className="text-[13px] text-amber-900 leading-relaxed">
              Estas hipótesis fueron redactadas <strong>antes</strong> de ejecutar cualquier
              experimento. Su valor reside en documentar el razonamiento a priori de cada
              investigador, lo que permite evaluar posteriormente qué intuiciones eran correctas,
              cuáles no, y por qué.
            </p>
          </div>
        </div>

        {/* The hypothesis accordion — reuses the same component */}
        <HypothesisBlock
          questions={HYPOTHESES}
          title="Preguntas de investigación"
          description={`${HYPOTHESES.length} preguntas formuladas por los ${HYPOTHESES[0].entries.length} integrantes del equipo.`}
        />

        {/* Summary stats */}
        <div className="mt-14 pt-8 border-t border-slate-200">
          <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-5">
            Resumen de las hipótesis
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: HYPOTHESES.length,                              label: "Preguntas" },
              { value: HYPOTHESES[0].entries.length,                   label: "Investigadores" },
              { value: HYPOTHESES.length * HYPOTHESES[0].entries.length, label: "Hipótesis totales" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-slate-200 rounded-sm px-4 py-3"
              >
                <p className="font-serif text-2xl font-bold text-[#1e3a5f] leading-none mb-1">
                  {stat.value}
                </p>
                <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-[12px] font-medium text-slate-800 leading-snug">{value}</p>
    </div>
  );
}
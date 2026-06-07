import { HardwareSpec } from "@/types";

interface HardwareCardProps {
  spec: HardwareSpec;
}

const roleLabel: Record<HardwareSpec["role"], string> = {
  laptop: "Laptop de Desarrollo",
  server: "Servidor de Laboratorio",
  workstation: "Estación de Trabajo",
};

const roleColor: Record<HardwareSpec["role"], string> = {
  laptop: "bg-sky-50 text-sky-700 border-sky-200",
  server: "bg-emerald-50 text-emerald-700 border-emerald-200",
  workstation: "bg-violet-50 text-violet-700 border-violet-200",
};

export default function HardwareCard({ spec }: HardwareCardProps) {
  return (
    <article className="bg-white border border-slate-200 rounded-sm hover:border-[#1e3a5f]/30 hover:shadow-md transition-all duration-200 group overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-[15px] font-semibold text-slate-900 leading-snug group-hover:text-[#1e3a5f] transition-colors">
            {spec.name}
          </h3>
          <span
            className={`shrink-0 text-[10px] tracking-wide uppercase font-semibold px-2 py-0.5 rounded border ${roleColor[spec.role]}`}
          >
            {roleLabel[spec.role]}
          </span>
        </div>
        <p className="text-[13px] font-medium text-slate-700">{spec.cpu}</p>
      </div>

      {/* Specs grid */}
      <div className="px-5 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <SpecRow label="Núcleos / Hilos" value={`${spec.cores}C / ${spec.threads}T`} accent />
        <SpecRow label="RAM" value={spec.ram} />
        <SpecRow label="Caché L1" value={spec.cacheL1} />
        <SpecRow label="Caché L2" value={spec.cacheL2} />
        <SpecRow label="Caché L3" value={spec.cacheL3} />
        <SpecRow label="Sistema Operativo" value={spec.os} />
      </div>

      {/* Notes */}
      {spec.notes && (
        <div className="mx-5 mb-5 px-3 py-2 bg-amber-50 border-l-2 border-amber-400 rounded-r-sm">
          <p className="text-[11px] text-amber-800 leading-relaxed">
            <span className="font-semibold uppercase tracking-wide text-[10px]">Nota: </span>
            {spec.notes}
          </p>
        </div>
      )}
    </article>
  );
}

function SpecRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] tracking-wider uppercase font-semibold text-slate-400 mb-0.5">
        {label}
      </p>
      <p className={`text-[12px] leading-snug ${accent ? "font-bold text-[#1e3a5f]" : "text-slate-700"}`}>
        {value}
      </p>
    </div>
  );
}

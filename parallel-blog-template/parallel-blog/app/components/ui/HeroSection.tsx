import { PROJECT_META } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
      {/* Overline */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-px bg-[#1e3a5f]" />
        <span className="text-[11px] tracking-widest uppercase font-semibold text-[#1e3a5f]">
          Proyecto de Investigación · {PROJECT_META.semester}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight max-w-4xl mb-6">
        {PROJECT_META.title}
      </h1>

      {/* Abstract */}
      <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mb-12 font-light">
        {PROJECT_META.abstract}
      </p>

      {/* Metadata grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-slate-200 pt-8">
        <MetaBlock label="Institución" value={PROJECT_META.institution} />
        <MetaBlock label="Facultad" value={PROJECT_META.faculty} />
        <MetaBlock
          label="Mentor"
          value={PROJECT_META.mentor.name}
          sub={PROJECT_META.mentor.role}
        />
        <div>
          <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mb-2">
            Equipo Investigador
          </p>
          <ul className="space-y-0.5">
            {PROJECT_META.members.map((m) => (
              <li key={m.name}>
                <span className="text-[13px] font-medium text-slate-800">{m.name}</span>
                <span className="text-[12px] text-slate-400 ml-1.5">— {m.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative rule */}
      <div className="mt-16 h-px bg-gradient-to-r from-[#1e3a5f] via-slate-200 to-transparent" />
    </section>
  );
}

function MetaBlock({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mb-1.5">
        {label}
      </p>
      <p className="text-[13px] font-medium text-slate-800 leading-snug">{value}</p>
      {sub && <p className="text-[12px] text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

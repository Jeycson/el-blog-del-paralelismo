import HeroSection from "./components/ui/HeroSection";
import HardwareCard from "./components/ui/HardwareCard";
import ArticleCard from "./components/ui/ArticleCard";
import { ARTICLES, HARDWARE_SPECS, PROJECT_META } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSection />

      {/* ── HARDWARE GRID ── */}
      <section
        id="hardware"
        className="px-6 lg:px-10 max-w-7xl mx-auto pb-20"
        aria-labelledby="hardware-heading"
      >
        <SectionHeader
          overline="Infraestructura de Pruebas"
          title="Entornos de Hardware"
          description="Cada experimento fue ejecutado de manera reproducible en los siguientes entornos controlados, documentando exhaustivamente las especificaciones de CPU y jerarquía de caché."
          id="hardware-heading"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {HARDWARE_SPECS.map((spec) => (
            <HardwareCard key={spec.id} spec={spec} />
          ))}
        </div>
      </section>

      {/* ── ARTICLES FEED ── */}
      <section
        id="articles"
        className="px-6 lg:px-10 max-w-7xl mx-auto pb-24"
        aria-labelledby="articles-heading"
      >
        <div className="h-px bg-slate-200 mb-16" />
        <SectionHeader
          overline="Casos de Estudio"
          title="Casos de Estudio Documentados"
          description={`${ARTICLES.length} casos de estudio documentados que abarcan análisis de SpeedUp, overhead de sincronización, impacto del GIL de CPython y comportamiento de caché bajo distintos patrones de acceso a memoria.`}
          id="articles-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          {ARTICLES.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* ── TEAM / ABOUT ── */}
      <section
        id="about"
        className="bg-white border-y border-slate-200 py-20"
        aria-labelledby="about-heading"
      >
        <div className="px-6 lg:px-10 max-w-7xl mx-auto">
          <SectionHeader
            overline="Acerca del Proyecto"
            title="Equipo de Investigación"
            id="about-heading"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Members */}
            <div>
              <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-5">
                Investigadores
              </p>
              <ul className="space-y-4">
                {PROJECT_META.members.map((m) => (
                  <li key={m.name} className="flex items-center gap-4">
                    {/* Contenedor del Avatar / Fallback */}
                    <div className="w-10 h-10 rounded-full bg-[#1e3a5f] relative overflow-hidden flex items-center justify-center shrink-0 border border-slate-100">
                      {m.photo ? (
                        <img 
                          src={m.photo} 
                          alt={`Foto de perfil de ${m.name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white uppercase">
                          {m.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-slate-900">
                        {m.name}
                      </p>
                      <p className="text-[12px] text-slate-500">{m.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mentor + institution */}
            <div className="space-y-6">
              <div>
                <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-3">
                  Mentor de Investigación
                </p>
                <div className="flex items-center gap-4">
                  {/* Contenedor del Avatar del Mentor */}
                  <div className="w-10 h-10 rounded-full bg-slate-200 relative overflow-hidden flex items-center justify-center shrink-0 border border-slate-200">
                    {PROJECT_META.mentor.photo ? (
                      <img 
                        src={PROJECT_META.mentor.photo} 
                        alt={`Foto de perfil de ${PROJECT_META.mentor.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-slate-600 uppercase">
                        {PROJECT_META.mentor.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-slate-900">
                      {PROJECT_META.mentor.name}
                    </p>
                    <p className="text-[12px] text-slate-500">
                      {PROJECT_META.mentor.role}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-2">
                  Institución
                </p>
                <p className="text-[14px] font-medium text-slate-800">
                  {PROJECT_META.institution}
                </p>
                <p className="text-[13px] text-slate-500">
                  {PROJECT_META.faculty}
                </p>
                <p className="text-[13px] text-slate-400 mt-0.5">
                  {PROJECT_META.semester}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Reusable section header ─────────────────────────────────────────────────
function SectionHeader({
  overline,
  title,
  description,
  id,
}: {
  overline: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <header>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-6 h-px bg-[#1e3a5f]" />
        <span className="text-[10px] tracking-widest uppercase font-bold text-[#1e3a5f]">
          {overline}
        </span>
      </div>
      <h2
        id={id}
        className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-3"
      >
        {title}
      </h2>
      {description && (
        <p className="text-[14px] text-slate-500 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </header>
  );
}
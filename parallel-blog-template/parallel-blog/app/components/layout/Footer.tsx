import Link from "next/link";
import { PROJECT_META } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-base font-semibold text-slate-900 mb-2">
              {PROJECT_META.shortTitle}
            </p>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              {PROJECT_META.faculty}
              <br />
              {PROJECT_META.institution}
              <br />
              {PROJECT_META.semester}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[11px] tracking-widest uppercase font-semibold text-slate-400 mb-3">
              Navegación
            </p>
            <ul className="space-y-2">
              {[
                ["/#articles", "Artículos de investigación"],
                ["/#hardware", "Entornos de hardware"],
                ["/#about", "Equipo de trabajo"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-slate-500 hover:text-[#1e3a5f] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <p className="text-[11px] tracking-widest uppercase font-semibold text-slate-400 mb-3">
              Investigadores
            </p>
            <ul className="space-y-1">
              {PROJECT_META.members.map((m) => (
                <li key={m.name} className="text-[13px] text-slate-500">
                  {m.name}{" "}
                  <span className="text-slate-400">— {m.role}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-slate-400">
              Bajo tutoría de{" "}
              <span className="text-slate-600">{PROJECT_META.mentor.name}</span>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-slate-400">
            © {new Date().getFullYear()} {PROJECT_META.institution}. Contenido académico con fines de investigación.
          </p>
          <a
            href={PROJECT_META.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-slate-400 hover:text-[#1e3a5f] transition-colors"
          >
            Ver repositorio en GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}

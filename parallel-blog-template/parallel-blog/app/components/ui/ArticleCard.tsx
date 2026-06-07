import Link from "next/link";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const categoryColor: Record<string, string> = {
  "Análisis de Rendimiento": "text-blue-700 bg-blue-50 border-blue-200",
  "Sistemas de Hilos": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "Lenguajes de Alto Nivel": "text-violet-700 bg-violet-50 border-violet-200",
  "Arquitectura de Memoria": "text-orange-700 bg-orange-50 border-orange-200",
};

const tagColors = [
  "bg-slate-100 text-slate-600",
  "bg-slate-100 text-slate-600",
];

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const catClass = categoryColor[article.category] ?? "text-slate-700 bg-slate-50 border-slate-200";
  const formattedDate = new Date(article.date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="h-full flex flex-col bg-white border border-slate-200 rounded-sm hover:border-[#1e3a5f]/40 hover:shadow-lg transition-all duration-200">
        {/* Index stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1e3a5f] to-[#1e3a5f]/20 rounded-t-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="flex flex-col flex-1 p-6">
          {/* Category + reading time */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded border ${catClass}`}
            >
              {article.category}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {article.readingTime} min lectura
            </span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#1e3a5f] transition-colors duration-150">
            {article.title}
          </h2>

          {/* Subtitle */}
          <p className="text-[13px] text-slate-500 leading-relaxed mb-4 flex-1">
            {article.subtitle}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {article.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 4 && (
              <span className="text-[11px] text-slate-400">
                +{article.tags.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex -space-x-1.5">
              {article.authors.slice(0, 2).map((a) => (
                <div
                  key={a.name}
                  className="w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center ring-2 ring-white"
                  title={a.name}
                >
                  <span className="text-[9px] font-bold text-white uppercase">
                    {a.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
            <time
              dateTime={article.date}
              className="text-[11px] text-slate-400"
            >
              {formattedDate}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}

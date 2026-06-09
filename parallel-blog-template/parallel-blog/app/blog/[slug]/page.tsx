// app/blog/[slug]/page.tsx (SERVER COMPONENT PURO, SIN "USE CLIENT")
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ARTICLES, HARDWARE_SPECS } from "@/lib/data";
import TableOfContents from "@/app/components/article/TableOfContents";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.abstract,
  };
}

// Mapas de importaciones para que Webpack resuelva todo en tiempo de compilación estática (Build Time)
const mdxArticles: Record<string, any> = {
  "caso-a-variacion-carga": () => import("@/content/articles/caso-a-variacion-carga.mdx"),
  "caso-b-overhead-hilos": () => import("@/content/articles/caso-b-overhead-hilos.mdx"),
  "caso-c-comparacion-linux-virtualbox-windows11": () => import("@/content/articles/caso-c-comparacion-linux-virtualbox-windows11.mdx"),
  "caso-d-windows-virtualbox-linux": () => import("@/content/articles/caso-d-windows-virtualbox-linux.mdx"),
  "caso-e-speedup-so-variacion-carga": () => import("@/content/articles/caso-e-speedup-so-variacion-carga.mdx"),
  "caso-f-speedup-sistemas-operativos": () => import("@/content/articles/caso-f-speedup-sistemas-operativos.mdx"),
  "caso-g-speedup-lenguajes-alto-bajo-nivel": () => import("@/content/articles/caso-g-speedup-lenguajes-alto-bajo-nivel.mdx"),
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  
  if (!article || !mdxArticles[slug]) notFound();

  // Importamos el archivo directamente en el servidor
  const mdxModule = await mdxArticles[slug]();
  const Content = mdxModule.default;
  const mdxData = mdxModule.metadata || {};

  const usedHardware = HARDWARE_SPECS.filter((h) =>
    article.hardware.includes(h.id)
  );

  const toc = mdxData?.toc || [];
  const formattedDate = new Date(article.date).toLocaleDateString("es-MX", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="pt-20 pb-24 max-w-7xl mx-auto px-6 lg:px-10">
      {/* ── Article header ── */}
      <header className="max-w-4xl mx-auto pt-12 pb-10 border-b border-slate-200 mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 text-[12px] text-slate-400">
          <a href="/" className="hover:text-slate-700 transition-colors">Inicio</a>
          <span aria-hidden="true">›</span>
          <a href="/#articles" className="hover:text-slate-700 transition-colors">Casos de estudio</a>
          <span aria-hidden="true">›</span>
          <span className="text-slate-600 font-medium truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Category badge */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] tracking-widest uppercase font-bold text-[#1e3a5f] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-sm">
            {article.category}
          </span>
          <span className="text-[12px] text-slate-400">{article.readingTime} min de lectura</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-slate-500 font-light leading-relaxed mb-8 max-w-3xl">
          {article.subtitle}
        </p>

        {/* Authors + date + hardware */}
        <div className="flex flex-wrap items-center gap-6 text-[13px]">
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              {article.authors.map((a) => (
                <div
                  key={a.name}
                  className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center ring-2 ring-white"
                  title={`${a.name} — ${a.role}`}
                >
                  <span className="text-[10px] font-bold text-white uppercase">
                    {a.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
            <div>
              {article.authors.map((a) => (
                <div key={a.name} className="text-slate-700 font-medium leading-snug">
                  {a.name}
                  <span className="text-slate-400 font-normal ml-1.5 text-[12px]">
                    {a.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <time dateTime={article.date} className="text-slate-400 text-[12px]">
            {formattedDate}
          </time>

          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="flex gap-12 xl:gap-16">
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <TableOfContents items={toc} />
        </aside>

        
        <article className="flex-1 min-w-0">
          {/* Abstract callout */}
          <div className="mb-10 p-5 bg-slate-50 border border-slate-200 rounded-sm">
            <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-2">
              Resumen / Abstract
            </p>
            <p className="text-[14px] text-slate-700 leading-relaxed font-serif italic">
              {article.abstract}
            </p>
          </div>

          {/* Hardware used */}
          <div className="mb-10 p-4 border border-slate-200 rounded-sm">
            <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-3">
              Entornos utilizados en este caso
            </p>
            <div className="flex flex-wrap gap-3">
              {usedHardware.map((h) => (
                <div key={h.id} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f]" />
                  <span className="text-[12px] font-medium text-slate-700">{h.name}</span>
                  <span className="text-[11px] text-slate-400">— {h.cpu}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── El cuerpo del artículo renderizado en el Servidor ── */}
          <div className="article-body text-justify break-words">
            {/* Ya no necesitas pasarle `components`, Next.js los inyecta mágicamente */}
            <Content /> 
          </div>
        </article>
      </div>
    </div>
  );
}
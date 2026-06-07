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
  // Agrega aquí tus otros slugs cuando crees más artículos, ej:
  // "caso-b-optimizacion-memoria": () => import("@/content/articles/caso-b-optimizacion-memoria.mdx"),
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
      {/* ... (Todo tu HTML del Header se queda exactamente igual) ... */}

      <div className="flex gap-12 xl:gap-16">
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <TableOfContents items={toc} />
        </aside>

        <article className="flex-1 min-w-0">
          {/* ... (Tus contenedores de Abstract y Hardware se quedan igual) ... */}

          {/* ── El cuerpo del artículo renderizado en el Servidor ── */}
          <div className="article-body">
            {/* Ya no necesitas pasarle `components`, Next.js los inyecta mágicamente */}
            <Content /> 
          </div>
        </article>
      </div>
    </div>
  );
}
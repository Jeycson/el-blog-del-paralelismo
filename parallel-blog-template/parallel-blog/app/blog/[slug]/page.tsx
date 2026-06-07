import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ARTICLES, HARDWARE_SPECS } from "@/lib/data";
import TableOfContents from "@/app/components/article/TableOfContents";
import AcademicTable from "@/app/components/article/AcademicTable";
import CalloutBlock from "@/app/components/article/CalloutBlock";
import ChartContainer, { ChartPlaceholder } from "@/app/components/article/ChartContainer";
import { TocItem, TableData } from "@/types";

// ── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.abstract,
    authors: article.authors.map((a) => ({ name: a.name })),
  };
}

// ── Demo TOC and tables for "caso-a" ─────────────────────────────────────────
const DEMO_TOC: TocItem[] = [
  { id: "introduccion", title: "Introducción", level: 1 },
  { id: "metodologia", title: "Metodología", level: 1 },
  { id: "configuracion", title: "Configuración del experimento", level: 2 },
  { id: "metricas", title: "Métricas de evaluación", level: 2 },
  { id: "resultados", title: "Resultados", level: 1 },
  { id: "tabla-tiempos", title: "Tiempos de ejecución", level: 2 },
  { id: "grafica-speedup", title: "SpeedUp relativo", level: 2 },
  { id: "analisis", title: "Análisis y Discusión", level: 1 },
  { id: "conclusiones", title: "Conclusiones", level: 1 },
];

const TIMING_TABLE: TableData = {
  caption:
    "Tiempos promedio de ejecución (ms) y SpeedUp relativo al baseline secuencial para N = 10⁸ elementos de doble precisión. Mediana de 30 repeticiones; desviación estándar entre paréntesis.",
  headers: ["Implementación", "T̄ (ms)", "σ (ms)", "SpeedUp", "Eficiencia (%)"],
  rows: [
    ["Secuencial (baseline)", "4 820", "±42", "1.00×", "100%"],
    ["SIMD AVX2 (1 hilo)", "1 210", "±18", "3.98×", "99.5%"],
    ["OpenMP 4 hilos", "1 380", "±31", "3.49×", "87.3%"],
    ["OpenMP 8 hilos", "820", "±22", "5.88×", "73.5%"],
    ["OpenMP 14 hilos", "610", "±27", "7.90×", "56.4%"],
    ["Python threading (8T)", "5 100", "±95", "0.94×", "—"],
    ["Python multiprocessing (8P)", "1 050", "±44", "4.59×", "57.4%"],
  ],
  highlightCol: 3,
};

// ── Page component ────────────────────────────────────────────────────────────
export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const usedHardware = HARDWARE_SPECS.filter((h) =>
    article.hardware.includes(h.id)
  );

  const formattedDate = new Date(article.date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-20 pb-24 max-w-7xl mx-auto px-6 lg:px-10">
      {/* ── Article header ── */}
      <header className="max-w-4xl mx-auto pt-12 pb-10 border-b border-slate-200 mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 text-[12px] text-slate-400">
          <a href="/" className="hover:text-slate-700 transition-colors">Inicio</a>
          <span aria-hidden>›</span>
          <a href="/#articles" className="hover:text-slate-700 transition-colors">Artículos</a>
          <span aria-hidden>›</span>
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
                <p key={a.name} className="text-slate-700 font-medium leading-snug">
                  {a.name}
                  <span className="text-slate-400 font-normal ml-1.5 text-[12px]">
                    {a.role}
                  </span>
                </p>
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

      {/* ── Two-column layout ── */}
      <div className="flex gap-12 xl:gap-16">

        {/* Left: Table of contents */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <TableOfContents items={DEMO_TOC} />
        </aside>

        {/* Right: Article body */}
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

          {/* ── Article body ── */}
          <div className="article-body">
            <h2 id="introduccion">Introducción</h2>
            <p>
              El paradigma de computación paralela ha experimentado una evolución acelerada impulsada por el estancamiento del escalado de frecuencia de reloj en microprocesadores modernos. Las arquitecturas multinúcleo, junto con las extensiones de instrucciones vectoriales (SIMD), ofrecen caminos complementarios hacia el alto rendimiento: el primero mediante paralelismo a nivel de tarea, el segundo mediante paralelismo a nivel de datos.
            </p>
            <p>
              En este caso de estudio investigamos de manera sistemática cómo el tamaño del problema —medido en número de elementos de punto flotante de doble precisión— modifica el balance entre el overhead de coordinación de hilos y la ganancia computacional neta bajo OpenMP y vectorización AVX2.
            </p>

            <h2 id="metodologia">Metodología</h2>
            <h3 id="configuracion">Configuración del experimento</h3>
            <p>
              Cada condición experimental fue ejecutada en un proceso dedicado con afinidad de CPU fijada mediante <code>taskset</code>, garantizando que los hilos no migren entre núcleos durante la medición. El gobernador de frecuencia fue configurado en modo <code>performance</code> para eliminar variabilidad por DVFS.
            </p>
            <p>
              Las mediciones de tiempo utilizan <code>clock_gettime(CLOCK_MONOTONIC)</code> con resolución de nanosegundos. Cada configuración se repite 30 veces y se reporta la mediana para minimizar la influencia de outliers causados por interrupciones del sistema operativo.
            </p>

            <h3 id="metricas">Métricas de evaluación</h3>
            <p>
              Definimos el SpeedUp de Amdahl como{" "}
              <span className="font-mono text-[#1e3a5f] bg-blue-50 px-1.5 py-0.5 rounded text-[13px]">
                S(n) = T₁ / Tₙ
              </span>{" "}
              donde T₁ es el tiempo de la implementación secuencial optimizada y Tₙ el tiempo con <em>n</em> unidades de ejecución. La eficiencia paralela se define como{" "}
              <span className="font-mono text-[#1e3a5f] bg-blue-50 px-1.5 py-0.5 rounded text-[13px]">
                E(n) = S(n) / n × 100%
              </span>.
            </p>

            {/* Callout: note */}
            <CalloutBlock
              type="note"
              title="Baseline secuencial con -O3 y -march=native"
              content="El baseline secuencial fue compilado con -O3 -march=native, lo que permite al compilador auto-vectorizar con SSE4.2. El SpeedUp de SIMD manual se mide relativo a este baseline, por lo que un SpeedUp < 4× no implica implementación deficiente sino que el compilador ya aprovecha extensiones vectoriales básicas."
            />

            <h2 id="resultados">Resultados</h2>
            <h3 id="tabla-tiempos">Tiempos de ejecución</h3>
            <p>
              La Tabla 1 resume los tiempos de ejecución promedio para N = 10⁸ elementos. Se observa que la implementación con SIMD AVX2 manual alcanza casi el SpeedUp teórico para un registro de 256 bits (4 doubles × 64 bits), mientras que OpenMP exhibe degradación de eficiencia creciente conforme aumenta el conteo de hilos.
            </p>
          </div>

          {/* Academic table outside prose */}
          <AcademicTable data={TIMING_TABLE} tableNumber={1} />

          <div className="article-body">
            <CalloutBlock
              type="warning"
              title="Python threading regresa SpeedUp < 1×"
              content="El GIL (Global Interpreter Lock) de CPython serializa efectivamente los hilos durante operaciones de cómputo numérico puro. El overhead de creación y sincronización de hilos resulta en un tiempo de ejecución 6% mayor que el baseline secuencial. Este resultado ilustra que threading en CPython no es apropiado para carga de trabajo CPU-bound."
            />

            <h3 id="grafica-speedup">SpeedUp relativo</h3>
            <p>
              La Figura 1 presenta el diagrama de caja y bigotes (boxplot) del SpeedUp obtenido en las 30 repeticiones de cada condición. La dispersión reducida del SIMD indica alta reproducibilidad, mientras que OpenMP con 14 hilos presenta mayor variabilidad asociada a efectos NUMA y contención de caché L3.
            </p>
          </div>

          {/* Chart container */}
          <ChartContainer
            figureNumber={1}
            caption="Distribución del SpeedUp en 30 repeticiones por implementación. Los bigotes indican el rango intercuartil × 1.5. Los valores atípicos se muestran como puntos individuales. Nótese la alta varianza en OpenMP de 14 hilos, asociada a efectos NUMA en el Entorno C."
            source="Mediciones propias, Entorno A (i7-12700H) y Entorno C (Xeon E5-2690v4)"
            aspectRatio="wide"
          >
            <ChartPlaceholder
              type="boxplot"
              label="SpeedUp por implementación — N=10⁸"
            />
          </ChartContainer>

          <div className="article-body">
            <h2 id="analisis">Análisis y Discusión</h2>
            <p>
              La diferencia entre el SpeedUp teórico de SIMD (4× para AVX2 con doubles) y el medido (3.98×) es estadísticamente insignificante, lo que confirma que la implementación no incurre en penalizaciones de alineación y que los accesos a memoria son suficientemente predecibles para que el prefetcher hardware opere eficientemente.
            </p>
            <p>
              OpenMP presenta eficiencia decreciente conforme <em>n</em> → 14. Esto es consistente con la Ley de Amdahl y con la creciente presión sobre el bus de memoria: con 14 hilos activos, el ancho de banda del controlador de memoria se convierte en el cuello de botella.
            </p>

            <CalloutBlock
              type="insight"
              title="Punto de equilibrio SIMD vs. OpenMP"
              content="Para cargas vectoriales puras donde el ancho de banda de memoria es el cuello de botella, SIMD manual ofrece mejor relación SpeedUp/core que OpenMP multi-hilo. OpenMP resulta superior únicamente cuando la fracción paralela incluye cómputo dependiente de control de flujo que SIMD no puede vectorizar eficientemente."
            />

            <h2 id="conclusiones">Conclusiones</h2>
            <p>
              Los resultados de este caso de estudio establecen que la vectorización SIMD manual con AVX2 es el método más eficiente en términos de cores utilizados para operaciones de reducción y transformación de arreglos de punto flotante. OpenMP ofrece mayor escalabilidad absoluta pero con eficiencia decreciente por hilo.
            </p>
            <p>
              El caso de Python threading sirve como punto de referencia negativo: en cargas CPU-bound, el GIL elimina cualquier beneficio del paralelismo de hilos, y el overhead de gestión de hilos introduce regresión respecto al baseline secuencial. La alternativa correcta en CPython es <code>multiprocessing</code> o extensiones nativas en C/C++.
            </p>

            <CalloutBlock
              type="definition"
              title="Cache Miss Rate y su impacto en SpeedUp"
              content="Un cache miss de nivel L3 introduce latencias de 40-300 ciclos dependiendo del hardware, forzando al procesador a acceder al subsistema DRAM. En el Entorno C con 56 hilos activos, la tasa de L3 misses se triplicó respecto a la ejecución con 4 hilos (medido con perf stat -e LLC-load-misses), lo que explica la caída de eficiencia a 56.4% con 14 hilos."
            />
          </div>

          {/* References */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-[10px] tracking-widest uppercase font-bold text-slate-400 mb-5">
              Referencias
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              {[
                "Amdahl, G.M. (1967). Validity of the single processor approach to achieving large scale computing capabilities. AFIPS Conference Proceedings.",
                "Intel Corporation. (2023). Intel® 64 and IA-32 Architectures Optimization Reference Manual. Doc. 248966-046.",
                "OpenMP Architecture Review Board. (2021). OpenMP Application Programming Interface, Version 5.2.",
                "Van der Pas, R., Stotzer, E., & Terboven, C. (2017). Using OpenMP—The Next Step. MIT Press.",
              ].map((ref, i) => (
                <li key={i} className="text-[12px] text-slate-500 leading-relaxed pl-1">
                  {ref}
                </li>
              ))}
            </ol>
          </div>
        </article>
      </div>
    </div>
  );
}

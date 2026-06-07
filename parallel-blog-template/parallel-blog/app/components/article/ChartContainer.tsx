interface ChartContainerProps {
  figureNumber?: number;
  caption: string;
  source?: string;
  children: React.ReactNode;
  aspectRatio?: "square" | "wide" | "tall";
}

const aspectClasses = {
  square: "aspect-square",
  wide: "aspect-video",
  tall: "aspect-[4/3]",
};

export default function ChartContainer({
  figureNumber,
  caption,
  source,
  children,
  aspectRatio = "wide",
}: ChartContainerProps) {
  return (
    <figure className="my-10 not-prose">
      {figureNumber && (
        <p className="text-[11px] tracking-widest uppercase font-semibold text-[#1e3a5f] mb-2">
          Figura {figureNumber}
        </p>
      )}
      <div
        className={`w-full ${aspectClasses[aspectRatio]} bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden flex items-center justify-center`}
      >
        {children}
      </div>
      <figcaption className="mt-3 max-w-prose">
        <p className="text-[13px] text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">
            {figureNumber ? `Figura ${figureNumber}. ` : ""}
          </span>
          {caption}
        </p>
        {source && (
          <p className="text-[11px] text-slate-400 mt-1">
            Fuente: {source}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

/** Placeholder shown when chart library is not yet integrated */
export function ChartPlaceholder({
  type,
  label,
}: {
  type: "boxplot" | "bar" | "line" | "scatter";
  label?: string;
}) {
  const icons: Record<typeof type, string> = {
    boxplot: "◫",
    bar: "▐",
    line: "∿",
    scatter: "⊹",
  };
  const names: Record<typeof type, string> = {
    boxplot: "Box & Whisker Plot",
    bar: "Gráfica de Barras",
    line: "Gráfica de Línea",
    scatter: "Diagrama de Dispersión",
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-slate-50/80 select-none">
      <span className="text-4xl text-slate-300" aria-hidden>
        {icons[type]}
      </span>
      <div className="text-center">
        <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
          {names[type]}
        </p>
        {label && (
          <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
        )}
        <p className="text-[11px] text-slate-300 mt-1.5">
          Integrar componente de gráfico (Recharts / D3)
        </p>
      </div>
    </div>
  );
}

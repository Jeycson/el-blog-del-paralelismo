import { Callout } from "@/types";

interface CalloutBlockProps extends Callout {}

const variants: Record<
  Callout["type"],
  { border: string; bg: string; icon: string; label: string; title: string; body: string }
> = {
  note: {
    border: "border-[#1e3a5f]",
    bg: "bg-blue-50/50",
    icon: "ℹ",
    label: "text-[#1e3a5f]",
    title: "text-[#1e3a5f]",
    body: "text-slate-700",
  },
  warning: {
    border: "border-amber-500",
    bg: "bg-amber-50/60",
    icon: "⚠",
    label: "text-amber-700",
    title: "text-amber-800",
    body: "text-amber-900",
  },
  insight: {
    border: "border-emerald-500",
    bg: "bg-emerald-50/50",
    icon: "◆",
    label: "text-emerald-700",
    title: "text-emerald-800",
    body: "text-slate-700",
  },
  definition: {
    border: "border-violet-400",
    bg: "bg-violet-50/40",
    icon: "≡",
    label: "text-violet-700",
    title: "text-violet-800",
    body: "text-slate-700",
  },
};

const typeLabels: Record<Callout["type"], string> = {
  note: "Nota Importante",
  warning: "Advertencia",
  insight: "Observación Clave",
  definition: "Definición",
};

export default function CalloutBlock({ type, title, content }: CalloutBlockProps) {
  const v = variants[type];

  return (
    <aside className={`my-8 not-prose pl-4 pr-5 py-4 border-l-4 rounded-r-sm ${v.border} ${v.bg}`}>
      <div className="flex items-start gap-2.5">
        <span className={`mt-0.5 text-base font-bold leading-none ${v.label}`} aria-hidden>
          {v.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] tracking-widest uppercase font-bold mb-1 ${v.label}`}>
            {typeLabels[type]}
          </p>
          <p className={`text-[14px] font-semibold mb-1 leading-snug ${v.title}`}>{title}</p>
          <p className={`text-[13px] leading-relaxed ${v.body}`}>{content}</p>
        </div>
      </div>
    </aside>
  );
}

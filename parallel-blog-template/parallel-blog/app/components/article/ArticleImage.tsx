import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  height?: string; // 👈 Añadimos el parámetro opcional
}

export default function ArticleImage({ 
  src, 
  alt, 
  caption, 
  height = "400px" // 👈 Definimos un alto por defecto por si te olvidas de ponerlo
}: ArticleImageProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-sm border border-slate-200 bg-slate-50 p-2">
      {/* 💡 Pasamos el parámetro dinámico al estilo del contenedor */}
      <div 
        className="relative w-full" 
        style={{ height: height }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-w-7xl) 100vw, 800px"
          className="object-contain"
          quality={90}
          priority={false}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-[12px] font-mono text-slate-400 leading-relaxed px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
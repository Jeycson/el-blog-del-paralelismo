// app/components/article/CommentSection.tsx
"use client";

import { useState, useRef } from "react";
import { useComments } from "@/app/hooks/useComments";
import { CommentDTO } from "@/types/comments";

// ── Props ────────────────────────────────────────────────────────────────────

interface CommentSectionProps {
  /** Identificador único de la página. Usar "global" para sección global. */
  pageSlug?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)  return "Ahora mismo";
  if (mins  < 60) return `Hace ${mins} min`;
  if (hours < 24) return `Hace ${hours} h`;
  if (days  < 30) return `Hace ${days} día${days > 1 ? "s" : ""}`;
  return new Date(isoDate).toLocaleDateString("es-MX", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// Genera un color de avatar consistente basado en el nombre
const AVATAR_PALETTE = [
  "#1e3a5f", "#0f6e56", "#854F0B", "#533AB7",
  "#b91c1c", "#0369a1", "#047857", "#7c3aed",
];
function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

// ── Comment card ─────────────────────────────────────────────────────────────

function CommentCard({ comment }: { comment: CommentDTO }) {
  const color    = avatarColor(comment.author);
  const initials = getInitials(comment.author);

  return (
    <article className="flex gap-4 py-5 border-b border-slate-100 last:border-0">
      {/* Avatar */}
      <div
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white mt-0.5"
        style={{ background: color }}
        aria-hidden
      >
        {initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2.5 mb-1.5 flex-wrap">
          <span className="text-[13px] font-semibold text-slate-900">
            {comment.author}
          </span>
          <time
            dateTime={comment.createdAt}
            className="text-[11px] text-slate-400 font-medium"
            title={new Date(comment.createdAt).toLocaleString("es-MX")}
          >
            {timeAgo(comment.createdAt)}
          </time>
        </div>
        <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-wrap break-words">
          {comment.content}
        </p>
      </div>
    </article>
  );
}

// ── Comment form ──────────────────────────────────────────────────────────────

interface CommentFormProps {
    onSubmit: (
        body: {
            author: string;
            content: string;
        }
    ) => Promise<boolean>;

    posting: boolean;
    error: string | null;
}

function CommentForm({ onSubmit, posting, error }: CommentFormProps) {
  const [author,  setAuthor]  = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const MAX = 1000;
  const remaining = MAX - content.length;
  const canSubmit = author.trim().length > 0 &&
                    content.trim().length >= 3 &&
                    !posting;

  async function handleSubmit() {
    if (!canSubmit) return;

    const ok = await onSubmit({
        author: author.trim(),
        content: content.trim(),
    });

    if (ok) {
        setAuthor("");
        setContent("");
        setSuccess(true);

        setTimeout(() => setSuccess(false), 4000);
    }
}

  return (
    <div className="mb-8 p-5 bg-white border border-slate-200 rounded-sm">
      <p className="text-[10px] tracking-widest uppercase font-bold text-[#1e3a5f] mb-4">
        Dejar un comentario
      </p>

      {/* Name field */}
      <div className="mb-3">
        <label
          htmlFor="comment-author"
          className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
        >
          Nombre <span className="text-red-400">*</span>
        </label>
        <input
          id="comment-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Tu nombre o alias"
          maxLength={60}
          disabled={posting}
          className="w-full px-3 py-2 text-[13px] text-slate-800 bg-slate-50 border border-slate-200 rounded-sm
                     placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a5f] focus:ring-1
                     focus:ring-[#1e3a5f]/20 transition-colors duration-150 disabled:opacity-50"
        />
      </div>

      {/* Content field */}
      <div className="mb-4">
        <label
          htmlFor="comment-content"
          className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5"
        >
          Comentario <span className="text-red-400">*</span>
        </label>
        <textarea
          id="comment-content"
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX))}
          placeholder="Escribe tu comentario aquí…"
          rows={4}
          disabled={posting}
          className="w-full px-3 py-2 text-[13px] text-slate-800 bg-slate-50 border border-slate-200 rounded-sm
                     placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a5f] focus:ring-1
                     focus:ring-[#1e3a5f]/20 transition-colors duration-150 resize-y disabled:opacity-50
                     leading-relaxed"
        />
        <p className={`text-right text-[11px] mt-1 ${remaining < 100 ? "text-amber-500" : "text-slate-400"}`}>
          {remaining} caracteres restantes
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-3 py-2 bg-red-50 border border-red-200 rounded-sm">
          <p className="text-[12px] text-red-700">{error}</p>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mb-4 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-sm">
          <p className="text-[12px] text-emerald-700 font-medium">
            ✓ Comentario publicado correctamente.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white text-[12px] tracking-wide
                   uppercase font-bold rounded-sm hover:bg-[#2d5285] transition-colors duration-150
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {posting ? (
          <>
            <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Publicando…
          </>
        ) : (
          "Publicar comentario"
        )}
      </button>
    </div>
  );
}

// ── Comment list ──────────────────────────────────────────────────────────────

function CommentList({
  comments,
  loading,
}: {
  comments: CommentDTO[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 py-5 border-b border-slate-100 animate-pulse">
            <div className="w-9 h-9 rounded-full bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-slate-200 rounded" />
              <div className="h-3 w-full bg-slate-100 rounded" />
              <div className="h-3 w-4/5 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-[28px] mb-3" aria-hidden>💬</p>
        <p className="text-[13px] font-medium text-slate-500">
          Sin comentarios aún
        </p>
        <p className="text-[12px] text-slate-400 mt-1">
          Sé el primero en compartir tu opinión.
        </p>
      </div>
    );
  }

  return (
    <div>
      {comments.map((c) => (
        <CommentCard key={c.id} comment={c} />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CommentSection({ pageSlug = "global" }: CommentSectionProps) {
  const { comments, loading, posting, error, postComment } = useComments(pageSlug);

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-16 pt-10 border-t border-slate-200 not-prose"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-[#1e3a5f]" aria-hidden />
          <h2
            id="comments-heading"
            className="font-serif text-xl font-bold text-slate-900"
          >
            Comentarios
            {!loading && comments.length > 0 && (
              <span className="ml-2 text-[14px] font-normal text-slate-400 font-sans">
                ({comments.length})
              </span>
            )}
          </h2>
        </div>
      </div>

      {/* Form */}
      <CommentForm
        onSubmit={postComment}
        posting={posting}
        error={error}
      />

      {/* List */}
      <CommentList comments={comments} loading={loading} />
    </section>
  );
}
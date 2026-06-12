// hooks/useComments.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { CommentDTO, CreateCommentBody } from "@/types/comments";

interface UseCommentsReturn {
  comments: CommentDTO[];
  loading: boolean;
  posting: boolean;
  error: string | null;
  postComment: (body: Omit<CreateCommentBody, "pageSlug">) => Promise<boolean>;
  refresh: () => void;
}

export function useComments(pageSlug: string): UseCommentsReturn {
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [posting,  setPosting]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://backend-blog-mpv6.onrender.com/api/comments?slug=${encodeURIComponent(pageSlug)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error desconocido");
      setComments(json.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar comentarios.");
    } finally {
      setLoading(false);
    }
  }, [pageSlug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const postComment = useCallback(
    async (body: Omit<CreateCommentBody, "pageSlug">): Promise<boolean> => {
      setPosting(true);
      setError(null);
      try {
        console.log("Publicando comentario:", { ...body, pageSlug });
        const res = await fetch("https://backend-blog-mpv6.onrender.com/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...body, pageSlug }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Error al publicar.");
        // Optimistic prepend — el nuevo comentario aparece de inmediato
        setComments((prev) => [json.data, ...prev]);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al publicar el comentario.");
        return false;
      } finally {
        setPosting(false);
      }
    },
    [pageSlug]
  );

  return { comments, loading, posting, error, postComment, refresh: fetchComments };
}
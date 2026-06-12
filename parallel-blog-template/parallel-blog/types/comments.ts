// types/comments.ts

export interface CommentDTO {
  id: string;
  pageSlug: string;
  author: string;
  content: string;
  createdAt: string; // ISO string — serializable en JSON
}

export interface CreateCommentBody {
  pageSlug: string;
  author: string;
  content: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
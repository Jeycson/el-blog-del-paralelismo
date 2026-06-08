import { HypothesisEntry } from "@/app/components/article/HypothesisBlock";

export interface Author {
  name: string;
  role: string;
  institution: string;
}

export interface HardwareSpec {
  id: string;
  name: string;
  role: "laptop" | "server" | "workstation";
  cpu: string;
  cores: number;
  threads: number;
  cacheL1: string;
  cacheL2: string;
  cacheL3: string;
  ram: string;
  os: string;
  notes?: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  authors: Author[];
  date: string;
  readingTime: number;
  abstract: string;
  hardware: string[];
}

export interface TocItem {
  id: string;
  title: string;
  level: 1 | 2 | 3;
}

export interface TableData {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
  highlightCol?: number;
}

export interface Callout {
  type: "note" | "warning" | "insight" | "definition";
  title: string;
  content: string;
}

export interface HypothesisQuestion{
  id: string;
  number: number;
  question: string;
  entries: HypothesisEntry[];
}
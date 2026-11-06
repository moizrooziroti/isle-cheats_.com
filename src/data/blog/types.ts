import type { BlogPost } from '../../i18n/types';

export type BlogBlock =
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cta'; title: string; text: string; href: string };

export interface BlogPostFull extends BlogPost {
  featured?: boolean;
  author?: string;
  /** Overrides `<title>` keyword segment when set. */
  seoTitle?: string;
  /** Full meta description (no cheatMetaDescription prefix). */
  seoDescription?: string;
  /** Overrides visible H1 when set. */
  h1?: string;
  /** Lead paragraph under H1 when set. */
  lead?: string;
  body: BlogBlock[];
}

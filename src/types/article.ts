export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  image?: string;
  publishedAt?: string | null;
};

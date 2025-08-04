export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  cover: string | null;
  date: string;
  matchedTitle: string | null;
  matchedDescription: string | null;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  error?: string;
}

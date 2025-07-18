import type { Article } from '../types/article';

const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export async function searchArticles(query: string): Promise<Article[]> {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&api-key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch articles');
  const data = await res.json();
  return data.response.docs;
}

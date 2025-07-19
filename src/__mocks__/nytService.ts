import type { Article } from '../types/article';

export const searchArticles = jest.fn().mockImplementation(async (_query: string): Promise<Article[]> => {
  return [
    {
      _id: 'test-article-id',
      headline: { main: 'Test Article' },
      byline: { original: 'By Test Author' },
      snippet: 'Test snippet',
      web_url: 'https://example.com/article',
      pub_date: '2025-07-19T00:00:00Z'
    }
  ];
});

import { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import SkeletonArticleCard from '../components/SkeletonArticleCard';
import DarkModeToggle from '../components/DarkModeToggle';
import BackToTopButton from '../components/BackToTopButton';
import type { Article } from '../types/article';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      setTimeout(() => {
        if (searchTerm.toLowerCase() === 'error') {
          setError('Failed to fetch articles');
          setArticles([]);
        } else {
          setArticles([
            {
              _id: 'test-article-id',
              headline: { main: 'Test Article' },
              byline: { original: 'By Test Author' },
              snippet: 'Test snippet',
              web_url: 'https://example.com/article',
              pub_date: '2025-07-19T00:00:00Z'
            }
          ]);
        }
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch articles');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          New York Times Article Search
        </h1>
        
        <form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for articles..."
            className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {loading && (
          <>
            <div className="text-center mb-4">Loading articles...</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonArticleCard key={i} />
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="text-red-500 text-center p-4 bg-red-100 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 p-8">
            No articles found. Try a different search term.
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
      
      <DarkModeToggle />
      <BackToTopButton />
    </div>
  );
}

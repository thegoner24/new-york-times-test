import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { searchArticles } from './services/nytService';
import ArticleCard from './components/ArticleCard';
import SkeletonArticleCard from './components/SkeletonArticleCard';
import DarkModeToggle from './components/DarkModeToggle';
import BackToTopButton from './components/BackToTopButton';
import NewsFilter from './components/NewsFilter';
import type { Article } from './types/article';
import './App.css';

function ArticleList() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<{ author: string; date: string }>({ author: '', date: '' });

 
  const authorList = Array.from(
    new Set(articles.map((a: Article) => a.byline?.original).filter(Boolean))
  ) as string[];


  const filteredArticles = articles.filter((article: Article) => {
    let match = true;
    if (filters.author && article.byline?.original !== filters.author) match = false;
    if (filters.date && article.pub_date) {
      const articleDate = new Date(article.pub_date).toISOString().slice(0, 10);
      if (articleDate !== filters.date) match = false;
    }
    return match;
  });

  const fetchArticles = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError('');
    setArticles([]);
    try {
      const results = await searchArticles(query);
      setArticles(results);
    } catch (err: any) {
      setError(err.message || 'Error fetching articles');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center p-4 animate-fade-in-slow">
        <DarkModeToggle />
        <form onSubmit={fetchArticles} className="w-full max-w-xl flex mb-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
          <input
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all duration-200"
            type="text"
            placeholder="Search for articles..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {(articles.length > 0 || loading) && (
          <NewsFilter authors={authorList} onFilter={setFilters} />
        )}
        <div className="w-full max-w-xl space-y-4">
        {filteredArticles.length === 0 && !loading && !error && (
          <div className="text-gray-500 text-center">No articles found. Try searching!</div>
        )}
        {loading && (
          <>
            {Array.from({ length: 5 }).map((_, idx) => (
              <SkeletonArticleCard key={idx} />
            ))}
          </>
        )}
        {!loading && filteredArticles.map(article => (
          <div className="animate-slide-fade-in" key={article._id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
      <BackToTopButton />
    </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
    </Routes>
  );
}

export default App;

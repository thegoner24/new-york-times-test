import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { searchArticles } from './services/nytService';
import ArticleCard from './components/ArticleCard';
import SkeletonArticleCard from './components/SkeletonArticleCard';
import DarkModeToggle from './components/DarkModeToggle';
import type { Article } from './types/article';
import './App.css';

function ArticleList() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen flex flex-col items-center p-4">
      <DarkModeToggle />
      <h1 className="text-3xl font-bold my-4 font-nyt">NYT Article Search</h1>
      <form onSubmit={fetchArticles} className="w-full max-w-xl flex mb-6">
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
      {error && (
  <div className="mb-4 flex items-center justify-center">
    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded shadow flex items-center gap-2 animate-fade-in">
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
      <span>{error}</span>
    </div>
  </div>
)}
      <div className="w-full max-w-xl space-y-4">
        {articles.length === 0 && !loading && !error && (
          <div className="text-gray-500 text-center">No articles found. Try searching!</div>
        )}
        {loading && (
  <>
    {Array.from({ length: 5 }).map((_, idx) => (
      <SkeletonArticleCard key={idx} />
    ))}
  </>
)}
{!loading && articles.map(article => (
  <div className="animate-fade-in" key={article._id}>
    <ArticleCard article={article} />
  </div>
))}
      </div>
    </div>
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

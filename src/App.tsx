import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { searchArticles } from './services/nytService';
import ArticleCard from './components/ArticleCard';
import type { Article } from './types/article';
import ArticleDetail from './ArticleDetail';
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold my-4">NYT Article Search</h1>
      <form onSubmit={fetchArticles} className="w-full max-w-xl flex mb-6">
        <input
          className="flex-1 border rounded-l px-4 py-2 outline-none"
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
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="w-full max-w-xl space-y-4">
        {articles.length === 0 && !loading && !error && (
          <div className="text-gray-500 text-center">No articles found. Try searching!</div>
        )}
        {articles.map(article => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
    </Routes>
  );
}

export default App;

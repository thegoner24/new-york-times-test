import type { Article } from '../types/article';

interface Props {
  article: Article;
}

export default function ArticleCard({ article }: Props) {
  return (
    <a
      href={article.web_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white p-5 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50 hover:scale-[1.025] transition-all duration-200 ease-in-out mb-3 cursor-pointer"
    >
      <div className="text-xl font-semibold text-blue-700 hover:underline">
        {article.headline.main}
      </div>
      <div className="text-gray-700 mt-2">
        <span className="font-medium">By: </span>
        {article.byline?.original || 'Unknown Author'}
      </div>
      <div className="text-gray-600 mt-2 italic">
        {article.snippet || article.lead_paragraph || 'No description available.'}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {new Date(article.pub_date).toLocaleString()}
      </div>
    </a>
  );
}

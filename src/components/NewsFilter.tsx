import { useState } from 'react';

interface NewsFilterProps {
  authors: string[];
  onFilter: (filters: { author: string; date: string }) => void;
}

export default function NewsFilter({ authors, onFilter }: NewsFilterProps) {
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ author, date });
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-4">
      <button
        type="button"
        className="sm:hidden border rounded px-4 py-2 text-sm font-semibold bg-white hover:bg-gray-100 w-full mb-2 flex items-center justify-between"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls="news-filter-fields"
      >
        Filter Options
        <svg
          className={`ml-2 w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <form
        onSubmit={handleSubmit}
        id="news-filter-fields"
        className={`flex flex-col gap-3 ${open ? '' : 'hidden'} sm:flex sm:flex-col sm:gap-3 sm:block`}
      >
        <div className="flex flex-col">
          <label className="text-xs mb-1">Author</label>
          <select
            className="border rounded px-2 py-2 text-sm"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          >
            <option value="">All</option>
            {authors.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-xs mb-1">Date</label>
          <input
            type="date"
            className="border rounded px-2 py-2 text-sm"
            value={date}
            onChange={e => setDate(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <button
          type="submit"
          className="border rounded px-4 py-2 text-sm font-semibold bg-white hover:bg-gray-100 transition-all w-full"
        >
          Filter
        </button>
      </form>
      <style>{`
        @media (min-width: 640px) {
          #news-filter-fields { display: block !important; }
        }
      `}</style>
    </div>
  );
}

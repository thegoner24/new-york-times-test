import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' ? document.body.classList.contains('dark') : false
  );

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      className={`hidden sm:flex fixed top-4 right-4 z-50 w-14 h-8 items-center bg-gray-200 dark:bg-gray-700 rounded-full shadow border border-gray-300 dark:border-gray-600 transition-colors duration-300 focus:outline-none`}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setDark(d => !d)}
      type="button"
      style={{ padding: 0 }}
    >
      <span
        className={`absolute left-0 top-0 w-14 h-8 rounded-full transition-colors duration-300 ${dark ? 'bg-gray-800' : 'bg-white'}`}
        aria-hidden="true"
      />
      <span
        className={`inline-block w-7 h-7 rounded-full bg-white dark:bg-gray-900 shadow transform transition-transform duration-300 ${dark ? 'translate-x-6' : 'translate-x-1'}`}
        style={{ zIndex: 2 }}
      >
        <span className="flex items-center justify-center h-full w-full">
          {dark ? (
            <svg width="20" height="20" fill="none" stroke="#fbbf24" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="#f59e42" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95-6.95l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" /></svg>
          )}
        </span>
      </span>
    </button>
  );
}

import { useEffect, useState } from 'react';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`fixed right-4 bottom-20 z-50 p-3 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-all duration-300 md:right-8 md:bottom-8 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ boxShadow: '0 4px 20px 0 rgba(0,0,0,0.15)' }}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

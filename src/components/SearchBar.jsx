import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 dark:text-paper/40" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search machines, applications..."
        aria-label="Search"
        className="w-full rounded-full border border-primary/10 dark:border-white/10 bg-white dark:bg-white/5 py-2.5 pl-11 pr-4 text-sm text-primary dark:text-paper outline-none focus:ring-2 focus:ring-accent"
      />
    </form>
  );
}

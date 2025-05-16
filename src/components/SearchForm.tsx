import { useState, useEffect } from 'react';

interface SearchFormProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

const SearchForm = ({ onSearch, initialValue = '' }: SearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // initialValue değiştiğinde state'i güncelle
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Egzersiz ara..."
        className="w-full px-5 py-3 pl-12 text-base bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 px-4 text-white bg-blue-600 rounded-r-xl hover:bg-blue-700 focus:outline-none transition-colors"
      >
        Ara
      </button>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </form>
  );
};

export default SearchForm;

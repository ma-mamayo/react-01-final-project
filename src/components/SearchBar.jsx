import React, { useState } from 'react';
import { fetchSearchResults } from '../components/api';

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    fetchSearchResults(query)
      .then(setSearchResults)
      .catch((err) => console.error('Failed to fetch search results:', err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
};

export default SearchBar;

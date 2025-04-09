// components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await fetch(`http://localhost:5000/users/search?query=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map(user => (
          <li key={user._id} onClick={() => navigate(`/profile/${user._id}`)}>
            <img src={user.profilepic} alt="pic" width="30" height="30" />
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;

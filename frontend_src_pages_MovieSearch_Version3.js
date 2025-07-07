import React, { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/search?query=${encodeURIComponent(query)}`);
      setResults(res.data.results || []);
    } catch (err) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Movies</h2>
      <form onSubmit={handleSearch}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by movie title"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      <ul>
        {results.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.release_date})<br />
            {movie.overview}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
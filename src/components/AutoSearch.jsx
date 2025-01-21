import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import search from '../css/search.module.css';

const AutoSuggestSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState({
    games: [],
    genres: [],
    platforms: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const searchGames = async (term) => {
    if (term.length < 3) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&search=${term}`
      );
      const data = await response.json();


      const uniqueGenres = [...new Set(data.results.flatMap(game => game.genres))];
      const uniquePlatforms = [...new Set(data.results.flatMap(game =>
        game.platforms?.map(p => p.platform)
      ))];

      setSuggestions({
        games: data.results.slice(0, 10),
        genres: uniqueGenres.slice(0, 5),
        platforms: uniquePlatforms.slice(0, 5)
      });

      setShowDropdown(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      searchGames(value);
    } else {
      setSuggestions({ games: [], genres: [], platforms: [] });
      setShowDropdown(false);
    }
  };

  const handleFocus = () => {
    if (searchTerm.length >= 3) {
      setShowDropdown(true);
    }
  };

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (type, game, platform) => {
    switch (type) {
      case 'game':
        navigate(`/game/${game.id}`);
        break;
      case 'genre':
        navigate(`games/${game.slug}`);
        break;
      case 'platform':
        navigate(`/games/${platform.slug}`);
        break;
    }
    setShowDropdown(false);
    setSearchTerm('');
  };

  return (
    <div className={search.searchContainer}>
      <Form.Control
        ref={searchRef}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder="Search games, genres, platforms..."
        className={`${search.searchInput}`}
      />

      {showDropdown && (
        <div ref={dropdownRef} className={search.dropdownContainer}>
          {suggestions.games.length > 0 && (
            <div className={search.section}>
              <h6 className={search.sectionTitle}>Games</h6>
              {suggestions.games.map(game => (
                <div
                  key={game.id}
                  className={search.item}
                  onClick={() => handleItemClick('game', game)}
                >
                  {game.background_image && (
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className={search.gameImage}
                    />
                  )}
                  <div className={search.gameInfo}>
                    <span className={search.gameName}>{game.name}</span>
                    <span className={search.gameMetadata}>
                      {game.rating}  <i className="bi bi-star-fill ms-2"></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {suggestions.genres.length > 0 && (
            <div className={search.section}>
              <h6 className={search.sectionTitle}>Genres</h6>
              {suggestions.genres.map(genre => (
                <div
                  key={genre.id}
                  className={search.item}
                  onClick={() => handleItemClick('genre', genre)}
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}

          {suggestions.platforms.length > 0 && (
            <div className={search.section}>
              <h6 className={search.sectionTitle}>Platforms</h6>
              {suggestions.platforms.map(platform => (
                <div
                  key={platform.id}
                  className={search.item}
                  onClick={() => handleItemClick('platform', platform)}
                >
                  {platform.name}
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className={search.loadingMessage}>
              Searching...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoSuggestSearch;
import { useLoaderData } from "react-router";
import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SingleCard from "../components/gameUI/SingleCard";

export default function AppGenre() {
  const { genre_slug } = useParams();
  const { genres, platforms } = useLoaderData();
  const [genreGames, setGenreGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        // console.log('Dati :', data);
        setGenreGames(data.results);
      } catch (error) {
        // console.error('errore', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (genre_slug) {
      fetchGenreGames();
    }
  }, [genre_slug]);


  // console.log('genre:', genre_slug);
  // console.log('ricevuti:', { genres, platforms });
  return (
    <div className="container-fluid">
      <h1 className="text-light text-center my-4"> Genere: {genre_slug}</h1>

      {loading ? (
        <p className="text-light text-center">Loading...</p>
      ) : error ? (
        <p className="text-light text-center">{error}</p>
      ) : (
        <div className="row">
          <div className="col-2">
            <Sidebar genres={genres} platforms={platforms} />
          </div>
          <div className="col">
            <div className="row">
              {genreGames && genreGames.map((game) => (
                <div className="col-12 col-md-4 my-3" key={game.id}>
                  <Link to={`/game/${game.id}`}>
                    <SingleCard game={game} id={game.id} />
                    <p className="text-light">{game.name || 'Nome non disponibile'}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
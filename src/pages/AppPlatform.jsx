import { useLoaderData } from "react-router";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import SingleCard from "../components/gameUI/SingleCard";

export default function AppPlatform() {
    const { platform_slug } = useParams();
    const { genres, platforms } = useLoaderData();
    const [platformGames, setPlatformGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const platform = platforms.find(p => p.slug === platform_slug);
    const platformId = platform ? platform.id : null;
    
    useEffect(() => {
        if (!platformId) {
            setError("Piattaforma non trovata");
            setLoading(false);
            return;
        }
        
        const fetchPlatformGames = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&platforms=${platformId}`
                );
                if (!response.ok) throw new Error("Errore nel caricamento dei giochi");
                const data = await response.json();
                setPlatformGames(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchPlatformGames();
    }, [platformId]);

    // console.log("platform:", platforms);
    return (
        <div className="container-fluid">
            <h1 className="text-light text-center my-4">Game for {platform?.name || "Platform not found"}</h1>

            {loading ? (
                <p className="text-light text-center">Loading...</p>
            ) : error ? (
                <p className="text-light text-center">{error}</p>
            ) : (
                <div className="row">
                    <div className="col-2">
                        <Sidebar genres={genres} platforms={platforms} />
                    </div>
                    <div className="container col-10">
                        <div className="row">
                            {platformGames.length === 0 ? (
                                <p className="text-light text-center">Nessun gioco trovato per questa piattaforma.</p>
                            ) : (
                                platformGames.map((game) => (
                                    <div className="col-12 col-md-4 my-3" key={game.id}>
                                        <SingleCard game={game} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

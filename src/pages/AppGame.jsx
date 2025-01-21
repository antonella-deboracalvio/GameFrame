import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { useFavourites } from "../globalContext/FavouritesContext";
import { useContext } from "react";
import SessionContext from "../globalContext/SessionContext";
import detail from "../css/detail.module.css";
import Ratings from "../components/Ratings";
import Sidebar from "../components/Sidebar";
import { Toaster } from "sonner";
import Livechat from "../components/Livechat";

export default function AppGame() {
    const { id } = useParams();
    const { ratings } = useLoaderData();
    const [game, setGame] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [description, setDescription] = useState("");


    const { favourites, insertIntoFav, removeFromFav } = useFavourites();
    const isFav = favourites.some(fav => fav.game_id === game.id);

    const session = useContext(SessionContext);



    useEffect(() => {
        const fetchDetailGame = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}games/${id}?key=${import.meta.env.VITE_API_KEY}`
                );
                const json = await response.json();
                setGame(json);
                setDescription(json.description_raw);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetailGame();
    }, []);


    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };



    return (
        <div className={detail.container}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div style={{ display: "flex", marginTop: "100px" }}>
                <Sidebar />
            </div>

            <main className={detail.content}>
                <div className={detail.leftSection}>
                    <h1 className={detail.title}>{game.name}</h1>
                    <div className={detail.info}>
                        <p>

                        </p>

                        {session && (
                            <div className={detail.buttons}>
                                {isFav ? (
                                    <button className={detail.button} onClick={() => removeFromFav(game)}>Rimuovi dai preferiti</button>
                                ) : (
                                    <button className={detail.button} onClick={() => insertIntoFav(game)}>Aggiungi ai preferiti</button>
                                )}

                                <Toaster theme="dark" richColors position="top-center" />
                                <Link to="/profile"> <button className={detail.button}>My Collection</button> </Link>
                            </div>
                        )}


                        <div className={detail.about}>

                            <div style={{ fontWeight: "bold" }}> Genres: <p style={{ fontWeight: "normal" }}> {game.genres && game.genres.map(genre => genre.name).join(', ')} </p> </div>
                            <div style={{ fontWeight: "bold" }}> Platforms: <p style={{ fontWeight: "normal" }}> {game.platforms && game.platforms.map(platform => platform.platform.name).join(', ')} </p> </div>
                            <p> Release Date: {game.released} </p>
                        </div>
                    </div>
                    <div> <span> Rating: {game.rating} </span>  <i className="bi bi-star-fill ms-2"></i><Ratings ratings={ratings} /> </div>
                </div>

                <div className={detail.rightSection}>
                    <img
                        src={game.background_image_additional}
                        alt="Screenshot 2"
                        className={detail.gameImage}
                    />

                    <div className={detail.contentWrapper}>
                        <div className={detail.description}>
                            <span>
                                {isExpanded ? description : description.length > 400 ? `${description.slice(0, 400)}...` : description}
                            </span>
                            {description.length > 400 && (
                                <button className={detail.readMore} onClick={toggleExpanded}>
                                    {isExpanded ? "Leggi meno" : "Leggi di più"}
                                </button>
                            )}
                        </div>

                      
                        <div  className="wrapperChat">
                        <h4 className={detail.titleChat}>Live Chat Utenti</h4>
                            <Livechat game={game} session={session} />
                        </div>




                    </div>



                </div>
            </main>
        </div>
    );
}



import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../supabase/client";
import { toast } from "sonner";
import SessionContext from "./SessionContext"; 

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);
    const session = useContext(SessionContext);


    async function readFav() {
        if (!session?.user) return;

        let { data: Favourites, error } = await supabase
            .from("Favourites")
            .select(`*`)
            .eq("profile_id", session.user.id)

       if(!error){
        setFavourites(Favourites);
       }else{
           toast.error("Errore dei preferiti");
       }
    }
    async function insertIntoFav(game) {
        if (!session?.user) return;

        const { data, error } = await supabase
            .from("Favourites")
            .insert([
                { profile_id: session.user.id, game_id: game.id, game_name: game.name},
            ])
            .select();

        if (error) {
            toast.error("Errore nell'aggiunta ai preferiti");
        } else {
            toast.success("Gioco aggiunto ai preferiti!");
            setFavourites([...favourites, ...data]);
        }
    }

    async function removeFromFav(game) {
        if (!session?.user) return;

        const { error } = await supabase
            .from("Favourites")
            .delete()
            .eq("game_id", game.id)
            .eq("profile_id", session.user.id);

        if (error) {
            toast.error("Errore nella rimozione");
        } else {
            toast.success("Gioco rimosso dai preferiti!");
            setFavourites(favourites.filter(fav => fav.game_id !== game.id));
        }
    }

    useEffect(() => {
        if (session?.user) {
            readFav();
        }
    }, [session]);

    return (
        <FavouritesContext.Provider value={{ favourites, readFav, insertIntoFav, removeFromFav }}>
            {children}
        </FavouritesContext.Provider>
    );
};


export const useFavourites = () => useContext(FavouritesContext);

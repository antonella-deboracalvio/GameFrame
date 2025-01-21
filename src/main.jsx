
import { createRoot } from 'react-dom/client'
import SessionContextProvide from "./globalContext/SessionContextProvide";
import { FavouritesProvider } from './globalContext/FavouritesContext.jsx';
import App from './App.jsx'
import './css/Global.css'

createRoot(document.getElementById('root')).render(


    <SessionContextProvide>
        <FavouritesProvider>
        <App />
        </FavouritesProvider>
    </SessionContextProvide>
)

import { useState } from "react";
import AppContext from "./globalContext/AppContext";
import { RouterProvider } from "react-router";
import { createAppRouter } from "./routes/PageRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import './css/Global.css'


function App() {
  const [games, setGames] = useState([]);
  const router = createAppRouter();

  return (

    <AppContext.Provider value={{ games, setGames }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}



export default App;


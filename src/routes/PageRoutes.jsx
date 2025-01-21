import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage"
import NotFound from "../pages/NotFound"
import LayoutPage from "../layout/LayoutPage"
import { preLoaderFilters } from "../lib/fetch"
import AppGenre from "../pages/AppGenre"
import AppPlatform from "../pages/AppPlatform"
import AppGame from "../pages/AppGame";
import FormLogin from "../pages/auth/Login";
import FormRegister from "../pages/auth/Register";
import AppProfile from "../pages/profile/AppProfile";
import AppSettings from "../pages/profile/AppSettings";
import { Navigate} from "react-router";
import { useContext } from "react";
import  SessionContext  from "../globalContext/SessionContext";


export function createAppRouter() {
  return createBrowserRouter([
    {
      element: <LayoutPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          loader: preLoaderFilters
        },
        {
          path: 'games/:genre_slug',
          element: <AppGenre />,
          loader: preLoaderFilters
        },
        {
          path: 'platforms/:platform_slug',
          element: <AppPlatform />,
          loader: preLoaderFilters
        },
        
        {
          path: 'game/:id',
          element: <AppGame />,
          loader: preLoaderFilters
        },
        {
          path: '/login',
          element: <FormLogin />,
        },
        {
          path: '/register',
          element: <FormRegister />,
        },
        {
          path: '/profile',
          element: (
            <ProtectedRoutes>
              <AppProfile />
            </ProtectedRoutes>
          )
        },
        {
          path: '/settings',
          element: (
            <ProtectedRoutes>
              <AppSettings />
            </ProtectedRoutes>
          )
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ])
}

function ProtectedRoutes({ children }) {
  const session = useContext(SessionContext);

  return session ? children : <Navigate to="/" />;
}



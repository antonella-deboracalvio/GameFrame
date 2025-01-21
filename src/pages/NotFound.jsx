import { Link } from "react-router"

function NotFound() {
    return (
        <div className=" justify-content-center align-items-center text-center mt-5">
            <i className="bi bi-emoji-dizzy display-1 text-danger"> Sorry! Page Not Found</i>
            <h1>Error 404</h1>
            <Link to= "/"> Ritorna alla Home </Link>
        </div>
    )
}

export default NotFound
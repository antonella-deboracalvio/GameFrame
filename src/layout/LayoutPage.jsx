import { Outlet } from "react-router"; // Fixato da "react-router"
import NavbarComponent from "../components/Navbar"; // Fixato nome del file
import '../css/Global.css';

function LayoutPage() {
    return (
        <div>
            <NavbarComponent />
            <Outlet />
        </div>
    );
}

export default LayoutPage;

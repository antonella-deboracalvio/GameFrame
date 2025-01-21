
import { Outlet } from "react-router"
import Navbar from "../components/Navbar"



function LayoutPage() {

    return (
        <div>
            <Navbar />
            <Outlet />
            
        </div>
    )

}

export default LayoutPage
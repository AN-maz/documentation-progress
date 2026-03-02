import { Outlet } from "react-router-dom";
import Navbar from '../navigation/navbar';

function Layout(){

    return(
        <div className="flex flex-col min-h-screen bg-blue-400">
            <Navbar/>
            <main className="flex-grow">
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout
import { Outlet } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-oxigen-dark">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
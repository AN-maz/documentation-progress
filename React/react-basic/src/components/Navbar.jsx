import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex gap-6 font-semibold">
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
                <Link to="/module1" className="hover:text-blue-400 transition-colors">Modul 1: Dasar React</Link>
                <Link to="/module2" className="hover:text-blue-400 transition-colors text-gray-400">Modul 2 (Segera)</Link>
            </div>
        </nav>
    );
};

export default Navbar;
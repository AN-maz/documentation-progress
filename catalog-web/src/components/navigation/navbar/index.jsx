import { NavLink } from "react-router-dom"

function Navbar() {

    return (

        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="font-bold text-lg">PURapp</h1>

                <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-400 font-semibold" : "hover:text-blue-400"}>
                    Home
                </NavLink>

            </div>
        </nav>
    )
}

export default Navbar
import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.nav}>
            <h2>MyPortfolio</h2>

            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
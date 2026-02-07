import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navbarLinks, logoConfig } from '../data/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle smooth scrolling for anchor links
    const handleNavClick = (e, href) => {
        e.preventDefault();

        // Extract target id from href (e.g., "/#hero" -> "hero")
        const targetId = href.replace('/#', '');

        if (location.pathname === '/') {
            // If on home page, scroll smoothly
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If on another page, navigate to home and hash
            navigate(`/#${targetId}`);
        }

        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 py-4
        ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm' : 'bg-transparent'}
      `}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between relative z-50">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-oxigen-dark cursor-pointer"
                    onClick={() => {
                        navigate('/');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    {logoConfig.useImage ? (
                        <img src={logoConfig.imgUrl} alt={logoConfig.alt} className="h-10 w-auto" />
                    ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-oxigen-light to-oxigen-dark rounded-lg flex items-center justify-center text-white text-lg shadow-md">
                            O
                        </div>
                    )}
                    <span>OXIGEN</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navbarLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-gray-600 hover:text-oxigen-light font-medium transition-colors text-sm uppercase tracking-wide cursor-pointer"
                        >
                            {link.label}
                        </a>
                    ))}
                    <button
                        onClick={(e) => handleNavClick(e, '/#membership')}
                        className="px-5 py-2 rounded-full bg-oxigen-dark text-white text-sm font-semibold hover:bg-oxigen-light transition-colors hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
                    >
                        Join Us
                    </button>
                </div>

                {/* Mobile Menu Button (Hamburger/X) */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-oxigen-dark focus:outline-none p-2 relative z-50 transition-transform duration-300"
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? (
                        <X size={28} />
                    ) : (
                        <Menu size={28} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {/* Using Solid White Background as requested */}
            <div
                className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-all duration-300 transform
          ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}
            >
                <div className="flex flex-col items-center justify-center w-full px-6 gap-8 text-xl font-bold text-oxigen-dark">
                    {navbarLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="hover:text-oxigen-light transition-colors py-2 text-2xl"
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* Mobile Action Buttons */}
                    <div className="flex flex-col gap-4 w-full max-w-xs mt-6">
                        <button
                            onClick={(e) => handleNavClick(e, '/#showcase')}
                            className="w-full px-6 py-4 rounded-xl border-2 border-oxigen-dark text-oxigen-dark font-bold hover:bg-gray-50 transition-all text-center"
                        >
                            Lihat Project
                        </button>
                        <button
                            onClick={(e) => handleNavClick(e, '/#membership')}
                            className="w-full px-6 py-4 rounded-xl bg-oxigen-dark text-white font-bold hover:bg-oxigen-light shadow-xl transition-all text-center"
                        >
                            Join Us
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

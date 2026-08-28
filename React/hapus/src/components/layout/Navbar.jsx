import { useState } from 'react'
import { navLinks } from '../../data/mockData'

function Navbar({ activePage, onNavigate }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-dark text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button
          onClick={() => { onNavigate('home'); setOpen(false) }}
          className="text-2xl font-bold tracking-tight hover:text-secondary transition-colors cursor-pointer"
        >
          OXIGEN
        </button>

        <button
          className="md:hidden cursor-pointer p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <ul className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  activePage === link.id
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div className="md:hidden bg-dark px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setOpen(false) }}
              className={`block w-full text-left px-4 py-2 rounded-lg mb-1 cursor-pointer ${
                activePage === link.id
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar

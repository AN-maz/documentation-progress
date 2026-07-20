import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/products', label: 'Products', icon: '📦' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-60 h-screen bg-primary text-white flex flex-col shrink-0">
      <div className="p-4 border-b border-primary-light">
        <h1 className="text-lg font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-primary-light text-white' : 'text-white/80 hover:bg-primary-dark'
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-primary-light space-y-2">
        <p className="text-sm text-white/70">Hi, {user?.username}</p>
        <button
          onClick={logout}
          className="w-full text-left text-sm text-white/80 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

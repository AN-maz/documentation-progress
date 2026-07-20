import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <header className="h-14 bg-white border-b border-secondary-light/30 flex items-center justify-between px-6">
      <h2 className="font-semibold text-secondary">E-Commerce Admin Dashboard</h2>
      <div className="flex items-center gap-3 text-sm text-secondary">
        <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-medium">
          {user?.username?.charAt(0).toUpperCase()}
        </span>
        <span>{user?.username}</span>
      </div>
    </header>
  )
}

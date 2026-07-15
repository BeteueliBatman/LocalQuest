import { Compass, LogOut, Menu, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Button from './Button'

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/quests', label: 'Explore' },
  { to: '/my-quests', label: 'My quests' },
  { to: '/create-quest', label: 'Add quest' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand__icon">
            <Compass size={22} aria-hidden="true" />
          </span>
          LocalQuest
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-controls="header-panel"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div
          id="header-panel"
          className={`header-panel ${menuOpen ? 'header-panel--open' : ''}`}
        >
          <nav className="main-nav" aria-label="Main navigation">
            {navigation.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="header-account">
            {user ? (
              <>
                <span className="header-user">
                  <UserRound size={18} aria-hidden="true" />
                  {user.firstName}
                </span>
                <button
                  className="logout-button"
                  type="button"
                  onClick={handleLogout}
                >
                  <LogOut size={17} aria-hidden="true" />
                  Log out
                </button>
              </>
            ) : (
              <Button to="/login" onClick={closeMenu}>
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

import { Link } from 'react-router-dom'
import NavUser from './NavUser'

const ASCII_LOGO = `
 ______     ______     _____     ______     ______
/\\  ___\\   /\\  __ \\   /\\  __-.  /\\  == \\   /\\  ___\\
\\ \\ \\____  \\ \\  __ \\  \\ \\ \\/\\ \\ \\ \\  __<   \\ \\  __\\
 \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\____-  \\ \\_\\ \\_\\  \\ \\_____\\
  \\/_____/   \\/_/\\/_/   \\/____/   \\/_/ /_/   \\/_____/ `

export default function Header({ theme, toggleTheme, isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <>
      {/* Desktop header */}
      <header className="header">
        <div className="logo-wrap">
          <Link to="/" className="logo">
            <pre className="logo-ascii" aria-label="CADRE">{ASCII_LOGO}</pre>
            <span className="logo-sub">Laboratory for New Media</span>
          </Link>
          <a href="https://cadre.sjsu.edu" target="_blank" rel="noopener" className="logo-upside-down" aria-label="CADRE at SJSU">
            Ǝᴚᗡ∀Ↄ
          </a>
        </div>
        <nav className="nav-top">
          {isLoggedIn && <Link to="/frontpage-edit" className="nav-link">frontpage edit</Link>}
          <NavUser isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
        </nav>
      </header>

      {/* Mobile header */}
      <header className="mobile-header">
        <div className="logo-wrap">
          <Link to="/" className="logo">
            <pre className="logo-ascii" aria-label="CADRE">{ASCII_LOGO}</pre>
            <span className="logo-sub">Laboratory for New Media</span>
          </Link>
          <a href="https://cadre.sjsu.edu" target="_blank" rel="noopener" className="logo-upside-down" aria-label="CADRE at SJSU">
            Ǝᴚᗡ∀Ↄ
          </a>
        </div>
        <nav className="nav-top">
          <button
            type="button"
            className="theme-toggle theme-toggle-mobile"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={toggleTheme}
          >
            {theme === 'light' ? '☀' : '☾'}
          </button>
          <NavUser isLoggedIn={isLoggedIn} onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
        </nav>
      </header>
    </>
  )
}

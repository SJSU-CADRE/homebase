import { Link } from 'react-router-dom'

export default function Sidebar({ theme, toggleTheme }) {
  return (
    <aside className="sidebar">
      <Link to="/" className="home" aria-label="Home">⌂</Link>
      <button
        type="button"
        className="theme-toggle"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        onClick={toggleTheme}
      >
        {theme === 'light' ? '☀' : '☾'}
      </button>
      <div className="vertical">homebase</div>
    </aside>
  )
}

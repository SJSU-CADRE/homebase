import { Link } from 'react-router-dom'

export default function Sidebar({ theme, toggleTheme, canEditFrontpage }) {
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
      {canEditFrontpage && <Link to="/frontpage-edit" className="vertical">edit frontpage</Link>}
      <div className="sidebar-social">
        <a href="https://www.facebook.com/sjsucadre" target="_blank" rel="noopener" className="vertical">fb</a>
        <a href="https://twitter.com/cadre_sjsu" target="_blank" rel="noopener" className="vertical">tw</a>
        <a href="https://www.instagram.com/cadre_sjsu/" target="_blank" rel="noopener" className="vertical">ig</a>
      </div>
    </aside>
  )
}

import { Link } from 'react-router-dom'

export default function NavUser({ isLoggedIn, onLoginClick, onLogoutClick }) {
  if (isLoggedIn) {
    return (
      <>
        <Link to="/dashboard">dashboard</Link>
        <button type="button" className="nav-btn" onClick={onLogoutClick}>logout</button>
      </>
    )
  }
  return (
    <button type="button" className="nav-btn" onClick={onLoginClick}>login</button>
  )
}

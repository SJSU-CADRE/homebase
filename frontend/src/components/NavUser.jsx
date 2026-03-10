import { Link } from 'react-router-dom'
import { useOktaAuth } from '@okta/okta-react'

export default function NavUser({ isLoggedIn, onLoginClick, onLogoutClick }) {
  const { authState } = useOktaAuth()
  const claims = authState?.idToken?.claims
  const firstName = claims?.name?.split(' ')[0] ?? ''

  if (isLoggedIn) {
    return (
      <>
        {firstName && <span className="nav-username">{firstName}</span>}
        <Link to="/dashboard">dashboard</Link>
        <button type="button" className="nav-btn" onClick={onLogoutClick}>logout</button>
      </>
    )
  }
  return (
    <button type="button" className="nav-btn" onClick={onLoginClick}>login</button>
  )
}

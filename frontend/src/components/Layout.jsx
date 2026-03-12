import { useState, useEffect } from 'react'
import { useOktaAuth } from '@okta/okta-react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import PageTransition from './PageTransition'
import LoginModal from './LoginModal'

export default function Layout({ theme, toggleTheme }) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [canEditFrontpage, setCanEditFrontpage] = useState(false)
  const { authState, oktaAuth } = useOktaAuth()
  const isLoggedIn = authState?.isAuthenticated ?? false

  useEffect(() => {
    if (!isLoggedIn) { setCanEditFrontpage(false); return }
    const token = authState?.accessToken?.accessToken
    const claims = authState?.idToken?.claims
    if (!token) return
    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    fetch('/api/users/sync', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: claims?.name ?? '' }),
    })
      .then(() => fetch('/api/users/me', { headers }))
      .then(r => r.json())
      .then(user => setCanEditFrontpage(user.role === 'cadre' || user.role === 'admin'))
      .catch(() => setCanEditFrontpage(false))
  }, [isLoggedIn])

  return (
    <div className="page">
      <Sidebar theme={theme} toggleTheme={toggleTheme} canEditFrontpage={canEditFrontpage} />
      <div className="content">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setLoginOpen(true)}
          onLogoutClick={() => oktaAuth.signOut()}
        />
        <main className="main">
          <PageTransition />
        </main>
        <Footer />
      </div>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  )
}

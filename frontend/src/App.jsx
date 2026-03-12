import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security, LoginCallback, useOktaAuth } from '@okta/okta-react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import FrontPageEditPage from './pages/FrontPageEditPage'

const THEME_KEY = 'cadre-homebase-theme'

const oktaAuth = new OktaAuth({
  issuer: import.meta.env.VITE_OKTA_ISSUER,
  clientId: import.meta.env.VITE_OKTA_CLIENT_ID,
  redirectUri: import.meta.env.VITE_OKTA_REDIRECT_URI,
  pkce: true,
})

function RequireAuth() {
  const { authState } = useOktaAuth()
  if (!authState) return null
  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}

function AppWithSecurity() {
  const navigate = useNavigate()
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin))
  }

  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) || 'dark' } catch { return 'dark' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem(THEME_KEY, theme) } catch {}
  }, [theme])

  function toggleTheme() {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/frontpage-edit" element={<FrontPageEditPage />} />
          </Route>
        </Route>
        <Route path="/login/callback" element={<LoginCallback />} />
      </Routes>
    </Security>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWithSecurity />
    </BrowserRouter>
  )
}

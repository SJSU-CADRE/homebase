import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import PageTransition from './PageTransition'
import LoginModal from './LoginModal'

export default function Layout({ theme, toggleTheme, isLoggedIn }) {
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <div className="page">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div className="content">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          onLoginClick={() => setLoginOpen(true)}
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

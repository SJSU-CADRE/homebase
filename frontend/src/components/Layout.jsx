import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ theme, toggleTheme, isLoggedIn }) {
  return (
    <div className="page">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <div className="content">
        <Header theme={theme} toggleTheme={toggleTheme} isLoggedIn={isLoggedIn} />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

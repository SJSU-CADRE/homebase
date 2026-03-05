import { useLocation, Outlet } from 'react-router-dom'

export default function PageTransition() {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-transition">
      <Outlet />
    </div>
  )
}

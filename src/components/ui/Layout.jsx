import { Outlet } from 'react-router-dom'
import Topbar from './Topbar.jsx'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}

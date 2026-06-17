import { Link, useLocation } from 'react-router-dom'

const Logo = () => (
  <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <circle cx="14" cy="14" r="10" stroke="#C86D42" strokeWidth="3.5" fill="none"/>
      <circle cx="14" cy="14" r="5.5" stroke="#C86D42" strokeWidth="2.5" fill="none"/>
      <line x1="8.5" y1="14" x2="20" y2="14" stroke="#1A1A1A" strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="27" y2="27" stroke="#C86D42" strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#E5D6BA', letterSpacing: 2 }}>POZO</span>
  </Link>
)

export default function Topbar() {
  const { pathname } = useLocation()
  const nav = [
    { to: '/', label: 'descobrir' },
    { to: '/resultados', label: 'favoritos' },
    { to: '/scouts', label: 'scouts' },
  ]
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 56, borderBottom: '0.5px solid #2E2A27', background: '#1A1A1A' }}>
      <Logo />
      <nav style={{ display: 'flex', gap: 4 }}>
        {nav.map(({ to, label }) => (
          <Link key={to} to={to} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, letterSpacing: 0.5, color: pathname === to ? '#C86D42' : '#7A6F65', background: pathname === to ? '#2A1F18' : 'none', textDecoration: 'none' }}>{label}</Link>
        ))}
      </nav>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#2A1F18', border: '0.5px solid #C86D42', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#C86D42', fontWeight: 500 }}>GG</div>
    </header>
  )
}

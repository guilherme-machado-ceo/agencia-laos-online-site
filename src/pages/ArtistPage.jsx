import { useParams, Link } from 'react-router-dom'

export default function ArtistPage() {
  const { id } = useParams()
  return (
    <div style={{ padding: '28px 32px', maxWidth: 800, margin: '0 auto' }}>
      <Link to="/resultados" style={{ fontSize: 12, color: '#7A6F65', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>← voltar</Link>
      <p style={{ fontSize: 10, color: '#4A443F', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>perfil do artista</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#E5D6BA' }}>{decodeURIComponent(id)}</h1>
      <p style={{ fontSize: 13, color: '#7A6F65', marginTop: 16 }}>Perfil completo — próxima iteração</p>
    </div>
  )
}

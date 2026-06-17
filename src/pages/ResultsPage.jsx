import { useSearchParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { searchArtists } from '../lib/ai.js'

export default function ResultsPage() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) return
    setLoading(true)
    searchArtists(query).then(setArtists).finally(() => setLoading(false))
  }, [query])

  return (
    <div style={{ padding: '28px 32px', maxWidth: 800, margin: '0 auto' }}>
      <p style={{ fontSize: 10, color: '#4A443F', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>o poço revelou</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#E5D6BA', marginBottom: 4 }}>Artistas cristãos semelhantes</h1>
      <p style={{ fontSize: 12, color: '#7A6F65', marginBottom: 24 }}>Busca por: <span style={{ color: '#C86D42' }}>{query}</span></p>
      {loading && <p style={{ color: '#4A443F', fontSize: 13, fontStyle: 'italic' }}>Descendo ao poço...</p>}
      {!loading && artists.map((a, i) => (
        <Link key={i} to={`/artista/${encodeURIComponent(a.name)}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 12 }}>
          <div style={{ background: '#0D0D0D', border: '0.5px solid #2E2A27', borderRadius: 12, padding: '18px 20px', display: 'grid', gridTemplateColumns: '48px 1fr 80px', gap: 16, alignItems: 'start' }}>
            <div style={{ width: 48, height: 48, borderRadius: 8, background: '#2A1F18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#C86D42' }}>{a.name[0]}</div>
            <div>
              <div style={{ fontSize: 15, color: '#E5D6BA', marginBottom: 2 }}>{a.name}</div>
              <div style={{ fontSize: 11, color: '#4A443F', marginBottom: 8 }}>{a.country} · {a.genre}</div>
              <div style={{ fontSize: 12, color: '#7A6F65', lineHeight: 1.6 }}>{a.reason}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#C86D42' }}>{a.similarity}%</div>
              <div style={{ fontSize: 10, color: '#4A443F' }}>similaridade</div>
            </div>
          </div>
        </Link>
      ))}
      <div style={{ marginTop: 32, borderTop: '0.5px solid #2E2A27', paddingTop: 16 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: '#3A3028', fontStyle: 'italic' }}>Rebeca levantou os olhos e viu Isaque. Ela desceu do camelo.</p>
        <p style={{ fontSize: 10, color: '#2E2A27', letterSpacing: 1, marginTop: 4 }}>Gênesis 24 · 64</p>
      </div>
    </div>
  )
}

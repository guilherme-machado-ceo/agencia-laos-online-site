import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GENRES = ['rock','folk','jazz','indie','eletrônico','blues','clássico','ambient','hip hop']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const go = () => { if (query.trim()) navigate(`/resultados?q=${encodeURIComponent(query.trim())}`) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 56px)', padding: '48px 32px', textAlign: 'center' }}>
      <p style={{ fontSize: 11, color: '#4A443F', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>encontre o que os algoritmos não mostram</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: '#E5D6BA', marginBottom: 12, maxWidth: 480 }}>Quem você já ama ouvir?</h1>
      <p style={{ fontSize: 13, color: '#7A6F65', lineHeight: 1.7, marginBottom: 36, maxWidth: 360 }}>Digite um artista, álbum ou música e descubra artistas cristãos com o mesmo som, atmosfera e espírito.</p>
      <div style={{ width: '100%', maxWidth: 520, position: 'relative', marginBottom: 20 }}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && go()} placeholder="Ex: Radiohead, Nick Drake, Sigur Rós..." style={{ width: '100%', height: 52, borderRadius: 30, padding: '0 120px 0 24px', fontSize: 14 }} />
        <button onClick={go} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: '#C86D42', border: 'none', borderRadius: 24, padding: '8px 20px', fontSize: 12, fontWeight: 500, color: '#1A1A1A' }}>Buscar</button>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
        {GENRES.map(g => (
          <button key={g} onClick={() => { setQuery(g); navigate(`/resultados?q=${g}`) }} style={{ background: 'none', border: '0.5px solid #2E2A27', borderRadius: 20, padding: '5px 14px', fontSize: 11, color: '#7A6F65', letterSpacing: 0.5 }}>{g}</button>
        ))}
      </div>
      <div style={{ width: '0.5px', height: 40, background: '#2E2A27', margin: '0 auto 24px' }} />
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: '#4A443F', fontStyle: 'italic', lineHeight: 1.8 }}>O servo correu ao seu encontro e disse: dê-me, peço-te, um pouco de água a beber.</p>
      <p style={{ fontSize: 11, color: '#3A3028', letterSpacing: 1, marginTop: 8 }}>Gênesis 24 · 17</p>
    </div>
  )
}

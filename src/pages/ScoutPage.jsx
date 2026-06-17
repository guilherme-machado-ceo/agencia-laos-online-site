import { useState } from 'react'

const MISSIONS = [
  { name: 'Jazz cristão da França', found: 0, total: 3, pts: 120 },
  { name: 'Folk cristão da Irlanda', found: 1, total: 3, pts: 100 },
  { name: 'Synth-pop cristão anos 80', found: 0, total: 5, pts: 80 },
]

export default function ScoutPage() {
  const [form, setForm] = useState({ name: '', country: '', genre: '', link: '' })

  return (
    <div style={{ padding: '28px 32px', maxWidth: 700, margin: '0 auto' }}>
      <p style={{ fontSize: 10, color: '#4A443F', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>cultural scouts</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#E5D6BA', marginBottom: 8 }}>Como Eliezer, você é um buscador.</h1>
      <p style={{ fontSize: 13, color: '#7A6F65', lineHeight: 1.7, marginBottom: 28 }}>Descobrir artistas desconhecidos é um ato de serviço cultural.</p>

      <p style={{ fontSize: 10, color: '#4A443F', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>missões abertas</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {MISSIONS.map((m, i) => (
          <div key={i} style={{ background: '#0D0D0D', border: '0.5px solid #2E2A27', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, color: '#E5D6BA', marginBottom: 2 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: '#4A443F' }}>{m.found} de {m.total} artistas encontrados</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#C86D42' }}>+{m.pts}</div>
              <div style={{ fontSize: 10, color: '#4A443F' }}>pontos</div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 10, color: '#4A443F', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>contribuir com um artista</p>
      <div style={{ background: '#0D0D0D', border: '0.5px solid #3A3028', borderRadius: 12, padding: '20px 24px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#E5D6BA', marginBottom: 6 }}>Nova descoberta</h2>
        <p style={{ fontSize: 12, color: '#7A6F65', marginBottom: 16, lineHeight: 1.7 }}>Encontrou um artista que deveria estar no catálogo? Cada primeira descoberta gera pontos exclusivos.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          {[['name','Nome do artista','Ex: Lost Dogs'],['country','País','Ex: Alemanha'],['genre','Gênero','Ex: Folk alternativo'],['link','Link oficial','Spotify, site...']].map(([k,l,p]) => (
            <div key={k}>
              <p style={{ fontSize: 10, color: '#4A443F', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{l}</p>
              <input type="text" placeholder={p} value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} style={{ width: '100%', padding: '8px 12px', fontSize: 12 }} />
            </div>
          ))}
        </div>
        <button style={{ background: '#C86D42', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 12, fontWeight: 500, color: '#1A1A1A', marginTop: 6 }}>Enviar descoberta</button>
      </div>

      <div style={{ marginTop: 28, borderTop: '0.5px solid #2E2A27', paddingTop: 16 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: '#3A3028', fontStyle: 'italic' }}>Abraão disse: O Senhor enviará seu anjo diante de ti.</p>
        <p style={{ fontSize: 10, color: '#2E2A27', letterSpacing: 1, marginTop: 4 }}>Gênesis 24 · 7</p>
      </div>
    </div>
  )
}

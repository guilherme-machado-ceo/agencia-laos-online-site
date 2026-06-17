const SYSTEM_PROMPT = `Você é o agente de descoberta musical do POZO.
Encontre artistas cristãos semelhantes ao artista pesquisado.
Responda APENAS com JSON válido, sem markdown, sem texto adicional.
Formato exato:
[{"name":"Nome","country":"País","genre":"Gênero","reason":"Por que é semelhante (max 120 chars)","similarity":85}]
Retorne 3 a 6 artistas reais. Priorize similaridade musical. Inclua independentes.`

export async function searchArtists(query) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_KEY
  if (!apiKey) return mockResults(query)
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `Artista: ${query}` }]
      })
    })
    const data = await res.json()
    const text = data.content?.[0]?.text || '[]'
    return JSON.parse(text)
  } catch (err) {
    console.error('Erro na API:', err)
    return mockResults(query)
  }
}

function mockResults(query) {
  return [
    { name: 'Mutemath', country: 'EUA', genre: 'Rock alternativo', reason: `Atmosfera densa e experimental, similar a ${query}`, similarity: 92 },
    { name: 'Sleeping At Last', country: 'EUA', genre: 'Ambient / Post-rock', reason: 'Produção etérea e letras contemplativas', similarity: 88 },
    { name: 'Needtobreathe', country: 'EUA', genre: 'Rock alternativo', reason: 'Energia e intensidade emocional semelhante', similarity: 79 }
  ]
}

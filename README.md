# POZO

> Encontre o que os algoritmos não mostram.

Plataforma de descoberta de música cristã baseada em similaridade musical.
Inspirada em Gênesis 24 — Eliezer, o poço, Rebeca.

## Stack

- React 18 + Vite 5
- Supabase (PostgreSQL + Auth)
- Claude API (Haiku) — motor de recomendação
- Vercel — deploy e edge functions
- GitLab — repositório e CI/CD

## Setup local

```bash
cp .env.example .env
# edite o .env com suas chaves
npm install
npm run dev
```

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| VITE_SUPABASE_URL | URL do projeto Supabase |
| VITE_SUPABASE_ANON_KEY | Chave pública Supabase |
| VITE_ANTHROPIC_KEY | Chave da API Anthropic (apenas dev local) |

**Em produção:** as chaves ficam nos Secrets do Vercel — nunca no repositório.

## Estrutura

```
src/
  components/
    ui/        — Layout, Topbar, componentes base
    artist/    — Cards e perfil de artistas
    scout/     — Missões e contribuição
    search/    — Campo de busca e filtros
  pages/       — SearchPage, ResultsPage, ArtistPage, ScoutPage
  lib/
    ai.js      — Motor de recomendação (Claude API)
    supabase.js — Cliente do banco de dados
  styles/
    global.css — Design system POZO
```

## Narrativa

*O servo correu ao seu encontro e disse: dê-me, peço-te, um pouco de água a beber.*
— Gênesis 24:17

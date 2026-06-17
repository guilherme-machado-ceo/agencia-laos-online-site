import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import ArtistPage from './pages/ArtistPage.jsx'
import ScoutPage from './pages/ScoutPage.jsx'
import Layout from './components/ui/Layout.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/resultados" element={<ResultsPage />} />
        <Route path="/artista/:id" element={<ArtistPage />} />
        <Route path="/scouts" element={<ScoutPage />} />
      </Route>
    </Routes>
  )
}

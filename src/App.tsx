import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import HomePage from './pages/publico/HomePage'
import SearchResults from './pages/publico/SearchResults'
import ArticleDetail from './pages/publico/ArticleDetail'
import Archive from './pages/publico/Archive'
import Feed from './pages/governo/Feed'
import Groups from './pages/governo/Groups'
import NewPost from './pages/governo/NewPost'
import Dashboard from './pages/presidencia/Dashboard'
import Chat from './pages/presidencia/Chat'
import Alerts from './pages/presidencia/Alerts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Espaço Público */}
        <Route path="/publico" element={<HomePage />} />
        <Route path="/publico/pesquisa" element={<SearchResults />} />
        <Route path="/publico/noticia/:id" element={<ArticleDetail />} />
        <Route path="/publico/arquivo" element={<Archive />} />

        {/* Espaço do Governo */}
        <Route path="/governo" element={<Feed />} />
        <Route path="/governo/grupos" element={<Groups />} />
        <Route path="/governo/nova-publicacao" element={<NewPost />} />

        {/* Espaço da Presidência */}
        <Route path="/presidencia" element={<Dashboard />} />
        <Route path="/presidencia/chat" element={<Chat />} />
        <Route path="/presidencia/alertas" element={<Alerts />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

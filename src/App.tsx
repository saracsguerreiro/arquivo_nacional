import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginModal from './components/LoginModal'

import Home from './pages/public/Home'
import SearchPage from './pages/public/Search'
import Article from './pages/public/Article'
import Archive from './pages/public/Archive'
import Feed from './pages/governo/Feed'
import Groups from './pages/governo/Groups'
import NewPost from './pages/governo/NewPost'
import Dashboard from './pages/presidencia/Dashboard'
import Chat from './pages/presidencia/Chat'
import Alerts from './pages/presidencia/Alerts'

function AppInner() {
  const { loginOpen } = useAuth()
  return (
    <>
      {loginOpen && <LoginModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pesquisa" element={<SearchPage />} />
        <Route path="/noticia/:id" element={<Article />} />
        <Route path="/arquivo" element={<Archive />} />
        <Route path="/governo" element={<Feed />} />
        <Route path="/governo/grupos" element={<Groups />} />
        <Route path="/governo/nova-publicacao" element={<NewPost />} />
        <Route path="/presidencia" element={<Dashboard />} />
        <Route path="/presidencia/chat" element={<Chat />} />
        <Route path="/presidencia/alertas" element={<Alerts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/arquivo_nacional">
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  )
}

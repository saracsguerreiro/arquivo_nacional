import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThumbsUp, MessageSquare, AlertTriangle, AlertCircle, Info, Plus, Search } from 'lucide-react'
import GovHeader from '../../components/GovHeader'
import { govPosts } from '../../data/mockData'

const priorityConfig = {
  urgente: { label: 'URGENTE', color: '#CE1126', icon: <AlertTriangle size={12} /> },
  prioritária: { label: 'PRIORITÁRIA', color: '#F59E0B', icon: <AlertCircle size={12} /> },
  normal: { label: '', color: '', icon: null },
}

const ministryColors: Record<string, string> = {
  Economia: '#009A44',
  Saúde: '#CE1126',
  Educação: '#0066CC',
  Infraestruturas: '#7B5E00',
  Diplomacia: '#4B0082',
  Segurança: '#1A1A1A',
}

export default function Feed() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(govPosts)
  const [search, setSearch] = useState('')

  const filtered = posts.filter((p) =>
    !search || p.content.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase())
  )

  function toggleLike(id: number) {
    setPosts(posts.map((p) => p.id === id
      ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
      : p
    ))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <GovHeader user={{ name: 'Min. Obras Públicas', role: 'Ministério de Obras Públicas' }} level="governo" />

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Barra de ações */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar no feed..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <button
            onClick={() => navigate('/governo/nova-publicacao')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold shadow-sm hover:opacity-90 transition-opacity"
            style={{ background: '#009A44' }}
          >
            <Plus size={16} /> Publicar
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filtered.map((post) => {
            const pConfig = priorityConfig[post.priority as keyof typeof priorityConfig]
            return (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {pConfig?.color && (
                  <div className="px-5 py-2 flex items-center gap-2 text-xs font-bold text-white"
                    style={{ background: pConfig.color }}>
                    {pConfig.icon} {pConfig.label}
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: ministryColors[post.ministry] ?? '#1A1A1A' }}>
                      {post.author.split(' ')[1]?.[0] ?? post.author[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-gray-900">{post.author}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full text-white"
                          style={{ background: ministryColors[post.ministry] ?? '#6B7280', fontSize: 10 }}>
                          {post.ministry}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{post.role} · {post.time}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-4">{post.content}</p>

                  <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      style={{ color: post.liked ? '#009A44' : '#9CA3AF' }}
                    >
                      <ThumbsUp size={14} fill={post.liked ? '#009A44' : 'none'} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
                      <MessageSquare size={14} /> {post.comments} comentários
                    </button>
                    <div className="flex-1" />
                    <Info size={14} className="text-gray-300" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

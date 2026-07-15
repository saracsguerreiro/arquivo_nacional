import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThumbsUp, MessageSquare, AlertTriangle, AlertCircle, Plus, Search } from 'lucide-react'
import Header from '../../components/Header'
import { govPosts } from '../../data/mockData'

const MIN_COLORS: Record<string, string> = {
  Economia: '#009A44', Saúde: '#CE1126', Educação: '#0055CC',
  Infraestruturas: '#8B6914', Diplomacia: '#6B21A8', Segurança: '#374151',
}

export default function Feed() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(govPosts)
  const [q, setQ] = useState('')

  const filtered = posts.filter(p => !q || p.content.toLowerCase().includes(q.toLowerCase()) || p.author.toLowerCase().includes(q.toLowerCase()))

  function toggleLike(id: number) {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes-1 : p.likes+1 } : p))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#111111' }}>
      <Header />

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '28px 20px' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#555555', pointerEvents: 'none' }} />
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Pesquisar no feed..."
              style={{ width: '100%', padding: '10px 12px 10px 36px', fontSize: 13, border: '1px solid #2A2A2A', borderRadius: 8, background: '#1A1A1A', color: '#DDDDDD', outline: 'none' }}
            />
          </div>
          <button onClick={() => navigate('/governo/nova-publicacao')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, background: '#009A44', color: '#FFFFFF', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
            <Plus size={15} /> Publicar
          </button>
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(post => (
            <div key={post.id} className="post-card" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
              {/* Priority banner */}
              {post.priority !== 'normal' && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 16px', fontSize: 11, fontWeight: 700,
                  background: post.priority === 'urgente' ? '#CE1126' : '#92400E',
                  color: '#FFFFFF', letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  {post.priority === 'urgente' ? <AlertTriangle size={12} /> : <AlertCircle size={12} />}
                  {post.priority}
                </div>
              )}

              <div style={{ padding: '18px 20px' }}>
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: MIN_COLORS[post.ministry] ?? '#333333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                    {post.author[0]}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', marginBottom: 2 }}>{post.author}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: MIN_COLORS[post.ministry] ?? '#888888', background: (MIN_COLORS[post.ministry] ?? '#333333') + '22', padding: '2px 8px', borderRadius: 100 }}>
                        {post.ministry}
                      </span>
                      <span style={{ fontSize: 12, color: '#555555' }}>{post.time}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p style={{ fontSize: 14, color: '#CCCCCC', lineHeight: 1.7, marginBottom: 16 }}>{post.content}</p>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 14, borderTop: '1px solid #252525' }}>
                  <button onClick={() => toggleLike(post.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: post.liked ? '#009A44' : '#555555', transition: 'color 0.15s' }}>
                    <ThumbsUp size={14} /> {post.likes}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#555555' }}>
                    <MessageSquare size={14} /> {post.comments}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

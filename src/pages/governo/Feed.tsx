import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThumbsUp, MessageSquare, Plus, Search, TrendingUp } from 'lucide-react'
import Header from '../../components/Header'
import { govPosts } from '../../data/mockData'

const W = '1240px'

const MIN_COLORS: Record<string, string> = {
  Economia: '#009A44', Saúde: '#CE1126', Educação: '#0055CC',
  Infraestruturas: '#8B6914', Diplomacia: '#6B21A8', Segurança: '#374151',
}

const PRIORITY_PILL: Record<string, { color: string; bg: string; label: string }> = {
  urgente:    { color: '#CE1126', bg: '#CE112618', label: 'Urgente' },
  prioritária: { color: '#D97706', bg: '#D9770618', label: 'Prioritária' },
}

export default function Feed() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(govPosts)
  const [q, setQ] = useState('')

  const filtered = posts.filter(p =>
    !q || p.content.toLowerCase().includes(q.toLowerCase()) || p.author.toLowerCase().includes(q.toLowerCase())
  )

  const popular = [...posts].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments))

  function toggleLike(id: number) {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 20px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>

        {/* ── LEFT: Feed ────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Top bar */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#BBBBBB', pointerEvents: 'none' }} />
              <input
                type="text" value={q} onChange={e => setQ(e.target.value)}
                placeholder="Pesquisar no feed..."
                style={{ width: '100%', padding: '10px 12px 10px 36px', fontSize: 13, border: '1.5px solid #E5E5E5', borderRadius: 8, background: '#FFFFFF', color: '#333333', outline: 'none' }}
                onFocus={e => (e.target.style.borderColor = '#CCCCCC')}
                onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
              />
            </div>
            <button onClick={() => navigate('/governo/nova-publicacao')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, background: '#009A44', color: '#FFFFFF', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
              <Plus size={15} /> Publicar
            </button>
          </div>

          {/* Posts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(post => {
              const pill = PRIORITY_PILL[post.priority]
              const hasImages = post.images && post.images.length > 0
              return (
                <div key={post.id} style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '18px 20px' }}>

                    {/* Author */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: MIN_COLORS[post.ministry] ?? '#AAAAAA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                        {post.author[0]}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#111111', marginBottom: 2 }}>{post.author}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: MIN_COLORS[post.ministry] ?? '#888888', background: (MIN_COLORS[post.ministry] ?? '#AAAAAA') + '18', padding: '2px 8px', borderRadius: 100 }}>
                            {post.ministry}
                          </span>
                          <span style={{ fontSize: 12, color: '#AAAAAA' }}>{post.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p style={{ fontSize: 14, color: '#444444', lineHeight: 1.7, marginBottom: hasImages ? 14 : 16 }}>
                      {post.content}
                    </p>

                    {/* Images */}
                    {hasImages && (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: post.images!.length === 1 ? '1fr' : '1fr 1fr',
                        gap: 4,
                        marginBottom: 16,
                        borderRadius: 8,
                        overflow: 'hidden',
                      }}>
                        {post.images!.map((src, i) => (
                          <img key={i} src={src} alt=""
                            style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
                        ))}
                      </div>
                    )}

                    {/* Actions + priority pill */}
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #F0F0F0' }}>
                      <button onClick={() => toggleLike(post.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: post.liked ? '#009A44' : '#AAAAAA', transition: 'color 0.15s', marginRight: 16 }}>
                        <ThumbsUp size={14} /> {post.likes}
                      </button>
                      <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#AAAAAA' }}>
                        <MessageSquare size={14} /> {post.comments}
                      </button>

                      {/* Priority pill */}
                      {pill && (
                        <span style={{
                          marginLeft: 'auto',
                          padding: '3px 10px', borderRadius: 100,
                          fontSize: 11, fontWeight: 700,
                          color: pill.color, background: pill.bg,
                          border: `1px solid ${pill.color}30`,
                        }}>
                          {pill.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT: Popular topics ──────────────────── */}
        <aside style={{ width: 280, flexShrink: 0 }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={15} style={{ color: '#009A44' }} />
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Tópicos populares</p>
            </div>
            <div>
              {popular.map((post, i) => {
                const c = MIN_COLORS[post.ministry] ?? '#AAAAAA'
                return (
                  <div key={post.id} style={{ padding: '13px 16px', borderBottom: i < popular.length - 1 ? '1px solid #F5F5F5' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                        {post.author[0]}
                      </div>
                      <span style={{ fontSize: 11, color: '#AAAAAA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {post.author}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#222222', lineHeight: 1.4, marginBottom: 8,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.content}
                    </p>
                    <div style={{ display: 'flex', gap: 10, fontSize: 11, color: '#BBBBBB' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <ThumbsUp size={10} /> {post.likes}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <MessageSquare size={10} /> {post.comments}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}

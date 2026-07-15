import { useState } from 'react'
import { Users, MessageSquare, ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import { govGroups, govPosts } from '../../data/mockData'

const MIN_COLORS: Record<string, string> = {
  'Economia e Finanças': '#009A44', 'Saúde Pública': '#CE1126', 'Educação': '#0055CC',
  'Infraestruturas': '#8B6914', 'Diplomacia e Relações Exteriores': '#6B21A8',
  'Segurança e Defesa': '#374151', 'Agricultura': '#4D7C0F', 'Ambiente e Clima': '#0E7490',
}

export default function Groups() {
  const [selected, setSelected] = useState<typeof govGroups[0] | null>(null)
  const color = selected ? (MIN_COLORS[selected.name] ?? '#333333') : '#333333'

  return (
    <div style={{ minHeight: '100vh', background: '#111111' }}>
      <Header />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 20px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginBottom: 4 }}>Grupos Temáticos</h1>
        <p style={{ fontSize: 13, color: '#666666', marginBottom: 24 }}>Canais por pasta ministerial ou assunto</p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

          {/* Group list */}
          <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {govGroups.map(g => {
              const c = MIN_COLORS[g.name] ?? '#444444'
              const isSelected = selected?.id === g.id
              return (
                <button key={g.id} onClick={() => setSelected(g)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10,
                    background: isSelected ? c : '#1A1A1A',
                    border: `1px solid ${isSelected ? c : '#2A2A2A'}`,
                    textAlign: 'left', transition: 'all 0.15s',
                  }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: isSelected ? 'rgba(255,255,255,0.2)' : c + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: isSelected ? '#FFFFFF' : c }}>{g.name[0]}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: isSelected ? '#FFFFFF' : '#CCCCCC', lineHeight: 1.3 }}>{g.name}</p>
                    <p style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.6)' : '#555555', marginTop: 2 }}>{g.posts} publicações</p>
                  </div>
                  {g.active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: isSelected ? 'rgba(255,255,255,0.8)' : '#009A44', marginLeft: 'auto', flexShrink: 0 }} />}
                </button>
              )
            })}
          </div>

          {/* Group content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {!selected ? (
              <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 10, padding: '48px 24px', textAlign: 'center' }}>
                <Users size={36} style={{ color: '#333333', margin: '0 auto 12px' }} />
                <p style={{ fontSize: 14, color: '#555555' }}>Selecione um grupo para ver as publicações</p>
              </div>
            ) : (
              <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 10, overflow: 'hidden' }}>
                {/* Group header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #222222', background: color + '18', borderTop: `3px solid ${color}` }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>{selected.name}</h2>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#666666' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {selected.members} membros</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageSquare size={12} /> {selected.posts} publicações</span>
                  </div>
                </div>

                {/* Posts preview */}
                {govPosts.slice(0, 2).map((post, i) => (
                  <div key={post.id} style={{ padding: '16px 20px', borderBottom: i === 0 ? '1px solid #222222' : 'none' }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                        {post.author[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#CCCCCC' }}>{post.author}</p>
                        <p style={{ fontSize: 11, color: '#555555' }}>{post.time}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#AAAAAA', lineHeight: 1.65 }}>{post.content}</p>
                    <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 12, color: '#555555' }}>
                      <span>{post.likes} gostos</span>
                      <span>{post.comments} comentários</span>
                    </div>
                  </div>
                ))}

                <div style={{ padding: '12px 20px', borderTop: '1px solid #222222', textAlign: 'center' }}>
                  <button style={{ fontSize: 13, fontWeight: 600, color: color, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Ver todas as publicações <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

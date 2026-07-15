import { useState } from 'react'
import { Users, MessageSquare, ArrowRight } from 'lucide-react'
import Header from '../../components/Header'
import { govGroups, govPosts } from '../../data/mockData'

const W = '1240px'

const MIN_COLORS: Record<string, string> = {
  'Economia e Finanças': '#009A44', 'Saúde Pública': '#CE1126', 'Educação': '#0055CC',
  'Infraestruturas': '#8B6914', 'Diplomacia e Relações Exteriores': '#6B21A8',
  'Segurança e Defesa': '#374151', 'Agricultura': '#4D7C0F', 'Ambiente e Clima': '#0E7490',
}

export default function Groups() {
  const [selected, setSelected] = useState<typeof govGroups[0] | null>(null)
  const color = selected ? (MIN_COLORS[selected.name] ?? '#009A44') : '#009A44'

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 20px' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#111111', marginBottom: 4 }}>Grupos Temáticos</h1>
        <p style={{ fontSize: 13, color: '#999999', marginBottom: 24 }}>Canais por pasta ministerial ou assunto</p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

          {/* Group list */}
          <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {govGroups.map(g => {
              const c = MIN_COLORS[g.name] ?? '#009A44'
              const isSelected = selected?.id === g.id
              return (
                <button key={g.id} onClick={() => setSelected(g)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10,
                    background: isSelected ? c : '#FFFFFF',
                    border: `1px solid ${isSelected ? c : '#E5E5E5'}`,
                    textAlign: 'left', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = '#CCCCCC' }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = '#E5E5E5' }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: isSelected ? 'rgba(255,255,255,0.25)' : c + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: isSelected ? '#FFFFFF' : c }}>{g.name[0]}</span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: isSelected ? '#FFFFFF' : '#222222', lineHeight: 1.3 }}>{g.name}</p>
                    <p style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.65)' : '#AAAAAA', marginTop: 2 }}>{g.posts} publicações</p>
                  </div>
                  {g.active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: isSelected ? 'rgba(255,255,255,0.9)' : '#009A44', marginLeft: 'auto', flexShrink: 0 }} />}
                </button>
              )
            })}
          </div>

          {/* Group content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {!selected ? (
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: '48px 24px', textAlign: 'center' }}>
                <Users size={36} style={{ color: '#DDDDDD', margin: '0 auto 12px' }} />
                <p style={{ fontSize: 14, color: '#AAAAAA' }}>Selecione um grupo para ver as publicações</p>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, overflow: 'hidden' }}>
                {/* Group header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0', background: color + '0D', borderTop: `3px solid ${color}` }}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111111', marginBottom: 6 }}>{selected.name}</h2>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#AAAAAA' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} /> {selected.members} membros</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageSquare size={12} /> {selected.posts} publicações</span>
                  </div>
                </div>

                {/* Posts preview */}
                {govPosts.slice(0, 2).map((post, i) => (
                  <div key={post.id} style={{ padding: '16px 20px', borderBottom: i === 0 ? '1px solid #F0F0F0' : 'none' }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                        {post.author[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#222222' }}>{post.author}</p>
                        <p style={{ fontSize: 11, color: '#AAAAAA' }}>{post.time}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: '#555555', lineHeight: 1.65 }}>{post.content}</p>
                    <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 12, color: '#AAAAAA' }}>
                      <span>{post.likes} gostos</span>
                      <span>{post.comments} comentários</span>
                    </div>
                  </div>
                ))}

                <div style={{ padding: '12px 20px', borderTop: '1px solid #F0F0F0', textAlign: 'center' }}>
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

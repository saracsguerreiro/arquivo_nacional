import { useNavigate } from 'react-router-dom'
import { AlertTriangle, AlertCircle, Info, MessageSquare, Bell, FileText, Users } from 'lucide-react'
import Header from '../../components/Header'
import { executiveSummary } from '../../data/mockData'

const W = '1240px'

const P_CONFIG = {
  urgente: { color: '#CE1126', bg: '#CE112610', border: '#CE112630', icon: <AlertTriangle size={14} /> },
  alta:    { color: '#D97706', bg: '#D9770610', border: '#D9770630', icon: <AlertCircle size={14} /> },
  normal:  { color: '#888888', bg: '#88888810', border: '#88888830', icon: <Info size={14} /> },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { date, highlights, stats } = executiveSummary

  const critical = highlights.filter(h => h.priority === 'urgente' || h.priority === 'alta')
  const discussion = highlights.filter(h => h.priority === 'normal')

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 20px' }}>

        {/* Title */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#CE1126', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            Resumo Executivo Diário
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111111' }}>{date}</h1>
          <p style={{ fontSize: 13, color: '#999999', marginTop: 4 }}>Síntese curada do Espaço do Governo</p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
          {[
            { label: 'Publicações',  value: stats.totalPosts,       icon: <FileText size={16} /> },
            { label: 'Comentários',  value: stats.totalComments,    icon: <MessageSquare size={16} /> },
            { label: 'Ministérios',  value: stats.activeMinistries, icon: <Users size={16} /> },
            { label: 'Urgentes',     value: stats.urgentTopics,     icon: <AlertTriangle size={16} />, accent: true },
          ].map(s => (
            <div key={s.label} style={{ background: '#FFFFFF', border: `1px solid ${s.accent ? '#CE112630' : '#E5E5E5'}`, borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: s.accent ? '#CE1126' : '#AAAAAA' }}>
                {s.icon}
                <span style={{ fontSize: 11, color: s.accent ? '#CE1126' : '#AAAAAA' }}>{s.label}</span>
              </div>
              <p style={{ fontSize: 24, fontWeight: 800, color: s.accent ? '#CE1126' : '#111111' }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

          {/* LEFT — Temas Críticos */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <AlertTriangle size={15} style={{ color: '#CE1126' }} />
              <h2 style={{ fontSize: 13, fontWeight: 700, color: '#CE1126', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Temas Críticos
              </h2>
              <span style={{ fontSize: 11, color: '#AAAAAA' }}>({critical.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {critical.map((h, i) => {
                const cfg = P_CONFIG[h.priority as keyof typeof P_CONFIG]
                return (
                  <div key={i} style={{ background: '#FFFFFF', border: `1px solid ${cfg.border}`, borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: cfg.bg, borderBottom: `1px solid ${cfg.border}` }}>
                      <span style={{ color: cfg.color }}>{cfg.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h.priority}</span>
                      <span style={{ fontSize: 11, color: '#AAAAAA', marginLeft: 4 }}>· {h.ministry}</span>
                      <span style={{ fontSize: 11, color: '#CCCCCC', marginLeft: 'auto' }}>{h.posts} publicações</span>
                    </div>
                    <div style={{ padding: '14px 16px' }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#111111', marginBottom: 5 }}>{h.topic}</p>
                      <p style={{ fontSize: 13, color: '#777777', lineHeight: 1.6 }}>{h.summary}</p>
                    </div>
                  </div>
                )
              })}

              {/* Quick access */}
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button onClick={() => navigate('/presidencia/alertas')}
                  style={{ flex: 1, background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: '14px 16px', textAlign: 'left', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#CE1126')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E5E5')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Bell size={14} style={{ color: '#CE1126' }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Ver todos os alertas</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#AAAAAA' }}>{stats.urgentTopics} temas urgentes</p>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Temas em Discussão */}
          <div style={{ width: 340, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <MessageSquare size={15} style={{ color: '#555555' }} />
              <h2 style={{ fontSize: 13, fontWeight: 700, color: '#555555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Temas em Discussão
              </h2>
              <span style={{ fontSize: 11, color: '#AAAAAA' }}>({discussion.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {discussion.map((h, i) => {
                const cfg = P_CONFIG[h.priority as keyof typeof P_CONFIG]
                return (
                  <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: cfg.bg, borderBottom: `1px solid ${cfg.border}` }}>
                      <span style={{ color: cfg.color }}>{cfg.icon}</span>
                      <span style={{ fontSize: 11, color: '#AAAAAA' }}>{h.ministry}</span>
                      <span style={{ fontSize: 11, color: '#CCCCCC', marginLeft: 'auto' }}>{h.posts} pub.</span>
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#111111', marginBottom: 4 }}>{h.topic}</p>
                      <p style={{ fontSize: 12, color: '#888888', lineHeight: 1.55 }}>{h.summary}</p>
                    </div>
                  </div>
                )
              })}

              {/* Chat quick access */}
              <button onClick={() => navigate('/presidencia/chat')}
                style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: '14px 16px', textAlign: 'left', width: '100%', marginTop: 4, transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#CE1126')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E5E5')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <MessageSquare size={14} style={{ color: '#CE1126' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Chat Privado</span>
                </div>
                <p style={{ fontSize: 11, color: '#AAAAAA' }}>4 conversas · 4 não lidas</p>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

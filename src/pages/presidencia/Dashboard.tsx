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

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 20px' }}>

        {/* Title */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#CE1126', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
            Resumo Executivo Diário
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111111' }}>{date}</h1>
          <p style={{ fontSize: 13, color: '#999999', marginTop: 4 }}>Síntese curada do Espaço do Governo</p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
          {[
            { label: 'Publicações', value: stats.totalPosts, icon: <FileText size={16} /> },
            { label: 'Comentários', value: stats.totalComments, icon: <MessageSquare size={16} /> },
            { label: 'Ministérios', value: stats.activeMinistries, icon: <Users size={16} /> },
            { label: 'Urgentes', value: stats.urgentTopics, icon: <AlertTriangle size={16} />, accent: true },
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

        {/* Highlights */}
        <h2 style={{ fontSize: 13, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Temas em discussão
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {highlights.map((h, i) => {
            const cfg = P_CONFIG[h.priority as keyof typeof P_CONFIG]
            return (
              <div key={i} style={{ background: '#FFFFFF', border: `1px solid #E5E5E5`, borderRadius: 10, overflow: 'hidden' }}>
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
        </div>

        {/* Quick access */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, maxWidth: 600 }}>
          <button onClick={() => navigate('/presidencia/chat')}
            style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: '18px 20px', textAlign: 'left', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#CE1126')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E5E5')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MessageSquare size={16} style={{ color: '#CE1126' }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111111' }}>Chat Privado</span>
            </div>
            <p style={{ fontSize: 12, color: '#AAAAAA' }}>4 conversas · 4 não lidas</p>
          </button>

          <button onClick={() => navigate('/presidencia/alertas')}
            style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: '18px 20px', textAlign: 'left', transition: 'border-color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#D97706')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#E5E5E5')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Bell size={16} style={{ color: '#D97706' }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111111' }}>Alertas</span>
            </div>
            <p style={{ fontSize: 12, color: '#AAAAAA' }}>{stats.urgentTopics} temas urgentes</p>
          </button>
        </div>
      </div>
    </div>
  )
}

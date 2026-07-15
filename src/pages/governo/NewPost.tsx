import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Paperclip, AlertTriangle, AlertCircle, Minus } from 'lucide-react'
import Header from '../../components/Header'

const W = '1240px'

const MINISTRIES = ['Feed geral','Economia e Finanças','Saúde Pública','Educação','Infraestruturas','Diplomacia e Relações Exteriores','Segurança e Defesa','Agricultura','Ambiente e Clima']
const PRIORITIES = [
  { value: 'normal', label: 'Normal', color: '#888888', icon: <Minus size={13} /> },
  { value: 'prioritária', label: 'Prioritária', color: '#D97706', icon: <AlertCircle size={13} /> },
  { value: 'urgente', label: 'Urgente', color: '#CE1126', icon: <AlertTriangle size={13} /> },
] as const

export default function NewPost() {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState<'normal' | 'prioritária' | 'urgente'>('normal')
  const [ministry, setMinistry] = useState('Feed geral')
  const [done, setDone] = useState(false)

  if (done) return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, padding: 40, textAlign: 'center', maxWidth: 340 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#009A4418', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Send size={24} style={{ color: '#009A44' }} />
        </div>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#111111', marginBottom: 8 }}>Publicação enviada</p>
        <p style={{ fontSize: 13, color: '#999999', marginBottom: 24 }}>Partilhada no feed do Executivo</p>
        <button onClick={() => navigate('/governo')} style={{ padding: '10px 20px', borderRadius: 8, background: '#009A44', color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}>
          Voltar ao feed
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 20px' }}>
        <button onClick={() => navigate('/governo')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#999999', marginBottom: 24 }}>
          <ArrowLeft size={15} /> Voltar ao feed
        </button>

        <div style={{ maxWidth: 640, background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #F0F0F0' }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>Nova Publicação</p>
            <p style={{ fontSize: 12, color: '#AAAAAA', marginTop: 2 }}>Partilhar com o Executivo</p>
          </div>

          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Priority */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                Prioridade
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {PRIORITIES.map(p => (
                  <button key={p.value} onClick={() => setPriority(p.value)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                      border: `1.5px solid ${priority === p.value ? p.color : '#E5E5E5'}`,
                      background: priority === p.value ? p.color + '12' : 'transparent',
                      color: priority === p.value ? p.color : '#AAAAAA',
                      transition: 'all 0.15s',
                    }}>
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Group */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                Grupo
              </label>
              <select value={ministry} onChange={e => setMinistry(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E5E5E5', background: '#FFFFFF', color: '#333333', fontSize: 13, outline: 'none' }}>
                {MINISTRIES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Content */}
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                Publicação
              </label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Escreva a sua publicação para o Executivo..."
                rows={6}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1.5px solid #E5E5E5', background: '#FAFAFA', color: '#333333', fontSize: 14, lineHeight: 1.7, resize: 'none', outline: 'none', transition: 'border-color 0.15s' }}
                onFocus={e => (e.target.style.borderColor = '#CCCCCC')}
                onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
              />
              <p style={{ fontSize: 11, color: '#CCCCCC', textAlign: 'right', marginTop: 4 }}>{content.length} caracteres</p>
            </div>

            {/* Warning for urgent */}
            {priority === 'urgente' && (
              <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 8, background: '#CE112610', border: '1px solid #CE112630' }}>
                <AlertTriangle size={15} style={{ color: '#CE1126', flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: '#CE1126', lineHeight: 1.6 }}>
                  Publicações <strong>urgentes</strong> notificam imediatamente todos os membros do Executivo e aparecem em destaque no topo do feed.
                </p>
              </div>
            )}

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#AAAAAA' }}>
                <Paperclip size={14} /> Anexar documento
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => navigate('/governo')} className="btn-ghost">Cancelar</button>
                <button
                  onClick={() => { if (content.trim()) setDone(true) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 8, background: content.trim() ? '#009A44' : '#EEEEEE', color: content.trim() ? '#FFFFFF' : '#AAAAAA', fontSize: 13, fontWeight: 600, transition: 'all 0.15s' }}>
                  <Send size={13} /> Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

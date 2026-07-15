import { useState } from 'react'
import { X, Users, Crown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginModal() {
  const { setLevel, setLoginOpen } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'governo' | 'presidencia'>('governo')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function close() { setLoginOpen(false) }

  function login() {
    setLevel(tab)
    setLoginOpen(false)
    navigate(`/${tab}`)
  }

  const accentColor = tab === 'governo' ? '#009A44' : '#CE1126'

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div style={{ background: '#FFFFFF', borderRadius: 12, width: '100%', maxWidth: 400, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #E5E5E5' }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>Área Restrita</span>
          <button onClick={close} style={{ color: '#999999', padding: 4, borderRadius: 6 }}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E5E5E5' }}>
          {(['governo', 'presidencia'] as const).map((t) => {
            const color = t === 'governo' ? '#009A44' : '#CE1126'
            const active = tab === t
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '12px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: active ? color : '#999999',
                  borderBottom: active ? `2px solid ${color}` : '2px solid transparent',
                  marginBottom: -1,
                  transition: 'color 0.15s',
                }}
              >
                {t === 'governo' ? <Users size={14} /> : <Crown size={14} />}
                {t === 'governo' ? 'Governo' : 'Presidência'}
              </button>
            )
          })}
        </div>

        {/* Form */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666666', marginBottom: 6 }}>
              Email institucional
            </label>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={tab === 'governo' ? 'nome@gov.mz' : 'presidencia@pr.gov.mz'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666666', marginBottom: 6 }}>
              Palavra-passe
            </label>
            <input
              className="field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={login}
            className="btn-primary"
            style={{ background: accentColor, width: '100%', marginTop: 4 }}
          >
            Entrar no {tab === 'governo' ? 'Espaço do Governo' : 'Espaço da Presidência'}
          </button>

          <p style={{ fontSize: 11, color: '#CCCCCC', textAlign: 'center' }}>
            Acesso monitorizado · Sessão registada
          </p>
        </div>
      </div>
    </div>
  )
}

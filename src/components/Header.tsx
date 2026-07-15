import { LogIn, LogOut, Users, Crown } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const W = '1240px'

export default function Header() {
  const { level, setLevel, setLoginOpen } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isGov = level === 'governo'
  const isPres = level === 'presidencia'
  const isRestricted = isGov || isPres
  const accentColor = isGov ? '#009A44' : '#CE1126'

  const govLinks: { label: string; path: string; accent?: boolean }[] = [
    { label: 'Feed', path: '/governo' },
    { label: 'Grupos', path: '/governo/grupos' },
    { label: '+ Nova publicação', path: '/governo/nova-publicacao', accent: true },
  ]
  const presLinks: { label: string; path: string; accent?: boolean }[] = [
    { label: 'Resumo', path: '/presidencia' },
    { label: 'Chat', path: '/presidencia/chat' },
    { label: 'Alertas', path: '/presidencia/alertas' },
  ]
  const navLinks = isGov ? govLinks : isPres ? presLinks : []

  return (
    <header style={{
      background: isRestricted ? '#111111' : '#FFFFFF',
      borderBottom: `1px solid ${isRestricted ? '#1E1E1E' : '#EEEEEE'}`,
      position: 'sticky', top: 0, zIndex: 40,
    }}>
      <div style={{ maxWidth: W, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', height: 56, gap: 12 }}>

        {/* Logo */}
        <button onClick={() => navigate(isRestricted ? `/${level}` : '/')}
          style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: 14 }}>
            <div style={{ height: 3.5, borderRadius: 2, background: '#009A44' }} />
            <div style={{ height: 3.5, borderRadius: 2, background: '#CE1126' }} />
            <div style={{ height: 3.5, borderRadius: 2, background: '#FCD116' }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: isRestricted ? '#FFFFFF' : '#111111', lineHeight: 1.2 }}>Arquivo Nacional</div>
            <div style={{ fontSize: 10, color: isRestricted ? '#555555' : '#AAAAAA', lineHeight: 1 }}>
              {isGov ? 'Espaço do Governo' : isPres ? 'Espaço da Presidência' : 'República de Moçambique'}
            </div>
          </div>
        </button>

        {/* Nav links (restricted) */}
        {isRestricted && (
          <nav style={{ display: 'flex', gap: 2, alignItems: 'center', marginLeft: 16 }}>
            {navLinks.map(link => (
              <button key={link.path} onClick={() => navigate(link.path)} style={{
                padding: '6px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500,
                color: location.pathname === link.path ? '#FFFFFF' : link.accent ? accentColor : '#888888',
                background: location.pathname === link.path ? '#1E1E1E' : 'transparent',
                border: link.accent ? `1px solid ${accentColor}40` : 'none',
                transition: 'all 0.12s',
              }}>{link.label}</button>
            ))}
          </nav>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {!isRestricted ? (
            <button onClick={() => setLoginOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, background: '#111111', color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}>
              <LogIn size={13} /> Entrar
            </button>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 7, background: '#1A1A1A', border: `1px solid ${accentColor}50` }}>
                {isGov ? <Users size={12} style={{ color: accentColor }} /> : <Crown size={12} style={{ color: accentColor }} />}
                <span style={{ fontSize: 12, fontWeight: 600, color: accentColor }}>{isGov ? 'Governo' : 'Presidência'}</span>
              </div>
              <button onClick={() => { setLevel('public'); navigate('/') }}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', borderRadius: 7, background: '#1A1A1A', color: '#777777', fontSize: 12, border: '1px solid #222222' }}>
                <LogOut size={12} /> Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

import { Search, LogIn, LogOut, Users, Crown } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { level, setLevel, setLoginOpen } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isGov = level === 'governo'
  const isPres = level === 'presidencia'
  const isRestricted = isGov || isPres

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
  const accentColor = isGov ? '#009A44' : '#CE1126'

  return (
    <header style={{
      background: isRestricted ? '#111111' : '#FFFFFF',
      borderBottom: `1px solid ${isRestricted ? '#222222' : '#E5E5E5'}`,
      position: 'sticky',
      top: 0,
      zIndex: 40,
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 60 }}>

          {/* Logo */}
          <button
            onClick={() => navigate(isRestricted ? `/${level}` : '/')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, width: 16 }}>
              <div style={{ height: 4, borderRadius: 2, background: '#009A44' }} />
              <div style={{ height: 4, borderRadius: 2, background: '#CE1126' }} />
              <div style={{ height: 4, borderRadius: 2, background: '#FCD116' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: isRestricted ? '#FFFFFF' : '#111111', lineHeight: 1.2 }}>
                Arquivo Nacional
              </div>
              <div style={{ fontSize: 11, color: isRestricted ? '#666666' : '#999999', lineHeight: 1 }}>
                {isGov ? 'Espaço do Governo' : isPres ? 'Espaço da Presidência' : 'Moçambique'}
              </div>
            </div>
          </button>

          {/* Public: search */}
          {!isRestricted && (
            <div style={{ flex: 1, maxWidth: 440, position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#BBBBBB', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Pesquisar..."
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/pesquisa?q=${(e.target as HTMLInputElement).value}`) }}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  fontSize: 13,
                  border: '1.5px solid #E5E5E5',
                  borderRadius: 8,
                  background: '#F7F7F7',
                  color: '#333333',
                  outline: 'none',
                }}
              />
            </div>
          )}

          {/* Restricted: nav links */}
          {isRestricted && (
            <nav style={{ flex: 1, display: 'flex', gap: 4, alignItems: 'center' }}>
              {navLinks.map(link => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    color: location.pathname === link.path
                      ? '#FFFFFF'
                      : link.accent ? accentColor : '#AAAAAA',
                    background: location.pathname === link.path
                      ? '#222222'
                      : link.accent ? 'transparent' : 'transparent',
                    border: link.accent ? `1px solid ${accentColor}` : 'none',
                    transition: 'all 0.15s',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Auth button */}
          <div style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            {!isRestricted ? (
              <button
                onClick={() => setLoginOpen(true)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, background: '#111111', color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}
              >
                <LogIn size={14} /> Entrar
              </button>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 8, background: '#1A1A1A', border: `1px solid ${accentColor}` }}>
                  {isGov ? <Users size={12} style={{ color: accentColor }} /> : <Crown size={12} style={{ color: accentColor }} />}
                  <span style={{ fontSize: 12, fontWeight: 600, color: accentColor }}>
                    {isGov ? 'Governo' : 'Presidência'}
                  </span>
                </div>
                <button
                  onClick={() => { setLevel('public'); navigate('/') }}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 8, background: '#1A1A1A', color: '#888888', fontSize: 12, border: '1px solid #2A2A2A' }}
                >
                  <LogOut size={13} /> Sair
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

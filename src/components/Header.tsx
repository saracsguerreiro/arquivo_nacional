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
  const headerBg = isGov ? '#009A44' : isPres ? '#111111' : '#FFFFFF'

  // Logo stripes per context
  const stripes = isGov
    ? ['rgba(255,255,255,0.95)', '#CE1126', '#FCD116']
    : isPres
    ? ['#009A44', '#CE1126', '#FCD116']
    : ['#009A44', '#CE1126', '#FCD116']

  const activeUnderline = isGov ? '#CE1126' : '#FCD116'

  const govLinks = [
    { label: 'Feed', path: '/governo' },
    { label: 'Grupos', path: '/governo/grupos' },
    { label: '+ Nova publicação', path: '/governo/nova-publicacao' },
  ]
  const presLinks = [
    { label: 'Resumo', path: '/presidencia' },
    { label: 'Chat', path: '/presidencia/chat' },
    { label: 'Alertas', path: '/presidencia/alertas' },
  ]
  const navLinks = isGov ? govLinks : isPres ? presLinks : []

  return (
    <header style={{
      background: headerBg,
      borderBottom: isRestricted ? 'none' : '1px solid #EEEEEE',
      position: 'sticky', top: 0, zIndex: 40,
      boxShadow: isRestricted ? '0 2px 12px rgba(0,0,0,0.15)' : 'none',
    }}>
      <div style={{ maxWidth: W, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', height: 56, position: 'relative' }}>

        {/* Logo — left */}
        <button onClick={() => navigate(isRestricted ? `/${level}` : '/')}
          style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: 14 }}>
            <div style={{ height: 3.5, borderRadius: 2, background: stripes[0] }} />
            <div style={{ height: 3.5, borderRadius: 2, background: stripes[1] }} />
            <div style={{ height: 3.5, borderRadius: 2, background: stripes[2] }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: isRestricted ? '#FFFFFF' : '#111111', lineHeight: 1.2 }}>
              Arquivo Nacional
            </div>
            <div style={{ fontSize: 10, color: isRestricted ? 'rgba(255,255,255,0.65)' : '#AAAAAA', lineHeight: 1 }}>
              {isGov ? 'Espaço do Governo' : isPres ? 'Espaço da Presidência' : 'República de Moçambique'}
            </div>
          </div>
        </button>

        {/* Nav — centred absolutely */}
        {isRestricted && (
          <nav style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 4, alignItems: 'center',
          }}>
            {navLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  style={{
                    padding: '4px 14px 3px',
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    color: '#FFFFFF',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? `2px solid ${activeUnderline}` : '2px solid transparent',
                    borderRadius: 0,
                    opacity: isActive ? 1 : 0.78,
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.opacity = '0.78' }}
                >
                  {link.label}
                </button>
              )
            })}
          </nav>
        )}

        {/* Actions — right */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {!isRestricted ? (
            <button onClick={() => setLoginOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, background: '#111111', color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}>
              <LogIn size={13} /> Entrar
            </button>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 7, background: 'rgba(255,255,255,0.18)' }}>
                {isGov ? <Users size={12} style={{ color: '#FFFFFF' }} /> : <Crown size={12} style={{ color: '#FFFFFF' }} />}
                <span style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>{isGov ? 'Governo' : 'Presidência'}</span>
              </div>
              <button onClick={() => { setLevel('public'); navigate('/') }}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', borderRadius: 7, background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', fontSize: 12, border: '1px solid rgba(255,255,255,0.2)' }}>
                <LogOut size={12} /> Sair
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  )
}

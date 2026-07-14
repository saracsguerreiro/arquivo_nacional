import { Bell, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  user?: { name: string; role: string }
  level?: 'governo' | 'presidencia'
}

export default function GovHeader({ user, level = 'governo' }: Props) {
  const navigate = useNavigate()
  const isGov = level === 'governo'

  const bgColor = isGov ? '#1A1A1A' : '#7B0000'
  const label = isGov ? 'Espaço do Governo' : 'Espaço da Presidência'
  const basePath = isGov ? '/governo' : '/presidencia'

  return (
    <header style={{ background: bgColor }} className="text-white shadow-lg">
      <div style={{ background: '#009A44', height: 4 }} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <button onClick={() => navigate(basePath)} className="flex items-center gap-3 hover:opacity-90">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
              style={{ background: isGov ? '#009A44' : '#CE1126' }}>
              {isGov ? 'G' : 'P'}
            </div>
            <div>
              <div className="font-bold text-sm">{label}</div>
              <div className="text-xs opacity-60">Acesso restrito</div>
            </div>
          </button>

          <div className="flex items-center gap-4">
            {isGov && (
              <>
                <button onClick={() => navigate('/governo')} className="text-xs opacity-70 hover:opacity-100 hidden md:block">Feed</button>
                <button onClick={() => navigate('/governo/grupos')} className="text-xs opacity-70 hover:opacity-100 hidden md:block">Grupos</button>
                <button onClick={() => navigate('/governo/nova-publicacao')} className="text-xs opacity-70 hover:opacity-100 hidden md:block">Nova Publicação</button>
              </>
            )}
            {!isGov && (
              <>
                <button onClick={() => navigate('/presidencia')} className="text-xs opacity-70 hover:opacity-100 hidden md:block">Resumo</button>
                <button onClick={() => navigate('/presidencia/chat')} className="text-xs opacity-70 hover:opacity-100 hidden md:block">Chat</button>
                <button onClick={() => navigate('/presidencia/alertas')} className="text-xs opacity-70 hover:opacity-100 hidden md:block">Alertas</button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-full hover:bg-white/10">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ background: '#CE1126', fontSize: 10 }}>3</span>
            </button>
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold">{user?.name ?? 'Utilizador'}</div>
              <div className="text-xs opacity-50">{user?.role ?? 'Membro'}</div>
            </div>
            <button onClick={() => navigate('/login')} className="p-1.5 rounded-full hover:bg-white/10 opacity-60 hover:opacity-100">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

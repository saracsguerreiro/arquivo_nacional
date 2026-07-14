import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Props {
  onSearch?: (q: string) => void
  searchValue?: string
}

export default function PublicHeader({ onSearch, searchValue = '' }: Props) {
  const navigate = useNavigate()

  return (
    <header style={{ background: '#009A44' }} className="text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => navigate('/publico')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img src="/mz-emblem.svg" alt="Emblema" className="w-8 h-8" onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }} />
              <span className="text-green-700 font-black text-sm hidden">MZ</span>
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">Arquivo Nacional</div>
              <div className="text-xs opacity-80 leading-tight">Plataforma de Informação</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => navigate('/publico')} className="hover:text-yellow-300 transition-colors">Início</button>
            <button onClick={() => navigate('/publico/arquivo')} className="hover:text-yellow-300 transition-colors">Arquivo</button>
            <button onClick={() => navigate('/publico/pesquisa')} className="hover:text-yellow-300 transition-colors">Pesquisa</button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchValue}
                onChange={(e) => onSearch?.(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/publico/pesquisa?q=${searchValue}`)}
                className="pl-9 pr-4 py-1.5 rounded-full text-sm bg-white/20 placeholder-white/60 text-white border border-white/30 focus:outline-none focus:bg-white/30 w-48"
              />
            </div>
            <button
              onClick={() => navigate('/login')}
              style={{ background: '#FCD116', color: '#1A1A1A' }}
              className="text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Área Restrita
            </button>
          </div>
        </div>

        <div className="flex gap-2 pb-3 overflow-x-auto text-xs">
          {['Política nacional', 'Política internacional', 'Economia', 'Comunicados', 'Discursos', 'Legislação', 'Indicadores'].map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/publico/pesquisa?cat=${encodeURIComponent(cat)}`)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#CE1126', height: 4 }} />
    </header>
  )
}

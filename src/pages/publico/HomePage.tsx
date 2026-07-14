import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Clock, FileText, BookOpen, Mic, BarChart2, Gavel } from 'lucide-react'
import PublicHeader from '../../components/PublicHeader'
import { articles } from '../../data/mockData'

const categoryIcons: Record<string, React.ReactNode> = {
  'Política nacional': <TrendingUp size={18} />,
  'Política internacional': <TrendingUp size={18} />,
  'Economia': <BarChart2 size={18} />,
  'Comunicados': <FileText size={18} />,
  'Discursos presidenciais': <Mic size={18} />,
  'Legislação': <Gavel size={18} />,
  'Indicadores económicos': <BarChart2 size={18} />,
}

const typeColors: Record<string, string> = {
  'Notícia': '#009A44',
  'Comunicado oficial': '#1A1A1A',
  'Discurso': '#CE1126',
  'Relatório': '#0066CC',
  'Legislação': '#7B0000',
}

export default function HomePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader onSearch={setSearch} searchValue={search} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Destaque */}
        <section className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#009A44' }}>
            <TrendingUp size={14} /> Destaque
          </div>
          <button
            onClick={() => navigate(`/publico/noticia/${featured.id}`)}
            className="w-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left overflow-hidden group"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: typeColors[featured.type] ?? '#009A44' }}>
                      {featured.type}
                    </span>
                    <span className="text-xs text-gray-400">{featured.category}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-green-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={12} /> {featured.date}</span>
                    <span>·</span>
                    <span>{featured.source}</span>
                  </div>
                </div>
                <div className="hidden md:flex w-32 h-32 rounded-xl items-center justify-center flex-shrink-0"
                  style={{ background: '#E8F5EE' }}>
                  <FileText size={40} style={{ color: '#009A44' }} />
                </div>
              </div>
            </div>
          </button>
        </section>

        {/* Categorias rápidas */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Discursos', icon: <Mic size={20} />, cat: 'Discursos presidenciais' },
              { label: 'Legislação', icon: <Gavel size={20} />, cat: 'Legislação' },
              { label: 'Indicadores', icon: <BarChart2 size={20} />, cat: 'Indicadores económicos' },
              { label: 'Arquivo Histórico', icon: <BookOpen size={20} />, route: '/publico/arquivo' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.route ?? `/publico/pesquisa?cat=${encodeURIComponent(item.cat ?? '')}`)}
                className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow group text-left"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#E8F5EE' }}>
                  <span style={{ color: '#009A44' }}>{item.icon}</span>
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-colors">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Artigos recentes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: '#009A44' }}>
              <Clock size={14} /> Recentes
            </div>
            <button onClick={() => navigate('/publico/pesquisa')}
              className="text-xs font-semibold hover:underline" style={{ color: '#009A44' }}>
              Ver todos →
            </button>
          </div>

          <div className="space-y-3">
            {rest.map((art) => (
              <button
                key={art.id}
                onClick={() => navigate(`/publico/noticia/${art.id}`)}
                className="w-full bg-white rounded-xl px-5 py-4 text-left shadow-sm hover:shadow-md transition-shadow group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: '#F4F4F4' }}>
                  <span style={{ color: '#009A44' }}>{categoryIcons[art.category] ?? <FileText size={18} />}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: typeColors[art.type] ?? '#009A44', fontSize: 10 }}>
                      {art.type}
                    </span>
                    <span className="text-xs text-gray-400 truncate">{art.category}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <Clock size={11} /> {art.date} · {art.source}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-12 py-8 text-center text-xs text-gray-400 border-t border-gray-200">
        <p className="font-semibold text-gray-600 mb-1">Plataforma Nacional de Informação — República de Moçambique</p>
        <p>Presidência da República · Conteúdo de livre consulta · {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

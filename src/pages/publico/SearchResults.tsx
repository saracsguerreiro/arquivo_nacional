import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, Filter, Clock, ChevronDown, Download, X } from 'lucide-react'
import PublicHeader from '../../components/PublicHeader'
import { articles } from '../../data/mockData'

const categories = ['Todos', 'Política nacional', 'Política internacional', 'Economia', 'Comunicados', 'Discursos presidenciais', 'Legislação', 'Indicadores económicos']
const types = ['Todos', 'Notícia', 'Comunicado oficial', 'Discurso', 'Relatório', 'Legislação']
const dates = ['Qualquer data', 'Hoje', 'Esta semana', 'Este mês', 'Este ano']

const typeColors: Record<string, string> = {
  'Notícia': '#009A44',
  'Comunicado oficial': '#1A1A1A',
  'Discurso': '#CE1126',
  'Relatório': '#0066CC',
  'Legislação': '#7B0000',
}

export default function SearchResults() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const initialQ = params.get('q') ?? ''
  const initialCat = params.get('cat') ?? 'Todos'

  const [search, setSearch] = useState(initialQ)
  const [selectedCat, setSelectedCat] = useState(initialCat !== 'Todos' ? initialCat : 'Todos')
  const [selectedType, setSelectedType] = useState('Todos')
  const [selectedDate, setSelectedDate] = useState('Qualquer data')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = articles.filter((a) => {
    const matchQ = !search || a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat = selectedCat === 'Todos' || a.category === selectedCat
    const matchType = selectedType === 'Todos' || a.type === selectedType
    return matchQ && matchCat && matchType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader onSearch={setSearch} searchValue={search} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Barra de pesquisa principal */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por tema, palavra-chave, fonte..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#009A44' } as React.CSSProperties}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
              style={showFilters ? { background: '#009A44', color: 'white', borderColor: '#009A44' } : { borderColor: '#D1D5DB', color: '#4B5563' }}
            >
              <Filter size={12} /> Filtros <ChevronDown size={12} className={showFilters ? 'rotate-180' : ''} />
            </button>
            {selectedCat !== 'Todos' && (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white" style={{ background: '#009A44' }}>
                {selectedCat} <button onClick={() => setSelectedCat('Todos')}><X size={10} /></button>
              </span>
            )}
            {selectedType !== 'Todos' && (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full text-white" style={{ background: '#1A1A1A' }}>
                {selectedType} <button onClick={() => setSelectedType('Todos')}><X size={10} /></button>
              </span>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Categoria</label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <button key={c} onClick={() => setSelectedCat(c)}
                      className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                      style={selectedCat === c ? { background: '#009A44', color: 'white', borderColor: '#009A44' } : { borderColor: '#D1D5DB', color: '#6B7280' }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Tipo de documento</label>
                <div className="flex flex-wrap gap-1.5">
                  {types.map((t) => (
                    <button key={t} onClick={() => setSelectedType(t)}
                      className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                      style={selectedType === t ? { background: '#1A1A1A', color: 'white', borderColor: '#1A1A1A' } : { borderColor: '#D1D5DB', color: '#6B7280' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2">Data</label>
                <div className="flex flex-wrap gap-1.5">
                  {dates.map((d) => (
                    <button key={d} onClick={() => setSelectedDate(d)}
                      className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                      style={selectedDate === d ? { background: '#CE1126', color: 'white', borderColor: '#CE1126' } : { borderColor: '#D1D5DB', color: '#6B7280' }}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contagem */}
        <div className="text-sm text-gray-500 mb-4">
          <span className="font-bold text-gray-800">{filtered.length}</span> resultado{filtered.length !== 1 ? 's' : ''}
          {search && <> para <span className="font-bold">"{search}"</span></>}
          {selectedCat !== 'Todos' && <> em <span className="font-bold">{selectedCat}</span></>}
        </div>

        {/* Resultados */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">Nenhum resultado encontrado</p>
            <p className="text-sm mt-1">Tente palavras-chave diferentes ou alargue os filtros</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((art) => (
              <button
                key={art.id}
                onClick={() => navigate(`/publico/noticia/${art.id}`)}
                className="w-full bg-white rounded-xl px-5 py-4 text-left shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: typeColors[art.type] ?? '#009A44', fontSize: 10 }}>
                        {art.type}
                      </span>
                      <span className="text-xs text-gray-400">{art.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 group-hover:text-green-700 transition-colors leading-snug mb-1">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">{art.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={11} /> {art.date}</span>
                      <span>·</span>
                      <span>{art.source}</span>
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {art.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <Download size={16} className="text-gray-300 flex-shrink-0 mt-1 group-hover:text-green-600 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

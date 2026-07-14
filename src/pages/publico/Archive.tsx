import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Clock, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import PublicHeader from '../../components/PublicHeader'
import { articles } from '../../data/mockData'

const years = [2026, 2025, 2024, 2023, 2022]
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const typeColors: Record<string, string> = {
  'Notícia': '#009A44',
  'Comunicado oficial': '#1A1A1A',
  'Discurso': '#CE1126',
  'Relatório': '#0066CC',
  'Legislação': '#7B0000',
}

// Gerar dados de arquivo simulados para anos anteriores
const archiveData: Record<number, Record<number, typeof articles>> = {
  2026: {
    7: articles,
    6: articles.slice(0, 4),
    5: articles.slice(1, 5),
  },
  2025: {
    12: articles.slice(0, 3),
    11: articles.slice(2, 5),
    10: articles.slice(0, 2),
  },
}

export default function Archive() {
  const navigate = useNavigate()
  const [selectedYear, setSelectedYear] = useState(2026)
  const [selectedMonth, setSelectedMonth] = useState(7)
  const [expandedYear, setExpandedYear] = useState<number | null>(2026)

  const currentArticles = archiveData[selectedYear]?.[selectedMonth] ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={20} style={{ color: '#009A44' }} />
          <h1 className="text-xl font-bold text-gray-900">Arquivo Histórico</h1>
          <span className="text-sm text-gray-400 ml-2">Hemeroteca digital navegável</span>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          {/* Navegação por ano/mês */}
          <aside className="md:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest" style={{ background: '#009A44', color: 'white' }}>
                Navegar por período
              </div>
              <div className="divide-y divide-gray-100">
                {years.map((year) => (
                  <div key={year}>
                    <button
                      onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {year}
                      {expandedYear === year ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {expandedYear === year && (
                      <div className="grid grid-cols-3 gap-1 px-4 pb-3">
                        {months.map((m, idx) => {
                          const monthNum = idx + 1
                          const hasContent = !!(archiveData[year]?.[monthNum]?.length)
                          const isSelected = selectedYear === year && selectedMonth === monthNum
                          return (
                            <button
                              key={m}
                              onClick={() => { setSelectedYear(year); setSelectedMonth(monthNum) }}
                              disabled={!hasContent}
                              className="text-xs py-1.5 rounded-lg font-medium transition-colors"
                              style={isSelected
                                ? { background: '#009A44', color: 'white' }
                                : hasContent
                                  ? { background: '#E8F5EE', color: '#009A44' }
                                  : { color: '#D1D5DB', cursor: 'default' }}
                            >
                              {m}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
              <div className="text-xs font-bold text-gray-500 mb-3">Estatísticas do Arquivo</div>
              {[
                { label: 'Documentos totais', value: '4.821' },
                { label: 'Anos de cobertura', value: '12' },
                { label: 'Fontes indexadas', value: '38' },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500">{stat.label}</span>
                  <span className="text-sm font-bold text-gray-800">{stat.value}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Conteúdo do mês */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">{months[selectedMonth - 1]} {selectedYear}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{currentArticles.length} documentos</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (selectedMonth > 1) setSelectedMonth(selectedMonth - 1)
                      else { setSelectedYear(selectedYear - 1); setSelectedMonth(12) }
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft size={18} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => {
                      if (selectedMonth < 12) setSelectedMonth(selectedMonth + 1)
                      else { setSelectedYear(selectedYear + 1); setSelectedMonth(1) }
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {currentArticles.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Sem documentos para este período</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {currentArticles.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => navigate(`/publico/noticia/${art.id}`)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ background: typeColors[art.type] ?? '#009A44', fontSize: 10 }}>
                            {art.type}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors leading-snug">
                            {art.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <Clock size={11} /> {art.date} · {art.source}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

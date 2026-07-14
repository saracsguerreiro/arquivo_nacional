import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, MessageSquare, ChevronRight, TrendingUp } from 'lucide-react'
import GovHeader from '../../components/GovHeader'
import { govGroups, govPosts } from '../../data/mockData'

const groupColors: Record<string, string> = {
  'Economia e Finanças': '#009A44',
  'Saúde Pública': '#CE1126',
  'Educação': '#0066CC',
  'Infraestruturas': '#7B5E00',
  'Diplomacia e Relações Exteriores': '#4B0082',
  'Segurança e Defesa': '#1A1A1A',
  'Agricultura': '#6B7700',
  'Ambiente e Clima': '#005577',
}

export default function Groups() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<typeof govGroups[0] | null>(null)

  return (
    <div className="min-h-screen bg-gray-100">
      <GovHeader user={{ name: 'Min. Obras Públicas', role: 'Ministério de Obras Públicas' }} level="governo" />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-lg font-bold text-gray-900 mb-1">Grupos Temáticos</h1>
        <p className="text-sm text-gray-500 mb-5">Canais organizados por pasta ministerial ou assunto.</p>

        <div className="flex gap-5 flex-col md:flex-row">
          {/* Lista de grupos */}
          <div className="md:w-72 flex-shrink-0 space-y-2">
            {govGroups.map((group) => {
              const color = groupColors[group.name] ?? '#6B7280'
              const isSelected = selected?.id === group.id
              return (
                <button
                  key={group.id}
                  onClick={() => setSelected(group)}
                  className="w-full rounded-xl p-4 text-left transition-all shadow-sm"
                  style={{
                    background: isSelected ? color : 'white',
                    color: isSelected ? 'white' : '#1A1A1A',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: isSelected ? 'rgba(255,255,255,0.2)' : color + '18' }}>
                        <span style={{ color: isSelected ? 'white' : color, fontSize: 14, fontWeight: 900 }}>
                          {group.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold leading-tight">{group.name}</div>
                        <div className="text-xs opacity-60 mt-0.5">{group.members} membros · {group.posts} publicações</div>
                      </div>
                    </div>
                    {group.active && (
                      <div className="w-2 h-2 rounded-full" style={{ background: isSelected ? 'rgba(255,255,255,0.8)' : '#009A44' }} />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Conteúdo do grupo */}
          <div className="flex-1">
            {!selected ? (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400">
                <Users size={40} className="mx-auto mb-3 opacity-20" />
                <p className="font-semibold">Selecione um grupo</p>
                <p className="text-sm mt-1">Escolha um grupo da lista para ver as publicações</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 text-white" style={{ background: groupColors[selected.name] ?? '#1A1A1A' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-bold text-base">{selected.name}</h2>
                      <div className="text-xs opacity-70 mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1"><Users size={12} /> {selected.members} membros</span>
                        <span className="flex items-center gap-1"><MessageSquare size={12} /> {selected.posts} publicações</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/governo/nova-publicacao')}
                      className="text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                    >
                      + Publicar
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {govPosts.slice(0, 2).map((post) => (
                    <div key={post.id} className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: groupColors[selected.name] ?? '#1A1A1A' }}>
                          {post.author[0]}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-gray-900">{post.author}</span>
                          <span className="text-xs text-gray-400 ml-2">{post.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><TrendingUp size={11} /> {post.likes} gostos</span>
                        <span className="flex items-center gap-1"><MessageSquare size={11} /> {post.comments} comentários</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 text-center border-t border-gray-100">
                  <button
                    onClick={() => navigate('/governo')}
                    className="text-sm font-semibold flex items-center gap-1 mx-auto hover:underline"
                    style={{ color: groupColors[selected.name] ?? '#009A44' }}
                  >
                    Ver todas as publicações do grupo <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Paperclip, AlertTriangle, AlertCircle, Info, Send } from 'lucide-react'
import GovHeader from '../../components/GovHeader'

const ministries = [
  'Economia e Finanças', 'Saúde Pública', 'Educação', 'Infraestruturas',
  'Diplomacia e Relações Exteriores', 'Segurança e Defesa', 'Agricultura', 'Ambiente e Clima',
]

export default function NewPost() {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState<'normal' | 'prioritária' | 'urgente'>('normal')
  const [ministry, setMinistry] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitted(true)
    setTimeout(() => navigate('/governo'), 2000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#E8F5EE' }}>
            <Send size={28} style={{ color: '#009A44' }} />
          </div>
          <h2 className="font-bold text-gray-900 text-lg mb-2">Publicação enviada</h2>
          <p className="text-sm text-gray-500">A sua publicação foi partilhada no feed do Executivo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <GovHeader user={{ name: 'Min. Obras Públicas', role: 'Ministério de Obras Públicas' }} level="governo" />

      <main className="max-w-2xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5">
          <ArrowLeft size={16} /> Voltar ao feed
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#1A1A1A' }}>
            <h1 className="text-white font-bold text-base">Nova Publicação</h1>
            <p className="text-white/50 text-xs mt-0.5">Partilhar com o Executivo</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Prioridade */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">Prioridade</label>
              <div className="flex gap-2">
                {([
                  { value: 'normal', label: 'Normal', color: '#6B7280', icon: <Info size={13} /> },
                  { value: 'prioritária', label: 'Prioritária', color: '#F59E0B', icon: <AlertCircle size={13} /> },
                  { value: 'urgente', label: 'Urgente', color: '#CE1126', icon: <AlertTriangle size={13} /> },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPriority(opt.value)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border-2 transition-all"
                    style={priority === opt.value
                      ? { background: opt.color, color: 'white', borderColor: opt.color }
                      : { background: 'white', color: opt.color, borderColor: opt.color + '40' }}
                  >
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grupo */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">Grupo temático (opcional)</label>
              <select
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white text-gray-700"
              >
                <option value="">Feed geral</option>
                {ministries.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Conteúdo */}
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-widest">Publicação</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva a sua publicação para o Executivo..."
                rows={6}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none text-gray-700"
              />
              <div className="text-right text-xs text-gray-400 mt-1">{content.length} caracteres</div>
            </div>

            {/* Aviso de prioridade urgente */}
            {priority === 'urgente' && (
              <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#FEF2F2' }}>
                <AlertTriangle size={16} style={{ color: '#CE1126', flexShrink: 0, marginTop: 2 }} />
                <p className="text-xs text-red-700">
                  As publicações marcadas como <strong>URGENTE</strong> enviam notificação imediata a todos os membros do Executivo e ficam em destaque no topo do feed.
                </p>
              </div>
            )}

            {/* Ações */}
            <div className="flex items-center justify-between pt-2">
              <button type="button" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip size={16} /> Anexar documento
              </button>
              <div className="flex gap-2">
                <button type="button" onClick={() => navigate('/governo')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={!content.trim()}
                  className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-opacity disabled:opacity-40 flex items-center gap-2"
                  style={{ background: '#009A44' }}>
                  <Send size={14} /> Publicar
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

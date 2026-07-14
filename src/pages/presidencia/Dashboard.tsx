import { useNavigate } from 'react-router-dom'
import { AlertTriangle, AlertCircle, Info, MessageSquare, Bell, BarChart2, Users, FileText } from 'lucide-react'
import GovHeader from '../../components/GovHeader'
import { executiveSummary } from '../../data/mockData'

const priorityConfig = {
  urgente: { label: 'URGENTE', bg: '#CE1126', icon: <AlertTriangle size={14} /> },
  alta: { label: 'ALTA', bg: '#F59E0B', icon: <AlertCircle size={14} /> },
  normal: { label: 'NORMAL', bg: '#6B7280', icon: <Info size={14} /> },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { date, highlights, stats } = executiveSummary

  return (
    <div className="min-h-screen" style={{ background: '#F9F4F4' }}>
      <GovHeader user={{ name: 'Sua Excelência', role: 'Presidência da República' }} level="presidencia" />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Cabeçalho do resumo */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#CE1126' }}>
            Resumo Executivo Diário
          </div>
          <h1 className="text-xl font-bold text-gray-900">{date}</h1>
          <p className="text-sm text-gray-500 mt-1">Síntese curada do que foi publicado no Espaço do Governo</p>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Publicações hoje', value: stats.totalPosts, icon: <FileText size={18} />, color: '#7B0000' },
            { label: 'Comentários', value: stats.totalComments, icon: <MessageSquare size={18} />, color: '#7B0000' },
            { label: 'Ministérios ativos', value: stats.activeMinistries, icon: <Users size={18} />, color: '#7B0000' },
            { label: 'Temas urgentes', value: stats.urgentTopics, icon: <AlertTriangle size={18} />, color: '#CE1126' },
          ].map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: metric.color }}>{metric.icon}</span>
                <span className="text-xs text-gray-500">{metric.label}</span>
              </div>
              <div className="text-2xl font-black" style={{ color: metric.color }}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Destaques */}
        <div className="space-y-3 mb-6">
          <h2 className="text-sm font-bold text-gray-700">Principais temas em discussão</h2>
          {highlights.map((h, i) => {
            const pConfig = priorityConfig[h.priority as keyof typeof priorityConfig]
            return (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white"
                  style={{ background: pConfig.bg }}>
                  {pConfig.icon} {pConfig.label} · {h.ministry}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{h.topic}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{h.summary}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><FileText size={11} /> {h.posts} publicações relacionadas</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Ações rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/presidencia/chat')}
            className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#FEE2E2' }}>
              <MessageSquare size={20} style={{ color: '#CE1126' }} />
            </div>
            <div className="font-bold text-gray-900 text-sm mb-1">Chat Privado</div>
            <div className="text-xs text-gray-500">4 conversas · 4 não lidas</div>
            <div className="text-xs font-semibold mt-2 group-hover:underline" style={{ color: '#CE1126' }}>Abrir →</div>
          </button>

          <button
            onClick={() => navigate('/presidencia/alertas')}
            className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#FEF9E7' }}>
              <Bell size={20} style={{ color: '#F59E0B' }} />
            </div>
            <div className="font-bold text-gray-900 text-sm mb-1">Alertas e Prioridades</div>
            <div className="text-xs text-gray-500">{stats.urgentTopics} temas urgentes</div>
            <div className="text-xs font-semibold mt-2 group-hover:underline" style={{ color: '#F59E0B' }}>Ver alertas →</div>
          </button>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#E8F5EE' }}>
              <BarChart2 size={20} style={{ color: '#009A44' }} />
            </div>
            <div className="font-bold text-gray-900 text-sm mb-1">Indicadores Económicos</div>
            <div className="text-xs text-gray-500">Inflação: 6,2% · PIB: +5,2%</div>
            <div className="text-xs text-gray-400 mt-2">Atualizado: Jun 2026</div>
          </div>
        </div>
      </main>
    </div>
  )
}

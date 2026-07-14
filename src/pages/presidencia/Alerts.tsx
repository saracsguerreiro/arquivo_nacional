import { useNavigate } from 'react-router-dom'
import { AlertTriangle, AlertCircle, Info, Clock, ArrowLeft } from 'lucide-react'
import GovHeader from '../../components/GovHeader'

const priorityConfig = {
  urgente: {
    label: 'URGENTE', bg: '#CE1126', lightBg: '#FEF2F2', textColor: '#CE1126',
    border: '#FECACA', icon: <AlertTriangle size={18} />,
  },
  alta: {
    label: 'ALTA', bg: '#F59E0B', lightBg: '#FFFBEB', textColor: '#D97706',
    border: '#FDE68A', icon: <AlertCircle size={18} />,
  },
  normal: {
    label: 'NORMAL', bg: '#6B7280', lightBg: '#F9FAFB', textColor: '#6B7280',
    border: '#E5E7EB', icon: <Info size={18} />,
  },
}

const additionalAlerts = [
  {
    priority: 'urgente',
    topic: 'Surto de cólera em Sofala',
    ministry: 'Saúde',
    summary: '12 novos casos confirmados na Beira. Equipas de resposta rápida mobilizadas. Coordenação com Defesa Civil e OMS em curso.',
    time: 'Há 2 horas',
    posts: 3,
  },
  {
    priority: 'alta',
    topic: 'Negociações tributação mineira em impasse',
    ministry: 'Economia e Finanças',
    summary: 'Proposta de revisão do regime tributário das empresas mineiras enfrenta resistência de dois ministros. Discussão no feed há 3 dias sem consenso.',
    time: 'Há 4 horas',
    posts: 8,
  },
  {
    priority: 'alta',
    topic: 'EN1 Maputo–Xai-Xai: risco de atraso',
    ministry: 'Obras Públicas',
    summary: 'Obras a 67% de conclusão mas empreiteiro reporta escassez de materiais. Possível atraso de 6 semanas face ao prazo de outubro 2026.',
    time: 'Há 8 horas',
    posts: 2,
  },
  {
    priority: 'normal',
    topic: '4.200 professores formados — meta anual atingida',
    ministry: 'Educação',
    summary: 'Programa de formação de docentes do ensino primário concluiu o ciclo anual com sucesso. Relatório final em preparação para o Conselho de Ministros.',
    time: 'Há 1 dia',
    posts: 3,
  },
  {
    priority: 'normal',
    topic: 'Acordo de cooperação com Portugal assinado',
    ministry: 'Diplomacia',
    summary: 'Protocolo de cooperação em transformação digital assinado em Lisboa. Prevê intercâmbio de especialistas e formação de quadros nacionais.',
    time: 'Há 2 dias',
    posts: 1,
  },
]

export default function Alerts() {
  const navigate = useNavigate()

  const urgentes = additionalAlerts.filter((a) => a.priority === 'urgente')
  const altas = additionalAlerts.filter((a) => a.priority === 'alta')
  const normais = additionalAlerts.filter((a) => a.priority === 'normal')

  function AlertCard({ alert }: { alert: typeof additionalAlerts[0] }) {
    const pConfig = priorityConfig[alert.priority as keyof typeof priorityConfig]
    return (
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: `1px solid ${pConfig.border}`, background: pConfig.lightBg }}>
        <div className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white" style={{ background: pConfig.bg }}>
          {pConfig.icon} {pConfig.label} · {alert.ministry}
          <span className="ml-auto opacity-80">{alert.time}</span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-1.5">{alert.topic}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{alert.summary}</p>
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
            <Clock size={11} /> {alert.posts} publicações no Espaço do Governo
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#F9F4F4' }}>
      <GovHeader user={{ name: 'Sua Excelência', role: 'Presidência da República' }} level="presidencia" />

      <main className="max-w-3xl mx-auto px-4 py-6">
        <button onClick={() => navigate('/presidencia')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5">
          <ArrowLeft size={16} /> Voltar ao resumo
        </button>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Alertas e Prioridades</h1>
        <p className="text-sm text-gray-500 mb-6">Destaques marcados pelo Executivo — ordenados por urgência</p>

        {urgentes.length > 0 && (
          <section className="mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3 flex items-center gap-2">
              <AlertTriangle size={13} /> Urgente ({urgentes.length})
            </div>
            <div className="space-y-3">{urgentes.map((a, i) => <AlertCard key={i} alert={a} />)}</div>
          </section>
        )}

        {altas.length > 0 && (
          <section className="mb-6">
            <div className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#D97706' }}>
              <AlertCircle size={13} /> Prioridade alta ({altas.length})
            </div>
            <div className="space-y-3">{altas.map((a, i) => <AlertCard key={i} alert={a} />)}</div>
          </section>
        )}

        {normais.length > 0 && (
          <section>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              <Info size={13} /> Informação ({normais.length})
            </div>
            <div className="space-y-3">{normais.map((a, i) => <AlertCard key={i} alert={a} />)}</div>
          </section>
        )}
      </main>
    </div>
  )
}

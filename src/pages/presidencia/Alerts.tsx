import { useNavigate } from 'react-router-dom'
import { AlertTriangle, AlertCircle, Info, Clock, ArrowLeft } from 'lucide-react'
import Header from '../../components/Header'

const W = '1240px'

const ALERTS = [
  { priority: 'urgente', topic: 'Surto de cólera em Sofala', ministry: 'Saúde', summary: '12 novos casos confirmados na Beira. Equipas de resposta rápida mobilizadas. Coordenação com Defesa Civil e OMS em curso.', time: 'Há 2 horas', posts: 3 },
  { priority: 'alta', topic: 'Negociações tributação mineira em impasse', ministry: 'Economia e Finanças', summary: 'Proposta de revisão do regime tributário enfrenta resistência de dois ministros. Discussão no feed há 3 dias sem consenso.', time: 'Há 4 horas', posts: 8 },
  { priority: 'alta', topic: 'EN1 Maputo–Xai-Xai: risco de atraso', ministry: 'Obras Públicas', summary: 'Obras a 67% de conclusão. Empreiteiro reporta escassez de materiais. Possível atraso de 6 semanas.', time: 'Há 8 horas', posts: 2 },
  { priority: 'normal', topic: '4.200 professores formados — meta atingida', ministry: 'Educação', summary: 'Programa de formação de docentes concluiu o ciclo anual com sucesso. Relatório em preparação.', time: 'Há 1 dia', posts: 3 },
  { priority: 'normal', topic: 'Acordo de cooperação com Portugal', ministry: 'Diplomacia', summary: 'Protocolo de cooperação em transformação digital assinado em Lisboa. Prevê formação de quadros nacionais.', time: 'Há 2 dias', posts: 1 },
]

const P = {
  urgente: { color: '#CE1126', bg: '#CE112610', border: '#CE112630', label: 'URGENTE', icon: <AlertTriangle size={14} /> },
  alta:    { color: '#D97706', bg: '#D9770610', border: '#D9770630', label: 'ALTA',    icon: <AlertCircle size={14} /> },
  normal:  { color: '#888888', bg: '#88888810', border: '#88888830', label: 'NORMAL',  icon: <Info size={14} /> },
}

export default function Alerts() {
  const navigate = useNavigate()

  const groups = [
    { key: 'urgente', title: 'Urgente',         items: ALERTS.filter(a => a.priority === 'urgente') },
    { key: 'alta',    title: 'Prioridade alta',  items: ALERTS.filter(a => a.priority === 'alta') },
    { key: 'normal',  title: 'Informação',       items: ALERTS.filter(a => a.priority === 'normal') },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 20px' }}>
        <button onClick={() => navigate('/presidencia')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#999999', marginBottom: 24 }}>
          <ArrowLeft size={15} /> Voltar ao resumo
        </button>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111111', marginBottom: 4 }}>Alertas e Prioridades</h1>
        <p style={{ fontSize: 13, color: '#999999', marginBottom: 28 }}>Destaques do Executivo ordenados por urgência</p>

        {groups.map(group => (
          group.items.length > 0 && (
            <section key={group.key} style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ color: P[group.key as keyof typeof P].color }}>
                  {P[group.key as keyof typeof P].icon}
                </span>
                <h2 style={{ fontSize: 12, fontWeight: 700, color: P[group.key as keyof typeof P].color, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {group.title} ({group.items.length})
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.items.map((alert, i) => {
                  const cfg = P[alert.priority as keyof typeof P]
                  return (
                    <div key={i} style={{ background: '#FFFFFF', border: `1px solid ${cfg.border}`, borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: cfg.bg }}>
                        <span style={{ color: cfg.color }}>{cfg.icon}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cfg.label}</span>
                        <span style={{ fontSize: 11, color: '#AAAAAA' }}>· {alert.ministry}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto', fontSize: 11, color: '#CCCCCC' }}>
                          <Clock size={10} /> {alert.time}
                        </div>
                      </div>
                      <div style={{ padding: '14px 16px' }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#111111', marginBottom: 6 }}>{alert.topic}</p>
                        <p style={{ fontSize: 13, color: '#777777', lineHeight: 1.65 }}>{alert.summary}</p>
                        <p style={{ fontSize: 11, color: '#CCCCCC', marginTop: 10 }}>{alert.posts} publicações no Espaço do Governo</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import Header from '../../components/Header'
import { articles } from '../../data/mockData'

const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
const YEARS = [2026, 2025, 2024, 2023]

const ARCHIVE: Record<number, Record<number, typeof articles>> = {
  2026: { 7: articles, 6: articles.slice(0,4), 5: articles.slice(1,5) },
  2025: { 12: articles.slice(0,3), 11: articles.slice(2,5), 10: articles.slice(0,2) },
  2024: { 6: articles.slice(0,2), 3: articles.slice(3,5) },
}

const TYPE_COLOR: Record<string, string> = {
  'Notícia': '#009A44', 'Comunicado oficial': '#555555',
  'Discurso': '#CE1126', 'Relatório': '#0055CC', 'Legislação': '#7B0080',
}

export default function Archive() {
  const navigate = useNavigate()
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(7)
  const [expanded, setExpanded] = useState<number | null>(2026)

  const list = ARCHIVE[year]?.[month] ?? []

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '28px 20px' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#999999', marginBottom: 24 }}>
          <ArrowLeft size={15} /> Voltar
        </button>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111111', marginBottom: 4 }}>Arquivo Histórico</h1>
        <p style={{ fontSize: 14, color: '#999999', marginBottom: 28 }}>Hemeroteca digital navegável por período</p>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Year/month navigator */}
          <aside style={{ width: 200, flexShrink: 0 }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, overflow: 'hidden' }}>
              {YEARS.map(y => (
                <div key={y} style={{ borderBottom: '1px solid #F0F0F0' }}>
                  <button
                    onClick={() => setExpanded(expanded === y ? null : y)}
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', fontSize: 14, fontWeight: 700, color: '#333333' }}
                  >
                    {y}
                    {expanded === y ? <ChevronUp size={14} style={{ color: '#CCCCCC' }} /> : <ChevronDown size={14} style={{ color: '#CCCCCC' }} />}
                  </button>

                  {expanded === y && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, padding: '4px 12px 12px' }}>
                      {MONTHS.map((m, i) => {
                        const mn = i + 1
                        const has = !!(ARCHIVE[y]?.[mn]?.length)
                        const sel = year === y && month === mn
                        return (
                          <button
                            key={m}
                            onClick={() => has && (setYear(y), setMonth(mn))}
                            style={{
                              padding: '5px 0',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: sel ? 700 : 400,
                              background: sel ? '#111111' : has ? '#F5F5F5' : 'transparent',
                              color: sel ? '#FFFFFF' : has ? '#333333' : '#DDDDDD',
                              cursor: has ? 'pointer' : 'default',
                            }}
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

            {/* Stats */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: 16, marginTop: 12 }}>
              {[['Documentos totais','4.821'],['Anos de cobertura','12'],['Fontes indexadas','38']].map(([l,v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F5F5F5' }}>
                  <span style={{ fontSize: 12, color: '#AAAAAA' }}>{l}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#333333' }}>{v}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, overflow: 'hidden' }}>
              {/* Month header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>{MONTHS[month-1]} {year}</span>
                  <span style={{ fontSize: 13, color: '#AAAAAA', marginLeft: 10 }}>{list.length} documentos</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => { if(month>1) setMonth(m=>m-1); else{setYear(y=>y-1);setMonth(12)} }}
                    style={{ padding: '6px 10px', borderRadius: 7, border: '1px solid #E5E5E5', background: '#FFFFFF', color: '#777777' }}>
                    <ArrowLeft size={14} />
                  </button>
                  <button onClick={() => { if(month<12) setMonth(m=>m+1); else{setYear(y=>y+1);setMonth(1)} }}
                    style={{ padding: '6px 10px', borderRadius: 7, border: '1px solid #E5E5E5', background: '#FFFFFF', color: '#777777' }}>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {list.length === 0 ? (
                <div style={{ padding: '48px 20px', textAlign: 'center', color: '#CCCCCC' }}>
                  <p style={{ fontSize: 14, color: '#BBBBBB' }}>Sem documentos para este período</p>
                </div>
              ) : (
                <div>
                  {list.map((a, i) => (
                    <button key={a.id} onClick={() => navigate(`/noticia/${a.id}`)}
                      style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 20px', textAlign: 'left', borderBottom: i < list.length-1 ? '1px solid #F5F5F5' : 'none', transition: 'background 0.1s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: TYPE_COLOR[a.type] ?? '#666666', textTransform: 'uppercase', letterSpacing: '0.05em', flexShrink: 0, marginTop: 2 }}>
                        {a.type}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#222222', lineHeight: 1.4, marginBottom: 4 }}>{a.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#AAAAAA' }}>
                          <Clock size={11} /> {a.date} · {a.source}
                        </div>
                      </div>
                      <ArrowRight size={14} style={{ color: '#DDDDDD', flexShrink: 0, marginTop: 2 }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

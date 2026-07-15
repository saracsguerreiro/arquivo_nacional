import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, ArrowRight, Clock, X, ArrowLeft } from 'lucide-react'
import Header from '../../components/Header'
import { articles } from '../../data/mockData'

const TYPES = ['Todos', 'Notícia', 'Comunicado oficial', 'Discurso', 'Relatório', 'Legislação']
const CATS = ['Todos', 'Política nacional', 'Política internacional', 'Economia', 'Discursos presidenciais', 'Legislação', 'Indicadores económicos']

const TYPE_COLOR: Record<string, string> = {
  'Notícia': '#009A44', 'Comunicado oficial': '#555555',
  'Discurso': '#CE1126', 'Relatório': '#0055CC', 'Legislação': '#7B0080',
}

export default function SearchPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [type, setType] = useState('Todos')
  const [cat, setCat] = useState(params.get('cat') ?? 'Todos')

  const results = articles.filter(a => {
    const matchQ = !q || a.title.toLowerCase().includes(q.toLowerCase()) || a.excerpt.toLowerCase().includes(q.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
    const matchType = type === 'Todos' || a.type === type
    const matchCat = cat === 'Todos' || a.category === cat
    return matchQ && matchType && matchCat
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 20px' }}>

        {/* Back + search bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button onClick={() => navigate(-1)} style={{ color: '#999999', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, flexShrink: 0 }}>
            <ArrowLeft size={16} /> Voltar
          </button>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#BBBBBB', pointerEvents: 'none' }} />
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Pesquisar..."
              style={{
                width: '100%',
                padding: '11px 40px 11px 42px',
                fontSize: 14,
                border: '1.5px solid #E5E5E5',
                borderRadius: 10,
                background: '#FFFFFF',
                color: '#333333',
                outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = '#999999')}
              onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
            />
            {q && (
              <button onClick={() => setQ('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#BBBBBB' }}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>

          {/* Filters sidebar */}
          <aside style={{ width: 200, flexShrink: 0 }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Tipo</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {TYPES.map(t => (
                  <button key={t} onClick={() => setType(t)}
                    style={{ textAlign: 'left', fontSize: 13, padding: '6px 10px', borderRadius: 6, fontWeight: type === t ? 600 : 400, color: type === t ? '#111111' : '#777777', background: type === t ? '#F5F5F5' : 'transparent', transition: 'all 0.1s' }}>
                    {t}
                  </button>
                ))}
              </div>

              <div style={{ height: 1, background: '#F0F0F0', margin: '16px 0' }} />

              <p style={{ fontSize: 11, fontWeight: 700, color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Categoria</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {CATS.map(c => (
                  <button key={c} onClick={() => setCat(c)}
                    style={{ textAlign: 'left', fontSize: 13, padding: '6px 10px', borderRadius: 6, fontWeight: cat === c ? 600 : 400, color: cat === c ? '#111111' : '#777777', background: cat === c ? '#F5F5F5' : 'transparent', transition: 'all 0.1s' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, color: '#999999', marginBottom: 16 }}>
              <strong style={{ color: '#111111' }}>{results.length}</strong> resultado{results.length !== 1 ? 's' : ''}
              {q && <> para <strong style={{ color: '#333333' }}>"{q}"</strong></>}
            </p>

            {results.length === 0 ? (
              <div className="card" style={{ padding: '48px 24px', textAlign: 'center', color: '#BBBBBB' }}>
                <Search size={32} style={{ margin: '0 auto 10px' }} />
                <p style={{ fontSize: 14, color: '#999999' }}>Nenhum resultado encontrado</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {results.map(article => (
                  <button key={article.id} onClick={() => navigate(`/noticia/${article.id}`)} className="card"
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '18px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: TYPE_COLOR[article.type] ?? '#666666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {article.type}
                          </span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#DDDDDD', flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: '#AAAAAA' }}>{article.category}</span>
                        </div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111111', lineHeight: 1.4, marginBottom: 5 }}>{article.title}</h3>
                        <p style={{ fontSize: 13, color: '#888888', lineHeight: 1.6, marginBottom: 10 }}>{article.excerpt}</p>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {article.tags.map(tag => (
                            <span key={tag} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 100, background: '#F5F5F5', color: '#999999', border: '1px solid #EEEEEE' }}>{tag}</span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#AAAAAA', marginTop: 10 }}>
                          <Clock size={11} /> {article.date} · {article.source}
                        </div>
                      </div>
                      <ArrowRight size={16} style={{ color: '#DDDDDD', flexShrink: 0, marginTop: 2 }} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

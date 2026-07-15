import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Clock, Globe, Globe2, TrendingUp, Mic, Scale, BarChart2, BookOpen, ChevronRight } from 'lucide-react'
import Header from '../../components/Header'
import { articles } from '../../data/mockData'

const W = '1240px'

const CATS = [
  { label: 'Política Nacional',        icon: <Globe size={22} />,     bg: '#009A44', fg: '#FFFFFF', cat: 'Política nacional' },
  { label: 'Política Internacional',   icon: <Globe2 size={22} />,    bg: '#007A35', fg: '#FFFFFF', cat: 'Política internacional' },
  { label: 'Economia',                 icon: <TrendingUp size={22} />, bg: '#FCD116', fg: '#1A1A1A', cat: 'Economia' },
  { label: 'Discursos',                icon: <Mic size={22} />,        bg: '#CE1126', fg: '#FFFFFF', cat: 'Discursos presidenciais' },
  { label: 'Legislação',               icon: <Scale size={22} />,      bg: '#111111', fg: '#FFFFFF', cat: 'Legislação' },
  { label: 'Indicadores',              icon: <BarChart2 size={22} />,  bg: '#F59E0B', fg: '#1A1A1A', cat: 'Indicadores económicos' },
  { label: 'Arquivo Histórico',        icon: <BookOpen size={22} />,   bg: '#009A44', fg: '#FFFFFF', route: '/arquivo' },
]

const TYPE_COLOR: Record<string, string> = {
  'Notícia': '#009A44', 'Comunicado oficial': '#555555',
  'Discurso': '#CE1126', 'Relatório': '#0055CC', 'Legislação': '#7B0080',
}

// Right column: highlighted topics (legislation + indicators)
const TOPICS = articles.filter(a => ['Legislação', 'Comunicado oficial', 'Relatório', 'Discurso'].includes(a.type))

export default function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [activeCat, setActiveCat] = useState<string | null>(null)

  const news = articles.filter(a =>
    (!activeCat || a.category === activeCat) &&
    (!q || a.title.toLowerCase().includes(q.toLowerCase()))
  )

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && q.trim()) navigate(`/pesquisa?q=${encodeURIComponent(q)}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F4F4F4' }}>
      <Header />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #EEEEEE', padding: '44px 16px 36px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: 8 }}>
            Arquivo Nacional
          </h1>
          <p style={{ fontSize: 14, color: '#999999', marginBottom: 24 }}>
            Base de consulta pública sobre Moçambique e o mundo
          </p>

          {/* Pill search */}
          <div style={{ position: 'relative' }}>
            <Search size={17} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#BBBBBB', pointerEvents: 'none' }} />
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Pesquisar artigos, discursos, legislação, dados..."
              style={{
                width: '100%',
                padding: '14px 20px 14px 50px',
                fontSize: 14,
                border: '1.5px solid #E5E5E5',
                borderRadius: 9999,
                background: '#FAFAFA',
                color: '#333333',
                outline: 'none',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
              onFocus={e => { e.target.style.borderColor = '#CCCCCC'; e.target.style.boxShadow = '0 0 0 3px rgba(0,0,0,0.04)' }}
              onBlur={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.boxShadow = 'none' }}
            />
            {q && (
              <button
                onClick={() => navigate(`/pesquisa?q=${encodeURIComponent(q)}`)}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: 9999, padding: '6px 16px', fontSize: 12, fontWeight: 600 }}>
                Pesquisar
              </button>
            )}
          </div>
        </div>

        {/* ── CATEGORY CAROUSEL ────────────────────────── */}
        <div style={{ maxWidth: W, margin: '28px auto 0', padding: '0 16px' }}>
          <div className="carousel">
            {CATS.map(c => (
              <button
                key={c.label}
                className="carousel-card"
                onClick={() => {
                  if (c.route) { navigate(c.route); return }
                  setActiveCat(activeCat === c.cat ? null : (c.cat ?? null))
                }}
                style={{
                  width: 130,
                  height: 90,
                  borderRadius: 14,
                  background: c.bg,
                  color: c.fg,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '14px 14px 12px',
                  border: activeCat === c.cat ? `2px solid ${c.fg}` : '2px solid transparent',
                  opacity: activeCat && activeCat !== c.cat ? 0.7 : 1,
                  transition: 'opacity 0.15s, transform 0.15s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <span style={{ opacity: 0.85 }}>{c.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 16px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>

        {/* LEFT — News list */}
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h2 style={{ fontSize: 13, fontWeight: 700, color: '#999999', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {activeCat ?? 'Últimas notícias'}
            </h2>
            {activeCat && (
              <button onClick={() => setActiveCat(null)} style={{ fontSize: 12, color: '#CE1126', fontWeight: 600 }}>
                Limpar filtro ×
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {news.map(article => (
              <button
                key={article.id}
                onClick={() => navigate(`/noticia/${article.id}`)}
                className="card"
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '18px 20px' }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {/* Colored left bar */}
                  <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 3, background: TYPE_COLOR[article.type] ?? '#DDDDDD', flexShrink: 0 }} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: TYPE_COLOR[article.type] ?? '#888888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {article.type}
                      </span>
                      <span style={{ fontSize: 11, color: '#CCCCCC' }}>·</span>
                      <span style={{ fontSize: 11, color: '#BBBBBB' }}>{article.category}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111111', lineHeight: 1.4, marginBottom: 5 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#888888', lineHeight: 1.6, marginBottom: 10,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#BBBBBB' }}>
                      <Clock size={10} /> {article.date}
                      <span>·</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{article.source}</span>
                    </div>
                  </div>

                  <ArrowRight size={15} style={{ color: '#DDDDDD', flexShrink: 0, marginTop: 4 }} />
                </div>
              </button>
            ))}

            {news.length === 0 && (
              <div className="card" style={{ padding: '36px 20px', textAlign: 'center', color: '#CCCCCC' }}>
                <p style={{ fontSize: 14, color: '#AAAAAA' }}>Sem resultados para esta categoria</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Topics */}
        <aside style={{ width: 300, flexShrink: 0 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: '#999999', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 14 }}>
            Tópicos em destaque
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {TOPICS.map(article => (
              <button
                key={article.id}
                onClick={() => navigate(`/noticia/${article.id}`)}
                className="card"
                style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '13px 14px', textAlign: 'left' }}
              >
                <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 3, background: TYPE_COLOR[article.type] ?? '#DDDDDD', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: TYPE_COLOR[article.type] ?? '#888888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {article.type}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#222222', lineHeight: 1.35, marginBottom: 5,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {article.title}
                  </p>
                  <p style={{ fontSize: 11, color: '#BBBBBB' }}>{article.date}</p>
                </div>
                <ChevronRight size={13} style={{ color: '#DDDDDD', flexShrink: 0, marginTop: 2 }} />
              </button>
            ))}
          </div>

          {/* Archive link */}
          <button
            onClick={() => navigate('/arquivo')}
            style={{ marginTop: 12, width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px dashed #E5E5E5', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#AAAAAA', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#CCCCCC'; e.currentTarget.style.color = '#555555' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.color = '#AAAAAA' }}
          >
            <BookOpen size={14} /> Arquivo Histórico
          </button>
        </aside>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #EEEEEE', background: '#FFFFFF', padding: '20px 16px', marginTop: 32 }}>
        <div style={{ maxWidth: W, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 24, height: 3, borderRadius: 2, background: '#009A44' }} />
            <div style={{ width: 24, height: 3, borderRadius: 2, background: '#CE1126' }} />
            <div style={{ width: 24, height: 3, borderRadius: 2, background: '#FCD116' }} />
          </div>
          <p style={{ fontSize: 12, color: '#CCCCCC' }}>República de Moçambique · Presidência da República · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Clock, Globe, Globe2, TrendingUp, Mic, Scale, BarChart2, BookOpen, ChevronRight, ChevronLeft, Archive } from 'lucide-react'
import Header from '../../components/Header'
import { articles } from '../../data/mockData'

const W = '1240px'

const CATS = [
  { label: 'Política Nacional',        icon: Globe,      accent: '#009A44', cat: 'Política nacional' },
  { label: 'Política Internacional',   icon: Globe2,     accent: '#CE1126', cat: 'Política internacional' },
  { label: 'Economia',                 icon: TrendingUp, accent: '#D4A800', cat: 'Economia' },
  { label: 'Discursos',                icon: Mic,        accent: '#009A44', cat: 'Discursos presidenciais' },
  { label: 'Legislação',               icon: Scale,      accent: '#CE1126', cat: 'Legislação' },
  { label: 'Indicadores',              icon: BarChart2,  accent: '#D4A800', cat: 'Indicadores económicos' },
  { label: 'Arquivo Histórico',        icon: BookOpen,   accent: '#009A44', route: '/arquivo' },
]

const TYPE_COLOR: Record<string, string> = {
  'Notícia': '#009A44', 'Comunicado oficial': '#555555',
  'Discurso': '#CE1126', 'Relatório': '#0055CC', 'Legislação': '#7B0080',
}

// Right column: highlighted topics (legislation + indicators)
const TOPICS = articles.filter(a => ['Legislação', 'Comunicado oficial', 'Relatório', 'Discurso'].includes(a.type))

const YEARS = [2026, 2025, 2024, 2023]
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
const ARCHIVE_DATA: Record<number, number[]> = {
  2026: [7, 6, 5], 2025: [12, 11, 10], 2024: [6, 3], 2023: [12, 9, 6, 3],
}

export default function Home() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [archiveYear, setArchiveYear] = useState(2026)
  const [archiveMonth, setArchiveMonth] = useState(7)

  function scrollCarousel(dir: 'left' | 'right') {
    if (!carouselRef.current) return
    const amount = carouselRef.current.clientWidth * 0.75
    carouselRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

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
        <div style={{ maxWidth: W, margin: '28px auto 0', padding: '0 16px', position: 'relative' }}>

          {/* Arrow left */}
          <button
            onClick={() => scrollCarousel('left')}
            style={{
              position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
              zIndex: 2, width: 36, height: 36, borderRadius: '50%',
              background: '#FFFFFF', border: '1.5px solid #E5E5E5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)', color: '#555555',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Scrollable track */}
          <div
            ref={carouselRef}
            className="carousel"
            style={{ padding: '4px 44px 8px' }}
          >
            {CATS.map(c => {
              const Icon = c.icon
              const selected = activeCat === c.cat
              return (
                <button
                  key={c.label}
                  className="carousel-card"
                  onClick={() => {
                    if (c.route) { navigate(c.route); return }
                    setActiveCat(selected ? null : (c.cat ?? null))
                  }}
                  style={{
                    width: 'calc((100% - 3 * 12px) / 4)',
                    minWidth: 180,
                    height: 150,
                    borderRadius: 14,
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    border: selected ? `1.5px solid ${c.accent}` : '1.5px solid #E8E8E8',
                    opacity: activeCat && !selected ? 0.6 : 1,
                    transition: 'opacity 0.15s, transform 0.15s, box-shadow 0.15s, border-color 0.15s',
                    boxShadow: selected ? `0 0 0 3px ${c.accent}22` : '0 2px 8px rgba(0,0,0,0.06)',
                    overflow: 'hidden',
                    position: 'relative',
                    textAlign: 'left',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = selected ? `0 6px 20px ${c.accent}33` : '0 6px 18px rgba(0,0,0,0.10)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = selected ? `0 0 0 3px ${c.accent}22` : '0 2px 8px rgba(0,0,0,0.06)' }}
                >
                  {/* Top colour bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: c.accent }} />

                  {/* Large icon on left — partially cropped */}
                  <div style={{
                    position: 'absolute',
                    left: -18,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: c.accent,
                    opacity: 0.18,
                    pointerEvents: 'none',
                    lineHeight: 0,
                  }}>
                    <Icon size={130} strokeWidth={1.2} />
                  </div>

                  {/* Label aligned to the right */}
                  <span style={{
                    position: 'absolute',
                    right: 16,
                    bottom: 18,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#1A1A1A',
                    lineHeight: 1.35,
                    letterSpacing: '-0.1px',
                    textAlign: 'right',
                    maxWidth: '55%',
                  }}>
                    {c.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Arrow right */}
          <button
            onClick={() => scrollCarousel('right')}
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              zIndex: 2, width: 36, height: 36, borderRadius: '50%',
              background: '#FFFFFF', border: '1.5px solid #E5E5E5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)', color: '#555555',
            }}
          >
            <ChevronRight size={18} />
          </button>
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

      {/* ── HEMEROTECA ───────────────────────────────── */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #EEEEEE', padding: '36px 16px' }}>
        <div style={{ maxWidth: W, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Archive size={18} style={{ color: '#009A44' }} />
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#111111', lineHeight: 1.2 }}>Hemeroteca</h2>
                <p style={{ fontSize: 12, color: '#AAAAAA', marginTop: 2 }}>Navegável por ano e mês, com todo o conteúdo publicado</p>
              </div>
            </div>
            <button onClick={() => navigate('/arquivo')}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: '#009A44' }}>
              Ver arquivo completo <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

            {/* Year + month navigator */}
            <div style={{ flexShrink: 0 }}>
              {/* Year tabs */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {YEARS.map(y => (
                  <button key={y} onClick={() => { setArchiveYear(y); setArchiveMonth(ARCHIVE_DATA[y][0]) }}
                    style={{
                      padding: '6px 14px', borderRadius: 7, fontSize: 13, fontWeight: 700,
                      background: archiveYear === y ? '#111111' : '#F5F5F5',
                      color: archiveYear === y ? '#FFFFFF' : '#888888',
                      border: 'none', transition: 'all 0.12s',
                    }}>
                    {y}
                  </button>
                ))}
              </div>

              {/* Month pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 340 }}>
                {MONTHS.map((m, i) => {
                  const mn = i + 1
                  const has = ARCHIVE_DATA[archiveYear]?.includes(mn)
                  const sel = archiveMonth === mn
                  return (
                    <button key={m} onClick={() => has && setArchiveMonth(mn)}
                      style={{
                        padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: sel ? 700 : 400,
                        background: sel ? '#009A44' : has ? '#F0F0F0' : 'transparent',
                        color: sel ? '#FFFFFF' : has ? '#555555' : '#DDDDDD',
                        border: `1px solid ${sel ? '#009A44' : has ? '#E0E0E0' : 'transparent'}`,
                        cursor: has ? 'pointer' : 'default',
                        transition: 'all 0.12s',
                      }}>
                      {m}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Articles for selected period */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, color: '#AAAAAA', marginBottom: 12 }}>
                {MONTHS[archiveMonth - 1]} {archiveYear} · {articles.length} documentos
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {articles.slice(0, 4).map(a => (
                  <button key={a.id} onClick={() => navigate(`/noticia/${a.id}`)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#F9F9F9', border: '1px solid #EEEEEE', borderRadius: 9, textAlign: 'left', transition: 'all 0.12s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F4F4F4'; e.currentTarget.style.borderColor = '#DDDDDD' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#F9F9F9'; e.currentTarget.style.borderColor = '#EEEEEE' }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: TYPE_COLOR[a.type] ?? '#888888', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0, width: 80 }}>
                      {a.type}
                    </span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 13, fontWeight: 600, color: '#222222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.title}
                    </span>
                    <span style={{ fontSize: 11, color: '#CCCCCC', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={10} /> {a.date}
                    </span>
                    <ArrowRight size={13} style={{ color: '#DDDDDD', flexShrink: 0 }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #EEEEEE', background: '#FFFFFF', padding: '20px 16px' }}>
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

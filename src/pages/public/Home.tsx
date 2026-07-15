import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Clock, BookOpen } from 'lucide-react'
import Header from '../../components/Header'
import { articles } from '../../data/mockData'

const CATS = ['Todos', 'Política nacional', 'Política internacional', 'Economia', 'Discursos presidenciais', 'Legislação', 'Indicadores económicos']

const TYPE_COLOR: Record<string, string> = {
  'Notícia': '#009A44',
  'Comunicado oficial': '#555555',
  'Discurso': '#CE1126',
  'Relatório': '#0055CC',
  'Legislação': '#7B0080',
}

export default function Home() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Todos')

  const filtered = articles.filter(a =>
    (cat === 'Todos' || a.category === cat) &&
    (!search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      {/* Hero */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E5E5', padding: '48px 20px 40px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#111111', letterSpacing: '-0.5px', marginBottom: 10 }}>
            Arquivo Nacional
          </h1>
          <p style={{ fontSize: 15, color: '#888888', marginBottom: 28, lineHeight: 1.6 }}>
            Base de consulta pública de informação sobre Moçambique e o mundo
          </p>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#BBBBBB', pointerEvents: 'none' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate(`/pesquisa?q=${search}`)}
              placeholder="Pesquisar artigos, discursos, legislação, dados económicos..."
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                fontSize: 15,
                border: '1.5px solid #E5E5E5',
                borderRadius: 10,
                background: '#FAFAFA',
                color: '#333333',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = '#999999')}
              onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px' }}>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '6px 14px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                border: '1.5px solid',
                borderColor: cat === c ? '#111111' : '#E5E5E5',
                background: cat === c ? '#111111' : '#FFFFFF',
                color: cat === c ? '#FFFFFF' : '#777777',
                transition: 'all 0.15s',
              }}
            >
              {c}
            </button>
          ))}

          <button
            onClick={() => navigate('/arquivo')}
            style={{
              padding: '6px 14px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 500,
              border: '1.5px solid #FCD116',
              background: '#FFFFFF',
              color: '#9A7700',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              marginLeft: 'auto',
            }}
          >
            <BookOpen size={13} /> Arquivo histórico
          </button>
        </div>

        {/* Results count */}
        {(search || cat !== 'Todos') && (
          <p style={{ fontSize: 13, color: '#999999', marginBottom: 16 }}>
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
            {search && <> para <strong style={{ color: '#333333' }}>"{search}"</strong></>}
            {cat !== 'Todos' && <> em <strong style={{ color: '#333333' }}>{cat}</strong></>}
          </p>
        )}

        {/* Article list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#BBBBBB' }}>
              <Search size={36} style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: 15, fontWeight: 600, color: '#999999' }}>Sem resultados</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Tente outras palavras-chave</p>
            </div>
          ) : filtered.map(article => (
            <button
              key={article.id}
              onClick={() => navigate(`/noticia/${article.id}`)}
              className="card"
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: TYPE_COLOR[article.type] ?? '#666666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>
                      {article.type}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#DDDDDD', flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#AAAAAA' }}>{article.category}</span>
                  </div>
                  {/* Title */}
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111111', lineHeight: 1.4, marginBottom: 6 }}>
                    {article.title}
                  </h3>
                  {/* Excerpt */}
                  <p style={{ fontSize: 13, color: '#777777', lineHeight: 1.65, marginBottom: 12 }}>
                    {article.excerpt}
                  </p>
                  {/* Footer meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#AAAAAA' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11} /> {article.date}
                    </span>
                    <span>·</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.source}</span>
                  </div>
                </div>
                <ArrowRight size={18} style={{ color: '#DDDDDD', flexShrink: 0, marginTop: 2 }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E5E5E5', background: '#FFFFFF', padding: '24px 20px', textAlign: 'center', marginTop: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 28, height: 4, borderRadius: 2, background: '#009A44' }} />
          <div style={{ width: 28, height: 4, borderRadius: 2, background: '#CE1126' }} />
          <div style={{ width: 28, height: 4, borderRadius: 2, background: '#FCD116' }} />
        </div>
        <p style={{ fontSize: 13, color: '#AAAAAA' }}>
          República de Moçambique · Presidência da República · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Download, Share2, BookOpen, Clock, Tag } from 'lucide-react'
import Header from '../../components/Header'
import { articles } from '../../data/mockData'

const TYPE_COLOR: Record<string, string> = {
  'Notícia': '#009A44', 'Comunicado oficial': '#555555',
  'Discurso': '#CE1126', 'Relatório': '#0055CC', 'Legislação': '#7B0080',
}

export default function Article() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = articles.find(a => a.id === Number(id)) ?? articles[0]
  const related = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3)
  const typeColor = TYPE_COLOR[article.type] ?? '#555555'

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 20px' }}>

        <button onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#999999', marginBottom: 20 }}>
          <ArrowLeft size={15} /> Voltar
        </button>

        {/* Article card */}
        <article style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>

          {/* Type accent bar */}
          <div style={{ height: 4, background: typeColor }} />

          <div style={{ padding: '28px 32px 24px' }}>
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: typeColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {article.type}
              </span>
              <span style={{ fontSize: 12, color: '#BBBBBB' }}>·</span>
              <span style={{ fontSize: 12, color: '#AAAAAA' }}>{article.category}</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111111', lineHeight: 1.35, letterSpacing: '-0.3px', marginBottom: 12 }}>
              {article.title}
            </h1>

            {/* Excerpt */}
            <p style={{ fontSize: 15, color: '#777777', lineHeight: 1.7, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #F0F0F0' }}>
              {article.excerpt}
            </p>

            {/* Source + date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: '#AAAAAA', marginBottom: 20 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={12} /> {article.date}</span>
              <span>·</span>
              <span>{article.source}</span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
              {[
                { icon: <Download size={13} />, label: 'Descarregar' },
                { icon: <Share2 size={13} />, label: 'Partilhar' },
                { icon: <BookOpen size={13} />, label: 'Citar' },
              ].map(action => (
                <button key={action.label} className="btn-ghost"
                  style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  {action.icon} {action.label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div style={{ fontSize: 15, color: '#444444', lineHeight: 1.8 }}>
              {article.body.split('\n\n').map((p, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{p}</p>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ padding: '16px 32px', borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Tag size={13} style={{ color: '#CCCCCC', flexShrink: 0 }} />
            {article.tags.map(tag => (
              <button key={tag} onClick={() => navigate(`/pesquisa?q=${encodeURIComponent(tag)}`)}
                style={{ fontSize: 12, padding: '3px 10px', borderRadius: 100, background: '#F5F5F5', color: '#777777', border: '1px solid #EEEEEE', transition: 'all 0.1s' }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Citation */}
          <div style={{ margin: '0 32px 28px', padding: '14px 16px', background: '#F8F8F8', borderRadius: 8, border: '1px solid #EEEEEE' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Citação normalizada (APA)
            </p>
            <p style={{ fontSize: 12, color: '#666666', fontFamily: 'monospace', lineHeight: 1.6 }}>
              {article.source}. ({article.date}). <em>{article.title}</em>. Plataforma Nacional de Informação, República de Moçambique.
            </p>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#999999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
              Relacionados
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {related.map(a => (
                <button key={a.id} onClick={() => navigate(`/noticia/${a.id}`)} className="card"
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', textAlign: 'left' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#222222', lineHeight: 1.35, marginBottom: 4 }}>{a.title}</p>
                    <p style={{ fontSize: 12, color: '#AAAAAA' }}>{a.date} · {a.source}</p>
                  </div>
                  <ArrowRight size={15} style={{ color: '#DDDDDD', flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

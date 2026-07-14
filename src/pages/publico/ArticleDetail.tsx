import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Share2, Clock, Tag, BookOpen, ExternalLink } from 'lucide-react'
import PublicHeader from '../../components/PublicHeader'
import { articles } from '../../data/mockData'

const typeColors: Record<string, string> = {
  'Notícia': '#009A44',
  'Comunicado oficial': '#1A1A1A',
  'Discurso': '#CE1126',
  'Relatório': '#0066CC',
  'Legislação': '#7B0000',
}

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const article = articles.find((a) => a.id === Number(id)) ?? articles[0]
  const related = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft size={16} /> Voltar
        </button>

        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header do artigo */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: typeColors[article.type] ?? '#009A44' }}>
                {article.type}
              </span>
              <span className="text-xs text-gray-400">{article.category}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><Clock size={13} /> {article.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5"><ExternalLink size={13} /> {article.source}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="px-6 md:px-8 py-3 border-b border-gray-100 flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-700 transition-colors">
              <Download size={13} /> Descarregar
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-700 transition-colors">
              <Share2 size={13} /> Partilhar
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-green-500 hover:text-green-700 transition-colors">
              <BookOpen size={13} /> Citar
            </button>
          </div>

          {/* Corpo */}
          <div className="px-6 md:px-8 py-6">
            {article.body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="px-6 md:px-8 py-4 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={14} className="text-gray-400" />
              {article.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => navigate(`/publico/pesquisa?q=${encodeURIComponent(tag)}`)}
                  className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-600 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Citação académica */}
          <div className="mx-6 md:mx-8 mb-6 rounded-xl p-4" style={{ background: '#E8F5EE' }}>
            <p className="text-xs font-bold mb-2" style={{ color: '#009A44' }}>Citação normalizada (APA)</p>
            <p className="text-xs text-gray-600 font-mono leading-relaxed">
              {article.source}. ({article.date}). <em>{article.title}</em>. Plataforma Nacional de Informação, República de Moçambique.
            </p>
          </div>
        </article>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-bold text-gray-700 mb-3">Artigos relacionados</h2>
            <div className="space-y-2">
              {related.map((art) => (
                <button
                  key={art.id}
                  onClick={() => navigate(`/publico/noticia/${art.id}`)}
                  className="w-full bg-white rounded-xl px-4 py-3 text-left shadow-sm hover:shadow-md transition-shadow group"
                >
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors line-clamp-1">
                    {art.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <Clock size={11} /> {art.date}
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

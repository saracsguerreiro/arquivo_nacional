import { useNavigate } from 'react-router-dom'
import { Globe, Shield, Crown, ChevronRight } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#009A44' }}>
      {/* Faixa vermelha topo */}
      <div style={{ background: '#CE1126', height: 6 }} />

      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Emblema */}
        <div className="mb-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-xl">
            <div className="text-center">
              <div className="text-green-700 font-black text-2xl leading-none">MZ</div>
              <div className="text-green-600 text-xs font-semibold">GOV</div>
            </div>
          </div>
          <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
            Plataforma Nacional de Informação
          </h1>
          <p className="text-white/70 text-sm mt-2">
            e Diálogo Executivo — República de Moçambique
          </p>
        </div>

        {/* Cards de acesso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          {/* Público */}
          <button
            onClick={() => navigate('/publico')}
            className="group bg-white rounded-2xl p-6 text-left shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: '#E8F5EE' }}>
              <Globe size={24} style={{ color: '#009A44' }} />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#009A44' }}>
              Acesso Livre
            </div>
            <h2 className="text-gray-900 font-bold text-lg mb-2">Espaço Público</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Arquivo nacional de informação aberto a cidadãos, estudantes e investigadores. Sem registo necessário.
            </p>
            <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: '#009A44' }}>
              Consultar <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Governo */}
          <button
            onClick={() => navigate('/login?nivel=governo')}
            className="group bg-white rounded-2xl p-6 text-left shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: '#F5F5F5' }}>
              <Shield size={24} className="text-gray-700" />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">
              Acesso Restrito
            </div>
            <h2 className="text-gray-900 font-bold text-lg mb-2">Espaço do Governo</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Rede privada para Ministros e Secretários de Estado. Publicações, debates e grupos ministeriais.
            </p>
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              Entrar <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Presidência */}
          <button
            onClick={() => navigate('/login?nivel=presidencia')}
            className="group rounded-2xl p-6 text-left shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            style={{ background: '#7B0000' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Crown size={24} className="text-yellow-300" />
            </div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1 text-red-200">
              Acesso Exclusivo
            </div>
            <h2 className="text-white font-bold text-lg mb-2">Espaço da Presidência</h2>
            <p className="text-red-200 text-sm leading-relaxed mb-4">
              Chat privado e resumo executivo diário do que se discute no Governo.
            </p>
            <div className="flex items-center gap-1 text-sm font-semibold text-yellow-300">
              Entrar <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Separador de conteúdo */}
        <p className="text-white/50 text-xs mt-8 text-center max-w-sm">
          O conteúdo não é partilhado entre espaços. Cada nível de acesso tem a sua informação própria e segura.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-white/40 text-xs">
        República de Moçambique — Presidência da República · {new Date().getFullYear()}
      </div>
      <div style={{ background: '#FCD116', height: 6 }} />
    </div>
  )
}

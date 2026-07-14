import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Shield, Crown, Eye, EyeOff, ArrowLeft, Lock } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const nivel = params.get('nivel') ?? 'governo'
  const isPresidencia = nivel === 'presidencia'

  const [step, setStep] = useState<'credentials' | '2fa'>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const headerBg = isPresidencia ? '#7B0000' : '#1A1A1A'
  const accentColor = isPresidencia ? '#CE1126' : '#009A44'
  const Icon = isPresidencia ? Crown : Shield

  function handleCredentials(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Preencha todos os campos.'); return }
    setError('')
    setStep('2fa')
  }

  function handle2FA(e: React.FormEvent) {
    e.preventDefault()
    if (code.length < 4) { setError('Código inválido.'); return }
    setError('')
    navigate(isPresidencia ? '/presidencia' : '/governo')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F4F4F4' }}>
      <div style={{ background: '#009A44', height: 4 }} />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft size={16} /> Voltar
          </button>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header do card */}
            <div className="p-6 text-white text-center" style={{ background: headerBg }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                <Icon size={28} className={isPresidencia ? 'text-yellow-300' : 'text-white'} />
              </div>
              <div className="font-bold text-base">
                {isPresidencia ? 'Espaço da Presidência' : 'Espaço do Governo'}
              </div>
              <div className="text-xs opacity-60 mt-1">Acesso restrito e verificado</div>
            </div>

            <div className="p-6">
              {step === 'credentials' ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: accentColor }}>1</div>
                    <span className="text-sm font-semibold text-gray-700">Credenciais</span>
                  </div>

                  <form onSubmit={handleCredentials} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email institucional</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nome@gov.mz"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                        style={{ focusRingColor: accentColor } as React.CSSProperties}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Palavra-passe</label>
                      <div className="relative">
                        <input
                          type={showPass ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 pr-10"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button type="submit" className="w-full py-2.5 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                      style={{ background: accentColor }}>
                      Continuar
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: accentColor }}>2</div>
                    <span className="text-sm font-semibold text-gray-700">Verificação em 2 etapas</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2 mb-4">
                    <Lock size={16} className="text-gray-500" />
                    <p className="text-xs text-gray-600">Código enviado para o seu dispositivo seguro.</p>
                  </div>

                  <form onSubmit={handle2FA} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Código de verificação</label>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="000000"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 text-center tracking-widest text-lg font-bold"
                        maxLength={6}
                      />
                    </div>
                    {error && <p className="text-red-500 text-xs">{error}</p>}
                    <button type="submit" className="w-full py-2.5 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                      style={{ background: accentColor }}>
                      Entrar
                    </button>
                    <button type="button" onClick={() => setStep('credentials')}
                      className="w-full text-xs text-gray-400 hover:text-gray-600">
                      ← Voltar
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            Acesso monitorizado. Todas as sessões são registadas.
          </p>
        </div>
      </div>
    </div>
  )
}

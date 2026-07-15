import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, AlertTriangle, AlertCircle, Minus, ImagePlus, FileText, Link, X, Paperclip } from 'lucide-react'
import Header from '../../components/Header'

const W = '1240px'

const MINISTRIES = ['Feed geral','Economia e Finanças','Saúde Pública','Educação','Infraestruturas','Diplomacia e Relações Exteriores','Segurança e Defesa','Agricultura','Ambiente e Clima']
const PRIORITIES = [
  { value: 'normal',     label: 'Normal',     color: '#888888', icon: <Minus size={13} /> },
  { value: 'prioritária', label: 'Prioritária', color: '#D97706', icon: <AlertCircle size={13} /> },
  { value: 'urgente',    label: 'Urgente',    color: '#CE1126', icon: <AlertTriangle size={13} /> },
] as const

interface AttachedLink { id: number; url: string; label: string }

export default function NewPost() {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState<'normal' | 'prioritária' | 'urgente'>('normal')
  const [ministry, setMinistry] = useState('Feed geral')
  const [done, setDone] = useState(false)

  // Attachments state
  const [photos, setPhotos] = useState<{ id: number; name: string; preview: string }[]>([])
  const [docs, setDocs] = useState<{ id: number; name: string; size: string }[]>([])
  const [links, setLinks] = useState<AttachedLink[]>([])
  const [linkUrl, setLinkUrl] = useState('')
  const [linkLabel, setLinkLabel] = useState('')
  const [showLinkForm, setShowLinkForm] = useState(false)

  function handlePhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    files.forEach(f => {
      const reader = new FileReader()
      reader.onload = ev => setPhotos(prev => [...prev, { id: Date.now() + Math.random(), name: f.name, preview: ev.target?.result as string }])
      reader.readAsDataURL(f)
    })
    e.target.value = ''
  }

  function handleDocs(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    files.forEach(f => setDocs(prev => [...prev, { id: Date.now() + Math.random(), name: f.name, size: (f.size / 1024).toFixed(0) + ' KB' }]))
    e.target.value = ''
  }

  function addLink() {
    if (!linkUrl.trim()) return
    setLinks(prev => [...prev, { id: Date.now(), url: linkUrl, label: linkLabel || linkUrl }])
    setLinkUrl(''); setLinkLabel(''); setShowLinkForm(false)
  }

  if (done) return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, padding: 40, textAlign: 'center', maxWidth: 340 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#009A4418', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Send size={24} style={{ color: '#009A44' }} />
        </div>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#111111', marginBottom: 8 }}>Publicação enviada</p>
        <p style={{ fontSize: 13, color: '#999999', marginBottom: 24 }}>Partilhada no feed do Executivo</p>
        <button onClick={() => navigate('/governo')} style={{ padding: '10px 20px', borderRadius: 8, background: '#009A44', color: '#FFFFFF', fontSize: 13, fontWeight: 600 }}>
          Voltar ao feed
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5' }}>
      <Header />

      <div style={{ maxWidth: W, margin: '0 auto', padding: '28px 20px' }}>
        <button onClick={() => navigate('/governo')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#999999', marginBottom: 24 }}>
          <ArrowLeft size={15} /> Voltar ao feed
        </button>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

          {/* ── LEFT: form fields ─────────────────────── */}
          <div style={{ flex: 1, minWidth: 0, background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #F0F0F0' }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>Nova Publicação</p>
              <p style={{ fontSize: 12, color: '#AAAAAA', marginTop: 2 }}>Partilhar com o Executivo</p>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Priority */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Prioridade
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {PRIORITIES.map(p => (
                    <button key={p.value} onClick={() => setPriority(p.value)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                        border: `1.5px solid ${priority === p.value ? p.color : '#E5E5E5'}`,
                        background: priority === p.value ? p.color + '12' : 'transparent',
                        color: priority === p.value ? p.color : '#AAAAAA',
                        transition: 'all 0.15s',
                      }}>
                      {p.icon} {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Grupo
                </label>
                <select value={ministry} onChange={e => setMinistry(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E5E5E5', background: '#FFFFFF', color: '#333333', fontSize: 13, outline: 'none' }}>
                  {MINISTRIES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {/* Content */}
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Publicação
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Escreva a sua publicação para o Executivo..."
                  rows={8}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1.5px solid #E5E5E5', background: '#FAFAFA', color: '#333333', fontSize: 14, lineHeight: 1.7, resize: 'none', outline: 'none', transition: 'border-color 0.15s' }}
                  onFocus={e => (e.target.style.borderColor = '#CCCCCC')}
                  onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                />
                <p style={{ fontSize: 11, color: '#CCCCCC', textAlign: 'right', marginTop: 4 }}>{content.length} caracteres</p>
              </div>

              {/* Warning */}
              {priority === 'urgente' && (
                <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 8, background: '#CE112610', border: '1px solid #CE112630' }}>
                  <AlertTriangle size={15} style={{ color: '#CE1126', flexShrink: 0, marginTop: 1 }} />
                  <p style={{ fontSize: 12, color: '#CE1126', lineHeight: 1.6 }}>
                    Publicações <strong>urgentes</strong> notificam imediatamente todos os membros do Executivo.
                  </p>
                </div>
              )}

              {/* Submit */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 4 }}>
                <button onClick={() => navigate('/governo')} className="btn-ghost">Cancelar</button>
                <button
                  onClick={() => { if (content.trim()) setDone(true) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 8, background: content.trim() ? '#009A44' : '#EEEEEE', color: content.trim() ? '#FFFFFF' : '#AAAAAA', fontSize: 13, fontWeight: 600, transition: 'all 0.15s' }}>
                  <Send size={13} /> Publicar
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: attachments ────────────────────── */}
          <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Photos */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <ImagePlus size={15} style={{ color: '#009A44' }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Fotografias</p>
              </div>
              <div style={{ padding: 14 }}>
                {photos.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
                    {photos.map(p => (
                      <div key={p.id} style={{ position: 'relative', borderRadius: 7, overflow: 'hidden' }}>
                        <img src={p.preview} alt={p.name} style={{ width: '100%', height: 80, objectFit: 'cover', display: 'block' }} />
                        <button onClick={() => setPhotos(prev => prev.filter(x => x.id !== p.id))}
                          style={{ position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 6, padding: '16px 12px', borderRadius: 8,
                  border: '1.5px dashed #D5D5D5', cursor: 'pointer',
                  background: '#FAFAFA', transition: 'border-color 0.15s',
                }}>
                  <ImagePlus size={20} style={{ color: '#CCCCCC' }} />
                  <span style={{ fontSize: 12, color: '#AAAAAA', textAlign: 'center' }}>Clique para adicionar fotos</span>
                  <span style={{ fontSize: 10, color: '#CCCCCC' }}>JPG, PNG, WEBP</span>
                  <input type="file" accept="image/*" multiple onChange={handlePhotos} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Documents */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Paperclip size={15} style={{ color: '#0055CC' }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Documentos</p>
              </div>
              <div style={{ padding: 14 }}>
                {docs.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                    {docs.map(d => (
                      <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#F5F5F5', borderRadius: 7 }}>
                        <FileText size={14} style={{ color: '#0055CC', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</p>
                          <p style={{ fontSize: 10, color: '#AAAAAA' }}>{d.size}</p>
                        </div>
                        <button onClick={() => setDocs(prev => prev.filter(x => x.id !== d.id))}
                          style={{ color: '#CCCCCC', flexShrink: 0 }}>
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 6, padding: '16px 12px', borderRadius: 8,
                  border: '1.5px dashed #D5D5D5', cursor: 'pointer',
                  background: '#FAFAFA',
                }}>
                  <Paperclip size={20} style={{ color: '#CCCCCC' }} />
                  <span style={{ fontSize: 12, color: '#AAAAAA', textAlign: 'center' }}>Clique para anexar ficheiros</span>
                  <span style={{ fontSize: 10, color: '#CCCCCC' }}>PDF, DOCX, XLSX, PPTX</span>
                  <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" multiple onChange={handleDocs} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Links */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Link size={15} style={{ color: '#7B0080' }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>Links</p>
              </div>
              <div style={{ padding: 14 }}>
                {links.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                    {links.map(l => (
                      <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#F5F5F5', borderRadius: 7 }}>
                        <Link size={12} style={{ color: '#7B0080', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 12, fontWeight: 600, color: '#333333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.label}</p>
                          <p style={{ fontSize: 10, color: '#AAAAAA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.url}</p>
                        </div>
                        <button onClick={() => setLinks(prev => prev.filter(x => x.id !== l.id))} style={{ color: '#CCCCCC', flexShrink: 0 }}>
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {showLinkForm ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                      placeholder="https://..."
                      style={{ width: '100%', padding: '8px 10px', fontSize: 12, border: '1.5px solid #E5E5E5', borderRadius: 7, outline: 'none', background: '#FAFAFA', color: '#333' }}
                      onFocus={e => (e.target.style.borderColor = '#CCCCCC')}
                      onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                    />
                    <input value={linkLabel} onChange={e => setLinkLabel(e.target.value)}
                      placeholder="Descrição (opcional)"
                      style={{ width: '100%', padding: '8px 10px', fontSize: 12, border: '1.5px solid #E5E5E5', borderRadius: 7, outline: 'none', background: '#FAFAFA', color: '#333' }}
                      onFocus={e => (e.target.style.borderColor = '#CCCCCC')}
                      onBlur={e => (e.target.style.borderColor = '#E5E5E5')}
                    />
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => { setShowLinkForm(false); setLinkUrl(''); setLinkLabel('') }}
                        style={{ flex: 1, padding: '7px', fontSize: 12, borderRadius: 7, border: '1px solid #E5E5E5', color: '#AAAAAA', background: '#FFFFFF' }}>
                        Cancelar
                      </button>
                      <button onClick={addLink}
                        style={{ flex: 1, padding: '7px', fontSize: 12, fontWeight: 600, borderRadius: 7, background: '#7B0080', color: '#FFFFFF', border: 'none' }}>
                        Adicionar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowLinkForm(true)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px', borderRadius: 8, border: '1.5px dashed #D5D5D5', background: '#FAFAFA', fontSize: 12, color: '#AAAAAA' }}>
                    <Link size={14} style={{ color: '#CCCCCC' }} /> Adicionar link
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

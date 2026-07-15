import { useState } from 'react'
import { Send, Search } from 'lucide-react'
import Header from '../../components/Header'
import { chatMessages, chatContacts } from '../../data/mockData'

export default function Chat() {
  const [selected, setSelected] = useState(chatContacts[0])
  const [messages, setMessages] = useState(chatMessages)
  const [newMsg, setNewMsg] = useState('')

  function send() {
    if (!newMsg.trim()) return
    setMessages(m => [...m, { id: Date.now(), from: 'Eu', me: true, text: newMsg, time: new Date().toTimeString().slice(0,5) }])
    setNewMsg('')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ flex: 1, maxWidth: 900, width: '100%', margin: '0 auto', padding: '20px 20px', display: 'flex', gap: 14, minHeight: 0 }}>

        {/* Contacts */}
        <div style={{ width: 240, flexShrink: 0, background: '#141414', border: '1px solid #1E1E1E', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #1E1E1E' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 10 }}>Chat Privado</p>
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#444444', pointerEvents: 'none' }} />
              <input type="text" placeholder="Pesquisar..."
                style={{ width: '100%', padding: '7px 10px 7px 28px', fontSize: 12, border: '1px solid #222222', borderRadius: 7, background: '#0A0A0A', color: '#CCCCCC', outline: 'none' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {chatContacts.map(c => (
              <button key={c.id} onClick={() => setSelected(c)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #1A1A1A', background: selected.id === c.id ? '#1E1E1E' : 'transparent', transition: 'background 0.1s' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#CE1126', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  {c.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#DDDDDD', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                    {c.unread > 0 && (
                      <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#CE1126', color: '#FFFFFF', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: '#555555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>{c.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div style={{ flex: 1, minWidth: 0, background: '#141414', border: '1px solid #1E1E1E', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Contact header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#CE1126', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 13, fontWeight: 700 }}>
              {selected.name[0]}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>{selected.name}</p>
              <p style={{ fontSize: 11, color: '#444444' }}>Conversa encriptada</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.me ? 'flex-end' : 'flex-start' }}>
                <div>
                  {!msg.me && <p style={{ fontSize: 11, color: '#555555', marginBottom: 4 }}>{msg.from}</p>}
                  <div className={msg.me ? 'chat-bubble-me' : 'chat-bubble-other'}>{msg.text}</div>
                  <p style={{ fontSize: 10, color: '#444444', marginTop: 4, textAlign: msg.me ? 'right' : 'left' }}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #1E1E1E', display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escrever mensagem..."
              style={{ flex: 1, padding: '10px 14px', fontSize: 13, border: '1px solid #222222', borderRadius: 8, background: '#0A0A0A', color: '#CCCCCC', outline: 'none' }}
            />
            <button onClick={send}
              style={{ width: 40, height: 40, borderRadius: 8, background: '#CE1126', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

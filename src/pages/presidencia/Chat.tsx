import { useState } from 'react'
import { Send, Search } from 'lucide-react'
import GovHeader from '../../components/GovHeader'
import { chatMessages, chatContacts } from '../../data/mockData'

export default function Chat() {
  const [selected, setSelected] = useState(chatContacts[0])
  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState(chatMessages)

  function sendMessage() {
    if (!newMsg.trim()) return
    setMessages([...messages, { id: Date.now(), from: 'Eu', me: true, text: newMsg, time: new Date().toTimeString().slice(0, 5) }])
    setNewMsg('')
  }

  return (
    <div className="min-h-screen" style={{ background: '#F9F4F4' }}>
      <GovHeader user={{ name: 'Sua Excelência', role: 'Presidência da República' }} level="presidencia" />

      <main className="max-w-5xl mx-auto px-4 py-6 h-[calc(100vh-5rem)]">
        <div className="h-full flex gap-4">
          {/* Contactos */}
          <div className="w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="text-sm font-bold text-gray-900">Chat Privado</div>
              <div className="relative mt-2">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Pesquisar..." className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {chatContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelected(contact)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-start gap-3"
                  style={selected.id === contact.id ? { background: '#FEF2F2' } : {}}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: '#CE1126' }}>
                    {contact.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 truncate">{contact.name}</span>
                      {contact.unread > 0 && (
                        <span className="w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold flex-shrink-0"
                          style={{ background: '#CE1126', fontSize: 10 }}>{contact.unread}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{contact.lastMsg}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conversa */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
            {/* Header da conversa */}
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3" style={{ background: '#7B0000' }}>
              <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-red-900 text-xs font-bold">
                {selected.name[0]}
              </div>
              <div>
                <div className="text-white font-bold text-sm">{selected.name}</div>
                <div className="text-red-200 text-xs">Conversa privada e encriptada</div>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.me ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-xs">
                    {!msg.me && (
                      <div className="text-xs text-gray-400 mb-1">{msg.from}</div>
                    )}
                    <div className="rounded-2xl px-4 py-2.5 text-sm"
                      style={msg.me
                        ? { background: '#7B0000', color: 'white', borderBottomRightRadius: 4 }
                        : { background: '#F3F4F6', color: '#1A1A1A', borderBottomLeftRadius: 4 }}>
                      {msg.text}
                    </div>
                    <div className={`text-xs text-gray-400 mt-1 ${msg.me ? 'text-right' : 'text-left'}`}>{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-3">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Escrever mensagem..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-opacity hover:opacity-80"
                style={{ background: '#7B0000' }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

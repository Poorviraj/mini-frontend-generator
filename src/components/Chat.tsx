// src/components/Chat.tsx
'use client'
import { useState } from 'react'
import { sendToGemini } from '@/lib/sendToGemini'
import { Message } from '@/lib/types'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = {
        role: 'user', content: input,
        id: ''
    }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const assistantText = await sendToGemini(newMessages)
    const assistantMsg: Message = {
        role: 'assistant', content: assistantText,
        id: ''
    }
    setMessages([...newMessages, assistantMsg])
    setLoading(false)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Gemini'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p>Generating...</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Describe a component..."
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  )
}

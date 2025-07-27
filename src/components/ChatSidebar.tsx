'use client'
import { useState } from 'react'
import { Message } from '@/lib/types'
import PromptInput from './PromptInput'
import MessageBubble from './MessageBubble'

export default function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = async (msg: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
    }
    setMessages(prev => [...prev, newMessage])

    // 👇 Simulated AI response for now
    const aiReply: Message = {
      id: Date.now().toString() + '-ai',
      role: 'assistant',
      content: `AI: Code for "${msg}" goes here.`,
    }
    setMessages(prev => [...prev, aiReply])
  }

  return (
    <div className="w-full max-w-sm h-screen p-4 bg-gray-100 border-r overflow-y-auto flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map(m => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>
      <PromptInput onSend={sendMessage} />
    </div>
  )
}

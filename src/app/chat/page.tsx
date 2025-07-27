'use client'

import { useState } from 'react'
import ChatSidebar from '@/components/ChatSidebar'
import ChatPanel from '@/components/ChatPanel'
import { Message } from '@/lib/types'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  return (
    <div className="flex h-screen">
      <ChatSidebar
        messages={messages}
        setMessages={setMessages}
        setSelectedMessage={setSelectedMessage}
      />
      <ChatPanel message={selectedMessage} />
    </div>
  )
}

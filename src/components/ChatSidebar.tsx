'use client'

import { Message } from '@/lib/types'
import PromptInput from './PromptInput'
import { sendToGemini } from '@/lib/sendToGemini'
import LoadingDots from './LoadingDots'

type Props = {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  setSelectedMessage: (msg: Message) => void
}

let controller = new AbortController()

export default function ChatSidebar({ messages, setMessages, setSelectedMessage }: Props) {
  const sendMessage = async (msg: string) => {

    controller = new AbortController()

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
    }

    const loadingMessage: Message = {
      id: Date.now().toString() + '-loading',
      role: 'assistant',
      content: 'Loading...',
      isLoading: true,
    }

    const updatedMessages = [...messages, userMessage, loadingMessage]
    setMessages(updatedMessages)
    setSelectedMessage(loadingMessage)

    try {
      const aiReply = await sendToGemini(updatedMessages, controller.signal)

      const finalAssistantMessage: Message = {
        id: Date.now().toString() + '-ai',
        role: 'assistant',
        content: aiReply,
      }

      // Replace loading message
      setMessages(prev =>
        prev.map(m => (m.id === loadingMessage.id ? finalAssistantMessage : m))
      )

      setSelectedMessage(finalAssistantMessage)
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'name' in err && (err as { name: string }).name === 'AbortError') {
        console.log('Request was cancelled')
      }
      console.error('Gemini API error:', err)
    }
  }

  // Group messages as prompt-response pairs
  const pairedEntries: { prompt: string; response: Message }[] = []

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role === 'user' && messages[i + 1]?.role === 'assistant') {
      pairedEntries.push({
        prompt: messages[i].content,
        response: messages[i + 1],
      })
      i++ // skip assistant for next iteration
    }
  }

  return (
    <div className="w-full max-w-sm h-screen p-4 bg-gray-100 border-r overflow-y-auto flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {pairedEntries.map(({ prompt, response }, index) => (
          <div
            key={index}
            onClick={() => !response.isLoading && setSelectedMessage(response)}
            className={`p-3 rounded bg-white shadow hover:bg-gray-200 cursor-pointer`}
          >
            <div className="font-semibold text-sm text-blue-700 mb-1">{prompt}</div>
            <div className="text-xs text-gray-600 italic">
              {response.isLoading ? (
                <div className="flex items-center text-xs text-gray-600 italic justify-between">
                  <span>Generating <LoadingDots /></span>
                  <button
                    onClick={() => controller.abort()}
                    className="ml-2 px-2 py-0.5 text-red-500 hover:underline text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-xs text-gray-600 italic">
                  {response.content.split('\n')[0].slice(0, 100) + '...'}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      <PromptInput onSend={sendMessage} />
    </div>
  )
}

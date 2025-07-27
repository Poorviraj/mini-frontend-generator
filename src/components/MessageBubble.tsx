import { Message } from '@/lib/types'

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`p-2 rounded-lg max-w-xs ${isUser ? 'bg-blue-200 self-end' : 'bg-white self-start'}`}>
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
    </div>
  )
}

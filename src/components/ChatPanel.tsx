'use client'

import LoadingDots from '@/components/LoadingDots'
import { Message } from '@/lib/types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'

export default function ChatPanel({ message }: { message: Message | null }) {
  if (!message) {
    return (
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-bold mb-4">Generated Output</h1>
        <div className="p-4 bg-gray-100 rounded text-sm text-gray-600">
          Select a response to view it here.
        </div>
      </div>
    )
  }

  if (message.isLoading) {
    return (
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-xl font-bold mb-4">Generated Output</h1>
        <div className="p-4 bg-gray-100 rounded text-sm text-gray-500 inline-flex items-center gap-1">
          Generating response <LoadingDots />
        </div>
      </div>
    )
  }

  const lines = message.content.split('\n')
  const elements: React.ReactNode[] = []

  let inCodeBlock = false
  let codeBuffer: string[] = []
  let codeLang = 'javascript'

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLang = line.slice(3).trim() || 'javascript'
        codeBuffer = []
      } else {
        inCodeBlock = false
        const codeString = codeBuffer.join('\n')

        elements.push(
          <div className="relative group" key={`code-block-${index}`}>
            <button
              onClick={() => {
                navigator.clipboard.writeText(codeString)
                toast.success('Copied to clipboard!')
              }}
              className="absolute top-2 right-2 z-10 text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Copy
            </button>
            <SyntaxHighlighter
              language={codeLang}
              style={oneLight}
              customStyle={{
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '0.875rem',
                background: '#f8f8f8',
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        )
        codeBuffer = []
      }
    } else if (inCodeBlock) {
      codeBuffer.push(line)
    } else if (/^\*\*(.+?)\*\*$/.test(line)) {
      elements.push(
        <h2 key={`heading-${index}`} className="text-lg font-semibold text-blue-700 mt-4">
          {line.replace(/\*\*/g, '')}
        </h2>
      )
    } else if (line.trim() !== '') {
      elements.push(
        <p key={`text-${index}`} className="text-sm text-gray-700 whitespace-pre-wrap">
          {line}
        </p>
      )
    }
  })

  return (
    <div className="flex-1 p-6 overflow-auto relative">
      <h1 className="text-xl font-bold mb-4">Generated Output</h1>
      <div className="space-y-4">{elements}</div>
    </div>
  )
}

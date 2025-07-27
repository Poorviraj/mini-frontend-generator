import { useState } from 'react'

export default function PromptInput({ onSend }: { onSend: (msg: string) => void }) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      onSend(prompt.trim())
      setPrompt('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        type="text"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="bg-black text-white px-3 py-1 rounded">Send</button>
    </form>
  )
}

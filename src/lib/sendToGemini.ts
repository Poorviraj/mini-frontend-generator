import { Message } from "./types"

export const sendToGemini = async (
  messages: Message[],
  signal?: AbortSignal
): Promise<string> => {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal
  })

  const data = await res.json()
  return data.result
}

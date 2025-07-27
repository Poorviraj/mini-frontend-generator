// src/lib/types.ts
export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  image?: string // base64 or URL
}

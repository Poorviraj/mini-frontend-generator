// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Message } from './types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateWithGemini(messages: Message[]) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const formatted = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')

  try {
    const result = await model.generateContent(formatted)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Gemini error:', error)
    return 'Error generating code. Please try again.'
  }
}

// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { generateWithGemini } from '@/lib/gemini'
import { Message } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const result = await generateWithGemini(messages)

    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

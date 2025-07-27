// /app/login/page.tsx
'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => signIn('google')}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </div>
  )
}

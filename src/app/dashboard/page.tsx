// /src/app/dashboard/page.tsx
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div className="text-center mt-10 text-red-600">Unauthorized. Please log in.</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
    </div>
  )
}

// /src/app/dashboard/page.tsx
import LogoutButton from '@/components/LogoutButton'

export default async function Dashboard() {
  // getServerSession logic here
  return (
    <div>
      Welcome to the dashboard!
      <LogoutButton />
    </div>
  )
}

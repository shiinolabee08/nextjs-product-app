'use client'

import { useSession } from 'next-auth/react'
import ProtectedLayout from '@/components/shared/ProtectedLayout'
import type { NextPage } from 'next'

const ProfilePage: NextPage & { pageTitle?: string } = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>You are not logged in.</div>
  }

  return (
    <ProtectedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
        <p className="text-gray-600">Email: {session.user?.email}</p>
      </div>
    </ProtectedLayout>
  )
}

ProfilePage.pageTitle = 'Your Profile'

export default ProfilePage
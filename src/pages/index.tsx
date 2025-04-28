import ProtectedLayout from '@/components/shared/ProtectedLayout'
import DashboardCard from '@/features/dashboard/DashboardCard'
import type { NextPage } from 'next'
import { DollarSign, Users, Activity } from 'lucide-react'

const HomePage: NextPage & { pageTitle?: string } = () => {
  return (
    <ProtectedLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Revenue" value="$12,400" icon={<DollarSign />} />
        <DashboardCard title="Users" value="1,250" icon={<Users />} />
        <DashboardCard title="Activity" value="78%" icon={<Activity />} />
      </div>
    </ProtectedLayout>
  )
}

HomePage.pageTitle = 'Dashboard'

export default HomePage

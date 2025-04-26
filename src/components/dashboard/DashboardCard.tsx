// components/DashboardCard.tsx
interface DashboardCardProps {
  title: string
  value: string
  icon?: React.ReactNode
}

export default function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center space-x-4">
      {icon && <div className="text-blue-500">{icon}</div>}
      <div>
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  )
}

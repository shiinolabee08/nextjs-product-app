import { Home, BarChart2, Settings } from 'lucide-react'
import Link from 'next/link'

const menu = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/' },
  { name: 'Analytics', icon: <BarChart2 className="w-5 h-5" />, href: '/analytics' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, href: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="px-6 py-4 text-xl font-bold">SB Admin</div>
      <nav className="mt-4">
        {menu.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

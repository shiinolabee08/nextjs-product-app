import { Home, ShoppingBasket, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

type SidebarProps = {
  isOpen: boolean
}

const menu = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/' },
  { name: 'Products', icon: <ShoppingBasket className="w-5 h-5" />, href: '/products' },
  { name: 'Cart', icon: <ShoppingCart className="w-5 h-5" />, href: '/cart' },
]

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`bg-white border-r transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}`}
    >
      <div className="px-6 py-4 text-xl font-bold text-blue-600">{ isOpen ? 'AJP Templates' : 'AJP'}</div>
      <nav className="mt-4">
        {menu.map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100">
            {item.icon}
            { isOpen ? <span className="ml-3">{item.name}</span> : '' }
          </Link>
        ))}
      </nav>
    </aside>
  )
}

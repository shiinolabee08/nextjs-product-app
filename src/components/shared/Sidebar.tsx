import { Home, ShoppingBasket, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const menu = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/' },
  { name: 'Products', icon: <ShoppingBasket className="w-5 h-5" />, href: '/products' },
  { name: 'Cart', icon: <ShoppingCart className="w-5 h-5" />, href: '/cart' },
]

export default function Sidebar() {

  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="px-6 py-4 text-xl font-bold text-blue-600">AJP Templates</div>
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

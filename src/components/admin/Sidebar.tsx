import { ThemeContext } from '@/context/ThemeContext'
import { Home, ShoppingBasket, ChartBarStacked } from 'lucide-react'
import Link from 'next/link'
import { useContext } from 'react'

type SidebarProps = {
  isOpen: boolean
}

const menu = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, href: '/admin' },
  { name: 'Products', icon: <ShoppingBasket className="w-5 h-5" />, href: '/admin/products' },
  { name: 'Product Categories', icon: <ChartBarStacked className="w-5 h-5" />, href: '/admin/product-categories' },
]

export default function Sidebar({ isOpen }: SidebarProps) {

  const { theme }: any = useContext(ThemeContext)

  return (
    <aside
      className={`border-r transition-all duration-300
        ${isOpen ? "w-64" : "w-20"} fixed top-0 left-0 z-40 w-64 h-screen
        ${theme === 'dark' ? 'sidebar--dark' : ''}
        transition-transform -translate-x-full sm:translate-x-0`}
        
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="px-6 py-4 text-xl font-bold text-blue-600">{ isOpen ? 'AJP Templates' : 'AJP'}</div>
        <nav className="mt-4">
          <ul className="space-y-2 font-medium">
            {menu.map((item) => (
              <li>
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    {item.icon}
                    { isOpen ? <span className="ml-3">{item.name}</span> : '' }
                </Link>
              </li>
              
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

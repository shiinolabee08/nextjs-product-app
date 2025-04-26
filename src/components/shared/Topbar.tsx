import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, User, Settings, LogOut } from 'lucide-react'

type TopbarProps = {
  onToggleSidebar: () => void
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const router = useRouter()
  const [pageTitle, setPageTitle] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const routeToTitle: Record<string, string> = {
      '/': 'Dashboard',
      '/products': 'Products',
      '/cart': 'Your Cart',
      '/checkout': 'Checkout',
      // dynamic route example
      '/product/[id]': 'Product Detail',
    }

    const title = routeToTitle[router.route] || 'Page'
    setPageTitle(title)
  }, [router.route])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
      {/* Left side: Brand or Menu */}
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="text-gray-600 hover:cursor-pointer">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-700">{pageTitle}</h1>
      </div>
      
      {/* Right side: User Avatar / Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2 hover:cursor-pointer focus:outline-none"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
          />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 origin-top-right"
            >
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2" />
                Profile
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </a>
              <button
                onClick={() => alert('Logged out!')}
                className="flex w-full items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

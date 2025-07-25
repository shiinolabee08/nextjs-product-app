import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeContext } from '@/context/ThemeContext'
import ThemeToggle from '../shared/ThemeToggle'
import { Avatar } from '@mui/material'

type TopbarProps = {
  onToggleSidebar: () => void
}

export default function Topbar({ onToggleSidebar }: TopbarProps) {
  const router = useRouter()
  const [pageTitle, setPageTitle] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { theme }: any = useContext(ThemeContext)

  useEffect(() => {
    const routeToTitle: Record<string, string> = {
      '/admin': 'Dashboard',
      '/admin/products': 'Products',
      '/admin/product-categories': 'Product Categories',
      '/admin/products/[id]': 'Product Detail',
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
    <header className={`header ${theme === 'dark' ? 'header--dark' : ''} 
      flex items-center justify-between`}>
      {/* Left side: Brand or Menu */}
      <div className="flex items-center gap-4">
        {/* <button onClick={onToggleSidebar} className="text-gray-600 hover:cursor-pointer">
          <Menu className="w-6 h-6" />
        </button> */}
        <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
      </div>
      
      {/* Right side: User Avatar / Dropdown */}
      <div className="relative flex" ref={menuRef}>
        <ThemeToggle />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex-1 items-center space-x-2 hover:cursor-pointer focus:outline-none"
        >
          <Avatar src="https://i.pravatar.cc/40" alt="Avatar" />
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
              <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
              <Link href="/profile/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
              <button
                onClick={() => alert('Logged out!')}
                className="flex w-full items-center px-4 py-2 hover:cursor-pointer text-gray-700 hover:bg-gray-100"
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

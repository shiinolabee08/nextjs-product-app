'use client'
import { useContext, useState } from 'react'
import Sidebar from '@/components/admin/Sidebar'
import Topbar from '@/components/admin/Topbar'
import { ThemeContext } from '@/context/ThemeContext'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { theme }: any = useContext(ThemeContext)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`app ${theme === 'dark' ? 'app--dark' : ''} flex h-screen bg-gray-50 dark:bg-gray-800`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />
      {/* Main Content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4">
          {/* Topbar */}
          <Topbar onToggleSidebar={toggleSidebar} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useContext, useState } from 'react'
import Sidebar from '@/components/shared/Sidebar'
import Topbar from '@/components/shared/Topbar'
import { ThemeContext } from '@/context/ThemeContext'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { theme }: any = useContext(ThemeContext)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`app ${theme === 'dark' ? 'app--dark' : ''} flex h-screen bg-gray-100`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar onToggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

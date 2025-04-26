'use client'
import { useState } from 'react'
import Sidebar from '@/components/shared/Sidebar'
import Topbar from '@/components/shared/Topbar'

export default function Layout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-100">
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

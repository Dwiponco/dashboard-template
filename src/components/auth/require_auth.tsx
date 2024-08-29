import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth_context'
import { Sidebar } from '../layout/sidebar'
import Header from '../layout/header'

const RequireAuth: React.FC = () => {
    const { isAuthenticated, loading } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1025) {
                setIsSidebarOpen(false)
            } else {
                setIsSidebarOpen(true)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize() // Set initial state based on window size

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (loading) {
        return <div>Loading...</div> // Atau bisa tampilkan spinner loading di sini
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className='flex h-screen overflow-hidden '>
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
            />

            {/* Main Content Area */}
            <div className='flex flex-col w-full bg-gmiSecondary lg:px-7'>
                {/* Header */}
                <Header
                    onToggleSidebar={handleToggleSidebar}
                    setIsCollapsed={() =>
                        setIsSidebarCollapsed(!isSidebarCollapsed)
                    }
                    isCollapsed={isSidebarCollapsed}
                />

                {/* Content */}
                <main className='flex-1 overflow-y-auto px-7 lg:px-0 pt-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default RequireAuth

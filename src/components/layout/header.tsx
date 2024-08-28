import React from 'react'

interface HeaderProps {
    onToggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
    return (
        <header className='flex justify-between items-center w-full border-b'>
            <h1>Header</h1>
            <div>
                <button className='lg:hidden' onClick={onToggleSidebar}>
                    Toggle Sidebar
                </button>
            </div>
        </header>
    )
}

export default Header

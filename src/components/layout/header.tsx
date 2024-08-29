import React from 'react'
import * as Icon from '@mui/icons-material'

interface HeaderProps {
    onToggleSidebar: () => void
    isCollapsed: boolean
    setIsCollapsed: () => void
}

const Header: React.FC<HeaderProps> = ({
    onToggleSidebar,
    isCollapsed,
    setIsCollapsed,
}) => {
    return (
        <header className='flex justify-between items-center w-full border-b h-[65px] px-7 lg:px-0 shadow-sm lg:shadow-none bg-white lg:bg-transparent'>
            <div>
                <button className='lg:hidden' onClick={onToggleSidebar}>
                    <Icon.Menu />
                </button>
                {!isCollapsed && (
                    <button
                        className='hidden lg:block'
                        onClick={() => setIsCollapsed()}
                    >
                        <Icon.ArrowBack
                            sx={{
                                color: '#9ca3af',
                            }}
                        />
                    </button>
                )}
            </div>
            <div className='text-textSecondary flex gap-4 items-center'>
                <Icon.Search
                    className=' cursor-pointer'
                    onClick={() => console.log('search')}
                />
                <Icon.Notifications
                    className=' cursor-pointer'
                    onClick={() => console.log('notification')}
                />
                <div className='border-l-2 h-[27px]'>{''}</div>
                <div
                    className='flex gap-2 items-center cursor-pointer'
                    onClick={() => console.log('profile')}
                >
                    <Icon.AccountCircle />
                    <p className='text-sm'>Dwi Ponco</p>
                    <Icon.ArrowDropDown />
                </div>
            </div>
        </header>
    )
}

export default Header

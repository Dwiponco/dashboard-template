import React from 'react'
import * as Icon from '@mui/icons-material'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

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
        <div className='w-full h-[65px]'>
            <header className='flex justify-between items-center w-full border-b h-full px-7 lg:px-0 shadow-sm lg:shadow-none'>
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
                    <div className='cursor-pointer hover:bg-gray-200 h-[35px] w-[35px] rounded-full flex items-center justify-center'>
                        <Icon.Search onClick={() => console.log('search')} />
                    </div>
                    <div className='cursor-pointer hover:bg-gray-200 h-[35px] w-[35px] rounded-full flex items-center justify-center'>
                        <Icon.Notifications
                            onClick={() => console.log('notification')}
                        />
                    </div>
                    <div className='border-l-2 h-[27px]'>{''}</div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='focus:outline-none'>
                            <div
                                className='flex gap-2 items-center cursor-pointer'
                                onClick={() => console.log('profile')}
                            >
                                <Icon.AccountCircle />
                                <p className='text-sm'>Dwi Ponco</p>
                                <Icon.ArrowDropDown />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-white rounded-xl w-[200px] mr-7'>
                            <DropdownMenuLabel>
                                <p>Dwi Ponco</p>
                                <p className=' font-light text-sm italic text-textSecondary'>
                                    Account
                                </p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className='bg-gray-200' />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
        </div>
    )
}

export default Header

import React, { Suspense, useEffect, useState } from 'react'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { Link, useLocation } from 'react-router-dom'
import * as Icons from '@mui/icons-material/'
import logo from '../../assets/logo-dumy.png'

interface MenuItem {
    id: string
    title: string
    path: string
    icon?: string
    children?: MenuItem[]
}

const Sidebar: React.FC = () => {
    const location = useLocation()
    const [menuData, setMenuData] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        const fetchMenuData = async () => {
            setLoading(true)
            try {
                const data: MenuItem[] = [
                    {
                        id: 'menu1',
                        title: 'Dashboard',
                        path: '/menu1',
                        icon: 'GridViewRounded',
                        children: [
                            {
                                id: 'submenu1',
                                title: 'Submenu 1-1',
                                path: '#',
                                children: [
                                    {
                                        id: 'submenu1-1',
                                        title: 'Submenu 1-1-1',
                                        path: '/about',
                                    },
                                    {
                                        id: 'submenu1-2',
                                        title: 'Submenu 1-1-2',
                                        path: '/menu1/submenu1/submenu1-2',
                                    },
                                ],
                            },
                            {
                                id: 'submenu2',
                                title: 'Submenu 1-2',
                                path: '/sales',
                            },
                        ],
                    },
                    {
                        id: 'menu2',
                        title: 'Sales',
                        path: '/menu2',
                        icon: 'ReceiptRounded',
                        children: [
                            {
                                id: 'submenu3',
                                title: 'Submenu 2-1',
                                path: '/menu2/submenu3',
                            },
                            {
                                id: 'submenu4',
                                title: 'Submenu 2-2',
                                path: '/menu2/submenu4',
                                children: [
                                    {
                                        id: 'submenu4-1',
                                        title: 'Submenu 2-2-1',
                                        path: '/about',
                                    },
                                    {
                                        id: 'submenu4-2',
                                        title: 'Submenu 2-2-2',
                                        path: '/menu2/submenu4/submenu4-2',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 'menu3',
                        title: 'Finance',
                        path: '/dashboard',
                        icon: 'PaidRounded',
                    },
                    {
                        id: 'menu4',
                        title: 'Settings',
                        path: '/dashboard',
                        icon: 'TuneRounded',
                    },
                ]
                setMenuData(data)
            } catch (error) {
                console.error('Failed to fetch menu data', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMenuData()
    }, [])

    const handleMenuClick = (menu: string) => {
        setOpenMenu(openMenu === menu ? null : menu)
        setOpenSubMenu(null)
    }

    const handleSubMenuClick = (subMenu: string) => {
        setOpenSubMenu(openSubMenu === subMenu ? null : subMenu)
    }

    const isActive = (path: string) => {
        return location.pathname === path
    }

    const isMenuActive = (menu: MenuItem): boolean => {
        if (menu.children) {
            return menu.children.some(
                (submenu) => isActive(submenu.path) || isMenuActive(submenu)
            )
        }
        return isActive(menu.path)
    }

    if (loading) {
        return (
            <div className='w-[296px] h-full p-4 hidden lg:block rounded-tr-[15px] rounded-br-[15px] border bg-white'>
                Loading...
            </div>
        )
    }

    const handleIcon = (iconName: string, isActive: boolean) => {
        // Access the icon component dynamically from Icons
        const IconComponent = Icons[iconName as keyof typeof Icons]

        if (!IconComponent) {
            // Return null or a default component if the icon is not found
            return <span>Icon not found</span>
        }

        try {
            return (
                <Suspense fallback={<span>Loading...</span>}>
                    <IconComponent
                        fontSize='small'
                        sx={{
                            color: `${isActive ? '#8470ff' : ''}`,
                        }}
                    />
                </Suspense>
            )
        } catch (error) {
            return <span>Error loading icon</span>
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div
            className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-50 h-full ${
                isCollapsed ? 'w-20' : 'w-64'
            } bg-white shadow-xl text-textPrimary text-sm`}
            onMouseEnter={() => {
                isCollapsed ? setIsCollapsed(false) : null
            }}
            onMouseLeave={() => {
                isCollapsed ? setIsCollapsed(true) : null
            }}
        >
            <div className='flex justify-between items-center mb-6 p-4'>
                <img
                    src={logo}
                    alt='logo'
                    className={`h-[50px] ${isCollapsed ? 'hidden' : 'block'}`}
                />
                <button onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Icons.Menu />
                </button>
            </div>
            <ul className='space-y-2'>
                {menuData.map((menu) => (
                    <li
                        key={menu.id}
                        className={`${
                            isMenuActive(menu) ? 'bg-gmiPrimary/10' : ''
                        } rounded-[10px] mt-0`}
                    >
                        <div
                            className='cursor-pointer transition-transform py-2 px-3 flex gap-4 justify-between items-center'
                            onClick={() => handleMenuClick(menu.id)}
                        >
                            <div className='flex gap-3 items-center'>
                                {menu.icon ? (
                                    handleIcon(menu.icon, isMenuActive(menu))
                                ) : (
                                    <span>Icon not found</span>
                                )}
                                {!isCollapsed && <p>{menu.title}</p>}
                            </div>
                            {!isCollapsed && menu.children && (
                                <KeyboardArrowRightRoundedIcon
                                    fontSize='small'
                                    className={`${
                                        openMenu === menu.id
                                            ? 'transform rotate-90 text-textSecondary'
                                            : 'text-textSecondary'
                                    }`}
                                />
                            )}
                        </div>
                        {!isCollapsed &&
                            openMenu === menu.id &&
                            menu.children && (
                                <ul className='pl-4'>
                                    {menu.children.map((submenu) => (
                                        <li
                                            key={submenu.id}
                                            className={`py-[4px] ${
                                                isActive(submenu.path)
                                                    ? 'text-textPrimary'
                                                    : 'text-textSecondary'
                                            } rounded-2xl`}
                                        >
                                            {submenu.children ? (
                                                <>
                                                    <div
                                                        className='ml-4 flex gap-4 items-center cursor-pointer justify-between px-3'
                                                        onClick={() =>
                                                            handleSubMenuClick(
                                                                submenu.id
                                                            )
                                                        }
                                                    >
                                                        <p>{submenu.title}</p>
                                                        <KeyboardArrowRightRoundedIcon
                                                            fontSize='small'
                                                            className={`${
                                                                openSubMenu ===
                                                                submenu.id
                                                                    ? 'transform rotate-90 text-textSecondary'
                                                                    : 'text-textSecondary'
                                                            }`}
                                                        />
                                                    </div>
                                                    {openSubMenu ===
                                                        submenu.id && (
                                                        <ul className='pl-4 mt-1 ml-4'>
                                                            {submenu.children.map(
                                                                (
                                                                    subSubMenu
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            subSubMenu.id
                                                                        }
                                                                        className={`py-[4px] ${
                                                                            isActive(
                                                                                subSubMenu.path
                                                                            )
                                                                                ? 'text-gmiPrimary'
                                                                                : ''
                                                                        } rounded-2xl`}
                                                                    >
                                                                        <Link
                                                                            to={
                                                                                subSubMenu.path
                                                                            }
                                                                        >
                                                                            <div className='ml-4'>
                                                                                {
                                                                                    subSubMenu.title
                                                                                }
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </>
                                            ) : (
                                                <Link
                                                    to={submenu.path}
                                                    className={`ml-7 ${
                                                        isActive(submenu.path)
                                                            ? 'text-gmiPrimary'
                                                            : ''
                                                    }`}
                                                >
                                                    {submenu.title}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar

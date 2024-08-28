// src/pages/Dashboard.tsx

import React from 'react'
import { useAuth } from '../../context/auth_context'

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth()
    console.log('user : ', user)
    return (
        <div className='h-[110vh] flex justify-between'>
            <div>
                <h2>Dashboard</h2>
                <p className=' font-bold text-pink-800'>
                    Welcome, {user?.email}!
                </p>
                <button onClick={logout}>Logout</button>
            </div>
            <div>kanan</div>
        </div>
    )
}

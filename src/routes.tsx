// src/routes.tsx

import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Login from './app/login'
import RequireAuth from './components/auth/require_auth'
import { About } from './app/about'
import { Dashboard } from './app/dashboard'
import { Sales } from './app/sales'

export const routes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <RequireAuth />,
        errorElement: <p>Tidak ada disini</p>,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'sales',
                element: <Sales />,
            },
        ],
    },
    {
        path: '*',
        element: <p>Error page</p>, // Route untuk menangani 404 atau page not found
    },
]

export const router = createBrowserRouter(routes)

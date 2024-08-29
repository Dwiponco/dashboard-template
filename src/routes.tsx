// src/routes.tsx

import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Login from './app/login'
import RequireAuth from './components/auth/require_auth'
import { Dashboard } from './app/dashboard'
import { EcomerceCustomer } from './app/e-commerce/order'
import { EcomerceOrder } from './app/e-commerce/customer'
import { SettingsProfile } from './app/settings/profile'
import { FinanceTransaction } from './app/finance/transaction'

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
                path: '/ecommerce',
                errorElement: <p>Tidak ada disini</p>,
                children: [
                    {
                        path: '/ecommerce/customers',
                        element: <EcomerceCustomer />,
                    },
                    {
                        path: '/ecommerce/orders',
                        element: <EcomerceOrder />,
                    },
                ],
            },
            {
                path: '/ecommerce',
                errorElement: <p>Tidak ada disini</p>,
                children: [
                    {
                        path: '/ecommerce/customers',
                        element: <EcomerceCustomer />,
                    },
                    {
                        path: '/ecommerce/orders',
                        element: <EcomerceOrder />,
                    },
                ],
            },
            {
                path: '/finance',
                errorElement: <p>Tidak ada disini</p>,
                children: [
                    {
                        path: '/finance/transaction',
                        element: <FinanceTransaction />,
                    },
                ],
            },
            {
                path: '/settings',
                errorElement: <p>Tidak ada disini</p>,
                children: [
                    {
                        path: '/settings/profile',
                        element: <SettingsProfile />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <p>Error page</p>, // Route untuk menangani 404 atau page not found
    },
]

export const router = createBrowserRouter(routes)

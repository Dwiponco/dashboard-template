// src/context/AuthContext.tsx

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react'
import { jwtDecode } from 'jwt-decode'

interface User {
    name: string
    email: string
    password: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => void
    logout: () => void
    isAuthenticated: boolean
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decodedUser = jwtDecode<User>(token) // Dekripsi token JWT untuk mendapatkan user
                setIsAuthenticated(true)
                setUser(decodedUser)
            } catch (error) {
                console.error('Invalid token:', error)
                setIsAuthenticated(false)
                setUser(null)
            }
        }
        setLoading(false)
    }, [])

    const login = (email: string, password: string) => {
        // Buat JWT manual untuk simulasi
        const simulatedToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiZHdpIHBvbmNvIiwiZW1haWwiOiJkd2lAZ21haWwuY29tIn0.LYE-B2QK7dAn3G_KxglFL069ttv3tBC3utg8IBuBOBQ'

        localStorage.setItem('token', simulatedToken)
        try {
            const decodedUser = jwtDecode<User>(simulatedToken) // Dekripsi token JWT
            setUser(decodedUser)
            setIsAuthenticated(true)
        } catch (error) {
            console.error('Invalid token:', error)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider
            value={{ user, login, logout, isAuthenticated, loading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

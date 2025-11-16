'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'
import { User, LoginCredentials, RegisterCredentials } from '@/types/user.types'
import { useToastContext } from './ToastProvider'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const toast = useToastContext()

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response = await authService.login(credentials)
      setUser(response.user)
      toast.success('Welcome back!', 'You have successfully logged in')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error('Login failed', error.message || 'Invalid credentials')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true)
      const response = await authService.register(credentials)
      setUser(response.user)
      toast.success('Welcome to Memorae!', 'Your account has been created successfully')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error('Registration failed', error.message || 'Please try again')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      toast.info('Logged out', 'You have been logged out successfully')
      router.push('/')
    } catch (error: any) {
      toast.error('Logout failed', error.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

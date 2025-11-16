import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/user.types'
import { ApiResponse } from '@/types/api.types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const data: ApiResponse<AuthResponse> = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Login failed')
    }

    if (data.data) {
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('refreshToken', data.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))
    }

    return data.data!
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const data: ApiResponse<AuthResponse> = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Registration failed')
    }

    if (data.data) {
      localStorage.setItem('accessToken', data.data.accessToken)
      localStorage.setItem('refreshToken', data.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(data.data.user))
    }

    return data.data!
  },

  async logout(): Promise<void> {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken')
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken')
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}

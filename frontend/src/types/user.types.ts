export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  whatsappNumber?: string
  subscription: {
    plan: 'free' | 'premium' | 'enterprise'
    status: 'active' | 'inactive' | 'cancelled'
    expiresAt?: Date
  }
  preferences: {
    notifications: {
      email: boolean
      whatsapp: boolean
      push: boolean
    }
    language: string
    timezone: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

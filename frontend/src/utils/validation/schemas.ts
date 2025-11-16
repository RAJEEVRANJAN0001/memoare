export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const passwordMinLength = 8

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required'
  if (!emailRegex.test(email)) return 'Invalid email format'
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required'
  if (password.length < passwordMinLength) {
    return `Password must be at least ${passwordMinLength} characters`
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number'
  }
  return null
}

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return null
}

export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required'
  if (name.length < 2) return 'Name must be at least 2 characters'
  if (name.length > 50) return 'Name must be less than 50 characters'
  return null
}

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`
  }
  return null
}

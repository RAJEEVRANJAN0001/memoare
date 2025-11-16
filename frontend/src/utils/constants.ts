export const APP_NAME = 'Memorae.ai'
export const APP_DESCRIPTION = 'Your AI-Powered WhatsApp Memory Partner'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  MEMORIES: '/memories',
  REMINDERS: '/reminders',
  SETTINGS: '/settings',
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  MEMORIES: {
    LIST: '/memories',
    CREATE: '/memories',
    GET: (id: string) => `/memories/${id}`,
    UPDATE: (id: string) => `/memories/${id}`,
    DELETE: (id: string) => `/memories/${id}`,
    SEARCH: '/memories/search',
  },
  REMINDERS: {
    LIST: '/reminders',
    CREATE: '/reminders',
    GET: (id: string) => `/reminders/${id}`,
    UPDATE: (id: string) => `/reminders/${id}`,
    DELETE: (id: string) => `/reminders/${id}`,
  },
} as const

export const MEMORY_CATEGORIES = [
  'Work',
  'Personal',
  'Learning',
  'Ideas',
  'Tasks',
  'Shopping',
  'Health',
  'Finance',
  'Travel',
  'Other',
] as const

export const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'green' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'high', label: 'High', color: 'red' },
] as const

export const SUBSCRIPTION_PLANS = [
  {
    name: 'Free',
    price: 0,
    features: [
      '50 memories per month',
      '10 reminders per month',
      'Basic search',
      'Email support',
    ],
  },
  {
    name: 'Premium',
    price: 9.99,
    features: [
      'Unlimited memories',
      'Unlimited reminders',
      'Advanced AI search',
      'WhatsApp integration',
      'Priority support',
      'Export data',
    ],
  },
  {
    name: 'Enterprise',
    price: 29.99,
    features: [
      'Everything in Premium',
      'Team collaboration',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'Advanced analytics',
    ],
  },
] as const

export const NOTIFICATION_CHANNELS = [
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { value: 'push', label: 'Push Notification', icon: '🔔' },
] as const

export const REPEAT_INTERVALS = [
  { value: 'none', label: 'Never' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
] as const

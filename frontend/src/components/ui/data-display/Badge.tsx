'use client'

import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const variantClasses = {
    default: 'bg-gray-500/20 text-gray-300',
    success: 'bg-green-500/20 text-green-300',
    error: 'bg-red-500/20 text-red-300',
    warning: 'bg-yellow-500/20 text-yellow-300',
    info: 'bg-cyan-500/20 text-cyan-300'
  }

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

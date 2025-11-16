'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type CardVariant = 'glass' | 'solid' | 'gradient' | 'elevated'

interface CardProps {
  children: ReactNode
  variant?: CardVariant
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

export const Card = ({
  children,
  variant = 'glass',
  className = '',
  hover = true,
  padding = 'md'
}: CardProps) => {
  const variantClasses = {
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
    solid: 'bg-gray-900 border border-gray-800',
    gradient: 'bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10',
    elevated: 'bg-gray-900 shadow-2xl border border-gray-800'
  }

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const hoverClass = hover ? 'hover:bg-white/10 transition-colors cursor-pointer' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-2xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClass}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const IconButton = ({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}: IconButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/10'
  }
  
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <Icon size={iconSizes[size]} />
    </motion.button>
  )
}

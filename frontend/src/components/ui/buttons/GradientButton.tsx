'use client'

import { motion } from 'framer-motion'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  gradient?: string
  animated?: boolean
}

export const GradientButton = ({
  children,
  gradient = 'from-cyan-500 via-blue-500 to-purple-500',
  animated = true,
  className = '',
  ...props
}: GradientButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-8 py-4 rounded-lg font-medium text-white overflow-hidden
        ${className}
      `}
      {...props}
    >
      <div
        className={`
          absolute inset-0 bg-gradient-to-r ${gradient}
          ${animated ? 'bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]' : ''}
        `}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

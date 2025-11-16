'use client'

import { User } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

export const Avatar = ({ src, alt = '', size = 'md', fallback }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white/20`}
      />
    )
  }

  if (fallback) {
    return (
      <div
        className={`
          ${sizeClasses[size]} rounded-full
          bg-gradient-to-br from-cyan-500 to-purple-500
          flex items-center justify-center
          font-semibold text-white border-2 border-white/20
        `}
      >
        {fallback}
      </div>
    )
  }

  return (
    <div
      className={`
        ${sizeClasses[size]} rounded-full
        bg-white/10 flex items-center justify-center
        text-gray-400 border-2 border-white/20
      `}
    >
      <User size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 32} />
    </div>
  )
}

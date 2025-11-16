'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  id: string
  type: ToastType
  message: string
  description?: string
  duration?: number
  onClose: (id: string) => void
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const colors = {
  success: 'from-green-500/20 to-emerald-500/20 border-green-500/50',
  error: 'from-red-500/20 to-rose-500/20 border-red-500/50',
  warning: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50',
  info: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50'
}

const iconColors = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-cyan-400'
}

export const Toast = ({ id, type, message, description, onClose }: ToastProps) => {
  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`
        flex items-start gap-3 p-4 rounded-lg backdrop-blur-xl
        bg-gradient-to-r ${colors[type]} border
        min-w-[300px] max-w-[500px] shadow-2xl
      `}
    >
      <Icon className={`${iconColors[type]} flex-shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        <p className="font-medium text-white">{message}</p>
        {description && (
          <p className="text-sm text-gray-300 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  )
}

export const ToastContainer = ({ toasts, onClose }: { toasts: ToastProps[], onClose: (id: string) => void }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { ToastProps, ToastType } from '@/components/ui/feedback/Toast'

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((
    type: ToastType,
    message: string,
    description?: string,
    duration = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: ToastProps = {
      id,
      type,
      message,
      description,
      duration,
      onClose: removeToast
    }

    setToasts((prev) => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [removeToast])

  const success = useCallback((message: string, description?: string) => {
    addToast('success', message, description)
  }, [addToast])

  const error = useCallback((message: string, description?: string) => {
    addToast('error', message, description)
  }, [addToast])

  const warning = useCallback((message: string, description?: string) => {
    addToast('warning', message, description)
  }, [addToast])

  const info = useCallback((message: string, description?: string) => {
    addToast('info', message, description)
  }, [addToast])

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast
  }
}

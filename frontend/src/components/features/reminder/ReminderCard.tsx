'use client'

import { motion } from 'framer-motion'
import { formatDateTime, formatTime } from '@/utils/format/date'
import { Badge } from '@/components/ui/data-display/Badge'
import { Bell, Calendar, Repeat } from 'lucide-react'

interface ReminderCardProps {
  reminder: {
    id: string
    title: string
    description?: string
    scheduledFor: Date
    priority: 'low' | 'medium' | 'high'
    repeatInterval: string
    status: string
  }
  onClick?: () => void
}

export const ReminderCard = ({ reminder, onClick }: ReminderCardProps) => {
  const priorityColors = {
    low: 'success' as const,
    medium: 'warning' as const,
    high: 'error' as const
  }

  const priorityGradients = {
    low: 'from-green-500/20 to-emerald-500/20',
    medium: 'from-yellow-500/20 to-orange-500/20',
    high: 'from-red-500/20 to-rose-500/20'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        bg-gradient-to-r ${priorityGradients[reminder.priority]}
        backdrop-blur-xl rounded-xl p-6 border border-white/10
        hover:border-cyan-500/50 transition-all cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="text-cyan-400" size={20} />
          <h3 className="text-lg font-semibold text-white">{reminder.title}</h3>
        </div>
        <Badge variant={priorityColors[reminder.priority]}>
          {reminder.priority}
        </Badge>
      </div>

      {reminder.description && (
        <p className="text-gray-300 text-sm mb-4">
          {reminder.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={14} />
            <span>{formatDateTime(reminder.scheduledFor)}</span>
          </div>
          {reminder.repeatInterval !== 'none' && (
            <div className="flex items-center gap-1 text-xs text-cyan-400">
              <Repeat size={14} />
              <span>{reminder.repeatInterval}</span>
            </div>
          )}
        </div>

        <span className="text-xs font-medium text-gray-400">
          {formatTime(reminder.scheduledFor)}
        </span>
      </div>
    </motion.div>
  )
}

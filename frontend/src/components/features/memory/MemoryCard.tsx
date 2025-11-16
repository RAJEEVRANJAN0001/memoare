'use client'

import { motion } from 'framer-motion'
import { formatRelativeTime } from '@/utils/format/date'
import { Badge } from '@/components/ui/data-display/Badge'
import { Brain, Calendar, Tag } from 'lucide-react'

interface MemoryCardProps {
  memory: {
    id: string
    title: string
    content: string
    category: string
    tags: string[]
    createdAt: Date
    metadata?: {
      importance?: 'low' | 'medium' | 'high'
    }
  }
  onClick?: () => void
}

export const MemoryCard = ({ memory, onClick }: MemoryCardProps) => {
  const importanceColors = {
    low: 'default' as const,
    medium: 'warning' as const,
    high: 'error' as const
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="text-cyan-400" size={20} />
          <h3 className="text-lg font-semibold text-white">{memory.title}</h3>
        </div>
        {memory.metadata?.importance && (
          <Badge variant={importanceColors[memory.metadata.importance]}>
            {memory.metadata.importance}
          </Badge>
        )}
      </div>

      <p className="text-gray-300 text-sm line-clamp-2 mb-4">
        {memory.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Tag size={14} />
            <span>{memory.category}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={14} />
            <span>{formatRelativeTime(memory.createdAt)}</span>
          </div>
        </div>

        {memory.tags.length > 0 && (
          <div className="flex gap-1">
            {memory.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

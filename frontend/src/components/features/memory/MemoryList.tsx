'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/forms/Input'
import { Button } from '@/components/ui/buttons/Button'
import { MemoryCard } from './MemoryCard'
import { Search, Filter } from 'lucide-react'

interface Memory {
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

interface MemoryListProps {
  memories: Memory[]
  onMemoryClick?: (memory: Memory) => void
}

export const MemoryList = ({ memories, onMemoryClick }: MemoryListProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || memory.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(memories.map(m => m.category)))

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="secondary">
          <Filter size={20} />
          Filter
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm transition-all ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Memory Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        layout
      >
        {filteredMemories.map((memory, index) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MemoryCard memory={memory} onClick={() => onMemoryClick?.(memory)} />
          </motion.div>
        ))}
      </motion.div>

      {filteredMemories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No memories found</p>
        </div>
      )}
    </div>
  )
}

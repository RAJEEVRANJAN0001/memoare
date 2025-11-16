'use client'

import { motion } from 'framer-motion'
import { Brain, Search, Filter, Plus } from 'lucide-react'

export default function MemoriesPage() {
  const memories = [
    { id: 1, title: 'Meeting with John', content: 'Discussed Q4 goals and team expansion', date: '2 hours ago', category: 'Work' },
    { id: 2, title: 'Shopping List', content: 'Milk, eggs, bread, coffee, fruits', date: '1 day ago', category: 'Personal' },
    { id: 3, title: 'Book Recommendations', content: 'Atomic Habits, Deep Work, The Almanack', date: '3 days ago', category: 'Learning' },
  ]

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Memories</h1>
            <p className="text-gray-400">All your captured moments in one place</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium flex items-center gap-2"
          >
            <Plus size={20} />
            New Memory
          </motion.button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search memories..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white flex items-center gap-2 hover:bg-white/10">
            <Filter size={20} />
            Filter
          </button>
        </div>

        <div className="grid gap-4">
          {memories.map((memory) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg">
                    <Brain className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{memory.title}</h3>
                    <span className="text-sm text-gray-500">{memory.date}</span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {memory.category}
                </span>
              </div>
              <p className="text-gray-400">{memory.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

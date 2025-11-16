'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Calendar, Tag, Clock, TrendingUp, Sparkles } from 'lucide-react'

const sampleMemories = [
  {
    id: 1,
    title: 'Team Meeting Notes',
    content: 'Discussed Q4 roadmap and new feature prioritization. Key decisions made on API improvements.',
    category: 'Work',
    tags: ['meeting', 'roadmap', 'planning'],
    importance: 'high',
    date: '2 hours ago',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 2,
    title: 'Birthday Party Ideas',
    content: 'Planning surprise party for Sarah. Venue options: Beach House or Garden Restaurant.',
    category: 'Personal',
    tags: ['birthday', 'celebration', 'planning'],
    importance: 'medium',
    date: '1 day ago',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 3,
    title: 'React Performance Tips',
    content: 'Key optimization strategies: memo, useMemo, useCallback, code splitting, lazy loading.',
    category: 'Learning',
    tags: ['react', 'performance', 'optimization'],
    importance: 'high',
    date: '3 days ago',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Grocery Shopping List',
    content: 'Weekly groceries: Milk, Eggs, Bread, Vegetables, Fruits, Chicken, Pasta, Rice.',
    category: 'Tasks',
    tags: ['shopping', 'groceries', 'weekly'],
    importance: 'low',
    date: '5 days ago',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    title: 'Investment Research',
    content: 'Looking into index funds vs individual stocks. Vanguard S&P 500 showing consistent returns.',
    category: 'Finance',
    tags: ['investment', 'stocks', 'research'],
    importance: 'high',
    date: '1 week ago',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 6,
    title: 'Vacation Planning',
    content: 'Japan trip ideas: Tokyo, Kyoto, Osaka. Best time to visit: March-May or September-November.',
    category: 'Travel',
    tags: ['vacation', 'japan', 'travel'],
    importance: 'medium',
    date: '1 week ago',
    gradient: 'from-blue-500 to-indigo-500'
  }
]

const stats = [
  { label: 'Avg Rating', value: '4.9/5', icon: Sparkles },
  { label: 'Happy Users', value: '100K+', icon: TrendingUp },
  { label: 'Tasks Managed', value: '5M+', icon: Brain },
  { label: 'Would Recommend', value: '99%', icon: TrendingUp }
]

export default function MemoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0B2E] via-[#0A0118] to-[#1A0B2E]" />
      
      {/* Animated Grid */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* Stats Section */}
        <motion.div
          style={{ opacity, scale }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl" />
                    
                    <div className="relative">
                      <Icon className="w-8 h-8 text-cyan-400 mb-3" />
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-1">
                        {stat.value}
                      </h4>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Memories,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {' '}Beautifully Organized
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how Memorae transforms scattered information into an organized knowledge base
          </p>
        </motion.div>

        {/* Memory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all overflow-hidden">
                {/* Gradient Glow on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className={`absolute inset-0 bg-gradient-to-r ${memory.gradient} opacity-10 blur-xl`}
                />

                {/* Content */}
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`w-10 h-10 bg-gradient-to-r ${memory.gradient} rounded-xl flex items-center justify-center`}
                      >
                        <Brain className="w-5 h-5 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-white line-clamp-1">
                          {memory.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 bg-gradient-to-r ${memory.gradient} bg-opacity-20 text-xs rounded-full text-white`}>
                            {memory.category}
                          </span>
                          <span className={`
                            px-2 py-0.5 text-xs rounded-full
                            ${memory.importance === 'high' ? 'bg-red-500/20 text-red-300' : ''}
                            ${memory.importance === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : ''}
                            ${memory.importance === 'low' ? 'bg-green-500/20 text-green-300' : ''}
                          `}>
                            {memory.importance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                    {memory.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {memory.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {memory.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Saved
                    </div>
                  </div>
                </div>

                {/* Hover Indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${memory.gradient}`}
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${memory.gradient} rounded-full blur-sm`}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Join thousands of users organizing their digital life
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-semibold text-lg shadow-xl hover:shadow-cyan-500/50 transition-shadow"
          >
            Start Organizing Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

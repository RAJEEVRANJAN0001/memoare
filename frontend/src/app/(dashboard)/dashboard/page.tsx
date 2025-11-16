'use client'

import { motion } from 'framer-motion'
import { Brain, MessageSquare, Bell, Calendar, TrendingUp, Clock } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Memories', value: '1,234', icon: Brain, color: 'cyan' },
    { label: 'Messages Today', value: '42', icon: MessageSquare, color: 'purple' },
    { label: 'Active Reminders', value: '8', icon: Bell, color: 'orange' },
    { label: 'Events This Week', value: '15', icon: Calendar, color: 'green' },
  ]

  const recentActivity = [
    { time: '2 min ago', action: 'New memory created', type: 'Meeting notes with John' },
    { time: '15 min ago', action: 'Reminder triggered', type: 'Call Sarah about project' },
    { time: '1 hour ago', action: 'Memory updated', type: 'Shopping list for weekend' },
    { time: '3 hours ago', action: 'New event added', type: 'Team standup tomorrow' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#16001E] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here&apos;s your memory overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-lg`}>
                  <stat.icon className={`text-${stat.color}-400`} size={24} />
                </div>
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Clock className="text-gray-400 mt-1" size={20} />
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-gray-400 text-sm">{activity.type}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

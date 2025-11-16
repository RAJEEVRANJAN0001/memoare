'use client'

import { motion } from 'framer-motion'
import { Bell, Plus, Clock } from 'lucide-react'

export default function RemindersPage() {
  const reminders = [
    { id: 1, title: 'Call Sarah', time: 'Today at 3:00 PM', priority: 'high' },
    { id: 2, title: 'Team Meeting', time: 'Tomorrow at 10:00 AM', priority: 'medium' },
    { id: 3, title: 'Submit Report', time: 'Friday at 5:00 PM', priority: 'high' },
    { id: 4, title: 'Dentist Appointment', time: 'Next Monday at 2:00 PM', priority: 'low' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-orange-500'
      case 'medium': return 'from-yellow-500 to-orange-500'
      case 'low': return 'from-green-500 to-emerald-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Reminders</h1>
            <p className="text-gray-400">Never miss an important moment</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium flex items-center gap-2"
          >
            <Plus size={20} />
            New Reminder
          </motion.button>
        </div>

        <div className="grid gap-4">
          {reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gradient-to-r ${getPriorityColor(reminder.priority)}/20 rounded-lg`}>
                    <Bell className={`bg-gradient-to-r ${getPriorityColor(reminder.priority)} bg-clip-text text-transparent`} size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{reminder.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={16} />
                      <span>{reminder.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 bg-gradient-to-r ${getPriorityColor(reminder.priority)}/20 text-white rounded-full text-sm capitalize`}>
                  {reminder.priority}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, Globe } from 'lucide-react'

export default function SettingsPage() {
  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      description: 'Manage your account information',
      color: 'cyan',
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Configure notification preferences',
      color: 'purple',
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your data and security settings',
      color: 'green',
    },
    {
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel',
      color: 'pink',
    },
    {
      title: 'Language & Region',
      icon: Globe,
      description: 'Set your language and timezone',
      color: 'orange',
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your preferences and account settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-gradient-to-r from-${section.color}-500/20 to-${section.color}-600/20 rounded-lg`}>
                  <section.icon className={`text-${section.color}-400`} size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

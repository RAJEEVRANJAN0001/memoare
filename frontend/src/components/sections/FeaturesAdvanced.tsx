'use client'

import { motion, useInView } from 'framer-motion'
import { Brain, MessageSquare, Calendar, Bell, Search, Sparkles, Zap, Shield } from 'lucide-react'
import { useRef } from 'react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Memory',
    description: 'Never forget important information with our intelligent memory system that learns from your interactions.',
    color: 'from-cyan-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-cyan-50 to-blue-50',
    iconBg: 'bg-cyan-500',
    delay: 0
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Integration',
    description: 'Seamlessly integrated with WhatsApp for effortless communication and memory capture.',
    color: 'from-green-500 to-emerald-600',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-50',
    iconBg: 'bg-green-500',
    delay: 0.1
  },
  {
    icon: Calendar,
    title: 'Smart Calendar Sync',
    description: 'Automatically syncs with your calendar and sends intelligent reminders for all your events.',
    color: 'from-purple-500 to-pink-600',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-50',
    iconBg: 'bg-purple-500',
    delay: 0.2
  },
  {
    icon: Bell,
    title: 'Intelligent Reminders',
    description: 'Get context-aware reminders at the perfect time based on your habits and preferences.',
    color: 'from-orange-500 to-red-600',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-50',
    iconBg: 'bg-orange-500',
    delay: 0.3
  },
  {
    icon: Search,
    title: 'Instant Search',
    description: 'Find any memory, message, or reminder instantly with powerful AI-powered search.',
    color: 'from-indigo-500 to-purple-600',
    gradient: 'bg-gradient-to-br from-indigo-50 to-purple-50',
    iconBg: 'bg-indigo-500',
    delay: 0.4
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is encrypted end-to-end. We never share or sell your information.',
    color: 'from-teal-500 to-cyan-600',
    gradient: 'bg-gradient-to-br from-teal-50 to-cyan-50',
    iconBg: 'bg-teal-500',
    delay: 0.5
  }
]

const FeaturesAdvanced = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Everything You Need
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-transparent bg-clip-text">
              In One Place
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Memorae combines powerful AI with intuitive design to give you the ultimate memory assistant experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} isInView={isInView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore All Features
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="w-5 h-5" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

const FeatureCard = ({ feature, isInView }: { feature: typeof features[0], isInView: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = feature.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="relative h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
        {/* Gradient Background on Hover */}
        <motion.div
          className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-6"
          >
            <div className={`relative p-4 ${feature.iconBg} rounded-2xl shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
              
              {/* Animated Ring */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className={`absolute inset-0 ${feature.iconBg} rounded-2xl`}
              />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>

          {/* Hover Arrow */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="mt-6 flex items-center text-sm font-semibold text-transparent bg-gradient-to-r bg-clip-text opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ 
              backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
              backgroundClip: 'text'
            }}
          >
            <span className={`bg-gradient-to-r ${feature.color} text-transparent bg-clip-text`}>
              Learn more →
            </span>
          </motion.div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  )
}

export default FeaturesAdvanced

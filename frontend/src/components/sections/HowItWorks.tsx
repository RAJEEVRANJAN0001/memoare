'use client'

import { motion } from 'framer-motion'
import { Download, Sparkles, FolderSearch, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Download,
      number: '01',
      title: 'Capture Everything',
      description: 'Save information from any source - voice notes, web pages, documents, or manual entries.',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Sparkles,
      number: '02',
      title: 'AI Organizes Automatically',
      description: 'Our intelligent AI categorizes, tags, and connects your memories without any manual effort.',
      color: 'from-pink-500 to-rose-600',
    },
    {
      icon: FolderSearch,
      number: '03',
      title: 'Search & Discover',
      description: 'Find anything instantly with natural language search or explore your knowledge graph.',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: CheckCircle,
      number: '04',
      title: 'Recall Effortlessly',
      description: 'Get contextual recommendations and never forget important information again.',
      color: 'from-green-500 to-emerald-600',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-purple-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            How It <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Four simple steps to transform how you manage information
          </motion.p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-16 mb-20 last:mb-0`}
            >
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block text-6xl font-bold text-gray-200 mb-4">
                  {step.number}
                </div>
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} mb-6`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1 relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-full max-w-md mx-auto aspect-square rounded-3xl bg-gradient-to-br ${step.color} p-1 shadow-2xl`}
                >
                  <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                    <step.icon className={`w-32 h-32 bg-gradient-to-br ${step.color} text-transparent bg-clip-text`} strokeWidth={1} />
                  </div>
                </motion.div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-primary-300 to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="#signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks

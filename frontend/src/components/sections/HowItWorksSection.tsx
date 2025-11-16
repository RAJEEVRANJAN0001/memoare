'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Mic, Sparkles, Search, Lightbulb, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Capture Everything',
    description: 'Save information from any source - voice notes, web pages, documents, or manual entries.',
    icon: Mic,
    gradient: 'from-cyan-500 to-blue-500',
    features: ['Voice Recording', 'Web Clipping', 'Document Upload', 'Manual Entry']
  },
  {
    number: '02',
    title: 'AI Organizes Automatically',
    description: 'Our intelligent AI categorizes, tags, and connects your memories without any manual effort.',
    icon: Sparkles,
    gradient: 'from-purple-500 to-pink-500',
    features: ['Smart Categories', 'Auto-Tagging', 'Knowledge Graph', 'Pattern Recognition']
  },
  {
    number: '03',
    title: 'Search & Discover',
    description: 'Find anything instantly with natural language search or explore your knowledge graph.',
    icon: Search,
    gradient: 'from-orange-500 to-red-500',
    features: ['Natural Language', 'Semantic Search', 'Advanced Filters', 'Visual Timeline']
  },
  {
    number: '04',
    title: 'Recall Effortlessly',
    description: 'Get contextual recommendations and never forget important information again.',
    icon: Lightbulb,
    gradient: 'from-green-500 to-emerald-500',
    features: ['Smart Reminders', 'Context-Aware', 'Proactive Alerts', 'Memory Links']
  }
]

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [100, 0, 0, -100])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0118] via-[#1A0B2E] to-[#0A0118]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {/* Glowing Orbs */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        style={{ opacity }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />

      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          style={{ opacity, y }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
              How It Works
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Four Simple Steps to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Transform Your Memory
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Start capturing and organizing your information in minutes. 
            No complex setup, no learning curve.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <span className={`text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}>
                      {step.number}
                    </span>
                    <div className={`w-16 h-1 bg-gradient-to-r ${step.gradient} rounded-full`} />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl text-gray-400 leading-relaxed"
                  >
                    {step.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {step.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex-1"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Card */}
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 overflow-hidden">
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-20 blur-xl`} />
                      
                      {/* Icon */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0, -5, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className={`relative mx-auto w-32 h-32 bg-gradient-to-r ${step.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-2xl`}
                      >
                        <Icon className="w-16 h-16 text-white" />
                        
                        {/* Pulse Effect */}
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut'
                          }}
                          className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-3xl`}
                        />
                      </motion.div>

                      {/* Decorative Elements */}
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${100 - i * 15}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className={`h-2 bg-gradient-to-r ${step.gradient} rounded-full opacity-50`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Floating Particles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -20, 0],
                          x: [0, 10, 0],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                        className={`absolute w-3 h-3 bg-gradient-to-r ${step.gradient} rounded-full blur-sm`}
                        style={{
                          top: `${20 + i * 30}%`,
                          right: `${10 + i * 10}%`
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl text-white font-semibold text-xl overflow-hidden shadow-2xl"
            >
              <motion.div
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <span className="relative flex items-center gap-3">
                Get Started Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
          </Link>
          <p className="mt-4 text-gray-400">
            No credit card required • Free 14-day trial
          </p>
        </motion.div>
      </div>
    </section>
  )
}

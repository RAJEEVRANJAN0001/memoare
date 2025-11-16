'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { MessageCircle, Clock, CheckCircle2, Sparkles, Phone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const InteractiveDemo = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })
  const [activeStep, setActiveStep] = useState(0)
  const controls = useAnimation()

  const steps = [
    {
      id: 1,
      title: 'Send a Message',
      description: 'Just text Memorae on WhatsApp like you would with a friend',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      message: "Remind me to call mom tomorrow at 3pm"
    },
    {
      id: 2,
      title: 'AI Processes',
      description: 'Our AI understands and extracts the important information',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      message: "Got it! I'll remind you to call mom tomorrow at 3:00 PM"
    },
    {
      id: 3,
      title: 'Get Reminded',
      description: 'Receive a timely reminder exactly when you need it',
      icon: Clock,
      color: 'from-cyan-500 to-blue-500',
      message: "⏰ Reminder: Call mom (3:00 PM)"
    }
  ]

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isInView, steps.length])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full mb-6"
          >
            <Phone className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-semibold text-gray-700">How It Works</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Simple as
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-transparent bg-clip-text">
              Sending a Text
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No apps to download, no complicated setup. Just WhatsApp and you're ready to go.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm">
                {/* Phone Frame */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-3 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full z-10" />
                  
                  {/* Screen */}
                  <div className="relative bg-white rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                    {/* WhatsApp Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Memorae</h3>
                        <p className="text-white/80 text-xs">Online</p>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white min-h-[400px]">
                      {steps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={
                            activeStep >= index
                              ? { opacity: 1, y: 0, scale: 1 }
                              : { opacity: 0, y: 20, scale: 0.8 }
                          }
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                              index % 2 === 0
                                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-tr-sm'
                                : 'bg-white text-gray-800 rounded-tl-sm border border-gray-200'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{step.message}</p>
                            <div className="flex items-center justify-end gap-1 mt-2">
                              <span className={`text-xs ${index % 2 === 0 ? 'text-white/70' : 'text-gray-500'}`}>
                                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                              </span>
                              {index % 2 === 0 && (
                                <CheckCircle2 className="w-4 h-4 text-white/70" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {activeStep < steps.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-lg border border-gray-200">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                  }}
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Clock className="w-10 h-10 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep >= index

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    onClick={() => setActiveStep(index)}
                    className="cursor-pointer group"
                  >
                    <div
                      className={`relative p-6 rounded-3xl transition-all duration-500 ${
                        isActive
                          ? 'bg-gradient-to-br from-white to-gray-50 shadow-2xl border-2 border-purple-200'
                          : 'bg-white/50 shadow-lg border border-gray-200 hover:shadow-xl'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Step Number & Icon */}
                        <motion.div
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                          className={`relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${step.color}`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                          {isActive && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color}`}
                            />
                          )}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                              >
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>
                          <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {isActive && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 3 }}
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-b-3xl origin-left`}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Try It Now - It's Free
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                →
              </motion.span>
            </span>
          </motion.button>
          <p className="mt-4 text-sm text-gray-600">No credit card required • Set up in 30 seconds</p>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveDemo

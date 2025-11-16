'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  Sparkles, 
  Brain, 
  Zap, 
  ArrowRight, 
  Phone, 
  MessageSquare,
  Star,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

const HeroFuturistic = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Futuristic Gradient Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#16001E]" />
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.2),transparent_50%)]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        
        {/* Scanlines effect */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(99,102,241,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
      </div>

      {/* Floating Orbs with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5
          }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-full blur-[100px]"
        />

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut'
            }}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.6)`,
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.8)'
            }}
          />
        ))}
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden cursor-pointer"
            >
              {/* Glass effect background */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10" style={{ borderRadius: '9999px' }} />
              
              {/* Animated gradient border */}
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50 blur-sm"
                style={{ borderRadius: '9999px' }}
              />
              
              {/* Content */}
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="relative"
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </motion.div>
              <span className="relative text-sm font-semibold bg-gradient-to-r from-white to-white/80 text-transparent bg-clip-text">
                Powered by Advanced AI Technology
              </span>
              <div className="relative w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
              <span className="block text-white mb-2">Your WhatsApp</span>
              <span className="relative inline-block">
                {/* Main gradient text */}
                <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                  Memory Partner
                </span>
                
                {/* Glowing underline */}
                <motion.div
                  animate={{
                    scaleX: [1, 1.05, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full blur-sm"
                />
              </span>
            </h1>

            {/* Subheading with typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto font-light"
            >
              <TypeAnimation
                sequence={[
                  'Remember everything that matters',
                  2500,
                  'Never miss important dates',
                  2500,
                  'Organize your life effortlessly',
                  2500,
                  'Get back 3 hours every week',
                  2500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Brain, text: 'AI-Powered', gradient: 'from-cyan-500 to-blue-500' },
              { icon: Zap, text: 'Instant Sync', gradient: 'from-purple-500 to-pink-500' },
              { icon: CheckCircle2, text: 'Smart Reminders', gradient: 'from-green-500 to-emerald-500' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative px-6 py-3 rounded-full overflow-hidden cursor-pointer"
              >
                {/* Glass background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10" />
                
                {/* Hover gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
                
                {/* Content */}
                <div className="relative flex items-center gap-2">
                  <feature.icon className="w-5 h-5 text-white" />
                  <span className="text-sm font-semibold text-white">{feature.text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            {/* Primary CTA */}
            <Link href="#signup" className="w-full sm:w-auto group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                className="relative w-full sm:w-auto px-10 py-6 rounded-2xl font-bold text-lg overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 via-purple-500 to-cyan-500 bg-[length:200%_100%]"
                />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                  <Phone className="w-5 h-5" />
                  Start Free Trial
                  <motion.span
                    animate={{ x: isHovering ? [0, 5, 0] : 0 }}
                    transition={{ duration: 0.6, repeat: isHovering ? Infinity : 0 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" style={{ clipPath: 'inset(0 round 16px)' }} />
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link href="#demo" className="w-full sm:w-auto group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full sm:w-auto px-10 py-6 rounded-2xl font-bold text-lg overflow-hidden"
              >
                {/* Glass background */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20" />
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                  <MessageSquare className="w-5 h-5" />
                  Watch Demo
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '100K+', label: 'Active Users', icon: '👥' },
              { value: '5M+', label: 'Memories Stored', icon: '🧠' },
              { value: '99.9%', label: 'Uptime', icon: '⚡' },
              { value: '4.9/5', label: 'User Rating', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                {/* Glass card */}
                <div className="relative p-6 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10" />
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Content */}
                  <div className="relative text-center">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-gray-400 font-semibold tracking-wider">SCROLL</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroFuturistic

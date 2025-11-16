'use client'

import { motion, useInView } from 'framer-motion'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    avatar: '👩‍💼',
    rating: 5,
    text: 'Memorae has completely transformed how I manage my work and personal life. I never miss important meetings or forget to follow up with clients anymore. It\'s like having a personal assistant in my pocket!',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Entrepreneur',
    company: 'StartupX',
    avatar: '👨‍💻',
    rating: 5,
    text: 'As someone juggling multiple projects, Memorae keeps me organized effortlessly. The AI understands context incredibly well, and the WhatsApp integration means I\'m always connected without another app to check.',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'from-cyan-50 to-blue-50'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Student',
    company: 'Stanford University',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'Between classes, assignments, and extracurriculars, Memorae helps me stay on top of everything. The smart reminders ensure I never miss a deadline, and it\'s so easy to use!',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50'
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Marketing Director',
    company: 'Creative Agency',
    avatar: '👨‍🎨',
    rating: 5,
    text: 'I love how natural it feels to use Memorae. Just send a message and it takes care of the rest. It\'s saved me countless hours and reduced my stress levels significantly.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: 'Healthcare Professional',
    company: 'City Hospital',
    avatar: '👩‍⚕️',
    rating: 5,
    text: 'In my field, remembering patient follow-ups and medication schedules is crucial. Memorae ensures I never miss anything important. It\'s become an indispensable tool in my daily routine.',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Freelance Designer',
    company: 'Self-Employed',
    avatar: '👨‍🎨',
    rating: 5,
    text: 'Managing multiple clients and deadlines was overwhelming until I found Memorae. Now everything is organized, and I can focus on my creative work instead of worrying about forgetting tasks.',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'from-teal-50 to-cyan-50'
  }
]

const TestimonialsAdvanced = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ]

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-purple-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-cyan-300/30 to-blue-300/30 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Loved by Thousands</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6">
            What People Are
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-transparent bg-clip-text">
              Saying About Us
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their productivity with Memorae.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-purple-300"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </motion.button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-4 bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-purple-300"
            >
              <ArrowRight className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: '4.9', label: 'Average Rating', suffix: '/5' },
            { value: '100K+', label: 'Happy Users', suffix: '' },
            { value: '5M+', label: 'Tasks Managed', suffix: '' },
            { value: '99%', label: 'Would Recommend', suffix: '' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg"
            >
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text mb-2">
                {stat.value}
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ 
  testimonial, 
  index, 
  isInView 
}: { 
  testimonial: typeof testimonials[0]
  index: number
  isInView: boolean 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className={`relative h-full bg-gradient-to-br ${testimonial.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white overflow-hidden`}>
        {/* Quote Icon */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-4 right-4 opacity-10"
        >
          <Quote className="w-20 h-20 text-gray-900" />
        </motion.div>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex mb-6"
        >
          <div className="text-6xl relative z-10">
            {testimonial.avatar}
          </div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} rounded-full blur-xl`}
          />
        </motion.div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Text */}
        <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
          "{testimonial.text}"
        </p>

        {/* Author */}
        <div className="relative z-10">
          <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
          <p className="text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent" style={{
            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
            backgroundClip: 'text'
          }}>
            <span className={`bg-gradient-to-r ${testimonial.color} text-transparent bg-clip-text`}>
              {testimonial.company}
            </span>
          </p>
        </div>

        {/* Shine Effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 2
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
        />
      </div>
    </motion.div>
  )
}

export default TestimonialsAdvanced

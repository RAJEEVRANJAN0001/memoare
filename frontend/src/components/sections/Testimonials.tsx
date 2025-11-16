'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'Tech Corp',
      content: 'Memorae has completely transformed how I manage my projects. I can capture ideas on the go and find them instantly when I need them. It\'s like having a photographic memory!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'PhD Researcher',
      company: 'Stanford University',
      content: 'As a researcher, I deal with hundreds of papers and notes. Memorae\'s AI organization and knowledge graph have saved me countless hours. It\'s an absolute game-changer.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Creative Director',
      company: 'Design Studio',
      content: 'The ability to capture inspiration from anywhere and have it automatically organized is incredible. Memorae has become an essential part of my creative process.',
      rating: 5,
    },
    {
      name: 'David Park',
      role: 'Entrepreneur',
      company: 'Startup Founder',
      content: 'Running a startup means juggling a million things. Memorae keeps me organized and ensures I never miss important details. It\'s my secret weapon for productivity.',
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Loved by <span className="gradient-text">Thousands</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            See what our users have to say about their experience
          </motion.p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="bg-gradient-to-br from-purple-50 to-cyan-50 rounded-3xl p-8 md:p-12 shadow-xl relative">
                  {/* Quote Icon */}
                  <div className="absolute top-8 left-8 opacity-10">
                    <Quote className="w-20 h-20 text-primary-600" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6 justify-center md:justify-start">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed text-center md:text-left">
                      "{testimonials[activeIndex].content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[activeIndex].name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">
                          {testimonials[activeIndex].name}
                        </div>
                        <div className="text-gray-600">
                          {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: '50K+', label: 'Happy Users' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '10M+', label: 'Memories Saved' },
            { value: '99%', label: 'Would Recommend' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials

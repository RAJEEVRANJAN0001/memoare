'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does the AI organization work?',
      answer: 'Our AI analyzes the content you capture and automatically categorizes it based on context, topics, and relationships. It creates smart tags and connections between related information, making it easy to find and discover insights later.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. All your data is encrypted end-to-end, both in transit and at rest. We use industry-standard security protocols and never sell or share your data with third parties. You own your memories, always.',
    },
    {
      question: 'Can I import my existing notes from other apps?',
      answer: 'Yes! We support imports from popular note-taking apps like Evernote, Notion, OneNote, and more. Our team can also help with custom imports if you have specific needs.',
    },
    {
      question: 'What platforms does Memorae support?',
      answer: 'Memorae works on all major platforms including web browsers, iOS, Android, Windows, and macOS. Your memories sync seamlessly across all your devices in real-time.',
    },
    {
      question: 'How does the free trial work?',
      answer: 'You get full access to all Pro features for 14 days, no credit card required. If you decide to continue after the trial, you can choose a plan that fits your needs. If not, you can downgrade to the free plan.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees, and you\'ll continue to have access until the end of your billing period.',
    },
    {
      question: 'Do you offer discounts for students or nonprofits?',
      answer: 'Yes! We offer a 50% discount for students with a valid .edu email address and special pricing for nonprofit organizations. Contact our support team to learn more.',
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'Free plan users get email support with 48-hour response times. Pro users get priority email support with 24-hour response times. Team plan users get dedicated support with same-day responses and optional phone support.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
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
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Find answers to common questions about Memorae
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 bg-primary-600' : ''
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 text-primary-600" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors duration-200"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ

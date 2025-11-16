'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement password reset logic
    console.log('Password reset for:', email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0118] via-[#1A0B2E] to-[#16001E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          {!submitted ? (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
              <p className="text-gray-400 mb-8">
                Enter your email and we'll send you a reset link
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-shadow"
                >
                  Send Reset Link
                  <ArrowRight size={20} />
                </motion.button>
              </form>

              <a
                href="/login"
                className="mt-6 flex items-center justify-center gap-2 text-gray-400 hover:text-cyan-400"
              >
                <ArrowLeft size={20} />
                Back to login
              </a>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
              <p className="text-gray-400 mb-8">
                We've sent a password reset link to <strong className="text-white">{email}</strong>
              </p>
              <a
                href="/login"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <ArrowLeft size={20} />
                Back to login
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

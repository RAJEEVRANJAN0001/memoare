'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Video, MoreVertical, Mic, Smile, Paperclip, Send, Check, CheckCheck, Clock } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  time: string
  status: 'sending' | 'sent' | 'delivered' | 'read'
  type?: 'text' | 'reminder'
}

const WhatsAppChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Memorae, your AI memory assistant 👋",
      sender: 'bot',
      time: '10:30',
      status: 'read',
    },
    {
      id: 2,
      text: "I can help you remember anything - just send me a message!",
      sender: 'bot',
      time: '10:30',
      status: 'read',
    },
    {
      id: 3,
      text: "Remind me to call mom tomorrow at 3pm",
      sender: 'user',
      time: '10:31',
      status: 'read',
    },
    {
      id: 4,
      text: "✅ Got it! I'll remind you to call mom tomorrow at 3:00 PM",
      sender: 'bot',
      time: '10:31',
      status: 'read',
      type: 'reminder'
    }
  ])
  
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: 'sending'
    }

    setMessages([...messages, newMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false)
      const botResponse: Message = {
        id: messages.length + 2,
        text: "I've saved that for you! I'll make sure you don't forget 😊",
        sender: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        status: 'read'
      }
      setMessages(prev => [...prev, botResponse])
    }, 2000)
  }

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Phone Frame */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Phone Shell */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-[3.5rem] p-4 shadow-2xl">
          {/* Notch */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-full z-20 flex items-center justify-center">
            <div className="w-16 h-1 bg-gray-900 rounded-full" />
          </div>

          {/* Screen */}
          <div 
            className="relative bg-white rounded-[3rem] overflow-hidden shadow-inner"
            style={{ aspectRatio: '9/19.5' }}
          >
            {/* WhatsApp Header */}
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="relative bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-lg"
            >
              {/* Back Button & Avatar */}
              <div className="flex items-center gap-3 flex-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                  </svg>
                </motion.button>

                {/* Profile */}
                <div className="flex items-center gap-3 flex-1">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="relative"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-xl">🧠</span>
                    </div>
                    {/* Online indicator */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075E54]" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">Memorae AI</h3>
                    <p className="text-xs text-white/80">Online</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <motion.button whileTap={{ scale: 0.9 }}>
                  <Video className="w-5 h-5" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }}>
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }}>
                  <MoreVertical className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Chat Background */}
            <div className="relative h-full bg-[#E5DDD5]">
              {/* WhatsApp pattern background */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />

              {/* Messages Container */}
              <div className="relative h-[calc(100%-8rem)] overflow-y-auto px-4 py-4 space-y-2">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      delay={index * 0.1}
                    />
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white rounded-lg rounded-tl-sm px-4 py-3 shadow-md max-w-[80%]">
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

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#F0F0F0] px-2 py-2 flex items-center gap-2 shadow-lg">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Smile className="w-6 h-6" />
                </motion.button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message"
                    className="w-full bg-white rounded-full px-4 py-2.5 text-sm focus:outline-none shadow-sm"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </motion.button>
                </div>

                {inputText.trim() ? (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    className="p-2.5 bg-[#25D366] rounded-full text-white shadow-lg hover:bg-[#20BA5A] transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 bg-[#25D366] rounded-full text-white shadow-lg hover:bg-[#20BA5A] transition-colors"
                  >
                    <Mic className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements Around Phone */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center"
        >
          <span className="text-4xl">⚡</span>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center"
        >
          <span className="text-3xl">🧠</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

const MessageBubble = ({ message, delay }: { message: Message; delay: number }) => {
  const isUser = message.sender === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2.5 shadow-md ${
          isUser
            ? 'bg-[#D9FDD3] rounded-tr-sm'
            : message.type === 'reminder'
            ? 'bg-gradient-to-r from-purple-100 to-blue-100 rounded-tl-sm border border-purple-200'
            : 'bg-white rounded-tl-sm'
        }`}
      >
        <p className="text-sm text-gray-800 leading-relaxed">{message.text}</p>
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs text-gray-500">{message.time}</span>
          {isUser && getStatusIcon(message.status)}
        </div>
      </div>
    </motion.div>
  )
}

const getStatusIcon = (status: Message['status']) => {
  switch (status) {
    case 'sending':
      return <Clock className="w-3 h-3 text-gray-400" />
    case 'sent':
      return <Check className="w-3 h-3 text-gray-400" />
    case 'delivered':
      return <CheckCheck className="w-3 h-3 text-gray-400" />
    case 'read':
      return <CheckCheck className="w-3 h-3 text-blue-500" />
  }
}

export default WhatsAppChat

import rateLimit from 'express-rate-limit'
import { redisClient } from '../database/redis'
import { logger } from '../utils/logger'

export const createRateLimiter = (options: {
  windowMs?: number
  max?: number
  message?: string
}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
    max: options.max || 100,
    message: options.message || 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`)
      res.status(429).json({
        success: false,
        error: {
          message: options.message || 'Too many requests, please try again later',
          code: 'RATE_LIMIT_EXCEEDED'
        }
      })
    }
  })
}

// Specific rate limiters
export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many authentication attempts, please try again later'
})

export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
})

export const strictLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: 'Rate limit exceeded, please slow down'
})

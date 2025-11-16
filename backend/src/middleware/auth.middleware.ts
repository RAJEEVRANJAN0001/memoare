import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { logger } from '../utils/logger'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    subscription: {
      plan: string
      status: string
    }
  }
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      res.status(401).json({ error: { message: 'Authentication required' } })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
    }

    const user = await User.findById(decoded.userId).select(
      '-password -refreshTokens'
    )

    if (!user) {
      res.status(401).json({ error: { message: 'User not found' } })
      return
    }

    req.user = {
      id: (user._id as any).toString(),
      email: user.email,
      subscription: user.subscription,
    }

    next()
  } catch (error) {
    logger.error('Authentication error:', error)
    res.status(401).json({ error: { message: 'Invalid or expired token' } })
  }
}

export const authorize = (...allowedPlans: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: { message: 'Authentication required' } })
      return
    }

    if (!allowedPlans.includes(req.user.subscription.plan)) {
      res.status(403).json({
        error: {
          message: 'Insufficient permissions. Upgrade your plan.',
        },
      })
      return
    }

    next()
  }
}

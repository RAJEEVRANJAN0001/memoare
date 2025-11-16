import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { logger } from '../utils/logger'

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '15m',
  })
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d',
  })
  return { accessToken, refreshToken }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ error: { message: 'Email already registered' } })
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens((user._id as any).toString())

    // Save refresh token
    user.refreshTokens.push(refreshToken)
    await user.save()

    // Remove password from response
    const userResponse: any = user.toObject()
    delete userResponse.password
    delete userResponse.refreshTokens

    res.status(201).json({
      success: true,
      data: {
        user: userResponse,
        accessToken,
        refreshToken,
      },
    })
  } catch (error) {
    logger.error('Registration error:', error)
    res.status(500).json({ error: { message: 'Registration failed' } })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({ error: { message: 'Invalid credentials' } })
      return
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      res.status(401).json({ error: { message: 'Invalid credentials' } })
      return
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens((user._id as any).toString())

    // Save refresh token
    user.refreshTokens.push(refreshToken)
    await user.save()

    // Remove password from response
    const userResponse: any = user.toObject()
    delete userResponse.password
    delete userResponse.refreshTokens

    res.json({
      success: true,
      data: {
        user: userResponse,
        accessToken,
        refreshToken,
      },
    })
  } catch (error) {
    logger.error('Login error:', error)
    res.status(500).json({ error: { message: 'Login failed' } })
  }
}

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      res.status(401).json({ error: { message: 'Refresh token required' } })
      return
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: string }

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.userId)
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      res.status(401).json({ error: { message: 'Invalid refresh token' } })
      return
    }

    // Generate new tokens
    const tokens = generateTokens((user._id as any).toString())

    // Update refresh tokens
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken)
    user.refreshTokens.push(tokens.refreshToken)
    await user.save()

    res.json({
      success: true,
      data: tokens,
    })
  } catch (error) {
    logger.error('Refresh token error:', error)
    res.status(401).json({ error: { message: 'Invalid or expired token' } })
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string
      }
      const user = await User.findById(decoded.userId)

      if (user && refreshToken) {
        user.refreshTokens = user.refreshTokens.filter(
          (t) => t !== refreshToken
        )
        await user.save()
      }
    }

    res.json({ success: true, data: { message: 'Logged out successfully' } })
  } catch (error) {
    logger.error('Logout error:', error)
    res.status(500).json({ error: { message: 'Logout failed' } })
  }
}

import express, { Application, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware'
import { apiLimiter } from './middleware/rateLimit.middleware'

const app: Application = express()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Request logging
app.use(morgan('dev'))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting
app.use('/api', apiLimiter)

// Health check
app.get('/health', (_req, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API Routes
app.use('/api', routes)

// Error handling
app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app

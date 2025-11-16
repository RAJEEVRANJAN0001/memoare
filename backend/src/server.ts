import dotenv from 'dotenv'
import app from './app'
import { connectDatabase } from './database/connection'
import { connectRedis } from './database/redis'
import { logger } from './utils/logger'
import { startReminderJob } from './jobs/reminderJob'

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    // Connect to databases
    await connectDatabase()
    await connectRedis()

    // Start background jobs
    startReminderJob()

    // Start server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`)
      logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`)
      logger.info(`🔗 API base: http://localhost:${PORT}/api`)
    })

    // Graceful shutdown
    const gracefulShutdown = () => {
      logger.info('Received shutdown signal, closing server gracefully...')
      server.close(() => {
        logger.info('Server closed')
        process.exit(0)
      })

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Forcing shutdown...')
        process.exit(1)
      }, 10000)
    }

    process.on('SIGTERM', gracefulShutdown)
    process.on('SIGINT', gracefulShutdown)

    process.on('unhandledRejection', (error: Error) => {
      logger.error('Unhandled Promise Rejection:', error)
      gracefulShutdown()
    })

    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error)
      gracefulShutdown()
    })

    return server
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app

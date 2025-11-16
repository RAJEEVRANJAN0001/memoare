import { createClient } from 'redis'
import { databaseConfig } from '../config/database.config'
import { logger } from '../utils/logger'

export const redisClient = createClient({
  socket: {
    host: databaseConfig.redis.host,
    port: databaseConfig.redis.port,
  },
  password: databaseConfig.redis.password,
  database: databaseConfig.redis.db,
})

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect()
    logger.info('Redis connected successfully')

    redisClient.on('error', (error) => {
      logger.error('Redis error:', error)
    })

    redisClient.on('disconnect', () => {
      logger.warn('Redis disconnected')
    })
  } catch (error) {
    logger.error('Failed to connect to Redis:', error)
  }
}

export const disconnectRedis = async (): Promise<void> => {
  await redisClient.quit()
  logger.info('Redis disconnected')
}

import { Router } from 'express'
import authRoutes from './auth.routes'
import memoryRoutes from './memory.routes'
import reminderRoutes from './reminder.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/memories', memoryRoutes)
router.use('/reminders', reminderRoutes)

export default router

import { Router } from 'express'
import {
  getReminders,
  getReminderById,
  createReminder,
  updateReminder,
  deleteReminder,
  markComplete,
} from '../controllers/reminderController'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)

router.get('/', getReminders)
router.get('/:id', getReminderById)
router.post('/', createReminder)
router.put('/:id', updateReminder)
router.patch('/:id/complete', markComplete)
router.delete('/:id', deleteReminder)

export default router

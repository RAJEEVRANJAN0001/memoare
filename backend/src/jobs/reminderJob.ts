import { Reminder } from '../models/Reminder'
import { User } from '../models/User'
import { emailService } from '../services/email/emailService'
import { logger } from '../utils/logger'

export const reminderJob = {
  async processPendingReminders(): Promise<void> {
    try {
      const now = new Date()
      
      // Find all pending reminders that are due
      const dueReminders = await Reminder.find({
        status: 'pending',
        scheduledFor: { $lte: now }
      }).populate('userId')

      logger.info(`Processing ${dueReminders.length} due reminders`)

      for (const reminder of dueReminders) {
        try {
          const user = await User.findById(reminder.userId)
          
          if (!user) continue

          // Send notifications based on selected channels
          if (reminder.notificationChannels.includes('email') && user.email) {
            await emailService.sendReminderEmail(user.email, reminder)
          }

          // Update reminder status
          reminder.status = 'sent'
          reminder.sentAt = new Date()

          // Handle repeat interval
          if (reminder.repeatInterval !== 'none') {
            const nextSchedule = calculateNextSchedule(
              reminder.scheduledFor,
              reminder.repeatInterval
            )
            
            // Create new reminder for next occurrence
            await Reminder.create({
              userId: reminder.userId,
              memoryId: reminder.memoryId,
              title: reminder.title,
              description: reminder.description,
              scheduledFor: nextSchedule,
              repeatInterval: reminder.repeatInterval,
              priority: reminder.priority,
              notificationChannels: reminder.notificationChannels,
              status: 'pending'
            })
          }

          await reminder.save()
          logger.info(`Reminder ${reminder._id} processed successfully`)
        } catch (error) {
          logger.error(`Error processing reminder ${reminder._id}:`, error)
        }
      }
    } catch (error) {
      logger.error('Reminder job error:', error)
    }
  }
}

function calculateNextSchedule(
  currentDate: Date,
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly'
): Date {
  const next = new Date(currentDate)
  
  switch (interval) {
    case 'daily':
      next.setDate(next.getDate() + 1)
      break
    case 'weekly':
      next.setDate(next.getDate() + 7)
      break
    case 'monthly':
      next.setMonth(next.getMonth() + 1)
      break
    case 'yearly':
      next.setFullYear(next.getFullYear() + 1)
      break
  }
  
  return next
}

// Run every minute
export const startReminderJob = () => {
  setInterval(() => {
    reminderJob.processPendingReminders()
  }, 60000) // 60 seconds
  
  logger.info('Reminder job started')
}

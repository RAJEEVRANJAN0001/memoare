import { Response } from 'express'
import { Reminder } from '../models/Reminder'
import { AuthRequest } from '../middleware/auth.middleware'
import { logger } from '../utils/logger'

export const getReminders = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 20 } = req.query
    const userId = req.user!.id

    const reminders = await Reminder.find({ userId })
      .sort({ scheduledFor: 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Reminder.countDocuments({ userId })

    res.json({
      success: true,
      data: reminders,
      metadata: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    })
  } catch (error) {
    logger.error('Get reminders error:', error)
    res.status(500).json({ error: { message: 'Failed to fetch reminders' } })
  }
}

export const getReminderById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const reminder = await Reminder.findOne({ _id: id, userId })

    if (!reminder) {
      res.status(404).json({ error: { message: 'Reminder not found' } })
      return
    }

    res.json({ success: true, data: reminder })
  } catch (error) {
    logger.error('Get reminder error:', error)
    res.status(500).json({ error: { message: 'Failed to fetch reminder' } })
  }
}

export const createReminder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id
    const reminderData = { ...req.body, userId }

    const reminder = await Reminder.create(reminderData)

    res.status(201).json({ success: true, data: reminder })
  } catch (error) {
    logger.error('Create reminder error:', error)
    res.status(500).json({ error: { message: 'Failed to create reminder' } })
  }
}

export const updateReminder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const reminder = await Reminder.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    )

    if (!reminder) {
      res.status(404).json({ error: { message: 'Reminder not found' } })
      return
    }

    res.json({ success: true, data: reminder })
  } catch (error) {
    logger.error('Update reminder error:', error)
    res.status(500).json({ error: { message: 'Failed to update reminder' } })
  }
}

export const deleteReminder = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const reminder = await Reminder.findOneAndDelete({ _id: id, userId })

    if (!reminder) {
      res.status(404).json({ error: { message: 'Reminder not found' } })
      return
    }

    res.json({ success: true, data: { message: 'Reminder deleted' } })
  } catch (error) {
    logger.error('Delete reminder error:', error)
    res.status(500).json({ error: { message: 'Failed to delete reminder' } })
  }
}

export const markComplete = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const reminder = await Reminder.findOneAndUpdate(
      { _id: id, userId },
      { status: 'completed' },
      { new: true }
    )

    if (!reminder) {
      res.status(404).json({ error: { message: 'Reminder not found' } })
      return
    }

    res.json({ success: true, data: reminder })
  } catch (error) {
    logger.error('Mark complete error:', error)
    res.status(500).json({ error: { message: 'Failed to mark complete' } })
  }
}

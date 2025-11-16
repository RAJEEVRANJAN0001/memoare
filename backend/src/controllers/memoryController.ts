import { Response } from 'express'
import { Memory } from '../models/Memory'
import { AuthRequest } from '../middleware/auth.middleware'
import { logger } from '../utils/logger'

export const getMemories = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 20, category, search } = req.query
    const userId = req.user!.id

    const query: any = { userId }
    if (category) query.category = category
    if (search) {
      query.$text = { $search: search as string }
    }

    const memories = await Memory.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    const total = await Memory.countDocuments(query)

    res.json({
      success: true,
      data: memories,
      metadata: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    })
  } catch (error) {
    logger.error('Get memories error:', error)
    res.status(500).json({ error: { message: 'Failed to fetch memories' } })
  }
}

export const getMemoryById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const memory = await Memory.findOne({ _id: id, userId })

    if (!memory) {
      res.status(404).json({ error: { message: 'Memory not found' } })
      return
    }

    res.json({ success: true, data: memory })
  } catch (error) {
    logger.error('Get memory error:', error)
    res.status(500).json({ error: { message: 'Failed to fetch memory' } })
  }
}

export const createMemory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.id
    const memoryData = { ...req.body, userId }

    const memory = await Memory.create(memoryData)

    res.status(201).json({ success: true, data: memory })
  } catch (error) {
    logger.error('Create memory error:', error)
    res.status(500).json({ error: { message: 'Failed to create memory' } })
  }
}

export const updateMemory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const memory = await Memory.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true, runValidators: true }
    )

    if (!memory) {
      res.status(404).json({ error: { message: 'Memory not found' } })
      return
    }

    res.json({ success: true, data: memory })
  } catch (error) {
    logger.error('Update memory error:', error)
    res.status(500).json({ error: { message: 'Failed to update memory' } })
  }
}

export const deleteMemory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const memory = await Memory.findOneAndDelete({ _id: id, userId })

    if (!memory) {
      res.status(404).json({ error: { message: 'Memory not found' } })
      return
    }

    res.json({ success: true, data: { message: 'Memory deleted' } })
  } catch (error) {
    logger.error('Delete memory error:', error)
    res.status(500).json({ error: { message: 'Failed to delete memory' } })
  }
}

export const searchMemories = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { q } = req.query
    const userId = req.user!.id

    if (!q) {
      res.status(400).json({ error: { message: 'Search query required' } })
      return
    }

    const memories = await Memory.find({
      userId,
      $text: { $search: q as string },
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(50)

    res.json({ success: true, data: memories })
  } catch (error) {
    logger.error('Search memories error:', error)
    res.status(500).json({ error: { message: 'Search failed' } })
  }
}

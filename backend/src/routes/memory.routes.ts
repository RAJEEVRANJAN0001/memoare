import { Router } from 'express'
import {
  getMemories,
  getMemoryById,
  createMemory,
  updateMemory,
  deleteMemory,
  searchMemories,
} from '../controllers/memoryController'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.use(authenticate)

router.get('/', getMemories)
router.get('/search', searchMemories)
router.get('/:id', getMemoryById)
router.post('/', createMemory)
router.put('/:id', updateMemory)
router.delete('/:id', deleteMemory)

export default router

export interface Memory {
  id: string
  userId: string
  title: string
  content: string
  category: string
  tags: string[]
  source: 'whatsapp' | 'manual' | 'api'
  createdAt: Date
  updatedAt: Date
  metadata?: {
    location?: string
    contacts?: string[]
    importance?: 'low' | 'medium' | 'high'
  }
}

export interface CreateMemoryInput {
  title: string
  content: string
  category?: string
  tags?: string[]
  source?: 'whatsapp' | 'manual' | 'api'
  metadata?: Memory['metadata']
}

export interface UpdateMemoryInput extends Partial<CreateMemoryInput> {
  id: string
}

export interface MemoryFilters {
  category?: string
  tags?: string[]
  search?: string
  dateFrom?: Date
  dateTo?: Date
  importance?: 'low' | 'medium' | 'high'
}

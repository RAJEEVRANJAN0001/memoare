import { Memory, CreateMemoryInput, UpdateMemoryInput, MemoryFilters } from '@/types/memory.types'
import { ApiResponse, PaginationParams } from '@/types/api.types'
import { authService } from './authService'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authService.getAccessToken()}`
})

export const memoryService = {
  async getAll(filters?: MemoryFilters, pagination?: PaginationParams): Promise<ApiResponse<Memory[]>> {
    const params = new URLSearchParams()
    
    if (filters?.search) params.append('search', filters.search)
    if (filters?.category) params.append('category', filters.category)
    if (pagination?.page) params.append('page', pagination.page.toString())
    if (pagination?.limit) params.append('limit', pagination.limit.toString())

    const response = await fetch(`${API_URL}/memories?${params}`, {
      headers: getHeaders()
    })

    return response.json()
  },

  async getById(id: string): Promise<ApiResponse<Memory>> {
    const response = await fetch(`${API_URL}/memories/${id}`, {
      headers: getHeaders()
    })

    return response.json()
  },

  async create(data: CreateMemoryInput): Promise<ApiResponse<Memory>> {
    const response = await fetch(`${API_URL}/memories`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    return response.json()
  },

  async update(data: UpdateMemoryInput): Promise<ApiResponse<Memory>> {
    const response = await fetch(`${API_URL}/memories/${data.id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    return response.json()
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_URL}/memories/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })

    return response.json()
  },

  async search(query: string): Promise<ApiResponse<Memory[]>> {
    const response = await fetch(`${API_URL}/memories/search?q=${encodeURIComponent(query)}`, {
      headers: getHeaders()
    })

    return response.json()
  }
}

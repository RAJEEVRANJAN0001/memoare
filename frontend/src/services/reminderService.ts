import { Reminder, CreateReminderInput, UpdateReminderInput } from '@/types/reminder.types'
import { ApiResponse, PaginationParams } from '@/types/api.types'
import { authService } from './authService'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authService.getAccessToken()}`
})

export const reminderService = {
  async getAll(pagination?: PaginationParams): Promise<ApiResponse<Reminder[]>> {
    const params = new URLSearchParams()
    
    if (pagination?.page) params.append('page', pagination.page.toString())
    if (pagination?.limit) params.append('limit', pagination.limit.toString())

    const response = await fetch(`${API_URL}/reminders?${params}`, {
      headers: getHeaders()
    })

    return response.json()
  },

  async getById(id: string): Promise<ApiResponse<Reminder>> {
    const response = await fetch(`${API_URL}/reminders/${id}`, {
      headers: getHeaders()
    })

    return response.json()
  },

  async create(data: CreateReminderInput): Promise<ApiResponse<Reminder>> {
    const response = await fetch(`${API_URL}/reminders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    return response.json()
  },

  async update(data: UpdateReminderInput): Promise<ApiResponse<Reminder>> {
    const response = await fetch(`${API_URL}/reminders/${data.id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    })

    return response.json()
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_URL}/reminders/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })

    return response.json()
  },

  async markComplete(id: string): Promise<ApiResponse<Reminder>> {
    const response = await fetch(`${API_URL}/reminders/${id}/complete`, {
      method: 'PATCH',
      headers: getHeaders()
    })

    return response.json()
  }
}

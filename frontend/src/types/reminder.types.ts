export interface Reminder {
  id: string
  userId: string
  memoryId?: string
  title: string
  description?: string
  scheduledFor: Date
  repeatInterval?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'sent' | 'completed' | 'cancelled'
  notificationChannels: ('email' | 'whatsapp' | 'push')[]
  createdAt: Date
  updatedAt: Date
}

export interface CreateReminderInput {
  memoryId?: string
  title: string
  description?: string
  scheduledFor: Date
  repeatInterval?: Reminder['repeatInterval']
  priority?: Reminder['priority']
  notificationChannels?: Reminder['notificationChannels']
}

export interface UpdateReminderInput extends Partial<CreateReminderInput> {
  id: string
  status?: Reminder['status']
}

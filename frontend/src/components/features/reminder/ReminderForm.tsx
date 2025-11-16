'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/feedback/Modal'
import { Input } from '@/components/ui/forms/Input'
import { TextArea } from '@/components/ui/forms/TextArea'
import { Button } from '@/components/ui/buttons/Button'
import { Bell, Calendar, Repeat, AlertTriangle } from 'lucide-react'

interface ReminderFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
}

export const ReminderForm = ({ isOpen, onClose, onSubmit, initialData }: ReminderFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    scheduledFor: initialData?.scheduledFor || '',
    priority: initialData?.priority || 'medium',
    repeatInterval: initialData?.repeatInterval || 'none',
    notificationChannels: initialData?.notificationChannels || ['email']
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Reminder" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Title"
          icon={Bell}
          placeholder="Enter reminder title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <TextArea
          label="Description (Optional)"
          placeholder="Add additional details..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />

        <Input
          label="Scheduled For"
          icon={Calendar}
          type="datetime-local"
          value={formData.scheduledFor}
          onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <AlertTriangle size={16} className="inline mr-1" />
            Priority
          </label>
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map((priority) => (
              <button
                key={priority}
                type="button"
                onClick={() => setFormData({ ...formData, priority })}
                className={`
                  flex-1 py-2 rounded-lg capitalize transition-all
                  ${formData.priority === priority
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                  }
                `}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Repeat size={16} className="inline mr-1" />
            Repeat
          </label>
          <select
            value={formData.repeatInterval}
            onChange={(e) => setFormData({ ...formData, repeatInterval: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="none">Never</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="gradient" fullWidth>
            Create Reminder
          </Button>
        </div>
      </form>
    </Modal>
  )
}

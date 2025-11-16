import mongoose, { Schema, Document } from 'mongoose'

export interface IReminder extends Document {
  userId: mongoose.Types.ObjectId
  memoryId?: mongoose.Types.ObjectId
  title: string
  description?: string
  scheduledFor: Date
  repeatInterval: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'sent' | 'completed' | 'cancelled'
  notificationChannels: ('email' | 'whatsapp' | 'push')[]
  sentAt?: Date
  createdAt: Date
  updatedAt: Date
}

const reminderSchema = new Schema<IReminder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    memoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Memory',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    scheduledFor: {
      type: Date,
      required: true,
      index: true,
    },
    repeatInterval: {
      type: String,
      enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
      default: 'none',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    notificationChannels: {
      type: [String],
      enum: ['email', 'whatsapp', 'push'],
      default: ['email'],
    },
    sentAt: Date,
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
reminderSchema.index({ userId: 1, status: 1, scheduledFor: 1 })
reminderSchema.index({ status: 1, scheduledFor: 1 })

export const Reminder = mongoose.model<IReminder>('Reminder', reminderSchema)

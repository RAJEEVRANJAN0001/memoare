import mongoose, { Schema, Document } from 'mongoose'

export interface IMemory extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  content: string
  category: string
  tags: string[]
  source: 'whatsapp' | 'manual' | 'api'
  metadata?: {
    location?: string
    contacts?: string[]
    importance?: 'low' | 'medium' | 'high'
  }
  createdAt: Date
  updatedAt: Date
}

const memorySchema = new Schema<IMemory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Other',
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    source: {
      type: String,
      enum: ['whatsapp', 'manual', 'api'],
      default: 'manual',
    },
    metadata: {
      location: String,
      contacts: [String],
      importance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for faster queries
memorySchema.index({ userId: 1, createdAt: -1 })
memorySchema.index({ userId: 1, category: 1 })
memorySchema.index({ tags: 1 })
memorySchema.index({ 'metadata.importance': 1 })

// Text index for search
memorySchema.index({ title: 'text', content: 'text' })

export const Memory = mongoose.model<IMemory>('Memory', memorySchema)

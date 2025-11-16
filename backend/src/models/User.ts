import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  avatar?: string
  phone?: string
  whatsappNumber?: string
  subscription: {
    plan: 'free' | 'premium' | 'enterprise'
    status: 'active' | 'inactive' | 'cancelled'
    expiresAt?: Date
  }
  preferences: {
    notifications: {
      email: boolean
      whatsapp: boolean
      push: boolean
    }
    language: string
    timezone: string
  }
  refreshTokens: string[]
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: String,
    phone: String,
    whatsappNumber: String,
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'premium', 'enterprise'],
        default: 'free',
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active',
      },
      expiresAt: Date,
    },
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        whatsapp: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },
      language: { type: String, default: 'en' },
      timezone: { type: String, default: 'UTC' },
    },
    refreshTokens: [String],
    emailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
userSchema.index({ email: 1 })
userSchema.index({ createdAt: -1 })

export const User = mongoose.model<IUser>('User', userSchema)

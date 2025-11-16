import nodemailer from 'nodemailer'
import { logger } from '../../utils/logger'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

export const emailService = {
  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    try {
      await transporter.sendMail({
        from: `"Memorae" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Welcome to Memorae! 🎉',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to Memorae! 🎉</h1>
              </div>
              <div class="content">
                <h2>Hi ${name},</h2>
                <p>We're thrilled to have you on board! Memorae is your AI-powered memory partner that helps you capture, organize, and recall information effortlessly.</p>
                
                <h3>Get Started:</h3>
                <ul>
                  <li>📝 Create your first memory</li>
                  <li>🔔 Set up smart reminders</li>
                  <li>🔍 Explore AI-powered search</li>
                  <li>💬 Connect WhatsApp for seamless capturing</li>
                </ul>
                
                <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
                
                <p>If you have any questions, feel free to reach out to our support team.</p>
                
                <p>Happy organizing!<br>The Memorae Team</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Memorae. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
      
      logger.info(`Welcome email sent to ${to}`)
    } catch (error) {
      logger.error('Welcome email error:', error)
      throw error
    }
  },

  async sendReminderEmail(to: string, reminder: any): Promise<void> {
    try {
      await transporter.sendMail({
        from: `"Memorae Reminders" <${process.env.SMTP_USER}>`,
        to,
        subject: `⏰ Reminder: ${reminder.title}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .reminder-box { background: white; padding: 20px; border-left: 4px solid #06b6d4; margin: 20px 0; border-radius: 5px; }
              .priority-high { border-left-color: #ef4444; }
              .priority-medium { border-left-color: #f59e0b; }
              .priority-low { border-left-color: #10b981; }
              .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⏰ Reminder Alert</h1>
              </div>
              <div class="content">
                <div class="reminder-box priority-${reminder.priority}">
                  <h2>${reminder.title}</h2>
                  ${reminder.description ? `<p>${reminder.description}</p>` : ''}
                  <p><strong>Priority:</strong> ${reminder.priority.toUpperCase()}</p>
                  <p><strong>Scheduled for:</strong> ${new Date(reminder.scheduledFor).toLocaleString()}</p>
                </div>
                
                <a href="${process.env.FRONTEND_URL}/reminders" class="button">View All Reminders</a>
              </div>
            </div>
          </body>
          </html>
        `
      })
      
      logger.info(`Reminder email sent to ${to}`)
    } catch (error) {
      logger.error('Reminder email error:', error)
      throw error
    }
  },

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
      
      await transporter.sendMail({
        from: `"Memorae Security" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Password Reset Request',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .warning { background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔐 Password Reset</h1>
              </div>
              <div class="content">
                <p>You requested to reset your password. Click the button below to set a new password:</p>
                
                <a href="${resetUrl}" class="button">Reset Password</a>
                
                <div class="warning">
                  <p><strong>⚠️ Security Notice:</strong></p>
                  <p>This link will expire in 1 hour. If you didn't request this reset, please ignore this email.</p>
                </div>
                
                <p>If the button doesn't work, copy and paste this link:<br>
                <a href="${resetUrl}">${resetUrl}</a></p>
              </div>
            </div>
          </body>
          </html>
        `
      })
      
      logger.info(`Password reset email sent to ${to}`)
    } catch (error) {
      logger.error('Password reset email error:', error)
      throw error
    }
  }
}

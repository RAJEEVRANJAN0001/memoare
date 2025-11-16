import { GoogleGenerativeAI } from '@google/generative-ai'
import { logger } from '../../utils/logger'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.5,
    maxOutputTokens: 1024,
  }
})

// Retry configuration
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

/**
 * Helper function to retry API calls with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = RETRY_DELAY
): Promise<T> {
  try {
    return await fn()
  } catch (error: any) {
    if (retries === 0) {
      throw error
    }

    // Check if error is retryable (rate limit, network issues, etc.)
    const isRetryable = error?.status === 429 || 
                       error?.status === 503 || 
                       error?.code === 'ECONNRESET' ||
                       error?.message?.includes('quota')

    if (!isRetryable) {
      throw error
    }

    logger.warn(`Retrying API call. Attempts remaining: ${retries}. Error: ${error.message}`)
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // Exponential backoff
    return retryWithBackoff(fn, retries - 1, delay * 2)
  }
}

export const nlpService = {
  async categorizeMemory(content: string): Promise<string> {
    try {
      if (!content || content.trim().length === 0) {
        logger.warn('Empty content provided for categorization')
        return 'Other'
      }

      const prompt = `You are a helpful assistant that categorizes memories into one of these categories: Work, Personal, Learning, Ideas, Tasks, Shopping, Health, Finance, Travel, Other. Respond with only the category name.

Categorize this memory: "${content}"`

      const result = await retryWithBackoff(async () => {
        return await model.generateContent(prompt)
      })
      
      const response = result.response
      const text = response.text().trim()

      // Validate response is one of the expected categories
      const validCategories = ['Work', 'Personal', 'Learning', 'Ideas', 'Tasks', 'Shopping', 'Health', 'Finance', 'Travel', 'Other']
      const category = validCategories.find(cat => cat.toLowerCase() === text.toLowerCase()) || 'Other'

      return category
    } catch (error: any) {
      logger.error('Categorization error:', error)
      return 'Other'
    }
  },

  async generateTags(content: string): Promise<string[]> {
    try {
      if (!content || content.trim().length === 0) {
        logger.warn('Empty content provided for tag generation')
        return []
      }

      const prompt = `You are a helpful assistant that generates relevant tags for memories. Return 3-5 relevant tags as a comma-separated list.

Generate tags for this memory: "${content}"`

      const result = await retryWithBackoff(async () => {
        return await model.generateContent(prompt)
      })
      
      const response = result.response
      const tagsString = response.text().trim()

      // Parse and validate tags
      const tags = tagsString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0 && tag.length < 50) // Reasonable tag length
        .slice(0, 5) // Max 5 tags

      return tags
    } catch (error: any) {
      logger.error('Tag generation error:', error)
      return []
    }
  },

  async extractIntent(message: string): Promise<{
    intent: 'create_memory' | 'create_reminder' | 'search' | 'question' | 'other'
    entities: any
  }> {
    try {
      if (!message || message.trim().length === 0) {
        logger.warn('Empty message provided for intent extraction')
        return { intent: 'other', entities: {} }
      }

      const prompt = `Analyze the user's message and return a JSON object with "intent" and "entities" fields.

Possible intents: create_memory, create_reminder, search, question, other

Example: "Remember to buy milk tomorrow" should return:
{"intent": "create_reminder", "entities": {"task": "buy milk", "when": "tomorrow"}}

User message: "${message}"

Return only valid JSON, no markdown or extra text.`

      const result = await retryWithBackoff(async () => {
        return await model.generateContent(prompt)
      })
      
      const response = result.response
      const text = response.text().trim()
      
      // Remove markdown code blocks if present
      const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(jsonText)
      
      // Validate intent
      const validIntents = ['create_memory', 'create_reminder', 'search', 'question', 'other']
      if (!validIntents.includes(parsed.intent)) {
        parsed.intent = 'other'
      }
      
      return parsed
    } catch (error: any) {
      logger.error('Intent extraction error:', error)
      return { intent: 'other', entities: {} }
    }
  },

  async generateSummary(content: string, maxLength: number = 100): Promise<string> {
    try {
      if (!content || content.trim().length === 0) {
        logger.warn('Empty content provided for summary generation')
        return ''
      }

      // If content is already short enough, return it
      if (content.length <= maxLength) {
        return content
      }

      const prompt = `Summarize the following text in ${maxLength} characters or less:

${content}`

      const result = await retryWithBackoff(async () => {
        return await model.generateContent(prompt)
      })
      
      const response = result.response
      const summary = response.text().trim()

      // Ensure summary doesn't exceed maxLength
      return summary.length > maxLength ? summary.substring(0, maxLength) : summary
    } catch (error: any) {
      logger.error('Summary generation error:', error)
      return content.substring(0, maxLength)
    }
  }
}

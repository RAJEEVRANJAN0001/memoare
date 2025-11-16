import { nlpService } from '../../src/services/ai/nlpService'
import { logger } from '../../src/utils/logger'

// Mock the logger
jest.mock('../../src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  }
}))

// Mock Google Generative AI
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn().mockReturnValue({
        generateContent: jest.fn()
      })
    }))
  }
})

describe('nlpService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('categorizeMemory', () => {
    it('should categorize a work-related memory', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => 'Work'
        }
      })

      const result = await nlpService.categorizeMemory('Meeting with client about project deadline')
      expect(result).toBe('Work')
    })

    it('should return "Other" for empty content', async () => {
      const result = await nlpService.categorizeMemory('')
      expect(result).toBe('Other')
      expect(logger.warn).toHaveBeenCalledWith('Empty content provided for categorization')
    })

    it('should return "Other" on API error', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockRejectedValue(new Error('API Error'))

      const result = await nlpService.categorizeMemory('Some content')
      expect(result).toBe('Other')
      expect(logger.error).toHaveBeenCalled()
    })

    it('should validate category and return "Other" for invalid category', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => 'InvalidCategory'
        }
      })

      const result = await nlpService.categorizeMemory('Some content')
      expect(result).toBe('Other')
    })
  })

  describe('generateTags', () => {
    it('should generate tags from content', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => 'meeting, client, deadline, project, urgent'
        }
      })

      const result = await nlpService.generateTags('Meeting with client about urgent project deadline')
      expect(result).toEqual(['meeting', 'client', 'deadline', 'project', 'urgent'])
    })

    it('should return empty array for empty content', async () => {
      const result = await nlpService.generateTags('')
      expect(result).toEqual([])
      expect(logger.warn).toHaveBeenCalledWith('Empty content provided for tag generation')
    })

    it('should limit tags to maximum of 5', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => 'tag1, tag2, tag3, tag4, tag5, tag6, tag7'
        }
      })

      const result = await nlpService.generateTags('Some content')
      expect(result).toHaveLength(5)
    })

    it('should filter out empty and too long tags', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => 'tag1, , tag2, ' + 'x'.repeat(60) + ', tag3'
        }
      })

      const result = await nlpService.generateTags('Some content')
      expect(result).toEqual(['tag1', 'tag2', 'tag3'])
    })

    it('should return empty array on API error', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockRejectedValue(new Error('API Error'))

      const result = await nlpService.generateTags('Some content')
      expect(result).toEqual([])
      expect(logger.error).toHaveBeenCalled()
    })
  })

  describe('extractIntent', () => {
    it('should extract create_reminder intent', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => '{"intent": "create_reminder", "entities": {"task": "buy milk", "when": "tomorrow"}}'
        }
      })

      const result = await nlpService.extractIntent('Remember to buy milk tomorrow')
      expect(result).toEqual({
        intent: 'create_reminder',
        entities: { task: 'buy milk', when: 'tomorrow' }
      })
    })

    it('should handle JSON with markdown code blocks', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => '```json\n{"intent": "search", "entities": {}}\n```'
        }
      })

      const result = await nlpService.extractIntent('Find my meeting notes')
      expect(result).toEqual({
        intent: 'search',
        entities: {}
      })
    })

    it('should return "other" intent for empty message', async () => {
      const result = await nlpService.extractIntent('')
      expect(result).toEqual({ intent: 'other', entities: {} })
      expect(logger.warn).toHaveBeenCalledWith('Empty message provided for intent extraction')
    })

    it('should validate intent and default to "other" for invalid intent', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => '{"intent": "invalid_intent", "entities": {}}'
        }
      })

      const result = await nlpService.extractIntent('Some message')
      expect(result.intent).toBe('other')
    })

    it('should return default intent on API error', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockRejectedValue(new Error('API Error'))

      const result = await nlpService.extractIntent('Some message')
      expect(result).toEqual({ intent: 'other', entities: {} })
      expect(logger.error).toHaveBeenCalled()
    })
  })

  describe('generateSummary', () => {
    it('should generate summary for long content', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => 'Meeting summary about Q4 goals'
        }
      })

      const longContent = 'This is a very long meeting note about Q4 goals and objectives for the team. We discussed various strategies and implementation plans.'
      const result = await nlpService.generateSummary(longContent, 50)
      expect(result).toBe('Meeting summary about Q4 goals')
    })

    it('should return original content if shorter than maxLength', async () => {
      const shortContent = 'Short note'
      const result = await nlpService.generateSummary(shortContent, 100)
      expect(result).toBe('Short note')
    })

    it('should return empty string for empty content', async () => {
      const result = await nlpService.generateSummary('', 100)
      expect(result).toBe('')
      expect(logger.warn).toHaveBeenCalledWith('Empty content provided for summary generation')
    })

    it('should truncate summary if it exceeds maxLength', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockResolvedValue({
        response: {
          text: () => 'This is a very long summary that exceeds the maximum length specified'
        }
      })

      const result = await nlpService.generateSummary('Some content', 20)
      expect(result.length).toBeLessThanOrEqual(20)
    })

    it('should return truncated content on API error', async () => {
      const mockGenerateContent = require('@google/generative-ai').GoogleGenerativeAI.mock.results[0].value.getGenerativeModel().generateContent
      mockGenerateContent.mockRejectedValue(new Error('API Error'))

      const content = 'Long content that needs summarization'
      const result = await nlpService.generateSummary(content, 10)
      expect(result).toBe(content.substring(0, 10))
      expect(logger.error).toHaveBeenCalled()
    })
  })
})

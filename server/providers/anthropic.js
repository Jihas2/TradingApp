import Anthropic from '@anthropic-ai/sdk'

/**
 * Provedor Anthropic (Claude)
 */
export class AnthropicProvider {
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    })
    this.defaultModel = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022'
  }

  /**
   * Converte formato de mensagens OpenAI para Anthropic
   */
  convertMessages(messages) {
    let system = null
    const convertedMessages = []

    for (const msg of messages) {
      if (msg.role === 'system') {
        // Anthropic usa um campo separado para system
        system = msg.content
      } else {
        convertedMessages.push({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        })
      }
    }

    return { system, messages: convertedMessages }
  }

  /**
   * Envia mensagens para o Anthropic e retorna a resposta
   */
  async chat(messages, options = {}) {
    const {
      model = this.defaultModel,
      temperature = 0.7,
      maxTokens = 1000
    } = options

    try {
      const { system, messages: convertedMessages } = this.convertMessages(messages)

      const params = {
        model,
        max_tokens: maxTokens,
        temperature,
        messages: convertedMessages
      }

      if (system) {
        params.system = system
      }

      const response = await this.client.messages.create(params)

      return {
        content: response.content[0].text,
        model: response.model,
        usage: {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens
        }
      }
    } catch (error) {
      console.error('Erro Anthropic:', error.message)
      throw error
    }
  }

  /**
   * Lista modelos disponíveis
   */
  async listModels() {
    // Anthropic não tem API pública para listar modelos
    // Retornar lista conhecida
    return [
      'claude-3-5-sonnet-20241022',
      'claude-3-5-haiku-20241022',
      'claude-3-opus-20240229',
      'claude-3-sonnet-20240229',
      'claude-3-haiku-20240307'
    ]
  }
}

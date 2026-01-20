import OpenAI from 'openai'

/**
 * Provedor OpenAI (GPT-4, GPT-3.5, etc)
 */
export class OpenAIProvider {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL
    })
    this.defaultModel = 'gpt-4o-mini'
  }

  /**
   * Envia mensagens para o OpenAI e retorna a resposta
   */
  async chat(messages, options = {}) {
    const {
      model = this.defaultModel,
      temperature = 0.7,
      maxTokens = 1000
    } = options

    try {
      const completion = await this.client.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      })

      return {
        content: completion.choices[0].message.content,
        model: completion.model,
        usage: {
          promptTokens: completion.usage.prompt_tokens,
          completionTokens: completion.usage.completion_tokens,
          totalTokens: completion.usage.total_tokens
        }
      }
    } catch (error) {
      console.error('Erro OpenAI:', error.message)
      throw error
    }
  }

  /**
   * Lista modelos disponíveis
   */
  async listModels() {
    try {
      const models = await this.client.models.list()
      return models.data
        .filter(m => m.id.includes('gpt'))
        .map(m => m.id)
    } catch (error) {
      console.error('Erro ao listar modelos OpenAI:', error.message)
      return []
    }
  }
}

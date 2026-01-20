import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Provedor Google Gemini
 */
export class GeminiProvider {
  constructor() {
    this.client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    this.defaultModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash-exp'
  }

  /**
   * Converte formato de mensagens OpenAI para Gemini
   */
  convertMessages(messages) {
    const history = []
    let currentMessage = null

    for (const msg of messages) {
      if (msg.role === 'system') {
        // Gemini não tem role "system", adiciona ao início como user
        history.push({
          role: 'user',
          parts: [{ text: `[Instruções do sistema]\n${msg.content}` }]
        })
        history.push({
          role: 'model',
          parts: [{ text: 'Entendido. Vou seguir essas instruções.' }]
        })
      } else if (msg.role === 'user') {
        currentMessage = {
          role: 'user',
          parts: [{ text: msg.content }]
        }
      } else if (msg.role === 'assistant') {
        history.push({
          role: 'model',
          parts: [{ text: msg.content }]
        })
      }
    }

    return { history, currentMessage }
  }

  /**
   * Envia mensagens para o Gemini e retorna a resposta
   */
  async chat(messages, options = {}) {
    const {
      model = this.defaultModel,
      temperature = 0.7,
      maxTokens = 1000
    } = options

    try {
      const genModel = this.client.getGenerativeModel({
        model,
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens
        }
      })

      const { history, currentMessage } = this.convertMessages(messages)

      // Criar chat com histórico
      const chat = genModel.startChat({ history })

      // Enviar mensagem atual
      const result = await chat.sendMessage(currentMessage.parts[0].text)
      const response = await result.response
      const text = response.text()

      return {
        content: text,
        model,
        usage: {
          promptTokens: response.usageMetadata?.promptTokenCount || 0,
          completionTokens: response.usageMetadata?.candidatesTokenCount || 0,
          totalTokens: response.usageMetadata?.totalTokenCount || 0
        }
      }
    } catch (error) {
      console.error('Erro Gemini:', error.message)
      throw error
    }
  }

  /**
   * Lista modelos disponíveis
   */
  async listModels() {
    try {
      const models = await this.client.listModels()
      return models
        .filter(m => m.supportedGenerationMethods.includes('generateContent'))
        .map(m => m.name.replace('models/', ''))
    } catch (error) {
      console.error('Erro ao listar modelos Gemini:', error.message)
      return []
    }
  }
}

import { OpenAIProvider } from '../providers/openai.js'
import { GeminiProvider } from '../providers/gemini.js'
import { AnthropicProvider } from '../providers/anthropic.js'

/**
 * Cria o handler para requisições de chat
 */
export function createChatHandler() {
  // Inicializar provedores disponíveis
  const providers = new Map()

  if (process.env.OPENAI_API_KEY) {
    providers.set('openai', new OpenAIProvider())
  }
  if (process.env.GEMINI_API_KEY) {
    providers.set('gemini', new GeminiProvider())
  }
  if (process.env.ANTHROPIC_API_KEY) {
    providers.set('anthropic', new AnthropicProvider())
  }

  return async (req, res) => {
    try {
      const { messages, provider = 'openai', model, temperature, maxTokens } = req.body

      // Validações
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({
          error: 'Campo "messages" é obrigatório e deve ser um array não vazio'
        })
      }

      if (!providers.has(provider)) {
        return res.status(400).json({
          error: `Provedor "${provider}" não está configurado ou não existe`,
          availableProviders: Array.from(providers.keys())
        })
      }

      // Obter provedor
      const aiProvider = providers.get(provider)

      // Configurar opções
      const options = {}
      if (model) options.model = model
      if (temperature !== undefined) options.temperature = temperature
      if (maxTokens !== undefined) options.maxTokens = maxTokens

      // Fazer chamada para o provedor
      console.log(`Processando mensagem com ${provider}...`)
      const response = await aiProvider.chat(messages, options)

      // Retornar resposta
      res.json({
        provider,
        model: response.model,
        message: response.content,
        usage: response.usage
      })

    } catch (error) {
      console.error('Erro ao processar chat:', error)

      // Tratamento de erros específicos
      if (error.status === 401) {
        return res.status(401).json({
          error: 'Chave de API inválida',
          message: error.message
        })
      }

      if (error.status === 429) {
        return res.status(429).json({
          error: 'Limite de requisições excedido',
          message: 'Tente novamente em alguns instantes'
        })
      }

      // Erro genérico
      res.status(500).json({
        error: 'Erro ao processar mensagem',
        message: error.message
      })
    }
  }
}

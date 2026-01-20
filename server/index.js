import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createChatHandler } from './routes/chat.js'

// Carregar variáveis de ambiente
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    providers: {
      openai: !!process.env.OPENAI_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY,
      anthropic: !!process.env.ANTHROPIC_API_KEY
    }
  })
})

// Rotas de chat
app.post('/chat', createChatHandler())

// Rota de fallback
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.originalUrl
  })
})

// Error handler global
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err)
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/health`)
  console.log(`💬 Endpoint de chat: http://localhost:${PORT}/chat\n`)

  // Verificar configuração de provedores
  const providers = []
  if (process.env.OPENAI_API_KEY) providers.push('OpenAI')
  if (process.env.GEMINI_API_KEY) providers.push('Gemini')
  if (process.env.ANTHROPIC_API_KEY) providers.push('Anthropic')

  if (providers.length === 0) {
    console.warn('⚠️  ATENÇÃO: Nenhuma chave de API configurada!')
    console.warn('Configure pelo menos uma chave no arquivo .env\n')
  } else {
    console.log(`✅ Provedores configurados: ${providers.join(', ')}\n`)
  }
})

# Backend do Chatbot Multi-Provedor

Backend Node.js para chatbot com suporte a múltiplos provedores de IA: OpenAI, Google Gemini e Anthropic Claude.

## 🚀 Instalação

```bash
cd server
npm install
```

## ⚙️ Configuração

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o `.env` e adicione suas chaves de API:
```env
PORT=3001

# Adicione pelo menos uma chave
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
ANTHROPIC_API_KEY=sk-ant-...
```

## 🏃 Executar

**Modo desenvolvimento** (com hot reload):
```bash
npm run dev
```

**Modo produção**:
```bash
npm start
```

O servidor irá rodar em `http://localhost:3001`

## 📡 API Endpoints

### Health Check
```
GET /health
```

Retorna o status do servidor e provedores configurados.

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-20T12:00:00.000Z",
  "providers": {
    "openai": true,
    "gemini": true,
    "anthropic": false
  }
}
```

### Chat
```
POST /chat
```

Envia mensagens para o provedor de IA e retorna a resposta.

**Body:**
```json
{
  "messages": [
    { "role": "system", "content": "Você é um assistente útil" },
    { "role": "user", "content": "Olá!" }
  ],
  "provider": "openai",
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "maxTokens": 1000
}
```

**Parâmetros:**
- `messages` (obrigatório): Array de mensagens no formato OpenAI
- `provider` (opcional): `openai`, `gemini` ou `anthropic` (padrão: `openai`)
- `model` (opcional): Modelo específico do provedor
- `temperature` (opcional): 0.0 a 2.0 (padrão: 0.7)
- `maxTokens` (opcional): Máximo de tokens na resposta (padrão: 1000)

**Resposta:**
```json
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "message": "Olá! Como posso ajudar você hoje?",
  "usage": {
    "promptTokens": 20,
    "completionTokens": 15,
    "totalTokens": 35
  }
}
```

## 🔑 Provedores Suportados

### OpenAI (GPT)
- Modelos: `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-3.5-turbo`
- Variável: `OPENAI_API_KEY`
- Obtenha em: https://platform.openai.com/api-keys

### Google Gemini
- Modelos: `gemini-2.0-flash-exp`, `gemini-1.5-pro`, `gemini-1.5-flash`
- Variável: `GEMINI_API_KEY`
- Obtenha em: https://makersuite.google.com/app/apikey

### Anthropic Claude
- Modelos: `claude-3-5-sonnet-20241022`, `claude-3-5-haiku-20241022`, etc
- Variável: `ANTHROPIC_API_KEY`
- Obtenha em: https://console.anthropic.com/

## 🏗️ Estrutura do Projeto

```
server/
├── index.js              # Servidor Express principal
├── routes/
│   └── chat.js          # Handler da rota de chat
├── providers/
│   ├── openai.js        # Integração OpenAI
│   ├── gemini.js        # Integração Google Gemini
│   └── anthropic.js     # Integração Anthropic
├── package.json
├── .env.example
└── README.md
```

## 🔒 Segurança

- As chaves de API nunca são enviadas ao frontend
- CORS configurado para aceitar requisições do frontend
- Validação de entrada em todas as rotas
- Rate limiting recomendado em produção

## 📦 Deploy

### Railway/Render/Heroku
1. Configure as variáveis de ambiente no painel
2. O `package.json` já tem o script de start configurado
3. A porta é lida de `process.env.PORT`

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

**Erro "Nenhuma chave de API configurada"**
- Configure pelo menos uma chave no arquivo `.env`

**Erro 401 ao fazer requisições**
- Verifique se a chave de API está correta
- Confirme que a chave tem saldo/créditos

**Timeout nas requisições**
- Aumente o `maxTokens` se as respostas forem muito longas
- Verifique sua conexão com a internet

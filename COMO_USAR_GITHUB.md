# 📚 Como Enviar para o GitHub

## Passo 1: Criar o Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique no botão **"New"** (ou **"+"** no canto superior direito)
3. Nome do repositório: **TradingApp**
4. Deixe como **Público** ou **Privado** (sua escolha)
5. **NÃO** marque "Add a README file"
6. Clique em **"Create repository"**

## Passo 2: Copiar o Código para o seu Computador

Você tem duas opções:

### Opção A: Download Direto (Mais Fácil)
1. Baixe todo o código deste projeto
2. Extraia para uma pasta no seu computador
3. Abra o terminal/prompt de comando nesta pasta

### Opção B: Via Terminal
Se você já tem o código localmente, navegue até a pasta do projeto:
```bash
cd caminho/para/TradingApp
```

## Passo 3: Enviar para o GitHub

Copie e cole estes comandos no terminal (um de cada vez):

```bash
# Inicializar o repositório Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Criar o primeiro commit
git commit -m "Primeiro commit - App de Trading com IA"

# Conectar ao seu repositório GitHub
# SUBSTITUA "SEU_USUARIO" pelo seu nome de usuário do GitHub
git remote add origin https://github.com/SEU_USUARIO/TradingApp.git

# Renomear a branch para main (padrão do GitHub)
git branch -M main

# Enviar o código para o GitHub
git push -u origin main
```

## Passo 4: Verificar

1. Acesse: `https://github.com/SEU_USUARIO/TradingApp`
2. Você verá todos os arquivos do projeto lá!

## 🔑 Se Pedir Autenticação

O GitHub pode pedir login. Você tem duas opções:

### Opção 1: HTTPS com Token (Recomendado)
1. Vá em: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clique em "Generate new token (classic)"
3. Marque: `repo` (acesso completo aos repositórios)
4. Copie o token gerado
5. Ao fazer `git push`, use o token como senha

### Opção 2: SSH
1. Siga o guia: https://docs.github.com/pt/authentication/connecting-to-github-with-ssh
2. Use: `git remote set-url origin git@github.com:SEU_USUARIO/TradingApp.git`

## ✅ Pronto!

Agora seu código está no GitHub e você pode:
- Acessar de qualquer lugar
- Compartilhar com outras pessoas
- Fazer backup automático
- Colaborar com desenvolvedores

---

## 🆘 Precisa de Ajuda?

Se encontrar algum erro, me envie a mensagem de erro e te ajudo a resolver!

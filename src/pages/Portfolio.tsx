import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import { Badge } from '@/components/ui/badge'
import { Wallet, TrendingUp, DollarSign, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function Portfolio() {
  const [depositAmount, setDepositAmount] = useState('')
  const [balance, setBalance] = useState(10000)

  // Distribuição do portfólio
  const portfolioData = [
    { name: 'BTC', value: 4500, color: 'hsl(var(--chart-1))' },
    { name: 'ETH', value: 2800, color: 'hsl(var(--chart-2))' },
    { name: 'BNB', value: 1200, color: 'hsl(var(--chart-3))' },
    { name: 'SOL', value: 900, color: 'hsl(var(--chart-4))' },
    { name: 'Outros', value: 600, color: 'hsl(var(--chart-5))' },
  ]

  // Posições abertas
  const openPositions = [
    { pair: 'BTC/USDT', amount: 0.066, avgPrice: 67200, currentPrice: 67842, profit: 42.37 },
    { pair: 'ETH/USDT', amount: 0.85, avgPrice: 3180, currentPrice: 3245, profit: 55.25 },
    { pair: 'BNB/USDT', amount: 2.1, avgPrice: 585, currentPrice: 589, profit: 8.40 },
    { pair: 'SOL/USDT', amount: 6.5, avgPrice: 138, currentPrice: 142, profit: 26.00 },
  ]

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) {
      toast.error('Valor inválido', {
        description: 'Por favor, insira um valor válido para depósito'
      })
      return
    }

    setBalance(balance + amount)
    setDepositAmount('')
    toast.success('Depósito realizado!', {
      description: `R$ ${amount.toFixed(2)} adicionado ao seu saldo. A IA já está analisando novas oportunidades.`
    })
  }

  const totalProfit = openPositions.reduce((sum, pos) => sum + pos.profit, 0)
  const totalInvested = portfolioData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Portfólio</h1>
        <p className="text-sm text-muted-foreground">Gerencie seu saldo e acompanhe suas posições</p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Pronto para investir</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Operação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalInvested.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Gerenciado pela IA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro em Aberto</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              +{totalProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">
              +{((totalProfit / totalInvested) * 100).toFixed(2)}% de retorno
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gráfico de Distribuição */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Distribuição do Portfólio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Depositar Saldo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Adicionar Saldo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Valor do Depósito">
              <Input
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </Field>
            <Button onClick={handleDeposit} className="w-full">
              Depositar
            </Button>
            <div className="rounded-lg bg-muted p-4">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Dica:</strong> Após o depósito, a IA automaticamente começará a procurar as melhores oportunidades para investir seu dinheiro.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posições Abertas */}
      <Card>
        <CardHeader>
          <CardTitle>Posições Abertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {openPositions.map((position, index) => {
              const profitPercent = ((position.currentPrice - position.avgPrice) / position.avgPrice) * 100
              const isProfit = position.profit >= 0

              return (
                <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-lg',
                      isProfit ? 'bg-chart-1/10' : 'bg-destructive/10'
                    )}>
                      {isProfit ? (
                        <ArrowUpRight className="h-6 w-6 text-chart-1" />
                      ) : (
                        <ArrowDownRight className="h-6 w-6 text-destructive" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{position.pair}</p>
                      <p className="text-sm text-muted-foreground">
                        {position.amount} • Preço médio: ${position.avgPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      'text-lg font-bold',
                      isProfit ? 'text-chart-1' : 'text-destructive'
                    )}>
                      {isProfit ? '+' : ''}{position.profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p className={cn(
                      'text-sm font-medium',
                      isProfit ? 'text-chart-1' : 'text-destructive'
                    )}>
                      {isProfit ? '+' : ''}{profitPercent.toFixed(2)}%
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

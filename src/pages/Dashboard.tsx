import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, DollarSign, Activity, Brain, Target } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [balance, setBalance] = useState(10000)
  const [profit, setProfit] = useState(0)
  const [profitPercent, setProfitPercent] = useState(0)
  const [aiStatus, setAiStatus] = useState<'analyzing' | 'trading' | 'waiting'>('analyzing')

  // Dados do gráfico de evolução
  const [performanceData, setPerformanceData] = useState([
    { time: '00:00', valor: 10000 },
    { time: '04:00', valor: 10150 },
    { time: '08:00', valor: 10280 },
    { time: '12:00', valor: 10420 },
    { time: '16:00', valor: 10580 },
    { time: '20:00', valor: 10650 },
  ])

  // Operações recentes da IA
  const [recentTrades, setRecentTrades] = useState([
    { pair: 'BTC/USDT', type: 'COMPRA', profit: 125.50, time: '14:32', status: 'success' },
    { pair: 'ETH/USDT', type: 'VENDA', profit: 89.20, time: '14:18', status: 'success' },
    { pair: 'BNB/USDT', type: 'COMPRA', profit: -32.10, time: '13:55', status: 'loss' },
    { pair: 'SOL/USDT', type: 'VENDA', profit: 203.40, time: '13:42', status: 'success' },
  ])

  useEffect(() => {
    // Simula atualizações da IA
    const interval = setInterval(() => {
      const statuses: Array<'analyzing' | 'trading' | 'waiting'> = ['analyzing', 'trading', 'waiting']
      setAiStatus(statuses[Math.floor(Math.random() * statuses.length)])

      // Simula lucro
      const newProfit = profit + (Math.random() - 0.3) * 50
      setProfit(newProfit)
      setProfitPercent((newProfit / 10000) * 100)
      setBalance(10000 + newProfit)
    }, 5000)

    return () => clearInterval(interval)
  }, [profit])

  const getStatusText = () => {
    switch(aiStatus) {
      case 'analyzing': return 'Analisando Mercado'
      case 'trading': return 'Executando Operação'
      case 'waiting': return 'Aguardando Oportunidade'
    }
  }

  const getStatusColor = () => {
    switch(aiStatus) {
      case 'analyzing': return 'bg-chart-2'
      case 'trading': return 'bg-chart-1'
      case 'waiting': return 'bg-muted'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header com Saldo */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Acompanhe suas operações automáticas</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn(getStatusColor(), 'text-primary-foreground')}>
            <Activity className="mr-1 h-3 w-3 animate-pulse" />
            {getStatusText()}
          </Badge>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Capital + Lucro</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
            {profit >= 0 ? (
              <TrendingUp className="h-4 w-4 text-chart-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div className={cn('text-2xl font-bold', profit >= 0 ? 'text-chart-1' : 'text-destructive')}>
              {profit >= 0 ? '+' : ''}{profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">
              {profitPercent >= 0 ? '+' : ''}{profitPercent.toFixed(2)}% do capital
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">IA em Ação</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ativa</div>
            <p className="text-xs text-muted-foreground">24/7 operando</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Acerto</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">Últimas 100 operações</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Saldo (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Operações Recentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Operações Recentes da IA</CardTitle>
            <Button variant="outline" size="sm">Ver Todas</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTrades.map((trade, index) => (
              <div key={index} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    trade.status === 'success' ? 'bg-chart-1/10' : 'bg-destructive/10'
                  )}>
                    {trade.status === 'success' ? (
                      <TrendingUp className="h-5 w-5 text-chart-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{trade.pair}</p>
                    <p className="text-xs text-muted-foreground">{trade.type} • {trade.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'font-bold',
                    trade.profit >= 0 ? 'text-chart-1' : 'text-destructive'
                  )}>
                    {trade.profit >= 0 ? '+' : ''}{trade.profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

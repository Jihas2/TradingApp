import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, ArrowDownRight, Search, Calendar } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function History() {
  const [searchTerm, setSearchTerm] = useState('')

  // Histórico completo de operações
  const allTrades = [
    { id: 1, pair: 'BTC/USDT', type: 'COMPRA', entry: 67200, exit: 67842, amount: 0.066, profit: 42.37, date: '20/01/2026', time: '14:32', status: 'concluída' },
    { id: 2, pair: 'ETH/USDT', type: 'VENDA', entry: 3180, exit: 3245, amount: 0.85, profit: 55.25, date: '20/01/2026', time: '14:18', status: 'concluída' },
    { id: 3, pair: 'BNB/USDT', type: 'COMPRA', entry: 595, exit: 589, amount: 2.1, profit: -12.60, date: '20/01/2026', time: '13:55', status: 'concluída' },
    { id: 4, pair: 'SOL/USDT', type: 'VENDA', entry: 138, exit: 142, amount: 6.5, profit: 26.00, date: '20/01/2026', time: '13:42', status: 'concluída' },
    { id: 5, pair: 'ADA/USDT', type: 'COMPRA', entry: 0.615, exit: 0.623, amount: 1500, profit: 12.00, date: '20/01/2026', time: '12:20', status: 'concluída' },
    { id: 6, pair: 'XRP/USDT', type: 'VENDA', entry: 0.542, exit: 0.534, amount: 2200, profit: -17.60, date: '20/01/2026', time: '11:45', status: 'concluída' },
    { id: 7, pair: 'BTC/USDT', type: 'COMPRA', entry: 66800, exit: 67200, amount: 0.075, profit: 30.00, date: '19/01/2026', time: '18:15', status: 'concluída' },
    { id: 8, pair: 'ETH/USDT', type: 'COMPRA', entry: 3120, exit: 3180, amount: 1.2, profit: 72.00, date: '19/01/2026', time: '16:30', status: 'concluída' },
    { id: 9, pair: 'DOT/USDT', type: 'VENDA', entry: 7.85, exit: 8.12, amount: 450, profit: 121.50, date: '19/01/2026', time: '14:22', status: 'concluída' },
    { id: 10, pair: 'LINK/USDT', type: 'COMPRA', entry: 14.20, exit: 14.55, amount: 85, profit: 29.75, date: '19/01/2026', time: '10:08', status: 'concluída' },
  ]

  const filteredTrades = allTrades.filter(trade =>
    trade.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const winningTrades = filteredTrades.filter(t => t.profit > 0)
  const losingTrades = filteredTrades.filter(t => t.profit < 0)

  const totalProfit = filteredTrades.reduce((sum, t) => sum + t.profit, 0)
  const winRate = (winningTrades.length / filteredTrades.length) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Histórico de Operações</h1>
        <p className="text-sm text-muted-foreground">Todas as operações realizadas pela IA</p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Operações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTrades.length}</div>
            <p className="text-xs text-muted-foreground">Executadas pela IA</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Acerto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{winningTrades.length} ganhas de {filteredTrades.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
              'text-2xl font-bold',
              totalProfit >= 0 ? 'text-chart-1' : 'text-destructive'
            )}>
              {totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Período selecionado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Operação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              +{Math.max(...filteredTrades.map(t => t.profit)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Maior lucro individual</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Tabela */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Operações Realizadas</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por par ou tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Todas ({filteredTrades.length})</TabsTrigger>
              <TabsTrigger value="wins">Lucros ({winningTrades.length})</TabsTrigger>
              <TabsTrigger value="losses">Perdas ({losingTrades.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <TradeList trades={filteredTrades} />
            </TabsContent>

            <TabsContent value="wins" className="mt-6">
              <TradeList trades={winningTrades} />
            </TabsContent>

            <TabsContent value="losses" className="mt-6">
              <TradeList trades={losingTrades} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function TradeList({ trades }: { trades: any[] }) {
  if (trades.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-foreground">Nenhuma operação encontrada</p>
        <p className="text-sm text-muted-foreground">Tente ajustar os filtros</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {trades.map((trade) => {
        const isProfit = trade.profit >= 0
        const profitPercent = ((trade.exit - trade.entry) / trade.entry) * 100

        return (
          <div key={trade.id} className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
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
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-foreground">{trade.pair}</p>
                  <Badge variant={trade.type === 'COMPRA' ? 'default' : 'secondary'}>
                    {trade.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Entrada: ${trade.entry.toLocaleString()} → Saída: ${trade.exit.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {trade.date} às {trade.time} • Quantidade: {trade.amount}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                'text-lg font-bold',
                isProfit ? 'text-chart-1' : 'text-destructive'
              )}>
                {isProfit ? '+' : ''}{trade.profit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
  )
}

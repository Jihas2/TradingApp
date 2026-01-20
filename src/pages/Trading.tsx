import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function Trading() {
  const [selectedPair, setSelectedPair] = useState('BTC/USDT')
  const [aiSignal, setAiSignal] = useState<'buy' | 'sell' | 'hold'>('hold')
  const [confidence, setConfidence] = useState(85)

  // Pares disponíveis
  const tradingPairs = [
    { symbol: 'BTC/USDT', price: 67842.30, change: 2.34, volume: '28.5B' },
    { symbol: 'ETH/USDT', price: 3245.67, change: 1.89, volume: '12.3B' },
    { symbol: 'BNB/USDT', price: 589.23, change: -0.45, volume: '2.1B' },
    { symbol: 'SOL/USDT', price: 142.89, change: 5.67, volume: '1.8B' },
    { symbol: 'ADA/USDT', price: 0.623, change: -1.23, volume: '890M' },
    { symbol: 'XRP/USDT', price: 0.534, change: 0.89, volume: '1.2B' },
  ]

  // Dados do gráfico
  const [chartData, setChartData] = useState([
    { time: '09:00', price: 67200 },
    { time: '10:00', price: 67450 },
    { time: '11:00', price: 67300 },
    { time: '12:00', price: 67680 },
    { time: '13:00', price: 67520 },
    { time: '14:00', price: 67890 },
    { time: '15:00', price: 67842 },
  ])

  // Análises da IA
  const [aiAnalysis, setAiAnalysis] = useState([
    { indicator: 'RSI', value: 68, signal: 'Neutro', description: 'Zona de equilíbrio' },
    { indicator: 'MACD', value: 'Positivo', signal: 'Compra', description: 'Cruzamento de alta' },
    { indicator: 'Bollinger', value: 'Centro', signal: 'Neutro', description: 'Preço na média' },
    { indicator: 'Volume', value: 'Alto', signal: 'Compra', description: 'Forte interesse' },
  ])

  useEffect(() => {
    // Simula mudanças de sinal da IA
    const interval = setInterval(() => {
      const signals: Array<'buy' | 'sell' | 'hold'> = ['buy', 'sell', 'hold']
      setAiSignal(signals[Math.floor(Math.random() * signals.length)])
      setConfidence(Math.floor(Math.random() * 30) + 70)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getSignalConfig = () => {
    switch(aiSignal) {
      case 'buy':
        return {
          text: 'SINAL DE COMPRA',
          color: 'text-chart-1',
          bgColor: 'bg-chart-1/10',
          icon: TrendingUp,
          recommendation: 'A IA identificou uma oportunidade de compra com alta probabilidade de lucro'
        }
      case 'sell':
        return {
          text: 'SINAL DE VENDA',
          color: 'text-destructive',
          bgColor: 'bg-destructive/10',
          icon: TrendingDown,
          recommendation: 'A IA recomenda realizar lucros ou evitar perdas vendendo neste momento'
        }
      case 'hold':
        return {
          text: 'AGUARDAR',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: Clock,
          recommendation: 'A IA sugere aguardar um momento mais favorável para operar'
        }
    }
  }

  const signalConfig = getSignalConfig()
  const SignalIcon = signalConfig.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Trading com IA</h1>
        <p className="text-sm text-muted-foreground">Acompanhe análises em tempo real e sinais automatizados</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Painel Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sinal da IA */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Análise da IA - {selectedPair}
                </CardTitle>
                <Badge variant="outline" className="bg-primary text-primary-foreground">
                  Ao Vivo
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn('rounded-lg p-6', signalConfig.bgColor)}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                      <SignalIcon className={cn('h-6 w-6', signalConfig.color)} />
                    </div>
                    <div>
                      <h3 className={cn('text-xl font-bold', signalConfig.color)}>
                        {signalConfig.text}
                      </h3>
                      <p className="text-sm text-muted-foreground">Confiança: {confidence}%</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground">{signalConfig.recommendation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico */}
          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Preço</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="1h" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="1h">1H</TabsTrigger>
                  <TabsTrigger value="4h">4H</TabsTrigger>
                  <TabsTrigger value="1d">1D</TabsTrigger>
                  <TabsTrigger value="1w">1S</TabsTrigger>
                </TabsList>
                <TabsContent value="1h" className="mt-4">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 200', 'dataMax + 200']} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--popover))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="hsl(var(--chart-1))"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Indicadores Técnicos */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores Analisados pela IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiAnalysis.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{item.indicator}</p>
                        <Badge
                          variant="outline"
                          className={cn(
                            item.signal === 'Compra' && 'bg-chart-1/10 text-chart-1',
                            item.signal === 'Venda' && 'bg-destructive/10 text-destructive',
                            item.signal === 'Neutro' && 'bg-muted text-muted-foreground'
                          )}
                        >
                          {item.signal}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Lista de Pares */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pares Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tradingPairs.map((pair, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPair(pair.symbol)}
                    className={cn(
                      'w-full rounded-lg p-3 text-left transition-colors',
                      selectedPair === pair.symbol
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{pair.symbol}</span>
                      <span className={cn(
                        'text-sm font-medium',
                        pair.change >= 0 ? 'text-chart-1' : 'text-destructive',
                        selectedPair === pair.symbol && 'text-primary-foreground'
                      )}>
                        {pair.change >= 0 ? '+' : ''}{pair.change}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        'text-sm',
                        selectedPair === pair.symbol ? 'text-primary-foreground/80' : 'text-muted-foreground'
                      )}>
                        ${pair.price.toLocaleString()}
                      </span>
                      <span className={cn(
                        'text-xs',
                        selectedPair === pair.symbol ? 'text-primary-foreground/60' : 'text-muted-foreground'
                      )}>
                        Vol: {pair.volume}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status da IA */}
          <Card>
            <CardHeader>
              <CardTitle>Status da IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-1/10">
                  <CheckCircle className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Operacional</p>
                  <p className="text-xs text-muted-foreground">Sistema funcionando 100%</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/10">
                  <Brain className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Analisando</p>
                  <p className="text-xs text-muted-foreground">12 pares em tempo real</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/10">
                  <AlertCircle className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Última Atualização</p>
                  <p className="text-xs text-muted-foreground">Há 2 segundos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

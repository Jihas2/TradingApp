import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Settings as SettingsIcon, Shield, Bell, Zap, Brain } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Settings() {
  const [riskLevel, setRiskLevel] = useState([50])
  const [maxDailyLoss, setMaxDailyLoss] = useState('500')
  const [autoTrading, setAutoTrading] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [stopLoss, setStopLoss] = useState(true)
  const [takeProfit, setTakeProfit] = useState(true)

  const handleSave = () => {
    toast.success('Configurações salvas!', {
      description: 'Suas preferências foram atualizadas com sucesso.'
    })
  }

  const getRiskLabel = (value: number) => {
    if (value < 30) return 'Conservador'
    if (value < 70) return 'Moderado'
    return 'Agressivo'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground">Personalize o comportamento da IA e preferências da conta</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configurações da IA */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <CardTitle>Configurações da IA</CardTitle>
            </div>
            <CardDescription>Ajuste o comportamento do sistema automatizado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Trading Automático */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Trading Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Permite que a IA execute operações automaticamente
                </p>
              </div>
              <Switch checked={autoTrading} onCheckedChange={setAutoTrading} />
            </div>

            {/* Nível de Risco */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Nível de Risco</Label>
                <span className="text-sm font-medium text-foreground">
                  {getRiskLabel(riskLevel[0])}
                </span>
              </div>
              <Slider
                value={riskLevel}
                onValueChange={setRiskLevel}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Define o nível de agressividade nas operações. Valores maiores buscam mais lucro, mas com maior risco.
              </p>
            </div>

            {/* Perda Máxima Diária */}
            <Field label="Perda Máxima Diária">
              <Input
                type="number"
                value={maxDailyLoss}
                onChange={(e) => setMaxDailyLoss(e.target.value)}
                placeholder="500.00"
              />
              <p className="text-xs text-muted-foreground mt-2">
                A IA pausará operações se atingir este limite de perda no dia
              </p>
            </Field>
          </CardContent>
        </Card>

        {/* Gestão de Risco */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Gestão de Risco</CardTitle>
            </div>
            <CardDescription>Proteção automática do seu capital</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stop Loss */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Stop Loss Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Fecha posições automaticamente em caso de perda
                </p>
              </div>
              <Switch checked={stopLoss} onCheckedChange={setStopLoss} />
            </div>

            {/* Take Profit */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Take Profit Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Realiza lucros quando atinge metas definidas
                </p>
              </div>
              <Switch checked={takeProfit} onCheckedChange={setTakeProfit} />
            </div>

            {/* Diversificação */}
            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-foreground" />
                <p className="font-medium text-foreground">Diversificação Automática</p>
              </div>
              <p className="text-sm text-muted-foreground">
                A IA distribui automaticamente seu capital em múltiplos pares para reduzir risco
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notificações</CardTitle>
            </div>
            <CardDescription>Receba alertas sobre suas operações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notificações Gerais */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Notificações Ativas</Label>
                <p className="text-sm text-muted-foreground">
                  Receba alertas sobre operações e eventos importantes
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            {/* Tipos de Notificações */}
            <div className="space-y-3 pl-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notify-trades" defaultChecked className="rounded" />
                <Label htmlFor="notify-trades" className="text-sm cursor-pointer">
                  Operações executadas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notify-profits" defaultChecked className="rounded" />
                <Label htmlFor="notify-profits" className="text-sm cursor-pointer">
                  Lucros realizados
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notify-losses" defaultChecked className="rounded" />
                <Label htmlFor="notify-losses" className="text-sm cursor-pointer">
                  Perdas e alertas de risco
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="notify-balance" className="rounded" />
                <Label htmlFor="notify-balance" className="text-sm cursor-pointer">
                  Mudanças no saldo
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações da Conta */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              <CardTitle>Informações da Conta</CardTitle>
            </div>
            <CardDescription>Dados e preferências pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Nome">
              <Input defaultValue="Usuário Demo" placeholder="Seu nome" />
            </Field>

            <Field label="Email">
              <Input type="email" defaultValue="usuario@exemplo.com" placeholder="seu@email.com" />
            </Field>

            <Field label="Telefone">
              <Input type="tel" defaultValue="+55 (11) 98765-4321" placeholder="Seu telefone" />
            </Field>

            <div className="pt-2">
              <Button variant="outline" className="w-full">
                Alterar Senha
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão de Salvar */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSave}>Salvar Configurações</Button>
      </div>
    </div>
  )
}

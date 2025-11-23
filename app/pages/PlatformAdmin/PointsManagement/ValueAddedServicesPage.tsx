/**
 * 平台后台 - 积分增值服务配置页面
 * 包含积分奖励和积分换购两个卡片
 */

import { useState } from 'react'
import type { PointsRewardItem, PointsExchangeItem } from './types/valueAddedService.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Switch } from '~/components/ui/switch'
import { Plus, Trash2, Gift, ShoppingBag } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import SettingsPageHeader from '~/pages/SharedComponents/SettingsPageHeader'

interface ValueAddedServicesPageProps {
  rewards: PointsRewardItem[]
  exchanges: PointsExchangeItem[]
}

export default function ValueAddedServicesPage({
  rewards: initialRewards,
  exchanges: initialExchanges
}: ValueAddedServicesPageProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [rewards, setRewards] = useState<PointsRewardItem[]>(initialRewards)
  const [exchanges, setExchanges] = useState<PointsExchangeItem[]>(initialExchanges)

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setRewards(initialRewards)
    setExchanges(initialExchanges)
  }

  const handleSave = () => {
    console.log('保存积分增值服务:', { rewards, exchanges })
    setIsEditMode(false)
  }

  // 积分奖励相关
  const updateReward = (id: string, field: keyof PointsRewardItem, value: string | number) => {
    setRewards(prev =>
      prev.map(reward =>
        reward.id === id ? { ...reward, [field]: value } : reward
      )
    )
  }

  const handleAddReward = () => {
    const newReward: PointsRewardItem = {
      id: `reward-${Date.now()}`,
      serviceName: '新服务',
      serviceDescription: '',
      pointsReward: 0,
      status: 'active',
      createdAt: new Date().toLocaleString('zh-CN').replace(/\//g, '/'),
    }
    setRewards([...rewards, newReward])
  }

  const handleDeleteReward = (id: string) => {
    if (confirm('确定要删除该服务吗?')) {
      setRewards(prev => prev.filter(r => r.id !== id))
    }
  }

  // 积分换购相关
  const updateExchange = (id: string, field: keyof PointsExchangeItem, value: string | number) => {
    setExchanges(prev =>
      prev.map(exchange =>
        exchange.id === id ? { ...exchange, [field]: value } : exchange
      )
    )
  }

  const handleAddExchange = () => {
    const newExchange: PointsExchangeItem = {
      id: `exchange-${Date.now()}`,
      serviceName: '新服务',
      serviceDescription: '',
      pointsCost: 0,
      status: 'active',
      createdAt: new Date().toLocaleString('zh-CN').replace(/\//g, '/'),
    }
    setExchanges([...exchanges, newExchange])
  }

  const handleDeleteExchange = (id: string) => {
    if (confirm('确定要删除该服务吗?')) {
      setExchanges(prev => prev.filter(e => e.id !== id))
    }
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <SettingsPageHeader
            title="积分增值服务"
            isEditing={isEditMode}
            onEditToggle={handleEditToggle}
            onSave={handleSave}
            onCancel={handleCancel}
            changeLogs={[]}
            changeLogTitle="积分增值服务 - 修改记录"
          />

          {/* 积分奖励卡片 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-green-600" />
                  积分奖励
                </CardTitle>
                {isEditMode && (
                  <Button onClick={handleAddReward} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新增服务
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">服务名称</TableHead>
                    <TableHead className="min-w-[250px]">服务说明</TableHead>
                    <TableHead className="min-w-[120px]">积分奖励</TableHead>
                    <TableHead className="min-w-[100px]">状态</TableHead>
                    {isEditMode && <TableHead className="w-[80px]">操作</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward.id}>
                      <TableCell>
                        <Input
                          value={reward.serviceName}
                          onChange={(e) => updateReward(reward.id, 'serviceName', e.target.value)}
                          className={`h-8 ${!isEditMode ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-0' : ''}`}
                          disabled={!isEditMode}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={reward.serviceDescription}
                          onChange={(e) => updateReward(reward.id, 'serviceDescription', e.target.value)}
                          className={`h-8 ${!isEditMode ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-0' : ''}`}
                          disabled={!isEditMode}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            value={reward.pointsReward}
                            onChange={(e) => updateReward(reward.id, 'pointsReward', Number(e.target.value))}
                            className={`w-20 h-8 ${!isEditMode ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-0' : ''}`}
                            disabled={!isEditMode}
                          />
                          <span className="text-sm text-muted-foreground">积分</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={reward.status === 'active'}
                          onCheckedChange={(checked) => updateReward(reward.id, 'status', checked ? 'active' : 'inactive')}
                        />
                      </TableCell>
                      {isEditMode && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteReward(reward.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {rewards.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  暂无积分奖励服务
                </div>
              )}
            </CardContent>
          </Card>

          {/* 积分换购卡片 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-secondary" />
                  积分换购
                </CardTitle>
                {isEditMode && (
                  <Button onClick={handleAddExchange} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新增服务
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">服务名称</TableHead>
                    <TableHead className="min-w-[250px]">服务说明</TableHead>
                    <TableHead className="min-w-[120px]">积分消耗</TableHead>
                    <TableHead className="min-w-[100px]">状态</TableHead>
                    {isEditMode && <TableHead className="w-[80px]">操作</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exchanges.map((exchange) => (
                    <TableRow key={exchange.id}>
                      <TableCell>
                        <Input
                          value={exchange.serviceName}
                          onChange={(e) => updateExchange(exchange.id, 'serviceName', e.target.value)}
                          className={`h-8 ${!isEditMode ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-0' : ''}`}
                          disabled={!isEditMode}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={exchange.serviceDescription}
                          onChange={(e) => updateExchange(exchange.id, 'serviceDescription', e.target.value)}
                          className={`h-8 ${!isEditMode ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-0' : ''}`}
                          disabled={!isEditMode}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            value={exchange.pointsCost}
                            onChange={(e) => updateExchange(exchange.id, 'pointsCost', Number(e.target.value))}
                            className={`w-20 h-8 ${!isEditMode ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-0' : ''}`}
                            disabled={!isEditMode}
                          />
                          <span className="text-sm text-muted-foreground">积分</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={exchange.status === 'active'}
                          onCheckedChange={(checked) => updateExchange(exchange.id, 'status', checked ? 'active' : 'inactive')}
                        />
                      </TableCell>
                      {isEditMode && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExchange(exchange.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {exchanges.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  暂无积分换购服务
                </div>
              )}
            </CardContent>
          </Card>

          {/* 说明 */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">配置说明:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>积分奖励: 用户的环保行为和良好习惯获得积分奖励</li>
                  <li>积分换购: 用户使用积分兑换增值服务</li>
                  <li>状态开关可随时启用/禁用服务,不受"修改设置"限制</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

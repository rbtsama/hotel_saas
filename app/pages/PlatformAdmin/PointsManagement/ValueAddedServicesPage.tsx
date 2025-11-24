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
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Gift className="w-5 h-5 text-green-600" />
                  积分奖励
                </CardTitle>
                {isEditMode && (
                  <Button onClick={handleAddReward} className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新增服务
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="min-w-[150px] text-slate-600 font-semibold">服务名称</TableHead>
                    <TableHead className="min-w-[250px] text-slate-600 font-semibold">服务说明</TableHead>
                    <TableHead className="min-w-[120px] text-slate-600 font-semibold">积分奖励</TableHead>
                    <TableHead className="min-w-[100px] text-slate-600 font-semibold">状态</TableHead>
                    {isEditMode && <TableHead className="w-[80px] text-slate-600 font-semibold">操作</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell>
                        <Input
                          value={reward.serviceName}
                          onChange={(e) => updateReward(reward.id, 'serviceName', e.target.value)}
                          className={`h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed border-0' : ''}`}
                          disabled={!isEditMode}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={reward.serviceDescription}
                          onChange={(e) => updateReward(reward.id, 'serviceDescription', e.target.value)}
                          className={`h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed border-0' : ''}`}
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
                            className={`w-20 h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed border-0' : ''}`}
                            disabled={!isEditMode}
                          />
                          <span className="text-sm text-slate-600">积分</span>
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
                            className="h-8 hover:bg-red-50 hover:text-red-600"
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
                <div className="text-center py-12 text-slate-500">
                  暂无积分奖励服务
                </div>
              )}
            </CardContent>
          </Card>

          {/* 积分换购卡片 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                  积分换购
                </CardTitle>
                {isEditMode && (
                  <Button onClick={handleAddExchange} className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新增服务
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="min-w-[150px] text-slate-600 font-semibold">服务名称</TableHead>
                    <TableHead className="min-w-[250px] text-slate-600 font-semibold">服务说明</TableHead>
                    <TableHead className="min-w-[120px] text-slate-600 font-semibold">积分消耗</TableHead>
                    <TableHead className="min-w-[100px] text-slate-600 font-semibold">状态</TableHead>
                    {isEditMode && <TableHead className="w-[80px] text-slate-600 font-semibold">操作</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exchanges.map((exchange) => (
                    <TableRow key={exchange.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell>
                        <Input
                          value={exchange.serviceName}
                          onChange={(e) => updateExchange(exchange.id, 'serviceName', e.target.value)}
                          className={`h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed border-0' : ''}`}
                          disabled={!isEditMode}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={exchange.serviceDescription}
                          onChange={(e) => updateExchange(exchange.id, 'serviceDescription', e.target.value)}
                          className={`h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed border-0' : ''}`}
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
                            className={`w-20 h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed border-0' : ''}`}
                            disabled={!isEditMode}
                          />
                          <span className="text-sm text-slate-600">积分</span>
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
                            className="h-8 hover:bg-red-50 hover:text-red-600"
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
                <div className="text-center py-12 text-slate-500">
                  暂无积分换购服务
                </div>
              )}
            </CardContent>
          </Card>

          {/* 说明 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-slate-600 space-y-2">
                <p className="font-medium text-slate-900">配置说明:</p>
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

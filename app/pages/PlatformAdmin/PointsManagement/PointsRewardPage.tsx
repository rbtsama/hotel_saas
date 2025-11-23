/**
 * 平台后台 - 积分奖励服务配置页面
 */

import { useState } from 'react'
import type { PointsRewardItem } from './types/valueAddedService.types'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Switch } from '~/components/ui/switch'
import { Plus, Trash2 } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import SettingsPageHeader from '~/pages/SharedComponents/SettingsPageHeader'

interface PointsRewardPageProps {
  rewards: PointsRewardItem[]
}

export default function PointsRewardPage({ rewards: initialRewards }: PointsRewardPageProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [rewards, setRewards] = useState<PointsRewardItem[]>(initialRewards)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setRewards(initialRewards) // 恢复原始数据
    setSelectedIds([])
  }

  const handleSave = () => {
    console.log('保存积分奖励配置:', rewards)
    setIsEditMode(false)
    setSelectedIds([])
  }

  const updateReward = (id: string, field: keyof PointsRewardItem, value: string | number) => {
    setRewards(prev =>
      prev.map(reward =>
        reward.id === id ? { ...reward, [field]: value } : reward
      )
    )
  }

  const handleDelete = () => {
    if (selectedIds.length === 0) return
    if (confirm(`确定要删除选中的 ${selectedIds.length} 个服务吗？`)) {
      setRewards(prev => prev.filter(r => !selectedIds.includes(r.id)))
      setSelectedIds([])
    }
  }

  const handleAdd = () => {
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

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <SettingsPageHeader
            title="积分奖励服务"
            isEditing={isEditMode}
            onEditToggle={handleEditToggle}
            onSave={handleSave}
            onCancel={handleCancel}
            changeLogs={[]}
            changeLogTitle="积分奖励服务 - 修改记录"
          />

          {/* 操作按钮 */}
          {isEditMode && (
            <div className="flex gap-2">
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                新增服务
              </Button>
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={selectedIds.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                删除选中
              </Button>
            </div>
          )}

          {/* 积分奖励列表 */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {isEditMode && <TableHead className="w-12"></TableHead>}
                    <TableHead className="min-w-[150px]">服务名称</TableHead>
                    <TableHead className="min-w-[250px]">服务说明</TableHead>
                    <TableHead className="min-w-[120px]">积分奖励</TableHead>
                    <TableHead className="min-w-[100px]">状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewards.map((reward) => (
                    <TableRow key={reward.id}>
                      {isEditMode && (
                        <TableCell>
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={selectedIds.includes(reward.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, reward.id])
                              } else {
                                setSelectedIds(selectedIds.filter(id => id !== reward.id))
                              }
                            }}
                          />
                        </TableCell>
                      )}
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

          {/* 说明 */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">配置说明：</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>积分奖励服务用于激励用户的环保行为和良好习惯</li>
                  <li>用户在离店时选择对应的环保选项，可获得相应的积分奖励</li>
                  <li>积分奖励会在订单完成后自动发放到用户账户</li>
                  <li>状态开关可随时启用/禁用服务，不受"修改设置"限制</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

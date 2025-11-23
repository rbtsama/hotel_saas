/**
 * 平台后台 - 积分换购服务配置页面
 */

import { useState } from 'react'
import type { PointsExchangeItem } from './types/valueAddedService.types'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Switch } from '~/components/ui/switch'
import { Plus, Trash2 } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import SettingsPageHeader from '~/pages/SharedComponents/SettingsPageHeader'

interface PointsExchangePageProps {
  exchanges: PointsExchangeItem[]
}

export default function PointsExchangePage({ exchanges: initialExchanges }: PointsExchangePageProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [exchanges, setExchanges] = useState<PointsExchangeItem[]>(initialExchanges)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setExchanges(initialExchanges) // 恢复原始数据
    setSelectedIds([])
  }

  const handleSave = () => {
    console.log('保存积分换购配置:', exchanges)
    setIsEditMode(false)
    setSelectedIds([])
  }

  const updateExchange = (id: string, field: keyof PointsExchangeItem, value: string | number) => {
    setExchanges(prev =>
      prev.map(exchange =>
        exchange.id === id ? { ...exchange, [field]: value } : exchange
      )
    )
  }

  const handleDelete = () => {
    if (selectedIds.length === 0) return
    if (confirm(`确定要删除选中的 ${selectedIds.length} 个服务吗？`)) {
      setExchanges(prev => prev.filter(e => !selectedIds.includes(e.id)))
      setSelectedIds([])
    }
  }

  const handleAdd = () => {
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

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <SettingsPageHeader
            title="积分换购服务"
            isEditing={isEditMode}
            onEditToggle={handleEditToggle}
            onSave={handleSave}
            onCancel={handleCancel}
            changeLogs={[]}
            changeLogTitle="积分换购服务 - 修改记录"
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

          {/* 积分换购列表 */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {isEditMode && <TableHead className="w-12"></TableHead>}
                    <TableHead className="min-w-[150px]">服务名称</TableHead>
                    <TableHead className="min-w-[250px]">服务说明</TableHead>
                    <TableHead className="min-w-[120px]">积分消耗</TableHead>
                    <TableHead className="min-w-[100px]">状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exchanges.map((exchange) => (
                    <TableRow key={exchange.id}>
                      {isEditMode && (
                        <TableCell>
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={selectedIds.includes(exchange.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, exchange.id])
                              } else {
                                setSelectedIds(selectedIds.filter(id => id !== exchange.id))
                              }
                            }}
                          />
                        </TableCell>
                      )}
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
                <p className="font-medium text-foreground">配置说明：</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>积分换购服务允许用户使用积分兑换增值服务</li>
                  <li>用户在下单时可选择需要的服务，系统自动扣除相应积分</li>
                  <li>常见服务：早餐、延迟退房、房型升级、洗衣等</li>
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

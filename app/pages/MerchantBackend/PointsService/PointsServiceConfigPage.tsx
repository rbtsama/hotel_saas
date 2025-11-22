/**
 * 商户端 - 积分服务配置页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { PointsServiceConfig, PointsServiceItem } from './types/pointsService.types'
import { PointsServiceType } from './types/pointsService.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Badge } from '~/components/ui/badge'
import { Checkbox } from '~/components/ui/checkbox'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { Plus, Edit, Trash2, Gift, ShoppingBag } from 'lucide-react'

interface PointsServiceConfigPageProps {
  config: PointsServiceConfig
}

export default function PointsServiceConfigPage({ config }: PointsServiceConfigPageProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<PointsServiceItem | null>(null)
  const [formData, setFormData] = useState({
    serviceName: '',
    pointsAmount: 0,
    description: '',
    enabled: true,
  })

  const handleAdd = (type: PointsServiceType) => {
    setEditingService(null)
    setFormData({
      serviceName: '',
      pointsAmount: type === PointsServiceType.ECO_REWARD ? 5 : 20,
      description: '',
      enabled: true,
    })
    setEditDialogOpen(true)
  }

  const handleEdit = (service: PointsServiceItem) => {
    setEditingService(service)
    setFormData({
      serviceName: service.serviceName,
      pointsAmount: Math.abs(service.pointsAmount),
      description: service.description || '',
      enabled: service.enabled,
    })
    setEditDialogOpen(true)
  }

  const isEcoReward = editingService?.type === PointsServiceType.ECO_REWARD ||
                      (!editingService && formData.pointsAmount <= 10)

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">积分服务配置</h1>
            <p className="text-slate-600 mt-1">
              配置环保奖励服务和增值服务，设定对应的积分数量
            </p>
          </div>

          {/* 说明卡片 */}
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-blue-900">
                    <p className="font-semibold mb-1">环保奖励服务</p>
                    <p>用户选择后，离店时自动发放积分（信任用户，无需验证）</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShoppingBag className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-blue-900">
                    <p className="font-semibold mb-1">增值服务</p>
                    <p>用户选择后立即预扣除积分，停用的服务不会在用户端展示</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 环保奖励服务 */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-green-600" />
                    环保奖励服务
                  </CardTitle>
                  <CardDescription className="mt-1">
                    用户选择后，离店后发放积分
                  </CardDescription>
                </div>
                <Button
                  onClick={() => handleAdd(PointsServiceType.ECO_REWARD)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  新增环保奖励
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>服务名称</TableHead>
                    <TableHead className="text-right">奖励积分</TableHead>
                    <TableHead>服务说明</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.ecoRewards.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.serviceName}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-green-600">
                          {Math.abs(service.pointsAmount)}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {service.description || '-'}
                      </TableCell>
                      <TableCell>
                        {service.enabled ? (
                          <Badge className="bg-green-100 text-green-700">启用</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500">停用</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">{service.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Form method="post">
                            <input type="hidden" name="_action" value="toggle" />
                            <input type="hidden" name="serviceId" value={service.id} />
                            <Button
                              type="submit"
                              variant="ghost"
                              size="sm"
                            >
                              {service.enabled ? '停用' : '启用'}
                            </Button>
                          </Form>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 增值服务 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-secondary" />
                    增值服务
                  </CardTitle>
                  <CardDescription className="mt-1">
                    用户选择后，下单时扣除积分
                  </CardDescription>
                </div>
                <Button
                  onClick={() => handleAdd(PointsServiceType.VALUE_ADDED)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  新增增值服务
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>服务名称</TableHead>
                    <TableHead className="text-right">消耗积分</TableHead>
                    <TableHead>服务说明</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.valueAddedServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.serviceName}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-secondary">
                          +{service.pointsAmount}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {service.description || '-'}
                      </TableCell>
                      <TableCell>
                        {service.enabled ? (
                          <Badge className="bg-green-100 text-green-700">启用</Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500">停用</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-slate-500">{service.updatedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(service)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Form method="post">
                            <input type="hidden" name="_action" value="toggle" />
                            <input type="hidden" name="serviceId" value={service.id} />
                            <Button
                              type="submit"
                              variant="ghost"
                              size="sm"
                            >
                              {service.enabled ? '停用' : '启用'}
                            </Button>
                          </Form>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 新增/编辑服务弹窗 */}
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingService ? '编辑' : '新增'}
                  {isEcoReward ? '环保奖励服务' : '增值服务'}
                </DialogTitle>
                <DialogDescription>
                  {isEcoReward
                    ? '用户承诺后离店时自动发放积分'
                    : '用户选择后下单时立即扣除积分'}
                </DialogDescription>
              </DialogHeader>
              <Form method="post" onSubmit={() => setEditDialogOpen(false)}>
                <input type="hidden" name="_action" value={editingService ? 'update' : 'create'} />
                {editingService && <input type="hidden" name="serviceId" value={editingService.id} />}
                <input type="hidden" name="serviceType" value={isEcoReward ? 'eco_reward' : 'value_added'} />
                <div className="space-y-4 py-4">
                  {/* 服务名称 */}
                  <div className="space-y-2">
                    <Label htmlFor="serviceName">服务名称</Label>
                    <Input
                      id="serviceName"
                      name="serviceName"
                      value={formData.serviceName}
                      onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                      placeholder={isEcoReward ? '例如：自带拖鞋' : '例如：单人早餐'}
                      required
                    />
                  </div>

                  {/* 积分数量 */}
                  <div className="space-y-2">
                    <Label htmlFor="pointsAmount">
                      {isEcoReward ? '奖励积分' : '消耗积分'}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="pointsAmount"
                        name="pointsAmount"
                        type="number"
                        min="1"
                        max="999"
                        value={formData.pointsAmount}
                        onChange={(e) => setFormData({ ...formData, pointsAmount: parseInt(e.target.value) || 0 })}
                        className="max-w-xs"
                      />
                      <span className="text-sm text-slate-600">积分</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {isEcoReward
                        ? '输入正数，用户离店后获得此积分'
                        : '输入正数，用户下单时扣除此积分'}
                    </p>
                  </div>

                  {/* 服务说明 */}
                  <div className="space-y-2">
                    <Label htmlFor="description">服务说明（选填）</Label>
                    <Input
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={
                        isEcoReward
                          ? '例如：支持环保，自带拖鞋可获得积分奖励'
                          : '例如：含单人自助早餐，早餐时间7:00-10:00'
                      }
                    />
                  </div>

                  {/* 启用状态 */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="enabled"
                      name="enabled"
                      checked={formData.enabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, enabled: !!checked })}
                    />
                    <Label htmlFor="enabled" className="cursor-pointer">
                      启用该服务
                    </Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditDialogOpen(false)}
                  >
                    取消
                  </Button>
                  <Button type="submit">确定</Button>
                </div>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}

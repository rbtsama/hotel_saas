/**
 * 平台后台 - 积分服务设置页面（积分奖励 + 积分换购）
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { PointsRewardItem, PointsExchangeItem } from './types/valueAddedService.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Plus, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import ServiceItemDialog from './components/ServiceItemDialog'

interface PointsServicesPageProps {
  rewardServices: PointsRewardItem[]
  exchangeServices: PointsExchangeItem[]
  error: string | null
}

export default function PointsServicesPage({
  rewardServices,
  exchangeServices,
  error,
}: PointsServicesPageProps) {
  // Dialog状态
  const [isRewardCreateDialogOpen, setIsRewardCreateDialogOpen] = useState(false)
  const [isRewardEditDialogOpen, setIsRewardEditDialogOpen] = useState(false)
  const [editingRewardItem, setEditingRewardItem] = useState<PointsRewardItem | null>(null)

  const [isExchangeCreateDialogOpen, setIsExchangeCreateDialogOpen] = useState(false)
  const [isExchangeEditDialogOpen, setIsExchangeEditDialogOpen] = useState(false)
  const [editingExchangeItem, setEditingExchangeItem] = useState<PointsExchangeItem | null>(null)

  // 删除确认状态
  const [deletingRewardId, setDeletingRewardId] = useState<string | null>(null)
  const [deletingExchangeId, setDeletingExchangeId] = useState<string | null>(null)

  // 打开编辑Dialog - 奖励
  const handleEditReward = (item: PointsRewardItem) => {
    setEditingRewardItem(item)
    setIsRewardEditDialogOpen(true)
  }

  // 打开编辑Dialog - 换购
  const handleEditExchange = (item: PointsExchangeItem) => {
    setEditingExchangeItem(item)
    setIsExchangeEditDialogOpen(true)
  }

  // 删除确认 - 奖励
  const handleDeleteReward = (id: string) => {
    if (confirm('确认删除该积分奖励服务？')) {
      setDeletingRewardId(id)
      // 提交删除表单
      document.getElementById(`delete-reward-${id}`)?.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  // 删除确认 - 换购
  const handleDeleteExchange = (id: string) => {
    if (confirm('确认删除该积分换购服务？')) {
      setDeletingExchangeId(id)
      // 提交删除表单
      document.getElementById(`delete-exchange-${id}`)?.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  // 上移/下移处理
  const handleMoveExchange = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === exchangeServices.length - 1) return

    const newList = [...exchangeServices]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    // 交换位置
    ;[newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]]

    // 提交重排序
    const ids = newList.map((item) => item.id)
    const form = document.getElementById('reorder-exchange-form') as HTMLFormElement
    if (form) {
      const input = form.querySelector('input[name="ids"]') as HTMLInputElement
      if (input) {
        input.value = JSON.stringify(ids)
        form.requestSubmit()
      }
    }
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            错误: {error}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6 overflow-y-auto h-full">
        {/* 积分奖励服务Dialog */}
        <ServiceItemDialog
          open={isRewardCreateDialogOpen}
          onOpenChange={setIsRewardCreateDialogOpen}
          mode="create"
          type="reward"
        />
        <ServiceItemDialog
          open={isRewardEditDialogOpen}
          onOpenChange={setIsRewardEditDialogOpen}
          mode="edit"
          type="reward"
          item={editingRewardItem}
        />

        {/* 积分换购服务Dialog */}
        <ServiceItemDialog
          open={isExchangeCreateDialogOpen}
          onOpenChange={setIsExchangeCreateDialogOpen}
          mode="create"
          type="exchange"
        />
        <ServiceItemDialog
          open={isExchangeEditDialogOpen}
          onOpenChange={setIsExchangeEditDialogOpen}
          mode="edit"
          type="exchange"
          item={editingExchangeItem}
        />

        {/* 隐藏的重排序表单 */}
        <Form method="post" action="/platform-admin/points-management/services" id="reorder-exchange-form" style={{ display: 'none' }}>
          <input type="hidden" name="action" value="reorder-exchange" />
          <input type="hidden" name="ids" value="[]" />
        </Form>

        {/* Card 1: 积分奖励服务 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">积分奖励服务</CardTitle>
            <Button
              onClick={() => setIsRewardCreateDialogOpen(true)}
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50">
                    <TableHead className="text-slate-600 font-semibold w-[80px]">序号</TableHead>
                    <TableHead className="text-slate-600 font-semibold">服务内容</TableHead>
                    <TableHead className="text-slate-600 font-semibold w-[120px]">奖励积分</TableHead>
                    <TableHead className="text-slate-600 font-semibold text-center w-[280px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardServices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                        暂无数据
                      </TableCell>
                    </TableRow>
                  ) : (
                    rewardServices.map((item, index) => (
                      <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900">{index + 1}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-slate-900 font-medium">{item.serviceName}</div>
                            {item.serviceDescription && (
                              <div className="text-slate-600 text-sm">{item.serviceDescription}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-900 font-semibold">{item.pointsReward}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            {/* 编辑按钮 */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 border-slate-300"
                              onClick={() => handleEditReward(item)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              编辑
                            </Button>

                            {/* 启用/停用按钮 */}
                            <Form method="post" action="/platform-admin/points-management/services">
                              <input type="hidden" name="action" value="toggle-reward" />
                              <input type="hidden" name="id" value={item.id} />
                              <Button
                                type="submit"
                                variant="outline"
                                size="sm"
                                className={`h-7 px-3 ${
                                  item.status === 'active'
                                    ? 'border-orange-300 text-orange-700 hover:bg-orange-50'
                                    : 'border-green-300 text-green-700 hover:bg-green-50'
                                }`}
                              >
                                {item.status === 'active' ? '停用' : '启用'}
                              </Button>
                            </Form>

                            {/* 删除按钮 */}
                            <Form
                              method="post"
                              action="/platform-admin/points-management/services"
                              id={`delete-reward-${item.id}`}
                            >
                              <input type="hidden" name="action" value="delete-reward" />
                              <input type="hidden" name="id" value={item.id} />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-3 border-red-300 text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteReward(item.id)}
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                删除
                              </Button>
                            </Form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: 积分换购服务 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">积分换购服务</CardTitle>
            <Button
              onClick={() => setIsExchangeCreateDialogOpen(true)}
              className="h-9 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增
            </Button>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50">
                    <TableHead className="text-slate-600 font-semibold w-[80px]">序号</TableHead>
                    <TableHead className="text-slate-600 font-semibold">服务内容</TableHead>
                    <TableHead className="text-slate-600 font-semibold w-[120px]">消耗积分</TableHead>
                    <TableHead className="text-slate-600 font-semibold text-center w-[340px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exchangeServices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                        暂无数据
                      </TableCell>
                    </TableRow>
                  ) : (
                    exchangeServices.map((item, index) => (
                      <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="text-slate-900">{item.序号}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-slate-900 font-medium">{item.serviceName}</div>
                            {item.serviceDescription && (
                              <div className="text-slate-600 text-sm">{item.serviceDescription}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-900 font-semibold">{item.pointsCost}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            {/* 上移按钮 */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 border-slate-300"
                              disabled={index === 0}
                              onClick={() => handleMoveExchange(index, 'up')}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>

                            {/* 下移按钮 */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-2 border-slate-300"
                              disabled={index === exchangeServices.length - 1}
                              onClick={() => handleMoveExchange(index, 'down')}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>

                            {/* 编辑按钮 */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 px-3 border-slate-300"
                              onClick={() => handleEditExchange(item)}
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              编辑
                            </Button>

                            {/* 启用/停用按钮 */}
                            <Form method="post" action="/platform-admin/points-management/services">
                              <input type="hidden" name="action" value="toggle-exchange" />
                              <input type="hidden" name="id" value={item.id} />
                              <Button
                                type="submit"
                                variant="outline"
                                size="sm"
                                className={`h-7 px-3 ${
                                  item.status === 'active'
                                    ? 'border-orange-300 text-orange-700 hover:bg-orange-50'
                                    : 'border-green-300 text-green-700 hover:bg-green-50'
                                }`}
                              >
                                {item.status === 'active' ? '停用' : '启用'}
                              </Button>
                            </Form>

                            {/* 删除按钮 */}
                            <Form
                              method="post"
                              action="/platform-admin/points-management/services"
                              id={`delete-exchange-${item.id}`}
                            >
                              <input type="hidden" name="action" value="delete-exchange" />
                              <input type="hidden" name="id" value={item.id} />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-3 border-red-300 text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteExchange(item.id)}
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                删除
                              </Button>
                            </Form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

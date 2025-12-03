/**
 * 平台后台 - 积分调整页面
 */

import { useState, useEffect } from 'react'
import { Form, useNavigate } from '@remix-run/react'
import type { UserPointsAccount, PointsChangeLog } from './types/valueAddedService.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { History, FileText, Plus, Minus } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'

interface PointsAdjustPageProps {
  userAccount: UserPointsAccount | null
  changeLogs: PointsChangeLog[]
  total: number
  pageNum: number
  phoneNumber: string
  error: string | null
}

const getOperationTypeLabel = (type: string) => {
  const typeMap: Record<string, { label: string; className: string }> = {
    earn: { label: '获得', className: 'bg-green-50 text-green-700 border-green-300' },
    deduct: { label: '扣减', className: 'bg-orange-50 text-orange-700 border-orange-300' },
    expire: { label: '过期', className: 'bg-gray-50 text-gray-700 border-gray-300' },
    adjust: { label: '调整', className: 'bg-blue-50 text-blue-700 border-blue-300' },
  }
  return typeMap[type] || { label: type, className: 'bg-slate-50 text-slate-700 border-slate-300' }
}

export default function PointsAdjustPage({
  userAccount,
  changeLogs,
  total,
  pageNum,
  phoneNumber: searchedPhone,
  error,
}: PointsAdjustPageProps) {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState(searchedPhone || '')
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false)

  // 未找到用户时显示toast
  useEffect(() => {
    if (searchedPhone && !userAccount) {
      alert(`未找到手机号为 ${searchedPhone} 的用户`)
    }
  }, [searchedPhone, userAccount])
  const [adjustForm, setAdjustForm] = useState({
    type: 'add' as 'add' | 'deduct',
    pointsAmount: '',
    remark: '',
  })

  const pageSize = 20
  const totalPages = Math.ceil(total / pageSize)

  const handleAdjustSubmit = () => {
    if (!adjustForm.pointsAmount || !adjustForm.remark) {
      alert('请填写调整积分和原因')
      return
    }

    // 转换为带符号的数字
    const amount = parseInt(adjustForm.pointsAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('请输入有效的正整数')
      return
    }

    const signedAmount = adjustForm.type === 'add' ? amount : -amount

    // 提交表单
    const form = document.createElement('form')
    form.method = 'post'
    form.action = '/platform-admin/points-management/adjust'

    const fields = {
      action: 'adjust-points',
      userId: userAccount?.id || '',
      pointsAmount: String(signedAmount),
      remark: adjustForm.remark,
    }

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = String(value)
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
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
        {/* 搜索框 */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Form method="get" className="flex gap-2">
                <Input
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="请输入用户手机号"
                  className="h-9 w-[200px] border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  required
                />
                <Button type="submit" className="h-9 bg-blue-600 hover:bg-blue-700">
                  搜索
                </Button>
              </Form>

              <Button
                variant="outline"
                className="h-9 border-slate-300"
                onClick={() => navigate('/platform-admin/points-management/operation-logs')}
              >
                <FileText className="w-4 h-4 mr-2" />
                操作记录
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 用户信息卡片 */}
        {userAccount && (
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div>
                    <span className="text-sm text-slate-600">手机号</span>
                    <div className="text-lg font-semibold text-slate-900 mt-1">{userAccount.phoneNumber}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-600">VIP等级</span>
                    <div className="text-lg font-semibold text-orange-600 mt-1">VIP{userAccount.vipLevel}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-600">当前积分</span>
                    <div className="text-lg font-semibold text-green-600 mt-1">{userAccount.availablePoints}</div>
                  </div>
                </div>

                <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="h-9 bg-blue-600 hover:bg-blue-700">
                      手动调整积分
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                      <DialogTitle>手动调整用户积分</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-5 py-4">
                      {/* 用户信息卡片 */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                        <div>
                          <div className="text-xs text-slate-600">手机号</div>
                          <div className="text-sm font-semibold text-slate-900 mt-1">{userAccount.phoneNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">VIP等级</div>
                          <div className="text-sm font-semibold text-orange-600 mt-1">VIP{userAccount.vipLevel}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-600">当前积分</div>
                          <div className="text-sm font-semibold text-green-600 mt-1">{userAccount.availablePoints}</div>
                        </div>
                      </div>

                      {/* 调整类型 */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">调整类型 *</label>
                        <RadioGroup value={adjustForm.type} onValueChange={(value) => setAdjustForm({ ...adjustForm, type: value as 'add' | 'deduct' })}>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="add" id="type-add" />
                              <Label htmlFor="type-add" className="cursor-pointer text-sm flex items-center gap-1">
                                <Plus className="w-4 h-4 text-green-600" />
                                增加积分
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="deduct" id="type-deduct" />
                              <Label htmlFor="type-deduct" className="cursor-pointer text-sm flex items-center gap-1">
                                <Minus className="w-4 h-4 text-red-600" />
                                减少积分
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* 调整积分 */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">调整积分 *</label>
                        <Input
                          type="number"
                          value={adjustForm.pointsAmount}
                          onChange={(e) => setAdjustForm({ ...adjustForm, pointsAmount: e.target.value })}
                          placeholder="请输入正整数"
                          className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          min="1"
                        />
                      </div>

                      {/* 调整原因 */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">调整原因 *</label>
                        <textarea
                          value={adjustForm.remark}
                          onChange={(e) => setAdjustForm({ ...adjustForm, remark: e.target.value })}
                          placeholder="请填写调整原因"
                          className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm min-h-24 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      {/* 按钮 */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                        <Button
                          variant="outline"
                          className="h-9 border-slate-300"
                          onClick={() => {
                            setIsAdjustDialogOpen(false)
                            setAdjustForm({ type: 'add', pointsAmount: '', remark: '' })
                          }}
                        >
                          取消
                        </Button>
                        <Button
                          onClick={handleAdjustSubmit}
                          className="h-9 bg-blue-600 hover:bg-blue-700"
                        >
                          确认调整
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 积分变动历史 - 只在搜索后显示 */}
        {userAccount && (
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">积分变动历史</CardTitle>
          </CardHeader>
          <CardContent>
            {!userAccount ? (
              <div className="text-center text-slate-500 py-8">
                请先搜索用户
              </div>
            ) : changeLogs.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                暂无积分变动记录
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200 bg-slate-50">
                        <TableHead className="text-slate-600 font-semibold w-[120px]">操作类型</TableHead>
                        <TableHead className="text-slate-600 font-semibold w-[100px]">积分数</TableHead>
                        <TableHead className="text-slate-600 font-semibold">备注说明</TableHead>
                        <TableHead className="text-slate-600 font-semibold w-[100px]">变动前</TableHead>
                        <TableHead className="text-slate-600 font-semibold w-[100px]">变动后</TableHead>
                        <TableHead className="text-slate-600 font-semibold w-[160px]">操作时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {changeLogs.map((log) => {
                        const { label, className } = getOperationTypeLabel(log.operationType)
                        return (
                          <TableRow key={log.id} className="hover:bg-slate-50 transition-colors">
                            <TableCell>
                              <Badge className={`${className} border`}>
                                {label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-900 font-semibold">
                              {log.operationType === 'earn' || log.operationType === 'adjust' ? '+' : '-'}{Math.abs(log.pointsAmount)}
                            </TableCell>
                            <TableCell className="text-slate-700">{log.remark}</TableCell>
                            <TableCell className="text-slate-900">{log.balanceBefore}</TableCell>
                            <TableCell className="text-slate-900 font-semibold">{log.balanceAfter}</TableCell>
                            <TableCell className="text-slate-600 text-sm">{log.operatedAt}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* 分页 */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 pt-4">
                    {pageNum > 1 && (
                      <Button
                        variant="outline"
                        className="h-8 px-2 text-xs border-slate-300"
                        onClick={() => {
                          const form = document.createElement('form')
                          form.method = 'post'
                          form.action = '/platform-admin/points-management/adjust'

                          const fields = {
                            action: 'search',
                            phoneNumber: userAccount.phoneNumber,
                            pageNum: String(pageNum - 1),
                          }

                          Object.entries(fields).forEach(([key, value]) => {
                            const input = document.createElement('input')
                            input.type = 'hidden'
                            input.name = key
                            input.value = value
                            form.appendChild(input)
                          })

                          document.body.appendChild(form)
                          form.submit()
                          document.body.removeChild(form)
                        }}
                      >
                        上一页
                      </Button>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === pageNum ? 'default' : 'outline'}
                        className={`h-8 px-2 text-xs ${
                          page === pageNum
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'border-slate-300'
                        }`}
                        onClick={() => {
                          if (page !== pageNum) {
                            const form = document.createElement('form')
                            form.method = 'post'
                            form.action = '/platform-admin/points-management/adjust'

                            const fields = {
                              action: 'search',
                              phoneNumber: userAccount.phoneNumber,
                              pageNum: String(page),
                            }

                            Object.entries(fields).forEach(([key, value]) => {
                              const input = document.createElement('input')
                              input.type = 'hidden'
                              input.name = key
                              input.value = value
                              form.appendChild(input)
                            })

                            document.body.appendChild(form)
                            form.submit()
                            document.body.removeChild(form)
                          }
                        }}
                      >
                        {page}
                      </Button>
                    ))}

                    {pageNum < totalPages && (
                      <Button
                        variant="outline"
                        className="h-8 px-2 text-xs border-slate-300"
                        onClick={() => {
                          const form = document.createElement('form')
                          form.method = 'post'
                          form.action = '/platform-admin/points-management/adjust'

                          const fields = {
                            action: 'search',
                            phoneNumber: userAccount.phoneNumber,
                            pageNum: String(pageNum + 1),
                          }

                          Object.entries(fields).forEach(([key, value]) => {
                            const input = document.createElement('input')
                            input.type = 'hidden'
                            input.name = key
                            input.value = value
                            form.appendChild(input)
                          })

                          document.body.appendChild(form)
                          form.submit()
                          document.body.removeChild(form)
                        }}
                      >
                        下一页
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        )}
      </div>
    </MainLayout>
  )
}

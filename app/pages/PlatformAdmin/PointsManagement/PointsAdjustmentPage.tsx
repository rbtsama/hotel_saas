/**
 * 平台后台 - 积分调整页面
 */

import { useState, useEffect } from 'react'
import { Form, useSearchParams } from '@remix-run/react'
import type { UserPointsInfo, PointsDetailRecord, AdjustmentType } from './types/pointsAdjustment.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Search, Plus, Minus } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface PointsAdjustmentPageProps {
  userInfo: UserPointsInfo | null
  details: PointsDetailRecord[]
}

export default function PointsAdjustmentPage({ userInfo, details }: PointsAdjustmentPageProps) {
  // 使用Remix的useSearchParams获取URL参数
  const [searchParams] = useSearchParams()
  const urlUserId = searchParams.get('userId') || ''

  const [searchUserId, setSearchUserId] = useState(urlUserId)
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('increase')
  const [adjustmentAmount, setAdjustmentAmount] = useState('')
  const [adjustmentReason, setAdjustmentReason] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  // 当URL参数变化时更新搜索框
  useEffect(() => {
    if (urlUserId) {
      setSearchUserId(urlUserId)
    }
  }, [urlUserId])

  // 搜索功能通过Form提交实现,页面会重新加载获取新数据

  const handleAdjustment = () => {
    if (!userInfo || !adjustmentAmount || Number(adjustmentAmount) <= 0) {
      alert('请输入有效的积分数量')
      return
    }
    setShowConfirm(true)
  }

  const confirmAdjustment = () => {
    const amount = Number(adjustmentAmount)
    const finalAmount = adjustmentType === 'increase' ? amount : -amount

    console.log('积分调整记录:', {
      userId: userInfo!.userId,
      userName: userInfo!.userName,
      type: adjustmentType,
      amount: finalAmount,
      reason: adjustmentReason,
      operator: '兔子',
      time: new Date().toLocaleString('zh-CN')
    })

    setShowConfirm(false)
    setAdjustmentAmount('')
    setAdjustmentReason('')
    // 移除成功提示弹窗 - 确认弹窗关闭即表示操作完成
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">积分调整</h1>
          </div>

          {/* 用户搜索 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">用户搜索</CardTitle>
            </CardHeader>
            <CardContent>
              <Form method="get">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      id="userId"
                      name="userId"
                      value={searchUserId}
                      onChange={(e) => setSearchUserId(e.target.value)}
                      placeholder="请输入用户ID，如154655"
                      className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                      <Search className="h-4 w-4 mr-2" />
                      搜索
                    </Button>
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>

          {/* 用户积分信息 */}
          {userInfo && (
            <>
              <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">用户积分信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-slate-900">用户ID</div>
                      <div className="text-lg font-semibold text-slate-900 mt-1">{userInfo.userId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-900">用户名</div>
                      <div className="text-lg font-semibold text-slate-900 mt-1">{userInfo.userName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-900">手机号</div>
                      <div className="text-lg font-semibold text-slate-900 mt-1">{userInfo.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-900">会员等级</div>
                      <Badge variant="outline" className="text-sm font-semibold mt-1 border-blue-300 text-blue-700 bg-blue-50">
                        {userInfo.memberLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 mt-6 pt-6 border-t border-slate-200">
                    <div>
                      <div className="text-sm text-slate-900">当前积分</div>
                      <div className="text-2xl font-bold text-blue-600 mt-1">{userInfo.currentPoints.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-900">累计获得</div>
                      <div className="text-lg font-semibold text-green-600 mt-1">+{userInfo.totalEarned.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-900">累计消耗</div>
                      <div className="text-lg font-semibold text-orange-600 mt-1">-{userInfo.totalSpent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-900">最后更新</div>
                      <div className="text-sm text-slate-900 mt-1">{userInfo.lastUpdateTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 积分调整操作 */}
              <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">积分调整操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">调整类型</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={adjustmentType === 'increase' ? 'default' : 'outline'}
                          onClick={() => setAdjustmentType('increase')}
                          className={`h-9 flex-1 font-medium transition-all ${
                            adjustmentType === 'increase'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          增加积分
                        </Button>
                        <Button
                          variant={adjustmentType === 'decrease' ? 'default' : 'outline'}
                          onClick={() => setAdjustmentType('decrease')}
                          className={`h-9 flex-1 font-medium transition-all ${
                            adjustmentType === 'decrease'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <Minus className="h-4 w-4 mr-2" />
                          减少积分
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adjustmentAmount" className="text-sm font-medium text-slate-700">调整数量</Label>
                      <Input
                        id="adjustmentAmount"
                        type="number"
                        min="1"
                        value={adjustmentAmount}
                        onChange={(e) => setAdjustmentAmount(e.target.value)}
                        placeholder="请输入积分数量"
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adjustmentReason" className="text-sm font-medium text-slate-700">调整原因</Label>
                      <Input
                        id="adjustmentReason"
                        value={adjustmentReason}
                        onChange={(e) => setAdjustmentReason(e.target.value)}
                        placeholder="如：客服补偿、运营活动"
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleAdjustment} className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                      确认调整
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 积分明细 */}
              <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900">积分明细</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="text-slate-900 font-semibold">类型</TableHead>
                        <TableHead className="text-slate-900 font-semibold">积分变动</TableHead>
                        <TableHead className="text-slate-900 font-semibold">操作后余额</TableHead>
                        <TableHead className="text-slate-900 font-semibold">说明</TableHead>
                        <TableHead className="text-slate-900 font-semibold">操作人</TableHead>
                        <TableHead className="text-slate-900 font-semibold">时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {details.map((record) => (
                        <TableRow key={record.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell>
                            <Badge
                              className={
                                record.type === 'earn'
                                  ? 'border-green-300 text-green-700 bg-green-50'
                                  : record.type === 'spend'
                                  ? 'border-orange-300 text-orange-700 bg-orange-50'
                                  : 'border-slate-300 text-slate-700 bg-slate-50'
                              }
                            >
                              {record.typeLabel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={`font-semibold ${
                              record.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {record.amount > 0 ? '+' : ''}{record.amount}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-slate-900">
                            {record.balance.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm text-slate-900">
                            {record.description}
                          </TableCell>
                          <TableCell className="text-sm text-slate-900">
                            {record.operator}
                          </TableCell>
                          <TableCell className="text-sm text-slate-900">
                            {record.createdAt}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {details.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      暂无积分明细
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* 如果没有用户信息，不显示任何提示 */}
        </div>
      </div>

      {/* 调整确认对话框 */}
      {showConfirm && userInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">确认积分调整</h3>
            <div className="text-sm text-slate-900 mb-6 space-y-2">
              <p>用户：<strong className="text-blue-600">{userInfo.userName}</strong>（{userInfo.userId}）</p>
              <p>当前积分：<strong className="text-slate-900">{userInfo.currentPoints.toLocaleString()}</strong></p>
              <p>调整类型：
                <strong className={adjustmentType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                  {adjustmentType === 'increase' ? '增加' : '减少'}
                </strong>
              </p>
              <p>调整数量：<strong className="text-slate-900">{adjustmentAmount}</strong> 积分</p>
              <p>调整后余额：
                <strong className="text-blue-600">
                  {adjustmentType === 'increase'
                    ? userInfo.currentPoints + Number(adjustmentAmount)
                    : userInfo.currentPoints - Number(adjustmentAmount)
                  }
                </strong>
              </p>
              {adjustmentReason && <p>调整原因：<span className="text-slate-900">{adjustmentReason}</span></p>}
              <p className="text-orange-600 mt-4">⚠️ 修改将立即生效</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="h-9 border-slate-300 hover:border-slate-400"
              >
                取消
              </Button>
              <Button onClick={confirmAdjustment} className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                确认调整
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

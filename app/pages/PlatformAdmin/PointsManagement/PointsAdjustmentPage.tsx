/**
 * 平台后台 - 积分调整页面
 */

import { useState } from 'react'
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

export default function PointsAdjustmentPage({ userInfo: initialUserInfo, details: initialDetails }: PointsAdjustmentPageProps) {
  const [searchUserId, setSearchUserId] = useState('')
  const [userInfo, setUserInfo] = useState<UserPointsInfo | null>(initialUserInfo)
  const [details, setDetails] = useState<PointsDetailRecord[]>(initialDetails)
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('increase')
  const [adjustmentAmount, setAdjustmentAmount] = useState('')
  const [adjustmentReason, setAdjustmentReason] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSearch = () => {
    console.log('搜索用户:', searchUserId)
    // 实际应该调用API搜索
  }

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
    alert('积分调整成功')
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">积分调整</h1>
            <p className="text-sm text-slate-500 mt-1">
              搜索用户并调整其积分余额
            </p>
          </div>

          {/* 用户搜索 */}
          <Card>
            <CardHeader>
              <CardTitle>用户搜索</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="searchUserId">用户ID</Label>
                  <Input
                    id="searchUserId"
                    value={searchUserId}
                    onChange={(e) => setSearchUserId(e.target.value)}
                    placeholder="请输入用户ID（如：U001）"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    搜索
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户积分信息 */}
          {userInfo && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>用户积分信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground">用户ID</div>
                      <div className="text-lg font-semibold">{userInfo.userId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">用户名</div>
                      <div className="text-lg font-semibold">{userInfo.userName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">手机号</div>
                      <div className="text-lg font-semibold">{userInfo.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">会员等级</div>
                      <Badge variant="outline" className="text-sm font-semibold">
                        {userInfo.memberLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 mt-6 pt-6 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">当前积分</div>
                      <div className="text-2xl font-bold text-primary">{userInfo.currentPoints.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">累计获得</div>
                      <div className="text-lg font-semibold text-green-600">+{userInfo.totalEarned.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">累计消耗</div>
                      <div className="text-lg font-semibold text-orange-600">-{userInfo.totalSpent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">最后更新</div>
                      <div className="text-sm">{userInfo.lastUpdateTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 积分调整操作 */}
              <Card>
                <CardHeader>
                  <CardTitle>积分调整操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>调整类型</Label>
                      <div className="flex gap-2">
                        <Button
                          variant={adjustmentType === 'increase' ? 'default' : 'outline'}
                          onClick={() => setAdjustmentType('increase')}
                          className="flex-1"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          增加积分
                        </Button>
                        <Button
                          variant={adjustmentType === 'decrease' ? 'default' : 'outline'}
                          onClick={() => setAdjustmentType('decrease')}
                          className="flex-1"
                        >
                          <Minus className="h-4 w-4 mr-2" />
                          减少积分
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adjustmentAmount">调整数量</Label>
                      <Input
                        id="adjustmentAmount"
                        type="number"
                        min="1"
                        value={adjustmentAmount}
                        onChange={(e) => setAdjustmentAmount(e.target.value)}
                        placeholder="请输入积分数量"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adjustmentReason">调整原因</Label>
                      <Input
                        id="adjustmentReason"
                        value={adjustmentReason}
                        onChange={(e) => setAdjustmentReason(e.target.value)}
                        placeholder="如：客服补偿、运营活动"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleAdjustment} size="lg">
                      确认调整
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 积分明细 */}
              <Card>
                <CardHeader>
                  <CardTitle>积分明细</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>类型</TableHead>
                        <TableHead>积分变动</TableHead>
                        <TableHead>操作后余额</TableHead>
                        <TableHead>说明</TableHead>
                        <TableHead>操作人</TableHead>
                        <TableHead>时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {details.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <Badge
                              variant={
                                record.type === 'earn' ? 'default' :
                                record.type === 'spend' ? 'secondary' :
                                'outline'
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
                          <TableCell className="font-medium">
                            {record.balance.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {record.description}
                          </TableCell>
                          <TableCell className="text-sm">
                            {record.operator}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {record.createdAt}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {details.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      暂无积分明细
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {!userInfo && (
            <div className="text-center py-12 text-muted-foreground">
              请输入用户ID并搜索
            </div>
          )}
        </div>
      </div>

      {/* 调整确认对话框 */}
      {showConfirm && userInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">确认积分调整</h3>
            <div className="text-sm text-slate-600 mb-6 space-y-2">
              <p>用户：<strong className="text-primary">{userInfo.userName}</strong>（{userInfo.userId}）</p>
              <p>当前积分：<strong>{userInfo.currentPoints.toLocaleString()}</strong></p>
              <p>调整类型：
                <strong className={adjustmentType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                  {adjustmentType === 'increase' ? '增加' : '减少'}
                </strong>
              </p>
              <p>调整数量：<strong className="text-secondary">{adjustmentAmount}</strong> 积分</p>
              <p>调整后余额：
                <strong className="text-primary">
                  {adjustmentType === 'increase'
                    ? userInfo.currentPoints + Number(adjustmentAmount)
                    : userInfo.currentPoints - Number(adjustmentAmount)
                  }
                </strong>
              </p>
              {adjustmentReason && <p>调整原因：{adjustmentReason}</p>}
              <p className="text-orange-600 mt-4">⚠️ 修改将立即生效</p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
              >
                取消
              </Button>
              <Button onClick={confirmAdjustment}>
                确认调整
              </Button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

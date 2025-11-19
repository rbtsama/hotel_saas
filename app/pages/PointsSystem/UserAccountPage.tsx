/**
 * 用户积分账户管理页面
 * 搜索用户、查看积分余额、手动调整积分、查看明细
 */

import { useState } from 'react'
import type { UserPointsAccount, PointsDetail } from './types/points.types'
import { PointsChangeType, ManualAdjustType, ManualAdjustReason } from './types/points.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from './components/MainLayout'

interface UserAccountPageProps {
  error?: string | null
}

const getChangeTypeLabel = (type: PointsChangeType) => {
  const labels: Record<PointsChangeType, string> = {
    [PointsChangeType.ORDER_EARN]: '订单获得',
    [PointsChangeType.ORDER_REDEEM]: '订单抵扣',
    [PointsChangeType.MANUAL_ADJUST]: '手动调整',
    [PointsChangeType.EXPIRE]: '过期扣除'
  }
  return labels[type]
}

const getChangeTypeColor = (type: PointsChangeType) => {
  const colors: Record<PointsChangeType, string> = {
    [PointsChangeType.ORDER_EARN]: 'text-green-600',
    [PointsChangeType.ORDER_REDEEM]: 'text-orange-600',
    [PointsChangeType.MANUAL_ADJUST]: 'text-blue-600',
    [PointsChangeType.EXPIRE]: 'text-red-600'
  }
  return colors[type]
}

export default function UserAccountPage({ error }: UserAccountPageProps) {
  const [searchPhone, setSearchPhone] = useState('')
  const [selectedUser, setSelectedUser] = useState<UserPointsAccount | null>(null)
  const [userDetails, setUserDetails] = useState<PointsDetail[]>([])
  const [showAdjustDialog, setShowAdjustDialog] = useState(false)
  const [adjustType, setAdjustType] = useState<ManualAdjustType>(ManualAdjustType.INCREASE)
  const [adjustPoints, setAdjustPoints] = useState(0)
  const [adjustReason, setAdjustReason] = useState('')

  const handleSearch = () => {
    alert(`搜索用户：${searchPhone}`)
  }

  const handleAdjust = () => {
    alert(`调整积分：${adjustType === ManualAdjustType.INCREASE ? '+' : '-'}${adjustPoints}`)
    setShowAdjustDialog(false)
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex h-screen">
        <div className="w-full overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">用户积分账户</h1>
              <p className="text-sm text-slate-500 mt-1">
                搜索用户、查看积分余额、手动调整积分、查看明细
              </p>
            </div>

            {/* 搜索用户 */}
          <Card>
            <CardHeader>
              <CardTitle>搜索用户</CardTitle>
              <CardDescription>通过手机号快速查询用户积分账户</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="searchPhone">手机号</Label>
                  <Input
                    id="searchPhone"
                    placeholder="请输入手机号（例如：13812345678）"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch}>搜索</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 用户积分账户卡片 */}
          {selectedUser && (
            <>
              <Card className="border-primary/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedUser.userName}</CardTitle>
                      <CardDescription>
                        手机号：{selectedUser.phone} | 用户ID：{selectedUser.userId}
                      </CardDescription>
                    </div>
                    <Button onClick={() => setShowAdjustDialog(true)}>手动调整积分</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                      <p className="text-sm text-muted-foreground">当前可用积分</p>
                      <p className="text-3xl font-bold text-green-600">{selectedUser.availablePoints.toLocaleString()}</p>
                    </div>

                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                      <p className="text-sm text-muted-foreground">冻结中积分</p>
                      <p className="text-3xl font-bold text-yellow-600">{selectedUser.frozenPoints.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground mt-1">待确认订单</p>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                      <p className="text-sm text-muted-foreground">累计获得</p>
                      <p className="text-3xl font-bold text-blue-600">{selectedUser.totalEarned.toLocaleString()}</p>
                    </div>

                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                      <p className="text-sm text-muted-foreground">累计消耗</p>
                      <p className="text-3xl font-bold text-purple-600">{selectedUser.totalSpent.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">即将过期：</span>
                      <span className="font-medium text-orange-600 ml-2">
                        {selectedUser.expiringPoints} 积分
                      </span>
                      {selectedUser.expiringDate && (
                        <span className="text-xs text-muted-foreground ml-2">({selectedUser.expiringDate})</span>
                      )}
                    </div>
                    <div>
                      <span className="text-muted-foreground">注册日期：</span>
                      <span className="font-medium ml-2">{selectedUser.registerDate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">订单总数：</span>
                      <span className="font-medium ml-2">{selectedUser.orderCount} 单</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 积分明细 */}
              <Card>
                <CardHeader>
                  <CardTitle>积分明细流水</CardTitle>
                  <CardDescription>
                    共 {userDetails.length} 条记录
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>时间</TableHead>
                        <TableHead>类型</TableHead>
                        <TableHead className="text-right">积分变动</TableHead>
                        <TableHead className="text-right">余额</TableHead>
                        <TableHead>关联订单</TableHead>
                        <TableHead>说明</TableHead>
                        <TableHead>操作人</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userDetails.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground">
                            暂无积分流水记录
                          </TableCell>
                        </TableRow>
                      ) : (
                        userDetails.slice(0, 15).map((detail) => (
                          <TableRow key={detail.id}>
                            <TableCell className="text-sm">{detail.createdAt}</TableCell>
                            <TableCell>
                              <span className={`text-sm font-medium ${getChangeTypeColor(detail.changeType)}`}>
                                {getChangeTypeLabel(detail.changeType)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={`font-semibold ${detail.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {detail.points > 0 ? '+' : ''}{detail.points}
                              </span>
                            </TableCell>
                            <TableCell className="text-right font-medium">{detail.balance.toLocaleString()}</TableCell>
                            <TableCell className="text-sm text-blue-600">
                              {detail.orderId || '-'}
                            </TableCell>
                            <TableCell className="text-sm max-w-xs truncate">{detail.description}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{detail.operator}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {/* 手动调整积分对话框 */}
          {showAdjustDialog && selectedUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>手动调整积分</CardTitle>
                  <CardDescription>
                    用户：{selectedUser.userName} ({selectedUser.phone})
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>调整类型</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={adjustType === ManualAdjustType.INCREASE}
                          onChange={() => setAdjustType(ManualAdjustType.INCREASE)}
                        />
                        增加积分
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={adjustType === ManualAdjustType.DECREASE}
                          onChange={() => setAdjustType(ManualAdjustType.DECREASE)}
                        />
                        减少积分
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="adjustPoints">积分数量</Label>
                    <Input
                      id="adjustPoints"
                      type="number"
                      value={adjustPoints}
                      onChange={(e) => setAdjustPoints(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="adjustReason">调整原因（必填）</Label>
                    <Input
                      id="adjustReason"
                      placeholder="例如：客服补偿-房间WiFi故障"
                      value={adjustReason}
                      onChange={(e) => setAdjustReason(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      常见原因：客服补偿、运营活动、异常扣除、系统错误修正
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                      <span className="text-muted-foreground">当前可用积分：</span>
                      <span className="font-semibold">{selectedUser.availablePoints.toLocaleString()}</span>
                    </p>
                    <p className="text-sm mt-1">
                      <span className="text-muted-foreground">调整后积分：</span>
                      <span className="font-semibold">
                        {(selectedUser.availablePoints + (adjustType === 'increase' ? adjustPoints : -adjustPoints)).toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowAdjustDialog(false)} className="flex-1">
                      取消
                    </Button>
                    <Button onClick={handleAdjust} className="flex-1">
                      确认调整
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

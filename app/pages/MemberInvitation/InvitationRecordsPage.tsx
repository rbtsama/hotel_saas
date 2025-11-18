import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { InvitationRecord, InvitationStatistics } from './types/invitation.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Badge } from '~/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Search, Eye } from 'lucide-react'

interface InvitationRecordsPageProps {
  records: InvitationRecord[]
  statistics: InvitationStatistics
  error: string | null
}

export default function InvitationRecordsPage({ records, statistics, error }: InvitationRecordsPageProps) {
  const [selectedRecord, setSelectedRecord] = useState<InvitationRecord | null>(null)
  const [hotelIdFilter, setHotelIdFilter] = useState('')
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  const getStatusBadge = (status: InvitationRecord['status']) => {
    const variants: Record<InvitationRecord['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      pending: { variant: 'outline', label: '待接受' },
      accepted: { variant: 'default', label: '已接受' },
      expired: { variant: 'secondary', label: '已过期' },
      cancelled: { variant: 'destructive', label: '已取消' },
    }
    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="p-6 space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">总邀请数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalInvitations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">待接受</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statistics.pendingInvitations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">已接受</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statistics.acceptedInvitations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">转化率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.conversionRate.toFixed(2)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* 各酒店邀请情况 */}
      <Card>
        <CardHeader>
          <CardTitle>各酒店邀请情况</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>酒店名称</TableHead>
                <TableHead>邀请总数</TableHead>
                <TableHead>已接受数</TableHead>
                <TableHead>转化率</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statistics.byHotel.map((hotel) => (
                <TableRow key={hotel.hotelId}>
                  <TableCell className="font-medium">{hotel.hotelName}</TableCell>
                  <TableCell>{hotel.invitationCount}</TableCell>
                  <TableCell className="text-green-600">{hotel.acceptedCount}</TableCell>
                  <TableCell>
                    {hotel.invitationCount > 0
                      ? ((hotel.acceptedCount / hotel.invitationCount) * 100).toFixed(2)
                      : '0.00'}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 邀请记录列表 */}
      <Card>
        <CardHeader>
          <CardTitle>邀请记录</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 筛选器 */}
          <Form method="get" className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hotelId">酒店</Label>
              <Input
                id="hotelId"
                name="hotelId"
                value={hotelIdFilter}
                onChange={(e) => setHotelIdFilter(e.target.value)}
                placeholder="酒店ID或名称"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">状态</Label>
              <Select name="status" defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="全部状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部状态</SelectItem>
                  <SelectItem value="pending">待接受</SelectItem>
                  <SelectItem value="accepted">已接受</SelectItem>
                  <SelectItem value="expired">已过期</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invitationType">邀请类型</Label>
              <Select name="invitationType" defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="全部类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">全部类型</SelectItem>
                  <SelectItem value="targeted">定向邀请</SelectItem>
                  <SelectItem value="unlimited">无限制</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button type="submit" className="w-full" disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                {isLoading ? '搜索中...' : '搜索'}
              </Button>
            </div>
          </Form>

          {/* 记录表格 */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>邀请ID</TableHead>
                <TableHead>酒店</TableHead>
                <TableHead>邀请类型</TableHead>
                <TableHead>目标等级</TableHead>
                <TableHead>目标客户</TableHead>
                <TableHead>邀请码</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>有效期至</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center text-muted-foreground">
                    暂无邀请记录
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-sm">{record.id}</TableCell>
                    <TableCell>{record.hotelName}</TableCell>
                    <TableCell>
                      <Badge variant={record.invitationType === 'targeted' ? 'default' : 'secondary'}>
                        {record.invitationType === 'targeted' ? '定向' : '无限制'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.targetMemberLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      {record.targetCustomerName ? (
                        <div className="text-sm">
                          <div>{record.targetCustomerName}</div>
                          <div className="text-muted-foreground">{record.targetCustomerPhone}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{record.invitationCode}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.createdAt}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.validUntil}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedRecord(record)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 详情对话框 */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>邀请详情</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">邀请ID</Label>
                  <div className="font-mono">{selectedRecord.id}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">状态</Label>
                  <div>{getStatusBadge(selectedRecord.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">酒店</Label>
                  <div>{selectedRecord.hotelName}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">邀请方类型</Label>
                  <div>{selectedRecord.inviterType === 'hotel' ? '酒店' : '平台'}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">邀请类型</Label>
                  <div>{selectedRecord.invitationType === 'targeted' ? '定向邀请' : '无限制邀请'}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">目标会员等级</Label>
                  <div>{selectedRecord.targetMemberLevel}</div>
                </div>
              </div>

              {selectedRecord.targetCustomerName && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">目标客户姓名</Label>
                    <div>{selectedRecord.targetCustomerName}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">目标客户手机号</Label>
                    <div>{selectedRecord.targetCustomerPhone}</div>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-muted-foreground">邀请码</Label>
                <div className="font-mono text-lg">{selectedRecord.invitationCode}</div>
              </div>

              <div>
                <Label className="text-muted-foreground">邀请链接</Label>
                <div className="font-mono text-sm break-all bg-muted p-2 rounded">
                  {selectedRecord.invitationLink}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">创建时间</Label>
                  <div>{selectedRecord.createdAt}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">有效期至</Label>
                  <div>{selectedRecord.validUntil}</div>
                </div>
              </div>

              {selectedRecord.status === 'accepted' && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">接受信息</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">接受者姓名</Label>
                      <div>{selectedRecord.acceptedUserName}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">接受者手机号</Label>
                      <div>{selectedRecord.acceptedUserPhone}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">接受时间</Label>
                      <div>{selectedRecord.acceptedAt}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

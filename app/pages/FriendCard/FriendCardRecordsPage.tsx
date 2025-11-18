/**
 * 亲友礼遇卡记录页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { FriendCardRecord, FriendCardStatistics, FriendCardStatus } from './types/friendCard.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet'
import {
  Gift,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  Eye,
  Search,
  Filter,
} from 'lucide-react'

interface FriendCardRecordsPageProps {
  records: FriendCardRecord[]
  statistics: FriendCardStatistics
  error: string | null
}

export default function FriendCardRecordsPage({
  records,
  statistics,
  error,
}: FriendCardRecordsPageProps) {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  const [detailSheetOpen, setDetailSheetOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<FriendCardRecord | null>(null)

  // 筛选状态
  const [filterStatus, setFilterStatus] = useState<FriendCardStatus | 'all'>('all')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [searchValue, setSearchValue] = useState('')

  // 查看详情
  const handleViewDetail = (record: FriendCardRecord) => {
    setSelectedRecord(record)
    setDetailSheetOpen(true)
  }

  // 获取状态标签
  const getStatusBadge = (status: FriendCardStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />待接受</Badge>
      case 'accepted':
        return <Badge variant="default" className="bg-blue-600"><CheckCircle className="h-3 w-3 mr-1" />已接受</Badge>
      case 'used':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />已使用</Badge>
      case 'expired':
        return <Badge variant="destructive"><Clock className="h-3 w-3 mr-1" />已过期</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold">亲友卡记录</h1>
        <p className="text-muted-foreground mt-2">
          查看所有亲友礼遇卡的发送和使用记录
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 总发送数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总发送数</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalSent}</div>
            <p className="text-xs text-muted-foreground mt-1">
              累计发送的亲友卡
            </p>
          </CardContent>
        </Card>

        {/* 总接受数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总接受数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalAccepted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              已被接受的亲友卡
            </p>
          </CardContent>
        </Card>

        {/* 总使用数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总使用数</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalUsed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              已完成使用的卡
            </p>
          </CardContent>
        </Card>

        {/* 接受率 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">接受率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              接受数 / 发送数
            </p>
          </CardContent>
        </Card>

        {/* 使用率 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">使用率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.usageRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              使用数 / 接受数
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 按会员等级统计 */}
      <Card>
        <CardHeader>
          <CardTitle>按会员等级统计</CardTitle>
          <CardDescription>不同会员等级的亲友卡发送和接受情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statistics.byMemberLevel.map((stat) => (
              <div key={stat.level} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={
                    stat.level === 'VIP1' ? 'default' :
                    stat.level === 'VIP2' ? 'secondary' : 'destructive'
                  }>
                    {stat.level}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {stat.acceptedCount > 0 ? Math.round((stat.acceptedCount / stat.sentCount) * 100) : 0}% 接受率
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>发送:</span>
                    <span className="font-medium">{stat.sentCount} 张</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>接受:</span>
                    <span className="font-medium text-green-600">{stat.acceptedCount} 张</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 记录列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            记录列表
          </CardTitle>
          <CardDescription>
            共 {records.length} 条记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 筛选器 */}
          <Form method="get" className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 搜索 */}
              <div className="space-y-2">
                <Label htmlFor="search">搜索</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    name="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="赠送者或接收者..."
                    className="pl-8"
                  />
                </div>
              </div>

              {/* 状态筛选 */}
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select
                  name="status"
                  value={filterStatus}
                  onValueChange={(value) => setFilterStatus(value as FriendCardStatus | 'all')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="pending">待接受</SelectItem>
                    <SelectItem value="accepted">已接受</SelectItem>
                    <SelectItem value="used">已使用</SelectItem>
                    <SelectItem value="expired">已过期</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 会员等级筛选 */}
              <div className="space-y-2">
                <Label htmlFor="level">赠送者等级</Label>
                <Select
                  name="senderLevel"
                  value={filterLevel}
                  onValueChange={(value) => setFilterLevel(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="VIP1">VIP1</SelectItem>
                    <SelectItem value="VIP2">VIP2</SelectItem>
                    <SelectItem value="VIP3">VIP3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 筛选按钮 */}
              <div className="flex items-end">
                <Button type="submit" disabled={isLoading} className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  {isLoading ? '筛选中...' : '应用筛选'}
                </Button>
              </div>
            </div>
          </Form>

          {/* 记录表格 */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>赠送者</TableHead>
                  <TableHead>等级</TableHead>
                  <TableHead>接收者</TableHead>
                  <TableHead>赠言</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>发送时间</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      暂无记录数据
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.senderName}</TableCell>
                      <TableCell>
                        <Badge variant={
                          record.senderLevel === 'VIP1' ? 'default' :
                          record.senderLevel === 'VIP2' ? 'secondary' : 'destructive'
                        }>
                          {record.senderLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {record.receiverName || (
                          <span className="text-muted-foreground">未接受</span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate" title={record.message}>
                        {record.message}
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {record.sentAt}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(record)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 详情抽屉 */}
      <Sheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>亲友卡详情</SheetTitle>
            <SheetDescription>查看亲友卡的完整信息</SheetDescription>
          </SheetHeader>

          {selectedRecord && (
            <div className="mt-6 space-y-6">
              {/* 状态 */}
              <div>
                <Label className="text-muted-foreground">状态</Label>
                <div className="mt-2">{getStatusBadge(selectedRecord.status)}</div>
              </div>

              {/* 赠送者信息 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">赠送者信息</h3>
                <div className="space-y-2 pl-4 border-l-2">
                  <div>
                    <Label className="text-muted-foreground text-xs">姓名</Label>
                    <p className="font-medium">{selectedRecord.senderName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">会员等级</Label>
                    <div className="mt-1">
                      <Badge variant={
                        selectedRecord.senderLevel === 'VIP1' ? 'default' :
                        selectedRecord.senderLevel === 'VIP2' ? 'secondary' : 'destructive'
                      }>
                        {selectedRecord.senderLevel}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">发送时间</Label>
                    <p className="text-sm">{selectedRecord.sentAt}</p>
                  </div>
                </div>
              </div>

              {/* 接收者信息 */}
              {selectedRecord.receiverName && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">接收者信息</h3>
                  <div className="space-y-2 pl-4 border-l-2">
                    <div>
                      <Label className="text-muted-foreground text-xs">姓名</Label>
                      <p className="font-medium">{selectedRecord.receiverName}</p>
                    </div>
                    {selectedRecord.receiverPhone && (
                      <div>
                        <Label className="text-muted-foreground text-xs">手机号</Label>
                        <p className="text-sm">{selectedRecord.receiverPhone}</p>
                      </div>
                    )}
                    {selectedRecord.acceptedAt && (
                      <div>
                        <Label className="text-muted-foreground text-xs">接受时间</Label>
                        <p className="text-sm">{selectedRecord.acceptedAt}</p>
                      </div>
                    )}
                    {selectedRecord.usedAt && (
                      <div>
                        <Label className="text-muted-foreground text-xs">使用时间</Label>
                        <p className="text-sm">{selectedRecord.usedAt}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 赠言 */}
              <div>
                <Label className="text-muted-foreground text-xs">赠言</Label>
                <p className="mt-2 text-sm leading-relaxed bg-muted p-3 rounded-md">
                  {selectedRecord.message}
                </p>
              </div>

              {/* 过期时间 */}
              <div>
                <Label className="text-muted-foreground text-xs">过期时间</Label>
                <p className="text-sm text-destructive">{selectedRecord.expiresAt}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

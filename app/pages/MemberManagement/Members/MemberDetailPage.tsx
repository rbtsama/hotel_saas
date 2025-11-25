import { Link } from '@remix-run/react'
import type { MemberDetail } from './types/members.types'
import { MEMBER_LEVEL_LABELS } from './types/members.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ArrowLeft, User, Phone, Mail, Calendar, CreditCard } from 'lucide-react'
import { cn } from '~/lib/utils'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'

interface MemberDetailPageProps {
  member: MemberDetail | null
  error: string | null
}

const ORDER_STATUS_LABELS = {
  completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-700' },
  pending: { label: '待确认', color: 'bg-yellow-100 text-yellow-700' }
} as const

export default function MemberDetailPage({ member, error }: MemberDetailPageProps) {
  if (error || !member) {
    return (
      <div className="flex h-screen">
        <Sidebar menuItems={menuConfig} />
        <div className="flex-1 p-6">
          <div className="text-destructive">错误: {error || '未找到会员'}</div>
        </div>
      </div>
    )
  }

  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 返回按钮 */}
      <div>
        <Link to="/member-management/members">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Button>
        </Link>
      </div>

      {/* 会员基本信息 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900">会员信息</CardTitle>
            <span
              className={cn(
                "px-3 py-1 rounded text-sm font-medium",
                MEMBER_LEVEL_LABELS[member.level].color
              )}
            >
              {MEMBER_LEVEL_LABELS[member.level].label}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-900">
                <User className="h-4 w-4" />
                <span>姓名</span>
              </div>
              <div className="font-medium text-slate-900">{member.name || '-'}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-900">
                <User className="h-4 w-4" />
                <span>昵称</span>
              </div>
              <div className="font-medium text-slate-900">{member.nickname || '-'}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-900">
                <Phone className="h-4 w-4" />
                <span>电话</span>
              </div>
              <div className="font-medium text-slate-900">{member.phone}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-900">
                <Mail className="h-4 w-4" />
                <span>邮箱</span>
              </div>
              <div className="font-medium text-slate-900">{member.email || '-'}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-900">
                <Calendar className="h-4 w-4" />
                <span>生日</span>
              </div>
              <div className="font-medium text-slate-900">{member.birthday || '-'}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-900">
                <User className="h-4 w-4" />
                <span>性别</span>
              </div>
              <div className="font-medium text-slate-900">
                {member.gender === 'male' ? '男' : member.gender === 'female' ? '女' : '-'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-900">注册时间</div>
              <div className="font-medium text-slate-900">{member.registrationTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-900">成为会员</div>
              <div className="font-medium text-slate-900">{member.memberSince}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-900">最近登录</div>
              <div className="font-medium text-slate-900">{member.lastLoginTime || '-'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 消费统计 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-slate-900">消费统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-slate-900">订单数</div>
              <div className="text-2xl font-bold text-blue-600">{member.orderCount}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-900">间夜数</div>
              <div className="text-2xl font-bold text-blue-600">{member.nightCount}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-900">消费金额</div>
              <div className="text-2xl font-bold text-blue-600">¥{member.consumptionAmount}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-slate-900">最近下单</div>
              <div className="text-sm font-medium text-slate-700">{member.lastOrderTime || '-'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 积分信息 */}
      {member.isPointsMember && (
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <CreditCard className="h-5 w-5" />
              积分信息
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-slate-900">当前积分</div>
                <div className="text-2xl font-bold text-green-600">{member.currentPoints}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-slate-900">累计获得积分</div>
                <div className="text-2xl font-bold text-blue-600">{member.totalPoints}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-slate-900">已使用积分</div>
                <div className="text-2xl font-bold text-slate-900">{member.usedPoints}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 订单记录 */}
      <Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-slate-900">订单记录</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-slate-900 font-semibold">订单号</TableHead>
                <TableHead className="text-slate-900 font-semibold">酒店名称</TableHead>
                <TableHead className="text-slate-900 font-semibold">房型</TableHead>
                <TableHead className="text-slate-900 font-semibold">入住日期</TableHead>
                <TableHead className="text-slate-900 font-semibold">间夜数</TableHead>
                <TableHead className="text-slate-900 font-semibold">订单金额</TableHead>
                <TableHead className="text-slate-900 font-semibold">状态</TableHead>
                <TableHead className="text-slate-900 font-semibold">下单时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {member.orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-900">{order.orderNumber}</TableCell>
                  <TableCell className="text-slate-700">{order.hotelName}</TableCell>
                  <TableCell className="text-slate-700">{order.roomType}</TableCell>
                  <TableCell className="text-sm text-slate-900">
                    {order.checkInDate} 至 {order.checkOutDate}
                  </TableCell>
                  <TableCell className="text-center text-slate-700">{order.nightCount}</TableCell>
                  <TableCell className="font-medium text-blue-600">¥{order.totalAmount}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        ORDER_STATUS_LABELS[order.status].color
                      )}
                    >
                      {ORDER_STATUS_LABELS[order.status].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-900">{order.orderTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {member.orders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无订单记录
            </div>
          )}
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button variant="outline">调整等级</Button>
        {member.isBlacklisted ? (
          <Button variant="outline" className="text-green-600 border-green-600">
            解除拉黑
          </Button>
        ) : (
          <Button variant="destructive">拉黑用户</Button>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto">
        {mainContent}
      </div>
    </div>
  )
}

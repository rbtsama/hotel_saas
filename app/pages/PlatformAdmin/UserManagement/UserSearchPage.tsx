/**
 * 平台后台 - 用户搜索页面（精确匹配，直接显示详情）
 */

import { useState } from 'react'
import { Form, Link } from '@remix-run/react'
import type { UserDetail } from './types/user.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, Coins, CheckCircle, Ban } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface UserSearchPageProps {
  userDetail: UserDetail | null
  searchQuery: string
}

export default function UserSearchPage({ userDetail, searchQuery }: UserSearchPageProps) {
  const [searchValue, setSearchValue] = useState(searchQuery)

  // 获取会员等级徽章颜色
  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case '钻石会员':
        return 'border-purple-300 text-purple-700 bg-purple-50'
      case '白金会员':
        return 'border-slate-400 text-slate-700 bg-slate-100'
      case '金卡会员':
        return 'border-amber-300 text-amber-700 bg-amber-50'
      case '银卡会员':
        return 'border-slate-300 text-slate-600 bg-slate-50'
      case '普通会员':
        return 'border-slate-300 text-slate-600 bg-white'
      default:
        return 'border-slate-300 text-slate-600 bg-white'
    }
  }

  // 获取订单状态徽章
  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-50 text-green-700 border-green-200">已完成</Badge>
      case 'cancelled':
        return <Badge className="bg-red-50 text-red-700 border-red-200">已取消</Badge>
      case 'upcoming':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">待入住</Badge>
      default:
        return <Badge className="bg-slate-50 text-slate-700 border-slate-200">{status}</Badge>
    }
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
          {/* 页面标题 */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">用户管理</h1>
          </div>

          {/* 搜索框 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">用户搜索</CardTitle>
            </CardHeader>
            <CardContent>
              <Form method="get">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      id="search"
                      name="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="请输入用户ID或手机号"
                      className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <Button type="submit" className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                    <Search className="h-4 w-4 mr-2" />
                    搜索
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>

          {/* 用户详情 */}
          {userDetail && (
            <>
              {/* 基本信息 */}
              <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold text-slate-900">基本信息</CardTitle>
                    <Link
                      to={`/platform-admin/points-management/adjustment?userId=${userDetail.userId}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm"
                    >
                      <Coins className="w-4 h-4" />
                      调整积分
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-6 text-sm">
                    <div>
                      <div className="text-slate-600">用户ID</div>
                      <div className="text-slate-900 font-medium mt-1">{userDetail.userId}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">昵称</div>
                      <div className="text-slate-900 font-medium mt-1">
                        {userDetail.nickname || <span className="text-slate-400">未设置</span>}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600">手机号</div>
                      <div className="text-slate-900 font-medium mt-1">{userDetail.phone}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">注册时间</div>
                      <div className="text-slate-900 mt-1">{userDetail.registeredAt}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">账号状态</div>
                      <div className="mt-1">
                        {userDetail.status === 'active' ? (
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            正常
                          </Badge>
                        ) : (
                          <Badge className="bg-red-50 text-red-700 border-red-200">
                            <Ban className="w-3 h-3 mr-1" />
                            已禁用
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 会员信息 */}
              <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900">会员信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-6 text-sm">
                    <div>
                      <div className="text-slate-600">当前等级</div>
                      <Badge className={`${getLevelBadgeClass(userDetail.memberInfo.level)} mt-1.5 text-sm`}>
                        {userDetail.memberInfo.level}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-slate-600">成为会员时间</div>
                      <div className="text-slate-900 mt-1">{userDetail.memberInfo.joinedAt}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">有效期</div>
                      <div className="text-slate-900 mt-1">{userDetail.memberInfo.validUntil}</div>
                    </div>
                    <div>
                      <div className="text-slate-600">累计间夜</div>
                      <div className="text-slate-900 font-medium mt-1">
                        {Math.floor(userDetail.memberInfo.levelProgress.current / 100)} 间夜
                      </div>
                    </div>
                  </div>

                  {userDetail.memberInfo.level !== '普通会员' && (
                    <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 gap-6 text-sm">
                      {/* 升级进度 - 简化为X/Y格式 */}
                      <div>
                        <div className="text-slate-600 mb-2">升级进度</div>
                        <div className="text-slate-900">
                          <span className="text-lg font-semibold text-blue-600">
                            {Math.floor(userDetail.memberInfo.levelProgress.current / 100)}
                          </span>
                          <span className="text-slate-600"> / </span>
                          <span className="text-slate-900">
                            {Math.floor(userDetail.memberInfo.levelProgress.required / 100)} 间夜
                          </span>
                        </div>
                        <div className="text-slate-500 mt-1">
                          还需 {Math.floor((userDetail.memberInfo.levelProgress.required - userDetail.memberInfo.levelProgress.current) / 100)} 间夜升级
                        </div>
                      </div>

                      {/* 保级进度 - 简化为X/Y格式 */}
                      <div>
                        <div className="text-slate-600 mb-2">保级进度</div>
                        <div className="text-slate-900">
                          <span className="text-lg font-semibold text-blue-600">
                            {Math.floor(userDetail.memberInfo.retentionProgress.current / 100)}
                          </span>
                          <span className="text-slate-600"> / </span>
                          <span className="text-slate-900">
                            {Math.floor(userDetail.memberInfo.retentionProgress.required / 100)} 间夜
                          </span>
                        </div>
                        <div className="text-slate-500 mt-1">
                          本年度还需 {Math.floor((userDetail.memberInfo.retentionProgress.required - userDetail.memberInfo.retentionProgress.current) / 100)} 间夜保级
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 积分信息 */}
              <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900">积分信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-6 text-sm">
                    <div>
                      <div className="text-slate-600">当前积分</div>
                      <div className="text-xl font-semibold text-blue-600 mt-1">
                        {userDetail.pointsInfo.current.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600">累计获得</div>
                      <div className="text-base font-medium text-green-600 mt-1">
                        +{userDetail.pointsInfo.totalEarned.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600">累计消耗</div>
                      <div className="text-base font-medium text-orange-600 mt-1">
                        -{userDetail.pointsInfo.totalSpent.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600">可抵扣金额</div>
                      <div className="text-base font-medium text-slate-900 mt-1">
                        ¥{userDetail.pointsInfo.deductibleAmount.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-600">最后更新</div>
                      <div className="text-slate-900 mt-1">{userDetail.pointsInfo.lastUpdated}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 近期订单 */}
              <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-slate-900">近期订单</CardTitle>
                </CardHeader>
                <CardContent>
                  {userDetail.recentOrders.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-200">
                          <TableHead className="text-slate-600 font-medium text-sm">订单号</TableHead>
                          <TableHead className="text-slate-600 font-medium text-sm">酒店名称</TableHead>
                          <TableHead className="text-slate-600 font-medium text-sm">房型</TableHead>
                          <TableHead className="text-slate-600 font-medium text-sm">入住日期</TableHead>
                          <TableHead className="text-slate-600 font-medium text-sm">退房日期</TableHead>
                          <TableHead className="text-slate-600 font-medium text-sm">订单金额</TableHead>
                          <TableHead className="text-slate-600 font-medium text-sm">获得积分</TableHead>
                          <TableHead className="text-slate-600 font-medium text-sm">状态</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userDetail.recentOrders.map((order) => (
                          <TableRow key={order.orderId} className="hover:bg-slate-50 border-slate-200">
                            <TableCell className="text-sm text-slate-900 font-medium">{order.orderId}</TableCell>
                            <TableCell className="text-sm text-slate-900">{order.hotelName}</TableCell>
                            <TableCell className="text-sm text-slate-600">{order.roomType}</TableCell>
                            <TableCell className="text-sm text-slate-600">{order.checkIn}</TableCell>
                            <TableCell className="text-sm text-slate-600">{order.checkOut}</TableCell>
                            <TableCell className="text-sm text-slate-900 font-medium">¥{order.amount}</TableCell>
                            <TableCell className="text-sm text-blue-600 font-medium">+{order.pointsEarned}</TableCell>
                            <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-slate-500 text-sm">
                      暂无订单记录
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {/* 搜索无结果提示 */}
          {searchQuery && !userDetail && (
            <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
              <CardContent className="py-12">
                <div className="text-center text-slate-500 text-sm">
                  未找到用户，请检查用户ID或手机号是否正确
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

/**
 * 酒店经营概览页面
 * 展示：今日数据、本月统计、待办事项
 */

import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { TrendingUp, DollarSign, Users, BedDouble, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { BusinessOverview } from './types/business.types'

interface BusinessOverviewPageProps {
  data: BusinessOverview
}

export default function BusinessOverviewPage({ data }: BusinessOverviewPageProps) {
  const { today, thisMonth, todos } = data

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">经营概览</h1>
            <p className="text-muted-foreground mt-2">实时查看经营数据和待办事项</p>
          </div>

      {/* 今日数据 */}
      <div>
        <h2 className="text-xl font-bold mb-4">📅 今日数据（{today.date}）</h2>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">订单数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{today.orderCount}</div>
              <p className="text-xs text-muted-foreground mt-1">入住 {today.checkInCount} / 退房 {today.checkOutCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">营业收入</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">¥{today.revenue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">净收入 ¥{today.netRevenue.toFixed(0)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">出租率</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{today.occupancyRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">平均房价 ¥{today.averageRoomRate}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">平台佣金</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">¥{today.commission.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">佣金率 5%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 本月统计 */}
      <div>
        <h2 className="text-xl font-bold mb-4">📊 本月统计（{thisMonth.month}）</h2>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">订单总数</p>
                  <p className="text-2xl font-bold mt-1">{thisMonth.totalOrders}</p>
                </div>
                <Users className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">总收入</p>
                  <p className="text-2xl font-bold mt-1 text-green-600">¥{thisMonth.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">平均出租率</p>
                  <p className="text-2xl font-bold mt-1 text-blue-600">{thisMonth.avgOccupancyRate}%</p>
                </div>
                <BedDouble className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">RevPAR</p>
                  <p className="text-2xl font-bold mt-1 text-purple-600">¥{thisMonth.revPAR}</p>
                  <p className="text-xs text-muted-foreground">每间可售房收入</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">收入明细</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>总收入：</span>
                  <span className="font-bold">¥{thisMonth.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>平台佣金：</span>
                  <span>-¥{thisMonth.totalCommission.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600 font-bold border-t pt-1">
                  <span>净收入：</span>
                  <span>¥{thisMonth.netRevenue.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">运营指标</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>间夜数：</span>
                  <span className="font-bold">{thisMonth.roomNights}间夜</span>
                </div>
                <div className="flex justify-between">
                  <span>平均入住：</span>
                  <span className="font-bold">{(thisMonth.roomNights / 30).toFixed(1)}间/天</span>
                </div>
                <div className="flex justify-between">
                  <span>客单价：</span>
                  <span className="font-bold">¥{(thisMonth.totalRevenue / thisMonth.totalOrders).toFixed(0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 待办事项 */}
      <div>
        <h2 className="text-xl font-bold mb-4">✅ 待办事项</h2>
        <div className="grid grid-cols-5 gap-4">
          <Card className={todos.pendingConfirm > 0 ? 'border-yellow-500' : ''}>
            <CardContent className="pt-6 text-center">
              <AlertCircle className={`w-8 h-8 mx-auto mb-2 ${todos.pendingConfirm > 0 ? 'text-yellow-600' : 'text-gray-400'}`} />
              <p className="text-2xl font-bold">{todos.pendingConfirm}</p>
              <p className="text-xs text-muted-foreground">待确认订单</p>
            </CardContent>
          </Card>

          <Card className={todos.pendingRefund > 0 ? 'border-red-500' : ''}>
            <CardContent className="pt-6 text-center">
              <AlertCircle className={`w-8 h-8 mx-auto mb-2 ${todos.pendingRefund > 0 ? 'text-red-600' : 'text-gray-400'}`} />
              <p className="text-2xl font-bold">{todos.pendingRefund}</p>
              <p className="text-xs text-muted-foreground">待处理退款</p>
            </CardContent>
          </Card>

          <Card className={todos.pendingReview > 0 ? 'border-blue-500' : ''}>
            <CardContent className="pt-6 text-center">
              <AlertCircle className={`w-8 h-8 mx-auto mb-2 ${todos.pendingReview > 0 ? 'text-blue-600' : 'text-gray-400'}`} />
              <p className="text-2xl font-bold">{todos.pendingReview}</p>
              <p className="text-xs text-muted-foreground">待回复评价</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{todos.todayCheckIn}</p>
              <p className="text-xs text-muted-foreground">今日入住</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{todos.todayCheckOut}</p>
              <p className="text-xs text-muted-foreground">今日退房</p>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 酒店经营统计页面
 * 展示：订单统计、收入统计、房型统计、趋势图表
 */

import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, BarChart3 } from 'lucide-react'
import type { BusinessStatistics } from './types/business.types'

interface BusinessStatisticsPageProps {
  data: BusinessStatistics
}

export default function BusinessStatisticsPage({ data }: BusinessStatisticsPageProps) {
  const { dateRange, orderStats, revenueStats, roomTypeStats, trendData } = data

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 space-y-6">
          {/* 标题 */}
          <div>
            <h1 className="text-3xl font-bold">经营统计</h1>
            <p className="text-muted-foreground mt-2">
              统计周期：{dateRange.start} - {dateRange.end}
            </p>
          </div>

          {/* 订单统计 */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              订单统计
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">总订单数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{orderStats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">所有订单</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">已完成</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{orderStats.completedOrders}</div>
                  <p className="text-xs text-green-600 mt-1">完成率 {orderStats.completionRate}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">已取消</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{orderStats.cancelledOrders}</div>
                  <p className="text-xs text-orange-600 mt-1">取消率 {orderStats.cancellationRate}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">已退款</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{orderStats.refundedOrders}</div>
                  <p className="text-xs text-muted-foreground mt-1">退款订单</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 收入统计 */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              收入统计
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">总收入</p>
                      <p className="text-3xl font-bold mt-1 text-green-600">
                        ¥{revenueStats.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">平台佣金</p>
                      <p className="text-3xl font-bold mt-1 text-orange-600">
                        ¥{revenueStats.totalCommission.toLocaleString()}
                      </p>
                    </div>
                    <TrendingDown className="w-10 h-10 text-orange-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">净收入</p>
                      <p className="text-3xl font-bold mt-1 text-blue-600">
                        ¥{revenueStats.netRevenue.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-10 h-10 text-blue-500 opacity-20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 优惠明细 */}
            <div className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">优惠明细</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>优惠券优惠：</span>
                      <span className="font-bold text-red-600">-¥{revenueStats.couponDiscount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>积分抵扣：</span>
                      <span className="font-bold text-red-600">-¥{revenueStats.pointsDiscount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>会员折扣：</span>
                      <span className="font-bold text-red-600">-¥{revenueStats.memberDiscount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 房型统计 */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              房型统计
            </h2>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>房型名称</TableHead>
                      <TableHead className="text-right">订单数</TableHead>
                      <TableHead className="text-right">收入</TableHead>
                      <TableHead className="text-right">出租率</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomTypeStats.map((stat) => (
                      <TableRow key={stat.roomTypeName}>
                        <TableCell className="font-medium">{stat.roomTypeName}</TableCell>
                        <TableCell className="text-right">{stat.orderCount}</TableCell>
                        <TableCell className="text-right text-green-600">
                          ¥{stat.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={stat.occupancyRate >= 70 ? 'text-green-600' : 'text-orange-600'}>
                            {stat.occupancyRate}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* 趋势数据 */}
          <div>
            <h2 className="text-xl font-bold mb-4">📈 趋势数据（每日）</h2>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>日期</TableHead>
                      <TableHead className="text-right">订单数</TableHead>
                      <TableHead className="text-right">收入</TableHead>
                      <TableHead className="text-right">出租率</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trendData.map((trend) => (
                      <TableRow key={trend.date}>
                        <TableCell className="font-medium">{trend.date}</TableCell>
                        <TableCell className="text-right">{trend.orderCount}</TableCell>
                        <TableCell className="text-right text-green-600">
                          ¥{trend.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={trend.occupancyRate >= 70 ? 'text-green-600' : 'text-orange-600'}>
                            {trend.occupancyRate}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

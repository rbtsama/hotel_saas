/**
 * 平台酒店监管页面
 * 统一查看：房价、库存、经营数据、评价
 * 应用设计系统：统一字号、精准颜色、现代精致
 */

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import {
  DollarSign,
  Package,
  TrendingUp,
  Star,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Calendar
} from 'lucide-react'

interface HotelMonitorPageProps {
  hotels: any[] // 酒店列表
  selectedHotelId?: string
}

export default function HotelMonitorPage({ hotels, selectedHotelId }: HotelMonitorPageProps) {
  const [selectedHotel, setSelectedHotel] = useState(selectedHotelId || 'HOTEL001')

  // Mock数据
  const hotelData = {
    name: '锦江之星(杭州西湖店)',
    status: 'active',
    // 经营数据
    business: {
      todayOrders: 3,
      todayRevenue: 1520,
      occupancyRate: 75,
      monthOrders: 45,
      monthRevenue: 22500,
      avgRating: 4.5
    },
    // 房价数据
    prices: {
      avgPrice: 380,
      minPrice: 280,
      maxPrice: 588,
      priceChange: -15 // 本月vs上月
    },
    // 库存数据
    inventory: {
      totalRooms: 20,
      availableToday: 5,
      oversoldDays: 0, // 超售天数
      closedDays: 3 // 关房天数
    },
    // 评价数据
    reviews: {
      total: 128,
      fiveStar: 85,
      fourStar: 32,
      threeStar: 8,
      twoStar: 2,
      oneStar: 1,
      replyRate: 92 // 回复率
    }
  }

  return (
    <div className="p-8 section-spacing">
      {/* 页面标题 */}
      <div>
        <h1 className="text-h1 mb-2">酒店监管中心</h1>
        <p className="text-body text-muted-foreground">查看合作酒店的房价、库存、经营数据和用户评价（只读）</p>
      </div>

      {/* 酒店选择器 */}
      <Card className="layer-primary shadow-medium rounded-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-h3">{hotelData.name}</h3>
                <p className="text-caption">当前查看的酒店</p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">运营中</Badge>
          </div>
        </CardContent>
      </Card>

      {/* 核心数据卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="card-gradient-blue shadow-soft rounded-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-body-sm font-medium text-blue-700 dark:text-blue-400">今日订单</span>
              <TrendingUp className="w-5 h-5 text-blue-600 opacity-60" />
            </div>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
              {hotelData.business.todayOrders}
            </div>
            <p className="text-caption mt-2">出租率 {hotelData.business.occupancyRate}%</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-green shadow-soft rounded-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-body-sm font-medium text-green-700 dark:text-green-400">今日收入</span>
              <DollarSign className="w-5 h-5 text-green-600 opacity-60" />
            </div>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">
              ¥{hotelData.business.todayRevenue.toLocaleString()}
            </div>
            <p className="text-caption mt-2">本月 ¥{hotelData.business.monthRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="card-gradient-purple shadow-soft rounded-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-body-sm font-medium text-purple-700 dark:text-purple-400">平均房价</span>
              <Package className="w-5 h-5 text-purple-600 opacity-60" />
            </div>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              ¥{hotelData.prices.avgPrice}
            </div>
            <p className="text-caption mt-2">
              本月 {hotelData.prices.priceChange > 0 ? '↑' : '↓'}
              {Math.abs(hotelData.prices.priceChange)}%
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient-orange shadow-soft rounded-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-body-sm font-medium text-orange-700 dark:text-orange-400">用户评分</span>
              <Star className="w-5 h-5 text-orange-600 opacity-60" />
            </div>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              {hotelData.business.avgRating}
            </div>
            <p className="text-caption mt-2">共 {hotelData.reviews.total} 条评价</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab内容 */}
      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="business" className="text-body">经营数据</TabsTrigger>
          <TabsTrigger value="price" className="text-body">房价管理</TabsTrigger>
          <TabsTrigger value="inventory" className="text-body">库存管理</TabsTrigger>
          <TabsTrigger value="reviews" className="text-body">评价管理</TabsTrigger>
        </TabsList>

        {/* 经营数据Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card className="layer-primary shadow-medium rounded-card">
            <CardHeader>
              <CardTitle className="text-h3">本月经营概览</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">订单总数</p>
                  <p className="text-2xl font-bold">{hotelData.business.monthOrders}</p>
                </div>
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">总收入</p>
                  <p className="text-2xl font-bold text-green-600">¥{hotelData.business.monthRevenue.toLocaleString()}</p>
                </div>
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">平均出租率</p>
                  <p className="text-2xl font-bold text-blue-600">{hotelData.business.occupancyRate}%</p>
                </div>
              </div>

              <div className="p-4 status-info rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-body font-semibold mb-1">经营状况正常</p>
                  <p className="text-body-sm">订单量稳定，出租率健康，无异常预警</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 房价管理Tab */}
        <TabsContent value="price" className="space-y-6">
          <Card className="layer-primary shadow-medium rounded-card">
            <CardHeader>
              <CardTitle className="text-h3">房价监控（只读）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">平均房价</p>
                  <p className="text-2xl font-bold">¥{hotelData.prices.avgPrice}</p>
                </div>
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">价格区间</p>
                  <p className="text-lg font-semibold">¥{hotelData.prices.minPrice} - ¥{hotelData.prices.maxPrice}</p>
                </div>
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">价格变化</p>
                  <p className={`text-2xl font-bold ${hotelData.prices.priceChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {hotelData.prices.priceChange > 0 ? '+' : ''}{hotelData.prices.priceChange}%
                  </p>
                </div>
              </div>

              {hotelData.prices.priceChange < -10 && (
                <div className="p-4 status-warning rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-body font-semibold mb-1">价格异常预警</p>
                    <p className="text-body-sm">本月平均房价下降超过10%，建议核实是否存在多渠道降价</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 库存管理Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card className="layer-primary shadow-medium rounded-card">
            <CardHeader>
              <CardTitle className="text-h3">库存监控（只读）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">总房间数</p>
                  <p className="text-2xl font-bold">{hotelData.inventory.totalRooms}间</p>
                </div>
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">今日可售</p>
                  <p className="text-2xl font-bold text-blue-600">{hotelData.inventory.availableToday}间</p>
                </div>
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">超售次数</p>
                  <p className="text-2xl font-bold text-green-600">{hotelData.inventory.oversoldDays}</p>
                </div>
              </div>

              <div className="p-4 status-success rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-body font-semibold mb-1">库存管理规范</p>
                  <p className="text-body-sm">本月无超售记录，库存管理能力优秀</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 评价管理Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card className="layer-primary shadow-medium rounded-card">
            <CardHeader>
              <CardTitle className="text-h3">用户评价监控</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 评分分布 */}
              <div className="space-y-3">
                <p className="text-body font-semibold">评分分布</p>
                {[
                  { star: 5, count: hotelData.reviews.fiveStar, percent: (hotelData.reviews.fiveStar / hotelData.reviews.total * 100).toFixed(1) },
                  { star: 4, count: hotelData.reviews.fourStar, percent: (hotelData.reviews.fourStar / hotelData.reviews.total * 100).toFixed(1) },
                  { star: 3, count: hotelData.reviews.threeStar, percent: (hotelData.reviews.threeStar / hotelData.reviews.total * 100).toFixed(1) },
                  { star: 2, count: hotelData.reviews.twoStar, percent: (hotelData.reviews.twoStar / hotelData.reviews.total * 100).toFixed(1) },
                  { star: 1, count: hotelData.reviews.oneStar, percent: (hotelData.reviews.oneStar / hotelData.reviews.total * 100).toFixed(1) }
                ].map(item => (
                  <div key={item.star} className="flex items-center gap-3">
                    <span className="text-body-sm w-12">{item.star}星</span>
                    <div className="flex-1 h-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.star >= 4 ? 'bg-green-500' : item.star === 3 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <span className="text-body-sm w-16 text-right">{item.count}条</span>
                    <span className="text-body-sm w-16 text-right text-muted-foreground">{item.percent}%</span>
                  </div>
                ))}
              </div>

              {/* 评价统计 */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">平均评分</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-orange-600">{hotelData.business.avgRating}</p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= hotelData.business.avgRating ? 'fill-orange-500 text-orange-500' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 layer-secondary rounded-lg">
                  <p className="text-body-sm text-muted-foreground mb-1">回复率</p>
                  <p className="text-2xl font-bold text-blue-600">{hotelData.reviews.replyRate}%</p>
                </div>
              </div>

              <div className="p-4 status-success rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-body font-semibold mb-1">评价健康</p>
                  <p className="text-body-sm">好评率 {((hotelData.reviews.fiveStar + hotelData.reviews.fourStar) / hotelData.reviews.total * 100).toFixed(1)}%，服务质量优秀</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

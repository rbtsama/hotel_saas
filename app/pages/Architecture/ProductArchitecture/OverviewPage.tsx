/**
 * 产品架构总图页面 - 精简版
 * 三端系统完整功能架构 + 订单主线流程
 */

import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import DefectsList from './components/DefectsList'
import SystemArchitecture from './components/SystemArchitecture'

export default function OverviewPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 space-y-6 max-w-[1800px] mx-auto">
          {/* 页面标题 - 精简版 */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground">酒店SAAS平台 - 产品架构总图</h1>
            <p className="text-lg text-muted-foreground mt-2">三端系统完整功能架构 & 订单主线流程</p>
          </div>

          {/* 系统架构脑图 - 紧凑版 */}
          <SystemArchitecture />

          {/* 订单主线流程 - 精简版 */}
          <Card className="border-2 border-orange-400">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <ShoppingCart className="w-6 h-6" />
                订单主线流程
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {/* 三阶段流程 */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded border border-orange-300">
                  <h4 className="font-bold text-sm text-orange-600 mb-2">订单前：获客转化</h4>
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <div>• 门店信息展示</div>
                    <div>• 房型价格管理</div>
                    <div>• 库存控制</div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded border border-blue-300">
                  <h4 className="font-bold text-sm text-blue-600 mb-2">订单中：履约交付</h4>
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <div>• 下单支付</div>
                    <div>• PMS同步</div>
                    <div>• 入住服务退房</div>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                  <h4 className="font-bold text-sm text-green-600 mb-2">订单后：复购运营</h4>
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <div>• 评价积分</div>
                    <div>• 会员权益</div>
                    <div>• 营销触达</div>
                  </div>
                </div>
              </div>

              {/* 核心链路 */}
              <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <Badge className="bg-purple-500">C端浏览</Badge>
                  <ArrowRight className="w-3 h-3" />
                  <Badge className="bg-orange-500">选房下单</Badge>
                  <ArrowRight className="w-3 h-3" />
                  <Badge className="bg-blue-500">支付锁库存</Badge>
                  <ArrowRight className="w-3 h-3" />
                  <Badge className="bg-green-500">酒店确认</Badge>
                  <ArrowRight className="w-3 h-3" />
                  <Badge className="bg-green-600">入住服务</Badge>
                  <ArrowRight className="w-3 h-3" />
                  <Badge className="bg-purple-600">评价积分</Badge>
                  <ArrowRight className="w-3 h-3" />
                  <Badge className="bg-pink-500">会员复购</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 设计缺陷清单 */}
          <DefectsList />

        </div>
      </div>
    </div>
  )
}

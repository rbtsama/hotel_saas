import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import WelcomeGuide from './components/WelcomeGuide'
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  TrendingUp,
  Sparkles,
} from 'lucide-react'

interface DashboardPageProps {
  // 这里可以添加从loader传入的数据
  stats?: {
    todayOrders: number
    monthRevenue: number
    occupancyRate: number
    totalRooms: number
  }
}

export default function DashboardPage({ stats }: DashboardPageProps) {
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false)

  // 模拟配置进度 (实际应从后端获取)
  const configProgress = {
    basicInfo: true,
    images: true,
    facilities: false,
    policy: false,
    roomTypes: false,
    pricing: false,
    inventory: false,
  }

  useEffect(() => {
    // 检查是否首次登录
    const hasSkipped = localStorage.getItem('hotel_welcome_guide_skipped')
    const hasCompletedOnboarding = localStorage.getItem('hotel_onboarding_completed')

    // 如果没有跳过且没有完成开通,显示欢迎指引
    if (!hasSkipped && !hasCompletedOnboarding) {
      setShowWelcomeGuide(true)
    }
  }, [])

  const defaultStats = {
    todayOrders: 12,
    monthRevenue: 45680,
    occupancyRate: 78,
    totalRooms: 15,
  }

  const displayStats = stats || defaultStats

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">工作台</h1>
          <p className="text-muted-foreground mt-1">欢迎回来,查看您的民宿运营数据</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowWelcomeGuide(true)}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          查看配置指引
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日订单</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.todayOrders}</div>
            <p className="text-xs text-muted-foreground">较昨日 +2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月营收</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{displayStats.monthRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">较上月 +12.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">入住率</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">本月平均</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">房间总数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayStats.totalRooms}</div>
            <p className="text-xs text-muted-foreground">可售房间</p>
          </CardContent>
        </Card>
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>常用功能</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>订单日历</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>价格日历</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <LayoutDashboard className="h-6 w-6" />
              <span>库存管理</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-6 w-6" />
              <span>门店设置</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近订单</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">订单 #12345</div>
                  <div className="text-sm text-muted-foreground">豪华大床房 · 张先生</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">¥680</div>
                  <div className="text-xs text-muted-foreground">11/19 入住</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">订单 #12344</div>
                  <div className="text-sm text-muted-foreground">标准双床房 · 李女士</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">¥520</div>
                  <div className="text-xs text-muted-foreground">11/18 入住</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 欢迎指引对话框 */}
      <WelcomeGuide
        open={showWelcomeGuide}
        onClose={() => setShowWelcomeGuide(false)}
        configProgress={configProgress}
      />
    </div>
  )
}

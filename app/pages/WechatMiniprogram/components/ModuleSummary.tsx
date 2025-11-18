import { Card, CardContent } from '~/components/ui/card'

interface ModuleSummaryProps {
  totalModules: number
  totalFeatures: number
  totalScreens: number
}

export default function ModuleSummary({ totalModules, totalFeatures, totalScreens }: ModuleSummaryProps) {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
            小而美 HOMESTAY 微信小程序
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {totalModules}
            </div>
            <div className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              功能模块
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {totalFeatures}
            </div>
            <div className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              核心功能
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {totalScreens}
            </div>
            <div className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              设计页面
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong>产品定位：</strong>民宿/酒店在线预订平台 |
            <strong className="ml-2">核心功能：</strong>门店展示、搜索预订、订单管理、会员体系、售后服务、商家入驻
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

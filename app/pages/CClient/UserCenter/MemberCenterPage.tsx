/**
 * C端 - 会员中心页面
 */

import MobileFrame from '../components/MobileFrame'
import { Badge } from '~/components/ui/badge'
import { Trophy, Star, Gift, Headphones } from 'lucide-react'

interface MemberCenterPageProps {
  currentLevel: number
  levelName: string
  validityDate: string
  totalNights: number
  upgradeTarget: { level: number; needs: number }
  maintainProgress: { current: number; target: number }
}

export default function MemberCenterPage({
  currentLevel = 3,
  levelName = 'VIP3',
  validityDate = '2026-10-15',
  totalNights = 32,
  upgradeTarget = { level: 4, needs: 28 },
  maintainProgress = { current: 12, target: 15 },
}: MemberCenterPageProps) {
  const upgradePercent = ((totalNights / (totalNights + upgradeTarget.needs)) * 100).toFixed(0)
  const maintainPercent = ((maintainProgress.current / maintainProgress.target) * 100).toFixed(0)

  return (
    <MobileFrame navTitle="会员中心" showTabBar={true}>
      <div className="p-4 space-y-4">
        {/* 当前等级卡片 */}
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm opacity-90">当前等级</p>
                <p className="text-2xl font-bold">{levelName}会员</p>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p className="opacity-90">有效期至：{validityDate}</p>
              <p className="opacity-90">累计入住：{totalNights}间夜</p>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -top-6 w-24 h-24 bg-white/10 rounded-full" />
        </div>

        {/* 升级进度 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">升级进度</h3>
            <Badge variant="outline" className="text-primary border-primary">
              VIP{upgradeTarget.level}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 mb-2">
            距离VIP{upgradeTarget.level}还差{upgradeTarget.needs}间夜
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${upgradePercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {totalNights}/{totalNights + upgradeTarget.needs} 间夜
          </p>
        </div>

        {/* 保级进度 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">保级进度</h3>
            <span className="text-xs text-slate-500">有效期内</span>
          </div>
          <p className="text-sm text-slate-600 mb-2">
            已完成{maintainProgress.current}间夜，还需{maintainProgress.target - maintainProgress.current}间夜即可保级
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
              style={{ width: `${maintainPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {maintainProgress.current}/{maintainProgress.target} 间夜
          </p>
        </div>

        {/* 会员权益 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">会员权益</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">88折专享折扣</p>
                <p className="text-xs text-slate-500">预订享受会员价</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">积分价值1.2倍</p>
                <p className="text-xs text-slate-500">积分更值钱</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Gift className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">平日额外折扣</p>
                <p className="text-xs text-slate-500">工作日更优惠</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Headphones className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">优先客服</p>
                <p className="text-xs text-slate-500">专属服务</p>
              </div>
            </div>
          </div>
        </div>

        {/* 等级说明按钮 */}
        <Button variant="outline" className="w-full">
          查看完整等级体系
        </Button>
      </div>
    </MobileFrame>
  )
}

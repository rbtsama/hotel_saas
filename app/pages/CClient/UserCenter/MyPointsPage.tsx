/**
 * C端 - 我的积分页面
 */

import MobileFrame from '../components/MobileFrame'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { TrendingUp, Gift, UserPlus } from 'lucide-react'

interface MyPointsPageProps {
  currentPoints: number
  pointsRate: number
  memberLevel: string
  pointsRecords: Array<{
    id: string
    date: string
    type: string
    amount: number
    balance: number
    description: string
  }>
}

export default function MyPointsPage({
  currentPoints = 150,
  pointsRate = 1.2,
  memberLevel = 'VIP3',
  pointsRecords = [
    { id: '1', date: '11-22 14:30', type: '环保奖励', amount: 5, balance: 150, description: '自带拖鞋' },
    { id: '2', date: '11-22 14:00', type: '抵扣房费', amount: -50, balance: 145, description: 'XX酒店订单' },
    { id: '3', date: '11-22 14:00', type: '兑换早餐', amount: -20, balance: 195, description: 'XX酒店订单' },
    { id: '4', date: '11-15 16:00', type: '邀请奖励', amount: 30, balance: 215, description: '好友张三首次入住' },
  ],
}: MyPointsPageProps) {
  const canDeduct = (currentPoints * pointsRate).toFixed(0)

  return (
    <MobileFrame navTitle="我的积分" showTabBar={true}>
      <div className="p-4 space-y-4">
        {/* 积分余额卡片 */}
        <Card className="bg-gradient-to-br from-[#458559] to-[#5A9F6E] text-white overflow-hidden relative rounded-xl shadow-md">
          <div className="p-6">
            <p className="text-sm opacity-90 mb-2">当前积分</p>
            <p className="text-5xl font-bold mb-4">{currentPoints}</p>
            <div className="space-y-1">
              <p className="text-sm opacity-90">
                积分价值：{pointsRate}倍（{memberLevel}专享）
              </p>
              <p className="text-sm opacity-90">
                可抵扣：¥{canDeduct}
              </p>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
        </Card>

        {/* 获取积分入口 */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white rounded-xl p-4 text-center border border-gray-200 active:bg-slate-50 transition-colors">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 bg-[#3D7350]/15 rounded-full flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#3D7350]" />
              </div>
            </div>
            <p className="font-medium text-sm text-slate-900">邀请好友</p>
            <p className="text-xs text-slate-500 mt-1">每邀请1位好友</p>
            <p className="text-xs text-slate-500">完成首单得30积分</p>
          </button>

          <button className="bg-white rounded-xl p-4 text-center border border-gray-200 active:bg-slate-50 transition-colors">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 bg-[#4A85B8]/15 rounded-full flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#4A85B8]" />
              </div>
            </div>
            <p className="font-medium text-sm text-slate-900">环保行动</p>
            <p className="text-xs text-slate-500 mt-1">自带拖鞋/牙刷</p>
            <p className="text-xs text-slate-500">离店后获得积分</p>
          </button>
        </div>

        {/* 积分明细 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">积分明细</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {pointsRecords.map((record) => (
              <div key={record.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{record.type}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{record.description}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${record.amount > 0 ? 'text-[#3D7350]' : 'text-red-600'}`}>
                      {record.amount > 0 ? '+' : ''}{record.amount}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{record.date}</span>
                  <span className="text-slate-500">余额：{record.balance}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 text-center">
            <button className="text-sm text-[#4A85B8] hover:underline">查看更多</button>
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}

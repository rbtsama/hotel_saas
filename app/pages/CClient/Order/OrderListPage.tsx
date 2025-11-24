/**
 * C端 - 订单列表页面
 */

import { useState } from 'react'
import MobileFrame from '../components/MobileFrame'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'

export default function OrderListPage() {
  const [activeTab, setActiveTab] = useState('all')

  const orders = [
    {
      id: '1',
      hotelName: 'XX豪华酒店',
      roomType: '豪华大床房',
      dates: '11月28日-11月29日',
      status: 'pending',
      statusText: '待入住',
      amount: 336,
    },
    {
      id: '2',
      hotelName: 'YY精品酒店',
      roomType: '豪华双床房',
      dates: '11月20日-11月21日',
      status: 'completed',
      statusText: '已离店',
      amount: 280,
      points: 5,
    },
  ]

  return (
    <MobileFrame navTitle="我的订单" showTabBar={true}>
      <div>
        {/* 标签栏 */}
        <div className="bg-white border-b border-slate-200 flex">
          {['all', 'pending', 'checkedIn', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm ${
                activeTab === tab
                  ? 'text-[#458559] border-b-2 border-[#458559] font-medium'
                  : 'text-slate-600'
              }`}
            >
              {tab === 'all' && '全部'}
              {tab === 'pending' && '待入住'}
              {tab === 'checkedIn' && '已入住'}
              {tab === 'completed' && '已离店'}
            </button>
          ))}
        </div>

        {/* 订单列表 */}
        <div className="p-4 space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 text-base mb-1">
                      {order.hotelName}
                    </h3>
                    <p className="text-sm text-slate-600">{order.roomType}</p>
                    <p className="text-xs text-slate-500 mt-1">{order.dates}</p>
                  </div>
                  <Badge
                    className={
                      order.status === 'pending'
                        ? 'bg-[#4A85B8]/15 text-[#4A85B8] border-0 rounded-sm'
                        : 'bg-slate-100 text-slate-600 border-0 rounded-sm'
                    }
                  >
                    {order.statusText}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500">实付金额</p>
                    <p className="text-lg font-bold text-[#A67B5B]">¥{order.amount}</p>
                    {order.points && (
                      <p className="text-xs text-[#3D7350] mt-1">
                        获得积分：+{order.points}（环保奖励）
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 rounded-full">
                      查看详情
                    </Button>
                    {order.status === 'completed' && (
                      <Button size="sm" className="h-8 rounded-full bg-[#458559] hover:bg-[#3D7350]">再次预订</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  )
}

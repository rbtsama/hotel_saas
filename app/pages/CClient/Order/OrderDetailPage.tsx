/**
 * C端 - 订单详情页面
 */

import MobileFrame from '../components/MobileFrame'
import { MapPin, Phone } from 'lucide-react'

export default function OrderDetailPage() {
  return (
    <MobileFrame navTitle="订单详情" showTabBar={false}>
      <div className="p-4 space-y-4">
        {/* 订单状态 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🏨</span>
          </div>
          <p className="text-lg font-semibold text-slate-900 mb-1">待入住</p>
          <p className="text-sm text-slate-600">订单号：20251128001</p>
        </div>

        {/* 酒店信息 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">酒店信息</h3>
          <p className="font-medium text-base mb-2">XX豪华酒店</p>
          <div className="space-y-1 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>北京市朝阳区XX路88号</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>010-12345678</span>
            </div>
          </div>
        </div>

        {/* 入住信息 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">入住信息</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">房型：</span>
              <span className="font-medium">豪华大床房</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">入住：</span>
              <span className="font-medium">2025-11-28 14:00后</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">离店：</span>
              <span className="font-medium">2025-11-29 12:00前</span>
            </div>
          </div>
        </div>

        {/* 费用明细 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">费用明细</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">房费：</span>
              <span>¥396</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>积分抵扣：</span>
              <span>-¥60（50积分×1.2）</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>积分服务：</span>
              <span>-20积分（单人早餐）</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100">
              <span className="font-medium">应付金额：</span>
              <span className="text-xl font-bold text-secondary">¥336</span>
            </div>
          </div>
        </div>

        {/* 积分记录 */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm">积分记录</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• 使用50积分抵扣房费（¥60）</li>
            <li>• 兑换单人早餐（-20积分）</li>
            <li>• 承诺自带拖鞋（离店后+5积分）</li>
          </ul>
        </div>
      </div>
    </MobileFrame>
  )
}

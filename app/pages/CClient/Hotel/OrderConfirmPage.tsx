/**
 * C端 - 订单确认页面
 */

import { useState } from 'react'
import MobileFrame from '../components/MobileFrame'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Checkbox } from '~/components/ui/checkbox'
import { MapPin, Phone } from 'lucide-react'

export default function OrderConfirmPage() {
  const [selectedEco, setSelectedEco] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [pointsDeduct, setPointsDeduct] = useState(0)

  const currentPoints = 80
  const pointsRate = 1.2
  const roomFee = 396

  // 计算积分消耗
  const servicePoints = selectedServices.includes('breakfast') ? 20 : 0
  const totalPointsUsed = servicePoints + pointsDeduct
  const deductAmount = (pointsDeduct * pointsRate).toFixed(0)
  const finalAmount = roomFee - parseFloat(deductAmount)

  const maxDeductPoints = Math.min(currentPoints - servicePoints, Math.floor(roomFee / pointsRate))

  return (
    <MobileFrame navTitle="订单确认" showTabBar={false}>
      <div className="p-4 space-y-4">
        {/* 酒店信息 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-2">XX豪华酒店 - 豪华大床房</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
            <MapPin className="w-3 h-3" />
            <span>北京市朝阳区XX路88号</span>
          </div>
        </div>

        {/* 入住信息 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">入住信息</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500 mb-1">入住日期</p>
              <p className="font-medium">2025-11-28</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">离店日期</p>
              <p className="font-medium">2025-11-29</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2">共1晚</p>
        </div>

        {/* 房费明细 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">房费：</span>
            <span className="font-semibold text-slate-900">¥{roomFee}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">VIP3平日特惠价</p>
        </div>

        {/* 积分服务 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">积分服务</h3>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">环保奖励（离店后返还）</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedEco.includes('slippers')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedEco([...selectedEco, 'slippers'])
                    } else {
                      setSelectedEco(selectedEco.filter((s) => s !== 'slippers'))
                    }
                  }}
                />
                <span className="text-sm">自带拖鞋</span>
                <span className="text-xs text-green-600 ml-auto">+5积分</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedEco.includes('toothbrush')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedEco([...selectedEco, 'toothbrush'])
                    } else {
                      setSelectedEco(selectedEco.filter((s) => s !== 'toothbrush'))
                    }
                  }}
                />
                <span className="text-sm">自带牙刷</span>
                <span className="text-xs text-green-600 ml-auto">+3积分</span>
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-2">增值服务（立即扣除）</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedServices.includes('breakfast')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedServices([...selectedServices, 'breakfast'])
                    } else {
                      setSelectedServices(selectedServices.filter((s) => s !== 'breakfast'))
                    }
                  }}
                />
                <span className="text-sm">单人早餐</span>
                <span className="text-xs text-red-600 ml-auto">-20积分</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedServices.includes('breakfast2')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedServices([...selectedServices, 'breakfast2'])
                    } else {
                      setSelectedServices(selectedServices.filter((s) => s !== 'breakfast2'))
                    }
                  }}
                />
                <span className="text-sm">双人早餐</span>
                <span className="text-xs text-red-600 ml-auto">-35积分</span>
              </label>
            </div>
          </div>
        </div>

        {/* 积分抵扣 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">积分抵扣</h3>
          <div className="space-y-2 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-slate-600">当前积分：</span>
              <span className="font-medium">{currentPoints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">积分价值：</span>
              <span className="font-medium">{pointsRate}倍（1积分={pointsRate}元）</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-600">使用积分</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                max={maxDeductPoints}
                value={pointsDeduct}
                onChange={(e) => setPointsDeduct(Math.min(parseInt(e.target.value) || 0, maxDeductPoints))}
                placeholder="0"
                className="flex-1"
              />
              <span className="text-sm text-slate-600">积分</span>
            </div>
            <p className="text-xs text-slate-500">
              最多可用{maxDeductPoints}积分
            </p>
          </div>
        </div>

        {/* 费用明细 */}
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">费用明细</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">房费：</span>
              <span>¥{roomFee}</span>
            </div>
            {pointsDeduct > 0 && (
              <div className="flex justify-between text-green-600">
                <span>积分抵扣：</span>
                <span>-¥{deductAmount}</span>
              </div>
            )}
            {servicePoints > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>积分服务：</span>
                <span>-{servicePoints}积分</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 mt-3 pt-3">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600">应付金额：</span>
              <span className="text-3xl font-bold text-secondary">¥{finalAmount.toFixed(0)}</span>
            </div>
          </div>
        </div>

        {/* 确认支付按钮 */}
        <div className="px-4 pb-4">
          <Button className="w-full h-12 text-base">
            确认支付
          </Button>
        </div>
      </div>
    </MobileFrame>
  )
}

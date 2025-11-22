/**
 * C端 - 支付成功页面
 */

import MobileFrame from '../components/MobileFrame'
import { Button } from '~/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function PaymentSuccessPage() {
  return (
    <MobileFrame navTitle="支付成功" showTabBar={false}>
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">支付成功！</h2>

          <div className="my-6 p-4 bg-white rounded-xl border border-slate-200 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">订单号：</span>
                <span className="font-medium">20251128001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">酒店：</span>
                <span className="font-medium">XX豪华酒店</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">房型：</span>
                <span className="font-medium">豪华大床房</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">入住日期：</span>
                <span className="font-medium">11月28日 14:00后</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">离店日期：</span>
                <span className="font-medium">11月29日 12:00前</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100">
                <span className="text-slate-600">已支付：</span>
                <span className="text-xl font-bold text-secondary">¥336</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 w-full">
            <Button className="w-full">查看订单</Button>
            <Button variant="outline" className="w-full">返回首页</Button>
          </div>
        </div>
      </div>
    </MobileFrame>
  )
}

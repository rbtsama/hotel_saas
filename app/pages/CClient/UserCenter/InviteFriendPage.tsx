/**
 * C端 - 邀请好友页面
 */

import MobileFrame from '../components/MobileFrame'
import { Button } from '~/components/ui/button'
import { UserPlus, Users, Gift, CheckCircle, Clock } from 'lucide-react'

export default function InviteFriendPage() {
  return (
    <MobileFrame navTitle="邀请好友得积分" showTabBar={true}>
      <div className="p-4 space-y-4">
        {/* 邀请奖励说明 */}
        <div className="bg-gradient-to-br from-[#A67B5B] to-[#B8936F] rounded-2xl p-6 text-white text-center shadow-lg">
          <Gift className="w-16 h-16 mx-auto mb-3 opacity-90" />
          <p className="text-2xl font-bold mb-2">每邀请1位好友</p>
          <p className="text-lg mb-1">完成首次入住</p>
          <p className="text-3xl font-bold">即可获得30积分</p>
        </div>

        {/* 邀请记录 */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">邀请记录</h3>
            <div className="text-right">
              <p className="text-xs text-slate-500">已邀请好友</p>
              <p className="text-xl font-bold text-[#458559]">3人</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#3D7350]/15 rounded-sm border border-[#3D7350]/30">
              <div className="w-10 h-10 bg-[#3D7350]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-[#3D7350]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">张三</p>
                <p className="text-xs text-slate-500">已入住</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#3D7350]">+30积分</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#3D7350]/15 rounded-sm border border-[#3D7350]/30">
              <div className="w-10 h-10 bg-[#3D7350]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-[#3D7350]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">李四</p>
                <p className="text-xs text-slate-500">已入住</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#3D7350]">+30积分</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-sm border border-slate-200">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900">王五</p>
                <p className="text-xs text-slate-500">已注册，待入住</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">待获得</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              已获得积分：<span className="font-semibold text-[#A67B5B]">90</span>
            </p>
          </div>
        </div>

        {/* 邀请按钮 */}
        <Button className="w-full h-8 px-6 rounded-full bg-[#458559] hover:bg-[#3D7350] text-white gap-2">
          <UserPlus className="w-5 h-5" />
          邀请好友
        </Button>

        {/* 活动规则 */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">活动规则</p>
          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
            <li>分享小程序卡片给微信好友</li>
            <li>好友注册后自动绑定邀请关系</li>
            <li>好友完成首次入住并离店后</li>
            <li>您将自动获得30积分奖励</li>
            <li>无邀请人数上限</li>
          </ul>
        </div>
      </div>
    </MobileFrame>
  )
}

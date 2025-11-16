/**
 * 用户详情页面 - 综合信息面板
 */

import type { UserDetail } from './types/user.types'
import { MemberLevel } from './types/user.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@remix-run/react'
import MainLayout from '../PointsSystem/components/MainLayout'

interface UserDetailPageProps {
  user: UserDetail
}

const memberLevelColors: Record<MemberLevel, string> = {
  [MemberLevel.DIAMOND]: 'from-purple-500 to-purple-700',
  [MemberLevel.GOLD]: 'from-yellow-500 to-yellow-700',
  [MemberLevel.SILVER]: 'from-slate-400 to-slate-600',
  [MemberLevel.NORMAL]: 'from-slate-300 to-slate-500',
}

export default function UserDetailPage({ user }: UserDetailPageProps) {
  const upgradePercentage = Math.round(
    (user.membership.upgradeProgress.currentNights /
      user.membership.upgradeProgress.requiredNights) *
      100
  )

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 返回按钮 */}
        <Link
          to="/user/list"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          返回用户列表
        </Link>

        {/* 用户头部信息卡片 */}
        <Card
          className={`bg-gradient-to-r ${
            memberLevelColors[user.membership.level]
          } text-white`}
        >
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                {user.basic.avatar && (
                  <img
                    src={user.basic.avatar}
                    alt={user.basic.name}
                    className="w-20 h-20 rounded-full border-4 border-white/30"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold">{user.basic.name}</h1>
                  <div className="mt-2 space-y-1 text-sm opacity-90">
                    <div>手机号: {user.basic.phone}</div>
                    <div>注册时间: {user.basic.registeredAt}</div>
                    {user.basic.isRealNameVerified && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 rounded text-xs">
                        ✓ 已实名认证
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{user.membership.levelName}</div>
                <div className="text-sm opacity-90 mt-1">
                  有效期至 {user.membership.validUntil}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 核心数据统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">
                {user.points.balance.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 mt-2">积分余额</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {user.coupons.available}
              </div>
              <div className="text-sm text-slate-600 mt-2">可用优惠券</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {user.orderStats.totalOrders}
              </div>
              <div className="text-sm text-slate-600 mt-2">总订单数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-600">
                ¥{user.orderStats.totalAmount.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600 mt-2">总消费金额</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* 会员信息 */}
          <Card>
            <CardHeader>
              <CardTitle>会员信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 会员权益 */}
              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  会员权益
                </div>
                <div className="space-y-1">
                  {user.membership.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <span className="text-green-600">✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* 升级进度 */}
              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  升级进度
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">入住晚数</span>
                    <span className="font-medium">
                      {user.membership.upgradeProgress.currentNights} /{' '}
                      {user.membership.upgradeProgress.requiredNights}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${upgradePercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500">
                    距离下一等级还需 {user.membership.upgradeProgress.requiredNights - user.membership.upgradeProgress.currentNights} 晚
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 积分信息 */}
          <Card>
            <CardHeader>
              <CardTitle>积分信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-500">累计获得</div>
                  <div className="text-lg font-semibold text-green-600">
                    +{user.points.totalEarned.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">累计消费</div>
                  <div className="text-lg font-semibold text-orange-600">
                    -{user.points.totalSpent.toLocaleString()}
                  </div>
                </div>
              </div>

              {user.points.expiringPoints > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded p-3">
                  <div className="text-sm text-orange-700">
                    <strong>{user.points.expiringPoints}</strong> 积分将于{' '}
                    <strong>{user.points.expiringDate}</strong> 过期
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  最近积分记录
                </div>
                <div className="space-y-2">
                  {user.points.recentRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between text-sm py-2 border-b border-slate-100"
                    >
                      <div className="flex-1">
                        <div className="text-slate-700">{record.reason}</div>
                        <div className="text-xs text-slate-500">{record.createdAt}</div>
                      </div>
                      <div
                        className={`font-semibold ${
                          record.type === 'earn' ? 'text-green-600' : 'text-orange-600'
                        }`}
                      >
                        {record.type === 'earn' ? '+' : '-'}
                        {record.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 订单统计 */}
          <Card>
            <CardHeader>
              <CardTitle>订单统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-2xl font-bold text-green-600">
                    {user.orderStats.completedOrders}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">已完成</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded">
                  <div className="text-2xl font-bold text-slate-600">
                    {user.orderStats.cancelledOrders}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">已取消</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-2xl font-bold text-blue-600">
                    ¥{user.orderStats.averageAmount}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">平均金额</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  最近订单
                </div>
                {user.orderStats.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="py-2 border-b border-slate-100"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">
                          {order.hotelName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {order.orderNumber}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">
                          ¥{order.amount}
                        </div>
                        <div className="text-xs text-slate-500">
                          {order.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 其他信息 */}
          <Card>
            <CardHeader>
              <CardTitle>其他信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 争议信息 */}
              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  退款争议记录
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>申请次数: {user.dispute.refundRequestCount}</div>
                  <div className="text-green-600">
                    通过: {user.dispute.approvedCount}
                  </div>
                  <div className="text-red-600">
                    驳回: {user.dispute.rejectedCount}
                  </div>
                  <div>
                    信用评分:{' '}
                    <span className="font-bold text-blue-600">
                      {user.dispute.creditScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* 行为标签 */}
              <div>
                <div className="text-sm font-semibold text-slate-700 mb-2">
                  行为标签
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">偏好标签</div>
                    <div className="flex flex-wrap gap-2">
                      {user.tags.preferences.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      消费能力:{' '}
                      <span className="font-medium">{user.tags.consumptionLevel}</span>
                    </div>
                    <div>
                      活跃度:{' '}
                      <span className="font-medium">{user.tags.activityLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </MainLayout>
  )
}

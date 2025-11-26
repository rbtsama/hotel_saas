/**
 * 平台后台 - 积分基础规则配置页面
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { PointsBaseRuleConfig } from './types/points.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import SettingsPageHeader from '~/pages/SharedComponents/SettingsPageHeader'
import { pointsRuleChangeLogs } from './services/mocks/points.changeLog'

interface BaseRuleConfigPageProps {
  config: PointsBaseRuleConfig
}

export default function BaseRuleConfigPage({ config: initialConfig }: BaseRuleConfigPageProps) {
  const [formData, setFormData] = useState(initialConfig)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setFormData(initialConfig) // 恢复原始数据
  }

  const handleSave = () => {
    // 这里应该调用API保存
    console.log('保存配置:', formData)
    setIsEditMode(false)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto p-8 space-y-8">
          {/* 页面标题 - 使用通用头部组件 */}
          <SettingsPageHeader
            title="平台积分设置"
            isEditing={isEditMode}
            onEditToggle={handleEditToggle}
            onSave={handleSave}
            onCancel={handleCancel}
            changeLogs={pointsRuleChangeLogs}
            changeLogTitle="积分规则配置 - 修改记录"
          />

          {/* 积分获取规则 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">积分获取规则</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 注册奖励积分 */}
              <div className="space-y-2">
                <Label htmlFor="registerRewardPoints" className="text-sm font-medium text-slate-700">注册奖励积分</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="registerRewardPoints"
                    name="registerRewardPoints"
                    type="number"
                    min="0"
                    value={formData.registerRewardPoints}
                    onChange={(e) =>
                      setFormData({ ...formData, registerRewardPoints: parseInt(e.target.value) || 0 })
                    }
                    className={`h-9 max-w-xs border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-slate-900">积分</span>
                </div>
              </div>

              {/* 邀请奖励积分 */}
              <div className="space-y-2">
                <Label htmlFor="inviteRewardPoints" className="text-sm font-medium text-slate-700">邀请奖励积分</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="inviteRewardPoints"
                    name="inviteRewardPoints"
                    type="number"
                    min="0"
                    value={formData.inviteRewardPoints}
                    onChange={(e) =>
                      setFormData({ ...formData, inviteRewardPoints: parseInt(e.target.value) || 0 })
                    }
                    className={`h-9 max-w-xs border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-slate-900">积分</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 积分使用规则 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">积分使用规则</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 基础兑换汇率 */}
              <div className="space-y-2">
                <Label htmlFor="baseExchangeRate" className="text-sm font-medium text-slate-700">积分兑换汇率</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      id="baseExchangeRate"
                      name="baseExchangeRate"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.baseExchangeRate}
                      onChange={(e) =>
                        setFormData({ ...formData, baseExchangeRate: parseFloat(e.target.value) || 1.0 })
                      }
                      className={`h-9 w-32 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                      disabled={!isEditMode}
                    />
                    <span className="text-sm text-slate-900">积分 = 1 元</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">示例：10积分=1元，用户使用100积分可抵扣10元</p>
              </div>

              {/* 最大抵扣比例 */}
              <div className="space-y-2">
                <Label htmlFor="maxDeductionPercent" className="text-sm font-medium text-slate-700">最大抵扣比例</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="maxDeductionPercent"
                    name="maxDeductionPercent"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.maxDeductionPercent}
                    onChange={(e) =>
                      setFormData({ ...formData, maxDeductionPercent: parseInt(e.target.value) || 0 })
                    }
                    className={`h-9 w-32 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-slate-900">%</span>
                </div>
                <p className="text-xs text-slate-500">单笔订单最多可用积分抵扣的比例</p>
              </div>
            </CardContent>
          </Card>

          {/* 积分过期规则 */}
          <Card className="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">积分有效期规则</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">积分过期时间</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-900">次年</span>
                  <Input
                    type="number"
                    value={formData.expiryYears}
                    className="h-9 w-20 bg-slate-50 text-slate-700 cursor-not-allowed border-slate-300"
                    disabled
                  />
                  <span className="text-sm text-slate-900">年末（12月31日）统一过期</span>
                </div>
                <p className="text-xs text-slate-500">
                  示例：2025年获得的积分，将在2026年12月31日 23:59:59 过期
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

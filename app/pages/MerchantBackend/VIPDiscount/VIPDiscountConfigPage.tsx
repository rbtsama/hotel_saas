/**
 * 商户端 - VIP折扣配置页面
 */

import { useState } from 'react'
import type { VIPLevelDiscount, MerchantVIPDiscountConfig } from './types/vipDiscount.types'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import SettingsPageHeader from '~/pages/SharedComponents/SettingsPageHeader'

interface VIPDiscountConfigPageProps {
  config: MerchantVIPDiscountConfig
}

export default function VIPDiscountConfigPage({ config: initialConfig }: VIPDiscountConfigPageProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [config, setConfig] = useState<MerchantVIPDiscountConfig>(initialConfig)

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setConfig(initialConfig)
  }

  const handleSave = () => {
    console.log('保存VIP折扣配置:', config)
    setIsEditMode(false)
  }

  const updateDiscount = (id: string, field: 'weekdayDiscount' | 'weekendDiscount' | 'holidayDiscount', value: number) => {
    setConfig(prev => ({
      ...prev,
      discounts: prev.discounts.map(d =>
        d.id === id ? { ...d, [field]: value } : d
      )
    }))
  }

  const formatPercent = (value: number) => {
    return `${Math.round(value * 100)}%`
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* 页面标题 */}
          <SettingsPageHeader
            title="会员折扣设置"
            isEditing={isEditMode}
            onEditToggle={handleEditToggle}
            onSave={handleSave}
            onCancel={handleCancel}
            changeLogs={[]}
            changeLogTitle="会员折扣设置 - 修改记录"
          />

          {/* 折扣配置表格 */}
          <Card className="rounded-xl border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600 font-semibold w-[100px]">等级</TableHead>
                    <TableHead className="text-slate-600 font-semibold w-[120px]">展示名称</TableHead>
                    <TableHead className="text-slate-600 font-semibold w-[120px]">平台折扣</TableHead>
                    <TableHead className="text-slate-600 font-semibold">本店折扣设置</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.discounts.map((discount) => (
                    <TableRow key={discount.id} className="hover:bg-slate-50 transition-colors">
                      {/* 等级 */}
                      <TableCell className="font-medium text-slate-900">
                        VIP{discount.level}
                      </TableCell>

                      {/* 名称 */}
                      <TableCell className="text-slate-900">
                        {discount.levelName}
                      </TableCell>

                      {/* 平台折扣 */}
                      <TableCell>
                        <span className="text-sm text-slate-900 font-medium">
                          {formatPercent(discount.platformDiscount)}
                        </span>
                      </TableCell>

                      {/* 本店折扣设置 - 3个字段 */}
                      <TableCell>
                        <div className="grid grid-cols-3 gap-3">
                          {/* 平日折扣 */}
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-600">平日</Label>
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                min="0"
                                max={Math.round(discount.platformDiscount * 100)}
                                step="1"
                                value={Math.round(discount.weekdayDiscount * 100)}
                                onChange={(e) => {
                                  const percent = parseInt(e.target.value) || 0
                                  const value = percent / 100
                                  updateDiscount(discount.id, 'weekdayDiscount', value)
                                }}
                                className={`h-9 w-20 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                                  !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                                }`}
                                disabled={!isEditMode}
                              />
                              <span className="text-sm text-slate-900">%</span>
                            </div>
                          </div>

                          {/* 周末折扣 */}
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-600">周末</Label>
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                min="0"
                                max={Math.round(discount.platformDiscount * 100)}
                                step="1"
                                value={Math.round(discount.weekendDiscount * 100)}
                                onChange={(e) => {
                                  const percent = parseInt(e.target.value) || 0
                                  const value = percent / 100
                                  updateDiscount(discount.id, 'weekendDiscount', value)
                                }}
                                className={`h-9 w-20 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                                  !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                                }`}
                                disabled={!isEditMode}
                              />
                              <span className="text-sm text-slate-900">%</span>
                            </div>
                          </div>

                          {/* 节日折扣 */}
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-600">节日</Label>
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                min="0"
                                max={Math.round(discount.platformDiscount * 100)}
                                step="1"
                                value={Math.round(discount.holidayDiscount * 100)}
                                onChange={(e) => {
                                  const percent = parseInt(e.target.value) || 0
                                  const value = percent / 100
                                  updateDiscount(discount.id, 'holidayDiscount', value)
                                }}
                                className={`h-9 w-20 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
                                  !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                                }`}
                                disabled={!isEditMode}
                              />
                              <span className="text-sm text-slate-900">%</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 说明 */}
          <Card className="rounded-xl border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-slate-600 space-y-2">
                <p className="font-medium text-slate-900">配置说明：</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>平台折扣：平台设定的会员折扣，商户必须接受，不可拒绝</li>
                  <li>本店折扣：商户可针对平日/周末/节日设置更优惠的折扣（必须 ≤ 平台折扣）</li>
                  <li>折扣值越小越优惠（如80%比95%更优惠）</li>
                  <li>输入框最大值自动限制为平台折扣，确保不会超出范围</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

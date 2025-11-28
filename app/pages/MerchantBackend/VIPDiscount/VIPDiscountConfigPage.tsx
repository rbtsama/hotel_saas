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

  const updateDiscount = (
    id: string,
    field: 'mondayDiscount' | 'tuesdayDiscount' | 'wednesdayDiscount' | 'thursdayDiscount' | 'fridayDiscount' | 'saturdayDiscount' | 'sundayDiscount' | 'holidayDiscount',
    value: number
  ) => {
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
                    <TableHead className="text-slate-600 font-semibold w-[120px]">平台折扣</TableHead>
                    <TableHead className="text-slate-600 font-semibold">本店折扣设置</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.discounts.map((discount) => (
                    <TableRow key={discount.id} className="hover:bg-slate-50 transition-colors">
                      {/* 等级 */}
                      <TableCell className="font-medium text-slate-900">
                        {discount.levelName}
                      </TableCell>

                      {/* 平台折扣 */}
                      <TableCell>
                        <span className="text-sm text-slate-900 font-medium">
                          {formatPercent(discount.platformDiscount)}
                        </span>
                      </TableCell>

                      {/* 本店折扣设置 - 8个字段（周一~周日 + 节日优先）- 一行展示 */}
                      <TableCell>
                        <div className="flex items-center gap-3 flex-wrap">
                          {/* 周一折扣 */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600">周一</Label>
                            <Input
                              type="number"
                              min="0"
                              max={Math.round(discount.platformDiscount * 100)}
                              step="1"
                              value={Math.round(discount.mondayDiscount * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = percent / 100
                                updateDiscount(discount.id, 'mondayDiscount', value)
                              }}
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
                          </div>

                          {/* 周二折扣 */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600">周二</Label>
                            <Input
                              type="number"
                              min="0"
                              max={Math.round(discount.platformDiscount * 100)}
                              step="1"
                              value={Math.round(discount.tuesdayDiscount * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = percent / 100
                                updateDiscount(discount.id, 'tuesdayDiscount', value)
                              }}
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
                          </div>

                          {/* 周三折扣 */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600">周三</Label>
                            <Input
                              type="number"
                              min="0"
                              max={Math.round(discount.platformDiscount * 100)}
                              step="1"
                              value={Math.round(discount.wednesdayDiscount * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = percent / 100
                                updateDiscount(discount.id, 'wednesdayDiscount', value)
                              }}
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
                          </div>

                          {/* 周四折扣 */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600">周四</Label>
                            <Input
                              type="number"
                              min="0"
                              max={Math.round(discount.platformDiscount * 100)}
                              step="1"
                              value={Math.round(discount.thursdayDiscount * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = percent / 100
                                updateDiscount(discount.id, 'thursdayDiscount', value)
                              }}
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
                          </div>

                          {/* 周五折扣 */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600">周五</Label>
                            <Input
                              type="number"
                              min="0"
                              max={Math.round(discount.platformDiscount * 100)}
                              step="1"
                              value={Math.round(discount.fridayDiscount * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = percent / 100
                                updateDiscount(discount.id, 'fridayDiscount', value)
                              }}
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
                          </div>

                          {/* 周六折扣 */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600">周六</Label>
                            <Input
                              type="number"
                              min="0"
                              max={Math.round(discount.platformDiscount * 100)}
                              step="1"
                              value={Math.round(discount.saturdayDiscount * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = percent / 100
                                updateDiscount(discount.id, 'saturdayDiscount', value)
                              }}
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
                          </div>

                          {/* 周日折扣 */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600">周日</Label>
                            <Input
                              type="number"
                              min="0"
                              max={Math.round(discount.platformDiscount * 100)}
                              step="1"
                              value={Math.round(discount.sundayDiscount * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = percent / 100
                                updateDiscount(discount.id, 'sundayDiscount', value)
                              }}
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
                          </div>

                          {/* 节日折扣（优先） */}
                          <div className="flex items-center gap-1">
                            <Label className="text-xs text-slate-600 font-semibold">节日(优先)</Label>
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
                              className={`h-8 w-14 text-xs border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 ${
                                !isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''
                              }`}
                              disabled={!isEditMode}
                            />
                            <span className="text-xs text-slate-900">%</span>
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
                  <li>本店折扣：商户可针对<strong>每周7天 + 节假日</strong>分别设置更优惠的折扣（必须 ≤ 平台折扣）</li>
                  <li>节假日折扣优先级最高：当日期为节假日时，优先使用节假日折扣，否则使用对应星期的折扣</li>
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

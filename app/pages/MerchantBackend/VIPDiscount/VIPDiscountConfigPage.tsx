/**
 * 商户端 - VIP折扣配置页面
 */

import { useState } from 'react'
import type { VIPLevelDiscount, MerchantVIPDiscountConfig } from './types/vipDiscount.types'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
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
    setConfig(initialConfig) // 恢复原始数据
  }

  const handleSave = () => {
    console.log('保存VIP折扣配置:', config)
    setIsEditMode(false)
  }

  const updateStoreDiscount = (id: string, value: number) => {
    setConfig(prev => ({
      ...prev,
      discounts: prev.discounts.map(d =>
        d.id === id ? { ...d, storeDiscount: value } : d
      )
    }))
  }

  const formatDiscountRange = (min: number, max: number) => {
    if (min === 1.0 && max === 1.0) return '无折扣'
    const minPercent = Math.round((1 - min) * 100)
    const maxPercent = Math.round((1 - max) * 100)
    return `${maxPercent}% - ${minPercent}%`
  }

  const formatDiscountPercent = (value: number) => {
    if (value === 1.0) return '0%'
    return `${Math.round((1 - value) * 100)}%`
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
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
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[100px]">等级</TableHead>
                    <TableHead className="min-w-[150px]">展示名称</TableHead>
                    <TableHead className="min-w-[150px]">平台折扣</TableHead>
                    <TableHead className="min-w-[180px]">本店折扣设置</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.discounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell className="font-medium">VIP{discount.level}</TableCell>
                      <TableCell>{discount.levelName}</TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-600">
                          {formatDiscountRange(discount.platformMinDiscount, discount.platformMaxDiscount)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {discount.level === 0 ? (
                          <span className="text-sm text-slate-400">无折扣</span>
                        ) : (
                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              min={Math.round((1 - discount.platformMinDiscount) * 100)}
                              max={Math.round((1 - discount.platformMaxDiscount) * 100)}
                              step="1"
                              value={Math.round((1 - discount.storeDiscount) * 100)}
                              onChange={(e) => {
                                const percent = parseInt(e.target.value) || 0
                                const value = 1 - (percent / 100)
                                updateStoreDiscount(discount.id, value)
                              }}
                              className={`w-20 h-8 ${!isEditMode ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-0' : ''}`}
                              disabled={!isEditMode}
                            />
                            <span className="text-sm text-slate-600">%</span>
                            <span className="text-xs text-slate-400">
                              (范围: {Math.round((1 - discount.platformMinDiscount) * 100)}-{Math.round((1 - discount.platformMaxDiscount) * 100)}%)
                            </span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 说明 */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium text-foreground">配置说明:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>本店折扣设置必须在平台折扣范围内(包含边界值)</li>
                  <li>默认值为平台折扣的最大值(最优惠)</li>
                  <li>VIP0无会员折扣,仅显示不可编辑</li>
                  <li>折扣以百分比形式显示,例如 15% 表示打 8.5 折</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

/**
 * 会员等级编辑表单组件
 * 用于新增和编辑会员等级
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { MemberLevel, MemberLevelFormData } from '../types/memberLevels.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Switch } from '~/components/ui/switch'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@remix-run/react'
import SettingsPageHeader from '~/pages/SharedComponents/SettingsPageHeader'
import { memberLevelsChangeLogs } from '../services/mocks/memberLevels.changeLog'

interface MemberLevelFormProps {
  level?: MemberLevel
  errors?: Record<string, string>
}

export default function MemberLevelForm({ level, errors }: MemberLevelFormProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isEditingExisting = !!level
  const [isEditMode, setIsEditMode] = useState(!isEditingExisting) // 新增模式默认可编辑
  const [confirmStatusChange, setConfirmStatusChange] = useState<{
    newStatus: 'active' | 'inactive'
  } | null>(null)

  const [formData, setFormData] = useState<MemberLevelFormData>({
    levelName: level?.levelName || '',
    upgradeCondition: level?.upgradeCondition || '',
    levelBenefits: level?.levelBenefits || '',
    validityPeriod: level?.validityPeriod || '2年',
    requiredNights: level?.requiredNights || 0,
    requiredAmount: level?.requiredAmount || 0,
    discountRangeMin: level?.discountRangeMin || 80,
    discountRangeMax: level?.discountRangeMax || 95,
    discountPercentage: level?.discountPercentage || 90,
    pointsEarnRatio: level?.pointsEarnRatio || 1,
    upgradeGiftSets: level?.upgradeGiftSets || 0,
    status: level?.status || 'active'
  })

  const handleChange = (field: keyof MemberLevelFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleEditToggle = () => {
    setIsEditMode(true)
  }

  const handleCancel = () => {
    if (isEditingExisting) {
      setIsEditMode(false)
      // 恢复原始数据
      setFormData({
        levelName: level?.levelName || '',
        upgradeCondition: level?.upgradeCondition || '',
        levelBenefits: level?.levelBenefits || '',
        validityPeriod: level?.validityPeriod || '2年',
        requiredNights: level?.requiredNights || 0,
        requiredAmount: level?.requiredAmount || 0,
        discountRangeMin: level?.discountRangeMin || 80,
        discountRangeMax: level?.discountRangeMax || 95,
        discountPercentage: level?.discountPercentage || 90,
        pointsEarnRatio: level?.pointsEarnRatio || 1,
        upgradeGiftSets: level?.upgradeGiftSets || 0,
        status: level?.status || 'active'
      })
    }
  }

  const handleSave = () => {
    // 触发表单提交
    const form = document.getElementById('member-level-form') as HTMLFormElement
    form?.requestSubmit()
  }

  // 状态开关独立处理（不受修改设置限制）
  const handleStatusToggle = (currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    setConfirmStatusChange({ newStatus })
  }

  const confirmStatusToggle = () => {
    if (confirmStatusChange) {
      handleChange('status', confirmStatusChange.newStatus)
      console.log('状态修改记录:', {
        level: level?.levelName || '新等级',
        from: confirmStatusChange.newStatus === 'active' ? 'inactive' : 'active',
        to: confirmStatusChange.newStatus,
        operator: '兔子',
        time: new Date().toLocaleString('zh-CN')
      })
      setConfirmStatusChange(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 返回按钮 */}
      <Link
        to="/member-management/levels"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        返回会员等级列表
      </Link>

      {/* 页面标题 - 使用通用头部组件 */}
      <SettingsPageHeader
        title={isEditingExisting ? `编辑会员等级 - ${level?.levelName}` : '新增会员等级'}
        description="配置会员等级的升级条件、权益、折扣和积分规则"
        isEditing={isEditMode}
        onEditToggle={handleEditToggle}
        onSave={handleSave}
        onCancel={handleCancel}
        changeLogs={isEditingExisting ? memberLevelsChangeLogs : []}
        changeLogTitle={`${level?.levelName || '会员等级'} - 修改记录`}
      />

      <Form id="member-level-form" method="post" className="space-y-6">
        {/* 基本信息 */}
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
            <CardDescription>设置会员等级名称和描述</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="levelName">等级名称 *</Label>
                <Input
                  id="levelName"
                  name="levelName"
                  value={formData.levelName}
                  onChange={(e) => handleChange('levelName', e.target.value)}
                  placeholder="如：VIP1、银卡会员"
                  required
                  disabled={!isEditMode}
                  className={`${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''} ${errors?.levelName ? 'border-destructive' : ''}`}
                />
                {errors?.levelName && (
                  <p className="text-sm text-destructive">{errors.levelName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="validityPeriod">等级有效期 *</Label>
                <Input
                  id="validityPeriod"
                  name="validityPeriod"
                  value={formData.validityPeriod}
                  onChange={(e) => handleChange('validityPeriod', e.target.value)}
                  placeholder="如：1年、2年、永久"
                  required
                  disabled={!isEditMode}
                  className={!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="upgradeCondition">升级条件描述</Label>
              <Input
                id="upgradeCondition"
                name="upgradeCondition"
                value={formData.upgradeCondition}
                onChange={(e) => handleChange('upgradeCondition', e.target.value)}
                placeholder="如：预订1次及以上"
                disabled={!isEditMode}
                className={!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}
              />
              <p className="text-xs text-muted-foreground">
                将根据下方的具体条件自动生成，也可手动修改
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="levelBenefits">会员权益描述</Label>
              <Textarea
                id="levelBenefits"
                name="levelBenefits"
                value={formData.levelBenefits}
                onChange={(e) => handleChange('levelBenefits', e.target.value)}
                placeholder="描述该等级会员可享受的权益"
                rows={3}
                disabled={!isEditMode}
                className={!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}
              />
            </div>
          </CardContent>
        </Card>

        {/* 升级规则 */}
        <Card>
          <CardHeader>
            <CardTitle>升级规则</CardTitle>
            <CardDescription>设置达到该等级需满足的条件</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requiredNights">预订次数要求</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">预订订单 ≥</span>
                  <Input
                    id="requiredNights"
                    name="requiredNights"
                    type="number"
                    min="0"
                    value={formData.requiredNights}
                    onChange={(e) => handleChange('requiredNights', Number(e.target.value))}
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-muted-foreground">次</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requiredAmount">消费金额要求</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">累计消费 ≥ ¥</span>
                  <Input
                    id="requiredAmount"
                    name="requiredAmount"
                    type="number"
                    min="0"
                    value={formData.requiredAmount}
                    onChange={(e) => handleChange('requiredAmount', Number(e.target.value))}
                    className={`w-32 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-700">
                <strong>提示：</strong>用户需要同时满足预订次数和消费金额两个条件才能升级到该等级
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 折扣规则 */}
        <Card>
          <CardHeader>
            <CardTitle>折扣规则</CardTitle>
            <CardDescription>设置该等级会员的订房折扣</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discountRangeMin">折扣范围最小值</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="discountRangeMin"
                    name="discountRangeMin"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discountRangeMin}
                    onChange={(e) => handleChange('discountRangeMin', Number(e.target.value))}
                    className={`w-20 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountRangeMax">折扣范围最大值</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="discountRangeMax"
                    name="discountRangeMax"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discountRangeMax}
                    onChange={(e) => handleChange('discountRangeMax', Number(e.target.value))}
                    className={`w-20 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPercentage">当前折扣</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="discountPercentage"
                    name="discountPercentage"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => handleChange('discountPercentage', Number(e.target.value))}
                    className={`w-20 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-muted-foreground">% ({(formData.discountPercentage / 10).toFixed(1)}折)</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-700">
                <strong>说明：</strong>折扣范围是平台设定的区间，门店可在此范围内调整具体折扣。当前折扣必须在折扣范围内。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 积分规则 */}
        <Card>
          <CardHeader>
            <CardTitle>积分规则</CardTitle>
            <CardDescription>设置该等级会员的积分获取比例和奖励</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pointsEarnRatio">积分获取比例</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">消费 ¥1 =</span>
                  <Input
                    id="pointsEarnRatio"
                    name="pointsEarnRatio"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.pointsEarnRatio}
                    onChange={(e) => handleChange('pointsEarnRatio', Number(e.target.value))}
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-muted-foreground">积分</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  如：1.2 表示消费1元获得1.2积分
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="upgradeGiftSets">升级奖励套餐</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">赠送</span>
                  <Input
                    id="upgradeGiftSets"
                    name="upgradeGiftSets"
                    type="number"
                    min="0"
                    value={formData.upgradeGiftSets}
                    onChange={(e) => handleChange('upgradeGiftSets', Number(e.target.value))}
                    className={`w-24 ${!isEditMode ? 'bg-slate-50 text-slate-700 cursor-not-allowed' : ''}`}
                    disabled={!isEditMode}
                  />
                  <span className="text-sm text-muted-foreground">套免费住宿</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  达到该等级后自动赠送的套餐数量
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700">
                <strong>示例：</strong>VIP1会员消费¥1000，积分汇率1.2，可获得1200积分
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 状态 - 不受修改设置限制，可独立操作 */}
        <Card>
          <CardHeader>
            <CardTitle>状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Switch
                id="status"
                checked={formData.status === 'active'}
                onCheckedChange={() => handleStatusToggle(formData.status)}
              />
              <Label htmlFor="status" className="text-sm font-normal cursor-pointer">
                {formData.status === 'active' ? '启用中' : '已禁用'}
              </Label>
            </div>
            <input type="hidden" name="status" value={formData.status} />
          </CardContent>
        </Card>

        {/* 错误提示 */}
        {errors?.general && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive">{errors.general}</p>
          </div>
        )}

        {/* 隐藏的提交按钮 - 用于编程式提交 */}
        <button type="submit" className="hidden" disabled={isSubmitting}>
          Submit
        </button>
      </Form>

      {/* 状态修改确认对话框 */}
      {confirmStatusChange && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">确认修改状态</h3>
            <p className="text-sm text-slate-600 mb-6">
              确定要将状态修改为
              <strong className="text-secondary ml-1">
                {confirmStatusChange.newStatus === 'active' ? '启用' : '禁用'}
              </strong> 吗？修改将立即生效。
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setConfirmStatusChange(null)}
              >
                取消
              </Button>
              <Button onClick={confirmStatusToggle}>
                确认修改
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

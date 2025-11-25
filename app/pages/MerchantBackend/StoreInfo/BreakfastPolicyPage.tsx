import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Trash2, Plus } from 'lucide-react'
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import type { BreakfastPolicy, BreakfastPriceRule } from './types/storeInfo.types'
import { BREAKFAST_TYPES, CUISINE_TYPES } from './types/storeInfo.types'

interface BreakfastPolicyPageProps {
  data: BreakfastPolicy
  onSave: (data: Partial<BreakfastPolicy>) => Promise<void>
}

export default function BreakfastPolicyPage({ data, onSave }: BreakfastPolicyPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<BreakfastPolicy>(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (JSON.stringify(formData) !== JSON.stringify(data)) {
      if (!confirm('您有未保存的修改，确定要取消吗？')) {
        return
      }
    }
    setFormData(data)
    setIsEditing(false)
  }

  const handleSave = async () => {
    // 如果提供早餐，验证必填项
    if (formData.provided) {
      if (!formData.breakfastType) {
        alert('请选择早餐类型')
        return
      }
      if (!formData.cuisineType || formData.cuisineType.length === 0) {
        alert('请选择至少一种菜系')
        return
      }
      if (!formData.breakfastTime) {
        alert('请选择早餐时间')
        return
      }
      if (formData.breakfastTime === 'specified') {
        if (!formData.breakfastStartTime || !formData.breakfastEndTime) {
          alert('请设置早餐开始和结束时间')
          return
        }
      }
      if (!formData.additionalPrice || formData.additionalPrice < 0) {
        alert('请设置加1份早餐价格')
        return
      }

      // 验证儿童早餐收费规则
      if (formData.childPriceRules && formData.childPriceRules.length > 0) {
        for (const rule of formData.childPriceRules) {
          if (rule.minValue < 0 || rule.maxValue < 0) {
            alert('请填写正确的年龄/身高范围')
            return
          }
          if (rule.minValue > rule.maxValue) {
            alert('最小值不能大于最大值')
            return
          }
          if (!rule.isFree && (!rule.price || rule.price < 0)) {
            alert('请填写收费金额')
            return
          }
        }
      }
    }

    setIsSaving(true)
    try {
      await onSave(formData)
      setIsEditing(false)
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = <K extends keyof BreakfastPolicy>(
    field: K,
    value: BreakfastPolicy[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleCuisine = (value: string) => {
    const current = formData.cuisineType || []
    if (current.includes(value)) {
      updateField(
        'cuisineType',
        current.filter((c) => c !== value)
      )
    } else {
      updateField('cuisineType', [...current, value])
    }
  }

  const addPriceRule = () => {
    const newRule: BreakfastPriceRule = {
      id: `temp-${Date.now()}`,
      minValue: 0,
      maxValue: 0,
      isFree: true,
    }
    updateField('childPriceRules', [...(formData.childPriceRules || []), newRule])
  }

  const removePriceRule = (id: string) => {
    updateField(
      'childPriceRules',
      (formData.childPriceRules || []).filter((rule) => rule.id !== id)
    )
  }

  const updatePriceRule = (
    id: string,
    field: keyof BreakfastPriceRule,
    value: any
  ) => {
    updateField(
      'childPriceRules',
      (formData.childPriceRules || []).map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* 早餐提供 */}
      <EditableSection
        title="早餐配置"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="space-y-6">
          <FormField label="是否提供早餐" required>
            {isEditing ? (
              <RadioGroup
                value={formData.provided ? 'yes' : 'no'}
                onValueChange={(value) => updateField('provided', value === 'yes')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="breakfast-yes" />
                  <Label htmlFor="breakfast-yes" className="font-normal cursor-pointer">
                    提供早餐
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="breakfast-no" />
                  <Label htmlFor="breakfast-no" className="font-normal cursor-pointer">
                    不提供早餐
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <div className="h-9 flex items-center text-slate-900">
                {formData.provided ? '提供早餐' : '不提供早餐'}
              </div>
            )}
          </FormField>

          {formData.provided && (
            <div className="space-y-6 pl-6 border-l-2 border-blue-200">
              {/* 早餐类型 */}
              <FormField label="早餐类型" required>
                {isEditing ? (
                  <RadioGroup
                    value={formData.breakfastType || ''}
                    onValueChange={(value: any) => updateField('breakfastType', value)}
                  >
                    {BREAKFAST_TYPES.map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.value} id={`type-${type.value}`} />
                        <Label
                          htmlFor={`type-${type.value}`}
                          className="font-normal cursor-pointer"
                        >
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="h-9 flex items-center text-slate-900">
                    {BREAKFAST_TYPES.find((t) => t.value === formData.breakfastType)?.label ||
                      '—'}
                  </div>
                )}
              </FormField>

              {/* 菜系 */}
              <FormField label="菜系" required>
                {isEditing ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CUISINE_TYPES.map((cuisine) => (
                      <div key={cuisine.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cuisine-${cuisine.value}`}
                          checked={(formData.cuisineType || []).includes(cuisine.value)}
                          onCheckedChange={() => toggleCuisine(cuisine.value)}
                        />
                        <Label
                          htmlFor={`cuisine-${cuisine.value}`}
                          className="font-normal cursor-pointer"
                        >
                          {cuisine.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-900">
                    {(formData.cuisineType || []).length > 0
                      ? CUISINE_TYPES.filter((c) =>
                          (formData.cuisineType || []).includes(c.value)
                        )
                          .map((c) => c.label)
                          .join('、')
                      : '—'}
                  </div>
                )}
              </FormField>

              {/* 早餐时间 */}
              <FormField label="早餐时间" required>
                {isEditing ? (
                  <div className="space-y-3">
                    <RadioGroup
                      value={formData.breakfastTime || ''}
                      onValueChange={(value: 'daily' | 'specified') =>
                        updateField('breakfastTime', value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="time-daily" />
                        <Label htmlFor="time-daily" className="font-normal cursor-pointer">
                          每日开放
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="specified" id="time-specified" />
                        <Label htmlFor="time-specified" className="font-normal cursor-pointer">
                          指定时间
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.breakfastTime === 'specified' && (
                      <div className="flex items-center gap-4 pl-6">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-slate-600">开始时间</Label>
                          <Input
                            type="time"
                            value={formData.breakfastStartTime || ''}
                            onChange={(e) => updateField('breakfastStartTime', e.target.value)}
                            className="h-9 border-slate-300"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-slate-600">结束时间</Label>
                          <Input
                            type="time"
                            value={formData.breakfastEndTime || ''}
                            onChange={(e) => updateField('breakfastEndTime', e.target.value)}
                            className="h-9 border-slate-300"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-9 flex items-center text-slate-900">
                    {formData.breakfastTime === 'daily'
                      ? '每日开放'
                      : formData.breakfastTime === 'specified'
                        ? `${formData.breakfastStartTime} - ${formData.breakfastEndTime}`
                        : '—'}
                  </div>
                )}
              </FormField>

              {/* 加1份早餐价格 */}
              <FormField label="加1份早餐价格" required>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      value={formData.additionalPrice || ''}
                      onChange={(e) =>
                        updateField('additionalPrice', parseFloat(e.target.value) || 0)
                      }
                      className="h-9 w-32 border-slate-300"
                    />
                    <span className="text-sm text-slate-600">元</span>
                  </div>
                ) : (
                  <div className="h-9 flex items-center text-slate-900">
                    ¥{formData.additionalPrice || 0}
                  </div>
                )}
              </FormField>
            </div>
          )}
        </div>
      </EditableSection>

      {/* 儿童早餐收费详情 */}
      {formData.provided && (
        <EditableSection title="儿童早餐收费详情" isEditing={isEditing} hideActions>
          <div className="space-y-4">
            <FormField label="计价方式" required>
              {isEditing ? (
                <RadioGroup
                  value={formData.childPricingType || 'age'}
                  onValueChange={(value: 'age' | 'height') =>
                    updateField('childPricingType', value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="age" id="pricing-age" />
                    <Label htmlFor="pricing-age" className="font-normal cursor-pointer">
                      按年龄定价
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="height" id="pricing-height" />
                    <Label htmlFor="pricing-height" className="font-normal cursor-pointer">
                      按身高定价
                    </Label>
                  </div>
                </RadioGroup>
              ) : (
                <div className="h-9 flex items-center text-slate-900">
                  {formData.childPricingType === 'age' ? '按年龄定价' : '按身高定价'}
                </div>
              )}
            </FormField>

            {isEditing ? (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-600 font-semibold">
                        {formData.childPricingType === 'age' ? '最小年龄(岁)' : '最小身高(cm)'}
                      </TableHead>
                      <TableHead className="text-slate-600 font-semibold">
                        {formData.childPricingType === 'age' ? '最大年龄(岁)' : '最大身高(cm)'}
                      </TableHead>
                      <TableHead className="text-slate-600 font-semibold">费用</TableHead>
                      <TableHead className="text-slate-600 font-semibold">金额(元)</TableHead>
                      <TableHead className="text-slate-600 font-semibold w-20">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(formData.childPriceRules || []).map((rule) => (
                      <TableRow
                        key={rule.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            value={rule.minValue}
                            onChange={(e) =>
                              updatePriceRule(
                                rule.id,
                                'minValue',
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="h-9 border-slate-300"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            value={rule.maxValue}
                            onChange={(e) =>
                              updatePriceRule(
                                rule.id,
                                'maxValue',
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="h-9 border-slate-300"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={rule.isFree ? 'free' : 'charge'}
                            onValueChange={(value) =>
                              updatePriceRule(rule.id, 'isFree', value === 'free')
                            }
                          >
                            <SelectTrigger className="h-9 border-slate-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">免费</SelectItem>
                              <SelectItem value="charge">收费</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {!rule.isFree && (
                            <Input
                              type="number"
                              min="0"
                              value={rule.price || ''}
                              onChange={(e) =>
                                updatePriceRule(
                                  rule.id,
                                  'price',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="h-9 border-slate-300"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePriceRule(rule.id)}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addPriceRule}
                  className="h-9 border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  增加收费规则
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {(formData.childPriceRules || []).length > 0 ? (
                  (formData.childPriceRules || []).map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded"
                    >
                      <span className="text-slate-900">
                        {formData.childPricingType === 'age'
                          ? `${rule.minValue}岁 - ${rule.maxValue}岁`
                          : `${rule.minValue}cm - ${rule.maxValue}cm`}
                      </span>
                      <span className="text-sm text-slate-600">
                        {rule.isFree ? '免费' : `¥${rule.price}`}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-500 py-4">暂无收费规则</div>
                )}
              </div>
            )}
          </div>
        </EditableSection>
      )}
    </div>
  )
}
